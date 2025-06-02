import React, {useEffect, useState} from "react";
import Layout from '../components/Layout'
import ApiService from '../services/ApiService'

const TipoProduto = () => {   
  const [tiposProduto, setTiposProduto] = useState([]);
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTiposProdutoId, setEditingTiposProdutoId] = useState(null);

  //busca os tipos de produto do backend
  useEffect(() => {
    const getTipoProdutos = async () => {
      try {
        const response = await ApiService.listarTipoProdutos();
        console.log(response.status);        
        if(response.status === 200) {
          console.log("Entrou em setTiposProduto");
          setTiposProduto(response.tiposProduto)
        }
      } catch (error) {
        mostrarMensagem(error.response?.data?.message);
      }
    };
    getTipoProdutos();
  }, []);

  //mostrar mensagem ou erros
  const mostrarMensagem = (msg) => {
    setMensagem(msg);
    setTimeout(() => {
      setMensagem("");
    }, 4000);
  };

  //Adicionar tipo de produto
  const adicionarTipoProdutos = async () => {
    if (!nome) {
      mostrarMensagem("O nome do tipo produto não pode ser vazio");
      return;
    }
    try {
      await ApiService.criarTipoProduto({nome});
      mostrarMensagem("Tipo de produto criado com sucesso");
      setNome("");
      window.location.reload();
    } catch (error) {
      mostrarMensagem(error.response?.data?.mensagem);
    }
  }

  //Editar tipo de produto
  const editarTiposProduto = async () => {
    try {
      await ApiService.atualizarTipoProduto(editingTiposProdutoId, {nome});
      mostrarMensagem("Tipo de produto atualizado com sucesso")
      setIsEditing(false)
      window.location.reload();
    } catch (error) {
      mostrarMensagem(error.response?.data?.mensagem);
    }
  }  

  //Popula os dados de tipo produto
  const handleEditTiposProduto = (tipoProduto) => {
    setIsEditing(true);
    setEditingTiposProdutoId(tipoProduto.id);
    setNome(tipoProduto.nome);
  };

  //deleta tipo de produto
  const handleDeleteCategory = async (tiposProdutoId) => {
    if (window.confirm("Tem certeza que deseja remover tipo produto?")) {
      try {
        await ApiService.removerTiposProduto(tiposProdutoId);
        mostrarMensagem("Tipo produto removido com sucesso.");
        window.location.reload();
      } catch (error) {
        mostrarMensagem(error.response?.data?.mensagem);
      }
    }
  }  

  return (
    <Layout>
      { mensagem && <div className="message">{mensagem}</div>}

      <div className="category-page">
        <div className="category-header">
          <h1>Tipos de produto</h1>
          <div className="add-cat">
            <input value={nome} type="text"
              placeholder="Nome tipo produto" 
              onChange={(e) => setNome(e.target.value)} />             

              {!isEditing ? (
                <button onClick={adicionarTipoProdutos}>Adicionar</button>
              ) : (
                <button onClick={editarTiposProduto}>Editar Tipo</button>
              )}
          </div>
        </div>

        { tiposProduto && (
          <ul className="category-list">

            {tiposProduto.map((tipoProduto) => (
            <li className="category-item" key={tipoProduto.id} >
              <span>{tipoProduto.nome}</span>

              <div className="category-actions">
                <button className="edit-btn" onClick={() => handleEditTiposProduto(tipoProduto)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDeleteCategory(tipoProduto.id)}>Remover</button>
              </div>
            </li>
            ))}
          </ul>
        )}        
      </div>
    </Layout>
  );

};
export default TipoProduto