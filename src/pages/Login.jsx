// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, API_BASE } from '../utils/auth';
import { showToast } from '../components/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        Auth.setUser({ ...data.user, token: data.token });
        showToast('Welcome back! 🎉', 'success');
        setTimeout(() => navigate('/courses'), 800);
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      // Demo mode
      if (email && password.length >= 6) {
        const user = { 
          name: email.split('@')[0], 
          email, 
          role: isAdminLogin ? 'admin' : 'student' 
        };
        Auth.setUser(user);
        showToast(`${isAdminLogin ? 'Admin' : 'Demo'} login successful! 🎉`, 'success');
        setTimeout(() => navigate('/dashboard'), 800);
      } else {
        setError('Backend not running. Use a valid email and 6+ char password for demo.');
      }
    }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{isAdminLogin ? 'Admin Login' : 'Welcome back 👋'}</h1>
        <p>{isAdminLogin ? 'Sign in to access the instructor dashboard.' : 'Sign in to continue your learning journey.'}</p>
        {error && (
          <div style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', color: 'var(--red)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '20px' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-switch">
          {isAdminLogin ? (
            <>Regular student? <a href="#" onClick={(e) => { e.preventDefault(); setIsAdminLogin(false); }}>Student Login →</a></>
          ) : (
            <>Don't have an account? <Link to="/register">Create one free →</Link></>
          )}
        </div>
        {!isAdminLogin && (
          <div className="auth-switch" style={{ marginTop: '10px', opacity: 0.7, fontSize: '0.8rem' }}>
            Are you an instructor? <a href="#" onClick={(e) => { e.preventDefault(); setIsAdminLogin(true); }}>Admin Login →</a>
          </div>
        )}
      </div>
    </div>
  );
}
