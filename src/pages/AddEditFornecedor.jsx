import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const AddEditFornecedor = () => {
  const { fornecedorId } = useParams("");
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [contato, setContato] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (fornecedorId) {
      setIsEditing(true);

      const fetchFornecedor = async () => {
        try {
          const fornecedorData = await ApiService.obterFornecedorPorId(fornecedorId);
          if (fornecedorData.status === 200) {
            setNomeFornecedor(fornecedorData.fornecedor.nomeFornecedor);
            setContato(fornecedorData.fornecedor.contato);
            setEndereco(fornecedorData.fornecedor.endereco);
          }
        } catch (error) {
          showMensagem(
            error.response?.data?.mensagem ||
              "Erro ao obter um fornecedor por Id: " + error
          );
        }
      };
      fetchFornecedor();
    }
  }, [fornecedorId]);

  //handle form submission for both add and edit fornecedor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fornecedorData = { nomeFornecedor, contato, endereco };

    try {
      if (isEditing) {
        await ApiService.atualizarFornecedor(fornecedorId, fornecedorData);
        showMensagem("Fornecedor editado com sucesso.");
        navigate("/fornecedor")
      } else {
        await ApiService.adicionarFornecedor(fornecedorData);
        showMensagem("Fornecedor adicionado com sucesso.");
        navigate("/fornecedor")
      }
    } catch (error) {
      showMensagem(
        error.response?.data?.mensagem ||
          "Error ao obter um fornecedor por Id: " + error
      );
    }
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
      <div className="supplier-form-page">
        <h1>{isEditing ? "Editar Fornecedor" : "Adicionar Fornecedor"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome fornecedor</label>
            <input value={nomeFornecedor} onChange={(e) => setNomeFornecedor(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Contato</label>
            <input value={contato} onChange={(e) => setContato(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Endereco</label>
            <input value={endereco} onChange={(e) => setEndereco(e.target.value)}
              required
              type="text"
            />
          </div>
          <button type="submit">
            {isEditing ? "Edit Fornecedor" : "Add Fornecedor"}
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default AddEditFornecedor;