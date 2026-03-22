// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const active = (path) => location.pathname === path ? 'mini-link active' : 'mini-link';

  return (
    <aside className="side-nav-mini">
      <div className="nav-logo-mini">&lt;/&gt;</div>
      <div className="mini-nav-links">
        <Link to="/" className={active('/')} title="Home">🏠</Link>
        <Link to="/courses" className={active('/courses')} title="Courses">📚</Link>
        <Link to="/dashboard" className={active('/dashboard')} title="Dashboard">📊</Link>
        <Link to="/ide" className={active('/ide')} title="IDE">💻</Link>
      </div>
      <Link to="/profile" className={active('/profile')} title="Profile">👤</Link>
    </aside>
  );
}
