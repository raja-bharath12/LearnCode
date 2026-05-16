// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from '../utils/auth';
import { showToast } from '../components/Toast';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  // Pre-fill email if coming from login page (user not registered)
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState(location.state?.email || '');
  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [error, setError]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError('');

    try {
      await Auth.register(name, email, password);
      showToast('Account created! 🎉', 'success');
      setTimeout(() => navigate('/'), 800);
    } catch (err) {
      const msg = err.message || '';

      // Friendly Firebase error messages
      if (msg.includes('email-already-in-use')) {
        setError('This email is already registered. Please sign in instead.');
        setLoading(false);
        return;
      }
      if (msg.includes('weak-password')) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
      if (msg.includes('invalid-email')) {
        setError('Please enter a valid email address.');
        setLoading(false);
        return;
      }

      // Demo fallback if offline
      const isOffline = ['Failed to fetch','NetworkError','Load failed'].some(
        m => msg.toLowerCase().includes(m.toLowerCase())
      );
      if (isOffline) {
        Auth.setUser({ id: `demo_${Date.now()}`, name, email, role: 'student', token: 'demo_token' });
        showToast('Demo account created — offline mode 🔌', 'success');
        setTimeout(() => navigate('/'), 800);
        setLoading(false);
        return;
      }

      setError(msg || 'Registration failed. Please try again.');
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
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 42px 14px 18px', width: '100%', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: '12px', top: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text3)', display: 'flex', alignItems: 'center' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label style={{ color: 'var(--text2)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Confirm</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 42px 14px 18px', width: '100%', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  style={{ position: 'absolute', right: '12px', top: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text3)', display: 'flex', alignItems: 'center' }}
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirm ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
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
