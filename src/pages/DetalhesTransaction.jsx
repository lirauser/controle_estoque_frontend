import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate, useParams } from "react-router-dom";


const DetalhesTransaction = () => {
  const {transactionId} = useParams();
  const [transaction, setTransaction] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const transactionData = await ApiService.obterTransacaoPorId(transactionId);

        if (transactionData.status === 200) {
            setTransaction(transactionData.transacao);
            setStatus(transactionData.transacao.status);
        }
      } catch (error) {
        showMensagem(
          "Erro ao obter uma transação: " + error
        );
      }
    };

    getTransaction();
  }, [transactionId]);


const showMensagem = (msg) => {
  setMensagem(msg);
  setTimeout(() => {
    setMensagem("");
  }, 4000);
};

  return(
    <Layout>
        
      {mensagem && <p className="message">{mensagem}</p>}
      <div className="transaction-details-page">
        {transaction && (
           <>
           {/* Transaction base information */}
           <div className="section-card">
                <h2>Informação da Transação</h2>
                <p>Tipo: {transaction.tipoMovimentacao}</p>
                <p>Status: {transaction.status}</p>
                <p>Descrição: {transaction.descricao}</p>                
                <p>Total de Produtos: {transaction.totalProdutos}</p>
                <p>Preço Total: {transaction.totalPreco.toFixed(2)}</p>
                <p>Criado em: {new Date(transaction.criadoEm).toLocaleString()}</p>

                {transaction.atualizadoEm && (
                <p>Atualizado em: {new Date(transaction.atualizadoEm).toLocaleString()}</p>
                )}
           </div>

           {/* Informação do produto da transação */}
           {transaction.produtos && (
           <div className="section-card">
                <h2>Informação do Produto</h2>
                <p>Nome: {transaction.produto.name}</p>                
                <p>Preço: {transaction.produto.preco.toFixed(2)}</p>
                <p>Qtd em Estoque: {transaction.produto.qtdEstoque}</p>
                <p>Descricao: {transaction.produto.description}</p>                     
           </div> 
           )}  

           {/* Informação do fornecedor que fez a transacão */}
           {transaction.fornecedores && (
           <div className="section-card">
                <h2>Informação Fornecedor</h2>
                <p>Nome: {transaction.fornecedor.nomeFornecedor}</p>
                <p>Contato: {transaction.fornecedor.contato}</p>
                <p>Endereço: {transaction.fornecedor.endereco}</p> 
           </div>
           )}         
          
           </>
        )}
      </div>
    </Layout>
  )
};

export default DetalhesTransaction;