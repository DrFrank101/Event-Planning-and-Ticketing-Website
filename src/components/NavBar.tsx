import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          EventSystem
        </div>
        <div className="navbar-links">
          <Link to="/">Pagrindinis</Link>
          <Link to="/All">Visi</Link>
          <Link to="/Concerts">Koncertai</Link>
          <Link to="/Sports">Sportas</Link>
          <Link to="/Festivals">Festivaliai</Link>
          <Link to="/Theatre">Tetras</Link>  {/* Changed from Teather to Theatre */}
          <Link to="/Login">Prisijungti/Prisiregistruoti</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;