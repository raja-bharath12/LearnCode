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
  const [activeTab, setActiveTab] = useState('academic');
  const [statusMsg, setStatusMsg] = useState({ msg: '', type: '' });
  const [saving, setSaving] = useState(false);

  // Form state
  const [sName, setSName] = useState('');
  const [sPhone, setSPhone] = useState('');
  const [sGender, setSGender] = useState('');
  const [sDob, setSDob] = useState('');
  const [s10th, setS10th] = useState('');
  const [s12th, setS12th] = useState('');
  const [sBacklogs, setSBacklogs] = useState('');
  const [sCurrBacklogs, setSCurrBacklogs] = useState('');
  const [sPlacement, setSPlacement] = useState('');
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
    setS10th(p.tenth || '');
    setS12th(p.twelfth || '');
    setSBacklogs(p.backlogs || '');
    setSCurrBacklogs(p.currBacklogs || '');
    setSPlacement(p.placement || '');
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
    showStatus('✅ Profile updated successfully!', 'success');
    setSaving(false);
  }

  function saveAcademic() {
    saveProfileData({ tenth: s10th, twelfth: s12th, backlogs: sBacklogs, currBacklogs: sCurrBacklogs, placement: sPlacement });
    setProfile(prev => ({ ...prev, tenth: s10th, twelfth: s12th, backlogs: sBacklogs, currBacklogs: sCurrBacklogs, placement: sPlacement }));
    showStatus('✅ Academic info saved!', 'success');
  }

  function saveAdditional() {
    saveProfileData({ skills: sSkills, linkedin: sLinkedin, github: sGithub });
    setProfile(prev => ({ ...prev, skills: sSkills, linkedin: sLinkedin, github: sGithub }));
    showStatus('✅ Additional info saved!', 'success');
  }

  if (!user) return null;
  const initials = (user.name || 'LC').substring(0, 2).toUpperCase();
  const isAdmin = user.role === 'admin';

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper profile-page">
        <Header showBrand />

        <div className="profile-cover"></div>

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
              <div className="info-section-header">
                <h4>Personal Information</h4>
                <a className="edit-link" onClick={() => setActiveTab('settings')} title="Edit profile">✏️ Edit</a>
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
              {!isAdmin && (
                <button className={`profile-tab${activeTab === 'academic' ? ' active' : ''}`} onClick={() => setActiveTab('academic')}>Academic Information</button>
              )}
              <button className={`profile-tab${activeTab === 'settings' ? ' active' : ''}`} onClick={() => setActiveTab('settings')}>Account Settings</button>
            </div>

            {/* ACADEMIC PANEL */}
            {!isAdmin && activeTab === 'academic' && (
              <div className="profile-panel active">
                <div className="panel-header">
                  <h3>Academic Information</h3>
                  <a className="edit-link" onClick={() => setActiveTab('settings')}>✏️ Edit</a>
                </div>
                <table className="info-table">
                  <thead><tr><th>Information</th><th>Details</th></tr></thead>
                  <tbody>
                    {[
                      ['10th *', profile.tenth || '—'],
                      ['12th', profile.twelfth || '—'],
                      ['Diploma', 'Not Applicable'],
                      ['Under Graduate', 'Not Applicable'],
                      ['Backlogs History *', profile.backlogs || '—'],
                      ['Current Backlogs *', profile.currBacklogs || '—'],
                      ['Interested in Placement *', profile.placement || '—'],
                      ['Active Courses', profile.activeCourses || '—'],
                      ['Completed Courses', profile.completedCourses || '—'],
                    ].map(([info, detail]) => (
                      <tr key={info}><td>{info}</td><td className={detail === 'Not Applicable' ? 'na-text' : ''}>{detail}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SETTINGS PANEL */}
            {activeTab === 'settings' && (
              <div className="profile-panel active">
                <div className="panel-header"><h3>Account Settings</h3></div>

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
                    <button type="submit" className="save-btn" disabled={saving}>{saving ? 'Saving…' : '💾 Save Changes'}</button>
                  </form>
                </div>

                {/* Academic Details */}
                {!isAdmin && (
                  <div className="settings-section">
                    <h4>Academic Details</h4>
                    <div className="setting-row"><label className="setting-label">10th %</label><input className="setting-input" type="text" value={s10th} onChange={e => setS10th(e.target.value)} placeholder="e.g. 87%" /></div>
                    <div className="setting-row"><label className="setting-label">12th %</label><input className="setting-input" type="text" value={s12th} onChange={e => setS12th(e.target.value)} placeholder="e.g. 92%" /></div>
                    <div className="setting-row">
                      <label className="setting-label">Backlogs History</label>
                      <select className="setting-input" value={sBacklogs} onChange={e => setSBacklogs(e.target.value)}>
                        <option value="">Select</option><option>No</option><option>Yes</option>
                      </select>
                    </div>
                    <div className="setting-row"><label className="setting-label">Current Backlogs</label><input className="setting-input" type="number" value={sCurrBacklogs} onChange={e => setSCurrBacklogs(e.target.value)} placeholder="0" min="0" /></div>
                    <div className="setting-row">
                      <label className="setting-label">Interested in Placement</label>
                      <select className="setting-input" value={sPlacement} onChange={e => setSPlacement(e.target.value)}>
                        <option value="">Select</option><option>Yes</option><option>No</option>
                      </select>
                    </div>
                    <button className="save-btn" onClick={saveAcademic}>💾 Save Academic Info</button>
                  </div>
                )}

                {/* Additional Info */}
                <div className="settings-section">
                  <h4>Additional Info</h4>
                  <div className="setting-row"><label className="setting-label">Skills</label><input className="setting-input" type="text" value={sSkills} onChange={e => setSSkills(e.target.value)} placeholder="Python, JavaScript, …" /></div>
                  <div className="setting-row"><label className="setting-label">LinkedIn</label><input className="setting-input" type="url" value={sLinkedin} onChange={e => setSLinkedin(e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
                  <div className="setting-row"><label className="setting-label">GitHub</label><input className="setting-input" type="url" value={sGithub} onChange={e => setSGithub(e.target.value)} placeholder="https://github.com/…" /></div>
                  <button className="save-btn" onClick={saveAdditional}>💾 Save Additional Info</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
