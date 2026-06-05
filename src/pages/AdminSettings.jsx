// src/pages/AdminSettings.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Auth } from '../utils/auth';
import { showToast } from '../components/Toast';

const SETTINGS_KEY = 'lc_academy_settings';

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
      pointsPerLesson: 50,
      streakMultiplier: 1.5,
      enableLeaderboard: true,
      issueCertificates: true,
      allowRegistrations: true,
      requireEmailVerification: false,
      maintenanceMode: false,
      maxStudentsPerCourse: 500,
      defaultLanguage: 'en',
    };
  } catch { return {}; }
}

export default function AdminSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const u = Auth.getUser();
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);
    setSettings(getSettings());
  }, []);

  function handleChange(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      setSaving(false);
      showToast('Settings saved!', 'success');
    }, 600);
  }

  if (!user) return null;

  const sections = [
    {
      title: '🏆 Gamification & Rewards',
      icon: '🏆',
      fields: [
        { key: 'pointsPerLesson', label: 'Points Per Lesson', type: 'number', placeholder: '50' },
        { key: 'streakMultiplier', label: 'Streak Multiplier', type: 'number', placeholder: '1.5' },
      ],
      toggles: [
        { key: 'enableLeaderboard', label: 'Enable Leaderboards', desc: 'Allow students to see global rankings' },
        { key: 'issueCertificates', label: 'Auto-Issue Certificates', desc: 'Generate certificates upon course completion' },
      ]
    },
    {
      title: '🔐 Access Control',
      icon: '🔐',
      toggles: [
        { key: 'allowRegistrations', label: 'Allow New Registrations', desc: 'Students can sign up for new accounts' },
        { key: 'requireEmailVerification', label: 'Require Email Verification', desc: 'Users must verify email before logging in' },
        { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Temporarily disable the platform for students', danger: true },
      ],
    },
    {
      title: '⚙️ Platform Config',
      icon: '⚙️',
      fields: [
        { key: 'maxStudentsPerCourse', label: 'Max Students Per Course', type: 'number', placeholder: '500' },
        { key: 'defaultLanguage', label: 'Default Language', type: 'select', options: ['en', 'es', 'fr', 'de', 'hi'] },
      ],
    },
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <span className="section-tag">Configuration</span>
            <h1 className="text-glow">⚙️ Academy <span className="gradient-text">Settings</span></h1>
            <p style={{ maxWidth: '600px' }}>Configure your academy's behaviour, branding, and access policies.</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '40px', maxWidth: '900px' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {sections.map((section, si) => (
              <div key={si} className="animate-in dashboard-card" style={{ padding: '36px', animationDelay: `${si * 0.1}s` }}>
                <h3 style={{ marginBottom: '28px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                  {section.title}
                </h3>

                {section.fields && section.fields.map(field => (
                  <div key={field.key} style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        value={settings[field.key] || ''}
                        onChange={e => handleChange(field.key, e.target.value)}
                        style={{ flex: 1, padding: '13px 18px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)', fontSize: '0.95rem', outline: 'none' }}
                      >
                        {field.options.map(opt => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={settings[field.key] || ''}
                        onChange={e => handleChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                        placeholder={field.placeholder}
                        style={{ flex: 1, padding: '13px 18px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)', fontSize: '0.95rem', outline: 'none' }}
                      />
                    )}
                  </div>
                ))}

                {section.toggles && section.toggles.map(tog => (
                  <div key={tog.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <p style={{ fontWeight: 800, margin: '0 0 4px', color: tog.danger ? '#ef4444' : 'var(--text)' }}>{tog.label}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text3)', margin: 0 }}>{tog.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleChange(tog.key, !settings[tog.key])}
                      style={{
                        width: '52px', height: '28px', borderRadius: '100px', border: 'none',
                        background: settings[tog.key] ? (tog.danger ? '#ef4444' : 'var(--accent)') : 'var(--border)',
                        position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease', flexShrink: 0,
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: '4px',
                        left: settings[tog.key] ? '28px' : '4px',
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: 'white', transition: 'left 0.3s ease',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            ))}

            <button
              type="submit"
              disabled={saving}
              style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '16px', padding: '18px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(44,88,255,0.3)', transition: 'all 0.2s ease' }}
            >
              {saving ? '💾 Saving...' : '💾 Save All Settings'}
            </button>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
}
