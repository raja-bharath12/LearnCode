// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Auth } from '../utils/auth';
import { showToast } from '../components/Toast';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [notSignedUp, setNotSignedUp]   = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent]   = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');

  const navigate = useNavigate();

  /* ── Login ────────────────────────────────────────────────── */
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setNotSignedUp(false);

    try {
      const data = await Auth.login(email, password);
      showToast('Welcome back! 🎉', 'success');
      const target = data.user.role === 'admin' ? '/admin-dashboard' : '/';
      setTimeout(() => navigate(target), 800);
    } catch (err) {
      const msg = err.message || '';
      const code = err.code || '';

      // Account doesn't exist at all → prompt to register
      if (
        code === 'auth/user-not-found' ||
        msg.includes('user-not-found') ||
        // Firebase v9+ wraps both user-not-found & wrong-password as invalid-credential
        // but we still try to show a helpful split message
        code === 'auth/invalid-credential' ||
        msg.includes('invalid-credential')
      ) {
        setNotSignedUp(true);
        setError('No account found with this email address.');
      } else if (code === 'auth/wrong-password' || msg.includes('wrong-password')) {
        setError('Incorrect password. Please try again.');
      } else if (msg.includes('too-many-requests')) {
        setError('Too many failed attempts. Please try again later or reset your password.');
      } else {
        const isOffline = ['Failed to fetch', 'NetworkError', 'Load failed'].some(
          m => msg.toLowerCase().includes(m.toLowerCase())
        );
        if (isOffline && email && password.length >= 6) {
          const user = {
            id: `demo_${Date.now()}`,
            name: email.split('@')[0],
            email,
            role: isAdminLogin ? 'admin' : 'student',
            token: 'demo_token',
          };
          Auth.setUser(user);
          showToast(`${isAdminLogin ? 'Admin' : 'Demo'} login — offline mode 🔌`, 'success');
          setTimeout(() => navigate(isAdminLogin ? '/admin-dashboard' : '/'), 800);
          setLoading(false);
          return;
        }
        setError(msg || 'Login failed. Please try again.');
      }
    }
    setLoading(false);
  }

  /* ── Forgot Password ──────────────────────────────────────── */
  async function handleResetPassword(e) {
    e.preventDefault();
    setResetLoading(true);
    setResetError('');
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      setResetSent(true);
      showToast('Reset email sent! Check your inbox 📬', 'success');
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('user-not-found')) {
        setResetError('No account found with this email address.');
      } else if (msg.includes('invalid-email')) {
        setResetError('Please enter a valid email address.');
      } else {
        setResetError('Failed to send reset email. Please try again.');
      }
    }
    setResetLoading(false);
  }

  /* ── Forgot Password Screen ───────────────────────────────── */
  if (showForgot) {
    return (
      <div className="auth-page premium-mesh-bg">
        <div className="auth-card dashboard-card animate-in" style={{ maxWidth: '450px', padding: '48px' }}>

          {/* Icon */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(99,102,241,0.12)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem' }}>
              🔑
            </div>
            <h1 style={{ fontWeight: 900, marginBottom: '8px' }}>Reset Password</h1>
            <p style={{ color: 'var(--text3)', fontSize: '0.95rem' }}>
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Success state */}
          {resetSent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>📬</div>
              <h3 style={{ fontWeight: 800, marginBottom: '12px', color: '#22c55e' }}>Email Sent!</h3>
              <p style={{ color: 'var(--text2)', marginBottom: '32px', lineHeight: '1.6' }}>
                We sent a password reset link to <strong>{resetEmail}</strong>. Check your inbox and spam folder.
              </p>
              <button
                onClick={() => { setShowForgot(false); setResetSent(false); setResetEmail(''); }}
                style={{ padding: '14px 32px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem' }}
              >
                ← Back to Login
              </button>
            </div>
          ) : (
            <>
              {/* Error */}
              {resetError && (
                <div style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', color: 'var(--red)', padding: '14px 16px', borderRadius: '12px', fontSize: '0.88rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚠️</span> {resetError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label style={{ color: 'var(--text2)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="auth-submit shimmer"
                  style={{ padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '1rem' }}
                >
                  {resetLoading ? 'Sending...' : '📧 Send Reset Link'}
                </button>
              </form>

              {/* Back to login */}
              <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); setShowForgot(false); setResetError(''); }}
                  style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  ← Back to Login
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── Login Screen ─────────────────────────────────────────── */
  return (
    <div className="auth-page premium-mesh-bg">
      <div className="auth-card dashboard-card animate-in" style={{ maxWidth: '450px', padding: '48px' }}>

        <div className="auth-icon-header animate-in" style={{ animationDelay: '0.1s', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--accent-light)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem' }}>
            {isAdminLogin ? '🔐' : '🚀'}
          </div>
        </div>

        <h1 className="text-glow animate-in" style={{ animationDelay: '0.2s', textAlign: 'center', marginBottom: '8px' }}>
          {isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
        </h1>
        <p className="animate-in" style={{ animationDelay: '0.3s', textAlign: 'center', color: 'var(--text3)', marginBottom: '32px' }}>
          {isAdminLogin ? 'Enter your credentials to manage the Forge.' : 'Pick up exactly where you left off.'}
        </p>

        {error && (
          <div className="animate-in" style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', color: 'var(--red)', padding: '16px', borderRadius: '12px', fontSize: '0.9rem', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: notSignedUp ? '14px' : 0 }}>
              <span>⚠️</span> {error}
            </div>
            {notSignedUp && (
              <div style={{ borderTop: '1px solid rgba(255,71,87,0.2)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>Don't have an account yet?</span>
                <button
                  onClick={() => navigate('/register', { state: { email } })}
                  style={{
                    background: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Create Free Account →
                </button>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleLogin} className="animate-in" style={{ animationDelay: '0.5s' }}>
          <div className="form-group">
            <label style={{ color: 'var(--text2)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
            <input
              type="email"
              placeholder="explorer@learncode.dev"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px' }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ color: 'var(--text2)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</label>
              <a
                href="#"
                onClick={e => { e.preventDefault(); setResetEmail(email); setShowForgot(true); setResetError(''); setResetSent(false); }}
                style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}
              >
                Forgot password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 48px 14px 18px', marginBottom: '32px', width: '100%', boxSizing: 'border-box' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{ position: 'absolute', right: '14px', top: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '0', color: 'var(--text3)', display: 'flex', alignItems: 'center' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit shimmer" disabled={loading} style={{ padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.5px' }}>
            {loading ? 'Authenticating...' : 'Enter the Forge →'}
          </button>
        </form>

        <div className="auth-switch animate-in" style={{ animationDelay: '0.6s', marginTop: '32px', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
          {isAdminLogin ? (
            <p style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>Regular student? <a href="#" onClick={e => { e.preventDefault(); setIsAdminLogin(false); }} style={{ color: 'var(--accent)', fontWeight: 800 }}>Student Login →</a></p>
          ) : (
            <p style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>New to LearnCode? <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 800 }}>Create Free Account →</Link></p>
          )}
        </div>

        {!isAdminLogin && (
          <div className="auth-switch animate-in" style={{ animationDelay: '0.7s', marginTop: '12px', opacity: 0.6, fontSize: '0.8rem', textAlign: 'center' }}>
            Are you an instructor? <a href="#" onClick={e => { e.preventDefault(); setIsAdminLogin(true); }}>Admin Portal →</a>
          </div>
        )}
      </div>
    </div>
  );
}
