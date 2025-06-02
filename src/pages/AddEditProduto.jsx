import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const AddEditProduto = () => {
  const { produtoId } = useParams("");
  const [name, setName] = useState(""); 
  const [preco, setPreco] = useState("");
  const [qtdEstoque, setQtdEstoque] = useState("");
  const [tipoProdutoId, setTipoProdutoId] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tipoProdutos, setTipoProdutos] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTipoProdutos = async () => {
      try {
        const tipoProdutosData = await ApiService.listarTipoProdutos();
        setTipoProdutos(tipoProdutosData.tipoProdutos);
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
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
            setPreco(produtoData.produto.preco);
            setQtdEstoque(produtoData.produto.qtdEstoque);
            setTipoProdutoId(produtoData.produto.tipoProdutoId);
            setDescription(produtoData.produto.description);
            setImageUrl(produtoData.produto.imageUrl);
          } else {
            showMessage(produtoData.message);
          }
        } catch (error) {
          showMessage(
            error.response?.data?.message ||
              "Error Getting a Produto by Id: " + error
          );
        }
      }
    };

    fetchTipoProdutos();
    if (produtoId) fetchProdutoById();
  }, [produtoId]);

  //metjhod to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result); //user imagurl to preview the image to upload
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);    
    formData.append("preco", preco);
    formData.append("qtdEstoque", qtdEstoque);
    formData.append("tipoProdutoId", tipoProdutoId);
    formData.append("description", description);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      if (isEditing) {
        formData.append("produtoId", produtoId);
        await ApiService.atualizarProduto(formData);
        showMessage("Produto successfully updated");
      } else {
        await ApiService.adicionarProduto(formData);
        showMessage("Produto successfully Saved 🤩");
      }
      navigate("/produto");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Saving a Produto: " + error
      );
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

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
            <label>Quantidade em estoque</label>
            <input
              type="number"
              value={qtdEstoque}
              onChange={(e) => setQtdEstoque(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Preço</label>
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

            <select
              value={tipoProdutoId}
              onChange={(e) => setTipoProdutoId(e.target.value)}
              required
            >
              <option value="">Selecione um tipo</option>

              {tipoProdutos.map((tipoProduto) => (
                <option key={tipoProduto.id} value={tipoProduto.id}>
                  {tipoProduto.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Imagem produto</label>
            <input type="file" onChange={handleImageChange} />

            {imageUrl && (
              <img src={imageUrl} alt="preview" className="image-preview" />
            )}
          </div>
          <button type="submit">{isEditing ? "Editar" : "Adicionar"}</button>

        </form>
      </div>
    </Layout>
  );
};

export default AddEditProduto;