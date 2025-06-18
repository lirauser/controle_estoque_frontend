import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const Produto = () => {
  const [produtos, setProdutos] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const produtoData = await ApiService.listarProdutos(); 
        setProdutos(produtoData.produtos)     
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Erro ao obter produtos: " + error
        );
      }
    };
    getProdutos();
  }, []);

  //Deleta um produto
  const handleDeleteProduto = async (produtoId) => {
    if (window.confirm("Tem certeza que quer remover este produto?")) {
      try {
        await ApiService.removerProduto(produtoId);
        showMessage("Produto removido com sucesso.");
        window.location.reload();
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Erro ao remover produto: " + error
        );
      }
    }
  };
  
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="product-page">
        <div className="product-header">
          <h1>Produtos</h1>
          <button
            className="add-product-btn"
            onClick={() => navigate("/add-produto")}>Adicionar
          </button>
        </div>

        {produtos && (
          <div className="product-list">
            {produtos.map((produto) => (
              <div key={produto.id} className="product-item">                
                <div className="product-info">
                    <h3 className="name">{produto.name}</h3>
                    <p className="codigo">Código: {produto.codigo}</p>
                    <p></p>                  
                    <p className="price">Preço: {produto.preco}</p>
                    <p className="quantity">Quantidade: {produto.qtdEstoque}</p>
                </div>

                <div className="product-actions">
                    <button className="edit-btn" onClick={()=> navigate(`/edit-produto/${produto.id}`)}>Editar</button>
                    <button className="delete-btn" onClick={()=> handleDeleteProduto(produto.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>      
    </Layout>
  );
};
export default Produto;