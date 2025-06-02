import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [filter, setFilter] = useState("");
  const [valorAPesquisar, setValorAPesquisar] = useState("");

  const navigate = useNavigate();  

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const transactionData = await ApiService.listarTransacoes();
        console.log("Transacao: " + transactionData.transactions);          
        if (transactionData.status === 200) {
          console.log("Entrou...");
          setTransactions(transactionData.transactions);
        }             
      } catch (error) {
        showMensagem(
          error.response?.data?.mensagem || "Erro ao exibir transações: " + error
        );
      }
    };

    getTransactions();
  }, [valorAPesquisar]);



  //Method to show mensagem or errors
  const showMensagem = (msg) => {
    setMensagem(msg);
    setTimeout(() => {
      setMensagem("");
    }, 4000);
  };


  //handle search
  const handleSearch = () =>{
    console.log("Busca")
    console.log("FILTRO: " + filter)    
    setValorAPesquisar(filter)
  }

  //Navigate to transactions details page
  const navigateToTransactionDetailsPage = (transactionId) =>{
    navigate(`/transaction/${transactionId}`);
  }

  return (
    <Layout>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <div className="transactions-page">
        <div className="transactions-header">
            <h1>Transactions</h1>
            <div className="transaction-search">
                <input 
                value={filter}
                type="text"
                placeholder="Procurar transacao..."                
                onChange={(e)=> setFilter(e.target.value)} />
                <button onClick={()=> handleSearch()} > Buscar</button>
            </div>
        </div>

        {transactions && 
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>TIPO</th>
                        <th>STATUS</th>
                        <th>PREÇO TOTAL</th>
                        <th>TOTAL DE PRODUTOS</th>
                        <th>DATA</th>
                        <th>DESCRIÇÃO</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.tipoMovimentacao}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.totalPreco}</td>
                            <td>{transaction.totalProdutos}</td>
                            <td>{new Date(transaction.criadoEm).toLocaleString()}</td>
                            <td>{transaction.descricao}</td>
                            <td>
                                <button onClick={()=> navigateToTransactionDetailsPage(transaction.id)}>Detalhar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
      </div>      
    </Layout>
  );
};
export default Transactions;