import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          EventSystem
        </div>
        <div className="navbar-links">
          <a href="/">Pagrindinis</a>
          <a href="/events">Renginiai</a>
          <a href="/login">Prisijungti</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;