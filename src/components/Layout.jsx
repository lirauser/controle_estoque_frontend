import React from 'react';
import MenuLateral from './MenuLateral';

const Layout = ({children}) => {
    return(
        <div className="layout">
            <MenuLateral />
            <div className="main-content">
                {children}
            </div>
        </div>
    )
}

export default Layout;