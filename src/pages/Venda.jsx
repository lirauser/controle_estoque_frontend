import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";

const Venda = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nota, setNota] = useState("");
  const [qtd, setQtd] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const produtoData = await ApiService.listarProdutos();
        setProdutos(produtoData.produtos);
      } catch (error) {
        showMensagem(
          error.response?.data?.mensagem || "Erro ao obter produtos: " + error
        );
      }
    };

    fetchProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produtoId || !qtd) {
      showMensagem("Por favor preencha todos os campos requeridos.");
      return
    }
    const body = {
      produtoId,
      qtd: parseInt(qtd),
  
    };

    try {
      const respone = await ApiService.venderProduto(body);
      showMensagem(respone.mensagem);
      resetForm();
    } catch (error) {
      showMensagem(
        error.response?.data?.mensagem || "Erro ao vender produto: " + error
      );
    }
  };

  const resetForm = () => {
    setProdutoId("");
    setDescricao("");
    setNota("");
    setQtd("");
  };

  //metjhod to show mensagem or errors
  const showMensagem = (msg) => {
    setMensagem(msg);
    setTimeout(() => {
      setMensagem("");
    }, 4000);
  };

  return (
    <Layout>
      {mensagem && <div className="mensagem">{mensagem}</div>}
      <div className="purchase-form-page">
        <h1>Venda de Produto</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selecionar produto</label>

            <select
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              required
            >
              <option value="">Selecionar um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.name}
                </option>
              ))}
            </select>
          </div>


          <div className="form-group">
            <label>Qtd</label>
            <input
              type="number"
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Nota</label>
            <input
              type="text"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              required
            />
          </div>


          <button type="submit">Vender produto</button>
        </form>
      </div>
    </Layout>
  );
};
export default Venda;