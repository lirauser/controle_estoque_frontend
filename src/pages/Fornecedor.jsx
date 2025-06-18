import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const Fornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   
    const getFornecedores = async () => {
      try {
        const responseData = await ApiService.obterFornecedores();        
        if (responseData.status === 200) { 
          console.log("Fornecedores: " + responseData.fornecedores);         
          setFornecedores(responseData.fornecedores);
        } else {
          showMensagem(responseData.mensagem);
        }
      } catch (error) {
        showMensagem(
          "Erro ao recuperar fornecedores: " + error
        );        
      }
    };
    getFornecedores();
  }, []);

  const showMensagem = (msg) => {
    setMensagem(msg);
    setTimeout(() => {
      setMensagem("");
    }, 4000);
  };

const handleDeleteFornecedor = async (fornecedorId) => {
  try {
    if (window.confirm("Are you sure you want to delete this fornecedor? ")) {
      await ApiService.removerFornecedor(fornecedorId);
      window.location.reload();
    }
  } catch (error) {
    showMensagem(
      error.response?.data?.mensagem || "Error Deleting a Fornecedores: " + error
    );
  }
};

return(
    <Layout>
        {mensagem && <div className="message">{mensagem}</div>}
        <div className="supplier-page">
            <div className="supplier-header">
                <h1>Fornecedores</h1>
                <div className="add-sup">
                    <button onClick={()=> navigate("/add-fornecedor")} >Adicionar</button>
                </div>
            </div>
        </div>

        {fornecedores && 
        <ul className="supplier-list">            
            {fornecedores.map((fornecedor) => (
                <li className="supplier-item" key={fornecedor.id}>
                    <span>{fornecedor.nomeFornecedor}</span>

                    <div className="supplier-actions">
                        <button onClick={()=> navigate(`/edit-fornecedor/${fornecedor.id}`)} >Editar</button>
                        <button onClick={()=> handleDeleteFornecedor(fornecedor.id)} >Remover</button>
                    </div>

                </li>
            ))}
        </ul>        
        }
    </Layout>
)

}
export default Fornecedor;