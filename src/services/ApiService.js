import axios from 'axios'

export default class ApiService {
  
    static BASE_URL = "http://localhost:8080/api";

    
    /** ====== Endpoints PRODUTO ======== */

    static async adicionarProduto(formData) {
        const response = await axios.post(`${this.BASE_URL}/produtos/add`, formData, {
            headers: {                
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data;
    }

    static async atualizarProduto(formData) {
        const response = await axios.put(`${this.BASE_URL}/produtos/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data;
    }

    static async listarProdutos() {
        const response = await axios.get(`${this.BASE_URL}/produtos/all`, {
            headers: {
                "Content-type" : 'application/json'
            }                       
        })
        return response.data;
    }

    static async buscarProdutoPorId(productId) {
        const response = await axios.get(`${this.BASE_URL}/produtos/${productId}`, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }

    static async buscarProdutoPorNome(searchValue) {
        const response = await axios.get(`${this.BASE_URL}/produtos/search`, {
            params: {searchValue},
            headers: {
                "Content-type" : 'application/json'
            },
        })
        return response.data;
    }

    static async removerProduto(produtoId) {
        const response = await axios.delete(`${this.BASE_URL}/produtos/delete/${produtoId}`, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }


    /** ====== Endpoints TIPO DE PRODUTO ======== */

    static async criarTipoProduto(tipoProduto) {
        const response = await axios.post(`${this.BASE_URL}/tipoProdutos/add`, tipoProduto, {
            headers: {
                "Content-type" : 'application/json'
            },          
        })
        return response.data;
    }

    static async atualizarTipoProduto(tipoProdutoId, tipoProdutoDados) {
        const response = await axios.put(`${this.BASE_URL}/tipoProdutos/update/${tipoProdutoId}`, tipoProdutoDados, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }

    static async listarTipoProdutos() {
        const response = await axios.get(`${this.BASE_URL}/tipoProdutos/all`, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    } 

    static async buscarTipoProdutoPorId(tipoProdutoId) {
        const response = await axios.get(`${this.BASE_URL}/tipoProdutos/${tipoProdutoId}`, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }    

    static async removerTipoProduto(tipoProdutoId) {
        const response = await axios.delete(`${this.BASE_URL}/tipoProdutos/delete/${tipoProdutoId}`, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }


    /** ====== Endpoints FORNECEDOR ======== */

    static async adicionarFornecedor(fornecedorDados) {
        const response = await axios.post(`${this.BASE_URL}/fornecedores/add`, fornecedorDados, {
            headers: {
                "Content-type" : 'application/json'
            },          
        })
        return response.data;
    }

    static async obterFornecedores() {
        const response = await axios.get(`${this.BASE_URL}/fornecedores/all`, {
            headers: {
                "Content-type" : 'application/json'
            },          
        })
        return response.data;
    }

    static async obterFornecedorPorId(fornecedorId) {
        const response = await axios.get(`${this.BASE_URL}/fornecedores/${fornecedorId}`, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }
    
    static async atualizarFornecedor(fornecedorId, fornecedorDados) {
        const response = await axios.put(`${this.BASE_URL}/fornecedores/update/${fornecedorId}`, fornecedorDados, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }

     static async removerFornecedor(fornecedorId) {
        const response = await axios.delete(`${this.BASE_URL}/fornecedores/delete/${fornecedorId}`, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }

/** ====== Endpoints TRANSAÇAO ======== */

    static async comprarProduto(body) {
        const response = await axios.post(`${this.BASE_URL}/transactions/compra`, body, {
            headers: {
                "Content-type" : 'application/json'
            },          
        })
        return response.data;
    }

    static async venderProduto(body) {
        const response = await axios.post(`${this.BASE_URL}/transactions/venda`, body, {
            headers: {
                "Content-type" : 'application/json'
            },          
        })
        return response.data;
    }

    static async retornarParaFornecedor(body) {
        const response = await axios.get(`${this.BASE_URL}/transactions/retorna`, body, {
            headers: {
                "Content-type" : 'application/json'
            },          
        })
        return response.data;
    }

    static async listarTransacoes() {
        const response = await axios.get(`${this.BASE_URL}/transactions/all`, {
            headers: {
                "Content-type" : 'application/json'
            }
           // params: {filter}        
        })
        return response.data;
    }

    static async obterTransacaoPorMesAno(month, year) {
        const response = await axios.get(`${this.BASE_URL}/transactions/month-year`, {
            headers: {
                "Content-type" : 'application/json'
            },
            params:  {
                month:month,
                year:year
            }          
        })
        return response.data;
    }

    static async obterTransacaoPorId(transactionId) {
        const response = await axios.get(`${this.BASE_URL}/transactions/${transactionId}`, {
            headers: {
                "Content-type" : 'application/json'
            },                  
        })
        return response.data;
    }
    
    static async atualizarStatusTransacao(transactionId, status) {
        const response = await axios.put(`${this.BASE_URL}/transactions/update/${transactionId}`, status, {
            headers: {
                "Content-type" : 'application/json'
            },            
        })
        return response.data;
    }
     
}
