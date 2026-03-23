// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';

import { Auth } from '../utils/auth';

export default function Sidebar() {
  const location = useLocation();
  const active = (path) => location.pathname === path ? 'mini-link active' : 'mini-link';
  
  const user = Auth.getUser();
  const initials = (user?.name || 'U').charAt(0).toUpperCase();

  return (
    <aside className="side-nav-mini">
      <div className="nav-logo-mini">&lt;/&gt;</div>
      <div className="mini-nav-links">
        <Link to="/" className={active('/')} title="Home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
        <Link to="/courses" className={active('/courses')} title="Courses">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </Link>
        <Link to="/dashboard" className={active('/dashboard')} title="Dashboard">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        </Link>
        <Link to="/exams" className={active('/exams')} title="Exams">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14l2 2 4-4"></path></svg>
        </Link>
        <a href="https://www.onlinegdb.com/online_c_compiler" className="mini-link" target="_blank" rel="noopener noreferrer" title="IDE">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        </a>
      </div>
      <Link to="/profile" className={`mini-avatar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
        <div className="avatar-mini-circle">{initials}</div>
      </Link>
    </aside>
  );
}
