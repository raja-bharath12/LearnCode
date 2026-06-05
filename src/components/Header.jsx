import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from '../utils/auth';

export default function Header({ showSearch = false, showBrand = false }) {
  const [user, setUser] = useState(Auth.getUser());
  const [theme, setTheme] = useState(localStorage.getItem('lc_theme') || 'light');
  const [isInstallable, setIsInstallable] = useState(!!window.deferredPrompt);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    // Check if running in standalone PWA mode
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      setIsStandalone(!!standalone);
    };
    checkStandalone();

    // Listen for PWA availability
    const handleInstallable = () => {
      setIsInstallable(true);
    };
    window.addEventListener('pwa-installable', handleInstallable);

    // Watch for standalone display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e) => {
      setIsStandalone(e.matches);
    };
    
    // Support older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = async () => {
    await Auth.logout(navigate);
    setUser(null);
  };

  const handleInstallClick = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      const { outcome } = await window.deferredPrompt.userChoice;
      console.log(`User choice outcome: ${outcome}`);
      if (outcome === 'accepted') {
        window.deferredPrompt = null;
        setIsInstallable(false);
      }
    } else {
      // Fallback instruction modal for iOS/Firefox/already prompt resolved
      setShowModal(true);
    }
  };

  return (
    <header className="top-header">
      <div className="header-container">
        {showBrand && <Link to="/" className="header-brand">LearnCode</Link>}
        {showSearch && (
          <div className="search-bar">
            <span></span>
            <input type="text" placeholder="Search courses..." />
          </div>
        )}
        <div className="top-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme">
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>
          {!isStandalone && (
            <button onClick={handleInstallClick} className="theme-toggle-btn" title="Download & Install App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          )}
          {user ? (
            <button onClick={handleLogout} className="logout-btn-header">Logout</button>
          ) : (
            <Link to="/login" className="login-btn-header">Login</Link>
          )}
        </div>
      </div>

      {showModal && (
        <div className="pwa-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pwa-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pwa-modal-header">
              <h3>Install LearnCode App</h3>
              <button className="pwa-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="pwa-modal-body">
              <p>Install LearnCode directly onto your home screen or desktop for quick access and a standalone app experience.</p>
              
              <div className="pwa-instruction-step" style={{ marginTop: '20px', padding: '16px', background: 'var(--surface2)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
                <strong style={{ display: 'block', marginBottom: '12px', fontSize: '1.1rem' }}>Android Devices</strong>
                <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text2)' }}>Download and install the native Android APK directly to your device.</p>
                <a href="/learncode.apk" download className="btn-primary shimmer" style={{ display: 'inline-flex', padding: '12px 24px', textDecoration: 'none' }}>
                  Download Android APK
                </a>
              </div>

              <div className="pwa-instruction-step" style={{ marginTop: '20px' }}>
                <strong>Desktop (Chrome / Edge / Brave)</strong>
                <span>Click the install icon (➕ or 🖥️) at the right end of the address bar.</span>
              </div>
              
              <div className="pwa-instruction-step">
                <strong>iOS Safari (iPhone / iPad)</strong>
                <span>
                  1. Tap the Share button (📤) at the bottom.<br />
                  2. Select "Add to Home Screen" (➕) from the list.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
