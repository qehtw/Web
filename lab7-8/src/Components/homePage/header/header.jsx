import './header.css';
import '../../../images/Veres.jpg'

function Header(){
    return(
        <header className="header">
        <img src={require('../../../images/Veres.jpg')} alt="Company Logo" className="logo" />
         <nav>
             <ul>
                 <li><a href="/">Home</a></li>
                 <li><a href="/about">Item</a></li>
                 <li><a href="/services">Catalog</a></li>
                 <li><a href="/contact">Contact Us</a></li>
             </ul>
         </nav>
     </header>
    );
}

export default Header
