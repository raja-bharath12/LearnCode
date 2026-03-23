// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const active = (path) => location.pathname === path ? 'mini-link active' : 'mini-link';

  return (
    <aside className="side-nav-mini">
      <div className="nav-logo-mini">&lt;/&gt;</div>
      <div className="mini-nav-links" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
        <Link to="/" className={active('/')} title="Home" style={{ padding: '12px', borderRadius: '12px', color: 'var(--text3)', transition: 'all 0.3s' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
        <Link to="/courses" className={active('/courses')} title="Courses" style={{ padding: '12px', borderRadius: '12px', color: 'var(--text3)', transition: 'all 0.3s' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </Link>
        <Link to="/profile" className={active('/profile')} title="Profile" style={{ padding: '12px', borderRadius: '12px', color: 'var(--text3)', transition: 'all 0.3s' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </Link>
        <a href="https://www.onlinegdb.com/online_c_compiler" className="mini-link" target="_blank" rel="noopener noreferrer" title="IDE" style={{ padding: '12px', borderRadius: '12px', color: 'var(--text3)', transition: 'all 0.3s' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        </a>
      </div>
      <Link to="/profile" className="mini-link" style={{ marginTop: 'auto', marginBottom: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--accent), #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.8rem' }}>R</div>
      </Link>
    </aside>
  );
}
