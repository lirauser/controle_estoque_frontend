import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './style.css'
import TipoProduto from './pages/TipoProduto';
import Fornecedor from './pages/Fornecedor';
import AddEditFornecedor from './pages/AddEditFornecedor';
import Produto from './pages/Produto';
import AddEditProduto from './pages/AddEditProduto';
import Compra from './pages/Compra';
import Venda from './pages/Venda';
import Transactions from './pages/Transactions';
import DetalhesTransaction from './pages/DetalhesTransaction';

function App() {
  return (
    <div className="aplicacaoPrincipal">
    <Router>
      <Routes>
        <Route exact="/" path="/" element={<TipoProduto />} />
        <Route path="/fornecedor" element={<Fornecedor />} />
        <Route path="/add-fornecedor" element={<AddEditFornecedor/>}/>
        <Route path="/edit-fornecedor/:fornecedorId" element={<AddEditFornecedor/>}/>

        <Route path="/produto" element={<Produto/>}/>
        <Route path="/add-produto" element={<AddEditProduto/>}/>
        <Route path="/edit-produto/:produtoId" element={<AddEditProduto/>}/>

        <Route path="/compra" element={<Compra/>}/>
        <Route path="/venda" element={<Venda/>}/>

        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/transactions/:transactionId" element={<DetalhesTransaction/>}/>  
        
      </Routes>

    </Router>
    </div>
  );
}

export default App;
