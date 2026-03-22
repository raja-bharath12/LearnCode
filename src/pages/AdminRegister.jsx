// src/pages/AdminRegister.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, API_BASE } from '../utils/auth';
import { showToast } from '../components/Toast';

export default function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'admin' })
      });
      const data = await res.json();
      if (res.ok) {
        Auth.setUser({ ...data.user, token: data.token });
        showToast('Admin account created! 🎉', 'success');
        setTimeout(() => navigate('/courses'), 800);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch {
      Auth.setUser({ name, email, role: 'admin' });
      showToast('Demo admin account created! 🎉', 'success');
      setTimeout(() => navigate('/courses'), 800);
    }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Admin Registration 🛡️</h1>
        <p>Register as an instructor or admin for LearnCode.</p>
        {error && (
          <div style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', color: 'var(--red)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '20px' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Instructor Name" required value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="admin@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Minimum 6 characters" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register as Admin'}
          </button>
        </form>
        <div className="auth-switch">
          Student? <Link to="/register">Register here →</Link>
        </div>
        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in →</Link>
        </div>
      </div>
    </div>
  );
}
