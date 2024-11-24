import './header.css';
import VeresLogo from '../../../images/Veres.jpg';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <img src={VeresLogo} alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Catalog</Link></li>
                    <li><Link to="/CartPage">Cart</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
