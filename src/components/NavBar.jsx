import React from 'react';
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="sidebar">
            <h1 className="nexdom">NEXDOM</h1>
            <h1 className="nav-links">
                <li><Link to="/">Tipo Produto</Link></li>
                <li><Link to="/produto">Produto</Link></li>
                <li><Link to="/fornecedor">Fornecedor</Link></li>
                <li><Link to="/compra">Compra</Link></li>
                <li><Link to="/venda">Venda</Link></li>
                <li><Link to="/transactions">Transacoes</Link></li>
            </h1>
        </div>
    )
}

export default NavBar;

