import './header.css';
import VeresLogo from '../../../images/Veres.jpg';

function Header() {
    return (
        <header className="header">
            <img src={VeresLogo} alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Catalog</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
