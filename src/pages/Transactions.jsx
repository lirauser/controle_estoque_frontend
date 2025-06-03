import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [filter, setFilter] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    const getTransacoes = async () => {
      try {
        const transactionData = await ApiService.listarTransacoes(valueToSearch);

        if (transactionData.status === 200) {          
          console.log("Pegou as transações!!");
          console.log("Transacao: " + transactionData.transacoes);
          setTransacoes(transactionData.transacoes);
        }
      } catch (error) {
        showMessage(
          "Error ao listar transações: " + error
        );
      }
    };

    getTransacoes();
  }, [valueToSearch]);


  //Method to show message or errors
  const showMessage = (msg) => {
    setMensagem(msg);
    setTimeout(() => {
      setMensagem("");
    }, 4000);
  };


  //handle search
  const handleSearch = () =>{
    console.log("Search hit")
    console.log("FILTER IS: " + filter)       
    setValueToSearch(filter)
  }

  //Navigate to transacoes details page
  const navigateToTransactionDetailsPage = (transactionId) =>{
    navigate(`/transactions/${transactionId}`);
  }

  return (
    <Layout>
      {mensagem && <div className="message">{mensagem}</div>}
      <div className="transactions-page">
        <div className="transactions-header">
            <h1>Movimentação Estoque</h1>            
        </div>

        {transacoes &&
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>TIPO</th>
                        <th>STATUS</th>
                        <th>PREÇO TOTAL</th>
                        <th>QTD MOVIMENTADA</th>
                        <th>DATA</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>

                <tbody>
                    {transacoes.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.tipoMovimentacao}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.totalPreco}</td>
                            <td>{transaction.totalProdutos}</td>
                            <td>{new Date(transaction.criadoEm).toLocaleString()}</td>
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