import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const AddEditProduto = () => {
  const { produtoId } = useParams("");
  const [name, setName] = useState("");
  const [codigo, setCodigo] = useState("");   
  const [preco, setPreco] = useState("");
  const [qtdEstoque, setQtdEstoque] = useState("");
  const [tipoProdutoId, setTipoProdutoId] = useState("");
  const [description, setDescription] = useState("");   
  const [isEditing, setIsEditing] = useState(false);
  const [tipoProdutos, setTipoProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTipoProdutos = async () => {
      try {
        const tipoProdutosData = await ApiService.listarTipoProdutos();
        setTipoProdutos(tipoProdutosData.tipoProdutos);
      } catch (error) {
        mostrarMensagem(
          error.response?.data?.mensagem ||
            "Erro ao obter tipos de produto: " + error
        );
      }
    };

    const fetchProdutoById = async () => {
      if (produtoId) {
        setIsEditing(true);
        try {
          const produtoData = await ApiService.buscarProdutoPorId(produtoId);          
          if (produtoData.status === 200) {            
            setName(produtoData.produto.name);
            setCodigo(produtoData.produto.codigo);
            setQtdEstoque(produtoData.produto.qtdEstoque);          
            setPreco(produtoData.produto.preco);           
            setDescription(produtoData.produto.description);
            setTipoProdutoId(produtoData.produto.tipoProdutoId); 
          } else {
            mostrarMensagem(produtoData.produto.mensagem);
          }
        } catch (error) {
          mostrarMensagem(
            error.response?.data?.mensagem ||
              "Erro ao obter um produto por id: " + error
          );
        }
      }
    };
    fetchTipoProdutos();
    if (produtoId)       
      fetchProdutoById();
  }, [produtoId]);

  
  const mostrarMensagem = (msg) => {
    setMensagem(msg);
    setTimeout(() => {
      setMensagem("");
    }, 4000);
  };  

  const handleSubmit = async (e) => {   
    e.preventDefault();
    const formData = new FormData();
      formData.append("name", name);      
      formData.append("codigo", codigo);            
      formData.append("qtdEstoque", qtdEstoque);
      formData.append("preco", preco);
      formData.append("tipoProdutoId", tipoProdutoId);      
      formData.append("description", description);      

    try {
      if (isEditing) {
        formData.append("produtoId", produtoId);        
        await ApiService.atualizarProduto(formData);
        mostrarMensagem("Produto atualizado com sucesso.");
      } else {
        await ApiService.adicionarProduto(formData);
        mostrarMensagem("Produto salvo com sucesso.");
      }
      navigate("/produto");
    } catch (error) {
      mostrarMensagem(
        error.response?.data?.mensagem || "Erro ao salvar o produto: " + error
      );
    }
  };

  return (
    <Layout>
      {mensagem && <div className="mensagem">{mensagem}</div>}

      <div className="product-form-page">
        <h1>{isEditing ? "Editar Produto" : "Adicionar Produto"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome produto</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Código do produto</label>
            <input 
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>          

          <div className="form-group">
            <label>Quantidade em estoque</label>
            <input type="number"
              value={qtdEstoque}
              onChange={(e) => setQtdEstoque(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Preço no fornecedor</label>
            <input 
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tipo Produto</label>
            <select value={tipoProdutoId}
              onChange={(e) => setTipoProdutoId(e.target.value)}
              required
            >
              <option value="">Selecione um tipo</option>
              {tipoProdutos.map((tipoProduto) => (
                <option key={tipoProduto.tipoId} value={tipoProduto.tipoId}>
                  {tipoProduto.nome}
                </option>
              ))}
            </select>
            
          </div>                                    
            <button type="submit">{isEditing ? "Editar" : "Adicionar"}</button>          
        </form>
      </div>
    </Layout>
  );
};

export default AddEditProduto;