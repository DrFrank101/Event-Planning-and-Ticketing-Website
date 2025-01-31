import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
  role_id: number;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status whenever localStorage changes
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    // Initial check
    checkLoginStatus();

    // Add event listener for localStorage changes
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/';
  };

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
          <Link to="/Theatre">Tetras</Link>
          {isLoggedIn && user ? (
            <div className="profile-dropdown">
              <button className="profile-button">
                {user.username} ▼
              </button>
              <div className="dropdown-content">
                <Link to="/profile">Mano Profilis</Link>
                <Link to="/my-tickets">Mano Bilietai</Link>
                <button onClick={handleLogout}>Atsijungti</button>
              </div>
            </div>
          ) : (
            <Link to="/login">Prisijungti/Prisiregistruoti</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;