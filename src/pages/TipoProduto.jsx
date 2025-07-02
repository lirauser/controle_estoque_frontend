import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";

const TipoProduto = () => {
  const [tipoProdutos, setTipoProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTipoProdutoId, setEditingTipoProdutoId] = useState(null);

  useEffect(() => {
    const getTipoProdutos = async () => {
      try {
        const response = await ApiService.listarTipoProdutos();
        if (response.status === 200) {
          setTipoProdutos(response.tipoProdutos);
        }
      } catch (error) {
        showMessage(
          "Erro ao listar tipos de produto: " + error
        );
      }
    };
    getTipoProdutos();
  }, []);  
  
  const adicionarTipoProduto = async () => {
    if (!nome) {       
      showMessage("O tipo do produto não pode ser vazio.");            
      return;
    }
    try {     
      await ApiService.criarTipoProduto({ nome: nome });      
      showMessage("Tipo de produto adicionado com sucesso");
      setNome(""); 
      window.location.reload(); 
    } catch (error) {      
        showMessage(
        "Error ao criar um tipo de produto: " + error
        );     
    }
  };   
  
  const editarTipoProduto = async () => {
    try {
      await ApiService.atualizarTipoProduto(editingTipoProdutoId, { nome: nome });
      showMessage("Tipo de produto atualizado com sucesso");
      setIsEditing(false);
      setNome(""); 
      window.location.reload(); 
    } catch (error) {
      showMessage(
        "Erro de atualização: " + error
      );
    }
  };
  
  const handleEditTipoProduto = (tipoProduto) => {
    setIsEditing(true);
    setEditingTipoProdutoId(tipoProduto.tipoId);    
    setNome(tipoProduto.nome);    
  };
  
  const handleDeleteTipoProduto = async (tipoProdutoId) => {    
    if (window.confirm("Tem certeza que deseja deletar este tipo?")) {
      try {        
        await ApiService.removerTipoProduto(tipoProdutoId);
        showMessage("Tipo de produto removido com sucesso.");
        window.location.reload(); 
      } catch (error) {
        showMessage(
          "Erro ao remover tipo de produto. " + error
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
      <div className="category-page">
        <div className="category-header">
          <h1>Tipos de Produto</h1>
          <div className="add-cat">
            <input value={nome} type="text"
              placeholder="Nome tipo produto"
              onChange={(e) => setNome(e.target.value)}
            />

            {!isEditing ? (
              <button onClick={adicionarTipoProduto}>Adicionar</button>
            ) : (
              <button onClick={editarTipoProduto}>Editar</button>
            )}
          </div>
        </div>
      </div>

      {tipoProdutos && (
          <ul className="category-list">
            {tipoProdutos.map((tipoProduto) => (
              <li key={tipoProduto.tipoId} className="category-item">
                <span>{tipoProduto.nome}</span>
                
                <div className="category-actions">
                  <button onClick={() => handleEditTipoProduto(tipoProduto)}>Editar</button>
                  <button onClick={() => handleDeleteTipoProduto(tipoProduto.tipoId)}>Remover</button>
                </div>                
              </li>
            ))}
          </ul>
        )}      
    </Layout>
  )
}

export default TipoProduto;