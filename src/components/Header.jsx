import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../utils/auth';

export default function Header({ showSearch = false, showBrand = false }) {
  const [user, setUser] = useState(Auth.getUser());
  const [theme, setTheme] = useState(localStorage.getItem('lc_theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    const handleUpdate = () => {
      setUser(Auth.getUser());
    };
    window.addEventListener('userUpdate', handleUpdate);
    return () => window.removeEventListener('userUpdate', handleUpdate);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('lc_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    Auth.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="top-header">
      <div className="container header-container">
        {showBrand && <Link to="/" className="header-brand">LearnCode</Link>}
        {showSearch && (
          <div className="search-bar">
            <span></span>
            <input type="text" placeholder="Search courses..." />
          </div>
        )}
        <div className="top-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme">
            {theme === 'light' ? '' : '️'}
          </button>
          {user ? (
            <button onClick={handleLogout} className="logout-btn-header">Logout</button>
          ) : (
            <Link to="/login" className="login-btn-header">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
