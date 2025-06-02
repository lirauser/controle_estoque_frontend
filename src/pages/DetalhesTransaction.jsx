import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate, useParams } from "react-router-dom";


const DetalhesTransaction = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const getTransaction = async () => {
      try {
        const transactionData = await ApiService.obterTransacaoPorId(transactionId);

        if (transactionData.status === 200) {
            setTransaction(transactionData.transaction);
            setStatus(transactionData.transaction.status);
        }
      } catch (error) {
        showMensagem(
          error.response?.data?.mensagem || "Erro ao obter uma transação: " + error
        );
      }
    };

    getTransaction();
  }, [transactionId]);


//update transaction status
const handleUpdateStatus = async()=>{
    try {
        ApiService.atualizarStatusTransacao(transactionId, status);
        navigate("/transaction")
    } catch (error) {
        showMensagem(
          error.response?.data?.mensagem || "Erro atualizando uma transação: " + error
        );
        
    }
}

  //Method to show mensagem or errors
  const showMensagem = (msg) => {
    setMensagem(msg);
    setTimeout(() => {
      setMensagem("");
    }, 4000);
  };

  return(
    <Layout>
        
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <div className="transaction-details-page">
        {transaction && (
           <>
           {/* Transaction base information */}
           <div className="section-card">
                <h2>Informação da Transação</h2>
                <p>Tipo: {transaction.tipoMovimentacao}</p>
                <p>Status: {transaction.status}</p>
                <p>Descrição: {transaction.descricao}</p>
                <p>Nota: {transaction.nota}</p>
                <p>Total de Produtos: {transaction.totalProdutos}</p>
                <p>Preço Total: {transaction.totalPreco.toFixed(2)}</p>
                <p>Criado em: {new Date(transaction.criadoEm).toLocaleString()}</p>

                {transaction.atualizadoEm && (
                <p>Atualizado em: {new Date(transaction.atualizadoEm).toLocaleString()}</p>
                )}
           </div>

           {/* Produto information of the transaction */}
           <div className="section-card">
                <h2>Informação do Produto</h2>
                <p>Nome: {transaction.produto.name}</p>                
                <p>Preço: {transaction.produto.preco.toFixed(2)}</p>
                <p>Qtd em Estoque: {transaction.produto.qtdEstoque}</p>
                <p>Descricao: {transaction.produto.descricao}</p>

                {transaction.produto.imageUrl && (
                <img src={transaction.produto.imageUrl} alt={transaction.produto.name} />
                )}
                
           </div>   

           {/* Fornecedor information who made the transaction */}
           {transaction.fornecedores && (
           <div className="section-card">
                <h2>Informação Fornecedor</h2>
                <p>Name: {transaction.fornecedor.name}</p>
                <p>Contact Address: {transaction.fornecedor.contato}</p>
                <p>Address: {transaction.fornecedor.endereco}</p> 
           </div>
           )}

           {/* UPDATE TRANSACTION STATUS */}
           <div className="section-card transaction-staus-update">
            <label>Status: </label>
            <select 
            value={status}
            onChange={(e)=> setStatus(e.target.value)}
            >
                <option value="PENDENTE">PENDENTE</option>
                <option value="PROCESSANDO">PROCESSANDO</option>
                <option value="CONCLUIDO">CONCLUÍDO</option>
                <option value="CANCELADO">CANCELADO</option>
            </select>
            <button onClick={()=>handleUpdateStatus()}>Atualizar status</button>
           </div>
           </>
        )}
      </div>
    </Layout>
  )
};

export default DetalhesTransaction;