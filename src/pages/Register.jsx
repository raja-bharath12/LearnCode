// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, API_BASE } from '../utils/auth';
import { showToast } from '../components/Toast';

export default function Register() {
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
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        Auth.setUser({ ...data.user, token: data.token });
        showToast('Account created! ', 'success');
        setTimeout(() => navigate('/'), 800);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch {
      Auth.setUser({ name, email });
      showToast('Demo account created! ', 'success');
      setTimeout(() => navigate('/'), 800);
    }
    setLoading(false);
  }

  return (
    <div className="auth-page premium-mesh-bg">
      <div className="auth-card dashboard-card animate-in" style={{ maxWidth: '480px', padding: '48px' }}>
        <div className="auth-icon-header animate-in" style={{ animationDelay: '0.1s', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--accent-light)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem' }}>
            ✨
          </div>
        </div>
        <h1 className="text-glow animate-in" style={{ animationDelay: '0.2s', textAlign: 'center', marginBottom: '8px' }}>Create Account</h1>
        <p className="animate-in" style={{ animationDelay: '0.3s', textAlign: 'center', color: 'var(--text3)', marginBottom: '32px' }}>Join 10,000+ learners coding for free today. Access 50+ courses and certifications.</p>

        {error && (
          <div className="animate-in" style={{ animationDelay: '0.4s', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', color: 'var(--red)', padding: '16px', borderRadius: '12px', fontSize: '0.9rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="animate-in" style={{ animationDelay: '0.5s' }}>
          <div className="form-group">
            <label style={{ color: 'var(--text2)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={name} 
              onChange={e => setName(e.target.value)} 
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px' }}
            />
          </div>
          <div className="form-group">
            <label style={{ color: 'var(--text2)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px' }}
            />
          </div>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label style={{ color: 'var(--text2)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                minLength={6} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px' }}
              />
            </div>
            <div className="form-group">
              <label style={{ color: 'var(--text2)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Confirm</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={confirm} 
                onChange={e => setConfirm(e.target.value)} 
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px' }}
              />
            </div>
          </div>
          <button type="submit" className="auth-submit shimmer" disabled={loading} style={{ padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.5px', marginTop: '16px' }}>
            {loading ? 'Creating Account...' : 'Initialize Voyage →'}
          </button>
        </form>

        <div className="auth-switch animate-in" style={{ animationDelay: '0.6s', marginTop: '32px', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 800 }}>Sign in →</Link></p>
        </div>
      </div>
    </div>
  );
}
