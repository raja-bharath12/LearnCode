// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, API_BASE } from '../utils/auth';
import Header from '../components/Header';
import { showToast } from '../components/Toast';

function getStoredProfile() {
  try { return JSON.parse(localStorage.getItem('lc_profile') || '{}'); } catch { return {}; }
}
function saveProfileData(extra) {
  const existing = JSON.parse(localStorage.getItem('lc_profile') || '{}');
  localStorage.setItem('lc_profile', JSON.stringify({ ...existing, ...extra }));
}

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('settings');
  const [statusMsg, setStatusMsg] = useState({ msg: '', type: '' });
  const [saving, setSaving] = useState(false);

  // Form state
  const [sName, setSName] = useState('');
  const [sPhone, setSPhone] = useState('');
  const [sGender, setSGender] = useState('');
  const [sDob, setSDob] = useState('');
  const [sSkills, setSSkills] = useState('');
  const [sLinkedin, setSLinkedin] = useState('');
  const [sGithub, setSGithub] = useState('');

  // Display state
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const u = Auth.getUser();
    if (!u) { navigate('/login'); return; }
    setUser(u);
    const p = getStoredProfile();
    setProfile(p);
    setSName(u.name || '');
    setSPhone(p.phone || '');
    setSGender(p.gender || '');
    setSDob(p.dob || '');
    setSSkills(p.skills || '');
    setSLinkedin(p.linkedin || '');
    setSGithub(p.github || '');

    if (u.role === 'admin') {
      setActiveTab('settings');
    }
  }, []);

  function showStatus(msg, type) {
    setStatusMsg({ msg, type });
    setTimeout(() => setStatusMsg({ msg: '', type: '' }), 4000);
  }

  async function saveProfile(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const u = Auth.getUser();
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${u?.token || 'demo'}` },
        body: JSON.stringify({ name: sName })
      });
      const data = await res.json();
      if (res.ok) {
        Auth.setUser({ ...u, name: data.user.name });
      } else {
        Auth.setUser({ ...u, name: sName });
      }
    } catch {
      const u = Auth.getUser();
      Auth.setUser({ ...u, name: sName });
    }
    saveProfileData({ phone: sPhone, gender: sGender, dob: sDob });
    setProfile(prev => ({ ...prev, phone: sPhone, gender: sGender, dob: sDob }));
    setUser(prev => ({ ...prev, name: sName }));
    window.dispatchEvent(new CustomEvent('userUpdate'));
    showStatus(' Profile updated successfully!', 'success');
    setSaving(false);
  }


  function saveAdditional() {
    saveProfileData({ skills: sSkills, linkedin: sLinkedin, github: sGithub });
    setProfile(prev => ({ ...prev, skills: sSkills, linkedin: sLinkedin, github: sGithub }));
    showStatus(' Additional info saved!', 'success');
  }

  if (!user) return null;
  const initials = (user.name || 'LC').substring(0, 2).toUpperCase();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper profile-page">
        <Header showBrand />

        <div className="languages-banner profile-banner">
          <div className="languages-track">
            {Array(20).fill(user.name || 'User').map((name, i) => (
              <span key={i}>{name}</span>
            ))}
          </div>
        </div>

        <div className="container profile-body">
          {/* LEFT COLUMN */}
          <div className="profile-left">
            <div className="profile-avatar-card">
              <div className="profile-avatar-wrap">{initials}</div>
              <div className="profile-name">{user.name || 'User'}</div>
              <div className="profile-status-badge">Published</div>
              <div className="profile-divider"></div>
            </div>

            <div className="profile-info-section">
              <div className="info-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Personal Information</h4>
              </div>
              {[
                ['Name', user.name],
                ['Registration No.', profile.regno || user?._id?.substring(0, 16) || '—'],
                ['Email', user.email],
                ['Phone', profile.phone || '—'],
                ['Gender', profile.gender || '—'],
                ['Date of Birth', profile.dob || '—'],
                ['Tag', profile.tag || '—'],
              ].map(([key, val]) => (
                <div key={key} className="info-row">
                  <span className="info-key">{key}</span>
                  <span className="info-val">{val || '—'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="profile-right">
            <div className="profile-tabs">
              <button className={`profile-tab${activeTab === 'settings' ? ' active' : ''}`} onClick={() => setActiveTab('settings')}>Account Settings</button>
            </div>


            {/* SETTINGS PANEL */}
            {activeTab === 'settings' && (
              <div className="profile-panel active">

                {statusMsg.msg && (
                  <div style={{
                    display: 'block',
                    background: statusMsg.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                    border: `1px solid ${statusMsg.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    color: statusMsg.type === 'success' ? 'var(--green)' : 'var(--red)',
                    fontWeight: 600, padding: '12px 16px', borderRadius: '8px', margin: '0 24px 16px'
                  }}>
                    {statusMsg.msg}
                  </div>
                )}

                {/* Profile Info */}
                <div className="settings-section">
                  <h4>Profile Information</h4>
                  <form onSubmit={saveProfile}>
                    <div className="setting-row">
                      <label className="setting-label">Full Name</label>
                      <input className="setting-input" type="text" value={sName} onChange={e => setSName(e.target.value)} placeholder="Your full name" />
                    </div>
                    <div className="setting-row">
                      <label className="setting-label">Email Address</label>
                      <input className="setting-input" type="email" value={user.email || ''} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                    </div>
                    <div className="setting-row">
                      <label className="setting-label">Phone</label>
                      <input className="setting-input" type="text" value={sPhone} onChange={e => setSPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="setting-row">
                      <label className="setting-label">Gender</label>
                      <select className="setting-input" value={sGender} onChange={e => setSGender(e.target.value)}>
                        <option value="">Select</option>
                        <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                      </select>
                    </div>
                    <div className="setting-row">
                      <label className="setting-label">Date of Birth</label>
                      <input className="setting-input" type="date" value={sDob} onChange={e => setSDob(e.target.value)} />
                    </div>
                     <button type="submit" className="save-btn" disabled={saving} style={{ background: 'var(--accent)', color: 'white', padding: '14px 28px', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', width: '100%', marginTop: '12px', boxShadow: '0 10px 20px rgba(44,88,255,0.2)' }}>
                      {saving ? 'Saving Changes...' : 'Save Profile Changes'}
                    </button>
                  </form>
                </div>


                {/* Additional Info */}
                <div className="settings-section">
                  <h4>Additional Info</h4>
                  <div className="setting-row"><label className="setting-label">Skills</label><input className="setting-input" type="text" value={sSkills} onChange={e => setSSkills(e.target.value)} placeholder="Python, JavaScript, …" /></div>
                  <div className="setting-row"><label className="setting-label">LinkedIn</label><input className="setting-input" type="url" value={sLinkedin} onChange={e => setSLinkedin(e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
                  <div className="setting-row"><label className="setting-label">GitHub</label><input className="setting-input" type="url" value={sGithub} onChange={e => setSGithub(e.target.value)} placeholder="https://github.com/…" /></div>
                   <button className="save-btn" onClick={saveAdditional} style={{ background: 'var(--accent)', color: 'white', padding: '14px 28px', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', width: '100%', marginTop: '12px', boxShadow: '0 10px 20px rgba(44,88,255,0.2)' }}>
                    Save Additional Info
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
