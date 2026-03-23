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
          <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme" style={{ background: 'transparent', border: 'none', color: 'var(--text2)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}>
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
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
