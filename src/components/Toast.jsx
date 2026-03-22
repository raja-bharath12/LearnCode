// src/components/Toast.jsx
import { useState, useEffect } from 'react';

let _showToast = null;

export function showToast(msg, type = 'info') {
  if (_showToast) _showToast(msg, type);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    _showToast = (msg, type) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, msg, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };
    return () => { _showToast = null; };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === 'success' ? '#00ff88' : t.type === 'error' ? '#ff4757' : '#00e5ff',
          color: '#080b14',
          padding: '14px 24px',
          borderRadius: '12px',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.88rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          animation: 'slideIn 0.3s ease'
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
