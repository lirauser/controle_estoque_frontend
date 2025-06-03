import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";

const Compra = () => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoId, setProductId] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nota, setNota] = useState("");
  const [qtd, setQtd] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchprodutosAndFornecedores = async () => {
      try {
        const produtoData = await ApiService.listarProdutos();
        const fornecedorData = await ApiService.obterFornecedores();
        setProdutos(produtoData.produtos);
        setFornecedores(fornecedorData.fornecedores);
      } catch (error) {
        showMensagem(
          error.response?.data?.mensagem || "Error Getting Produtos: " + error
        );
      }
    };

    fetchprodutosAndFornecedores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produtoId || !fornecedorId || !qtd) {
      showMensagem("Por favor preencha os campos requeridos.");
      return
    }
    const body = {
      produtoId,
      qtd: parseInt(qtd),
      fornecedorId,
      descricao,
      nota,
    };
    console.log(body)

    try {
      const respone = await ApiService.comprarProduto(body);
      showMensagem(respone.mensagem);
      resetForm();
    } catch (error) {
      showMensagem(
        error.response?.data?.mensagem || "Erro ao comprar produtos: " + error
      );
    }
  };

  const resetForm = () => {
    setProductId("");
    setFornecedorId("");
    setDescricao("");
    setNota("");
    setQtd("");
  };

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
        <h1>Receber Estoque</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selecionar produto</label>
            <select value={produtoId}
              onChange={(e) => setProductId(e.target.value)}
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
            <label>Selecionar fornecedor</label>

            <select
              value={fornecedorId}
              onChange={(e) => setFornecedorId(e.target.value)}
              required
            >
              <option value="">Selecionar um fornecedor</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nomeFornecedor}
                </option>
              ))}
            </select>
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

          <div className="form-group">
            <label>Quantidade</label>
            <input type="number"
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
              required
            />
          </div>
          <button type="submit">Adquirir produtos</button>
        </form>
      </div>
    </Layout>
  );
};
export default Compra;