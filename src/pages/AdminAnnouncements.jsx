// src/pages/AdminAnnouncements.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Auth } from '../utils/auth';
import { showToast } from '../components/Toast';
import {
  collection, addDoc, getDocs, deleteDoc, doc,
  serverTimestamp, orderBy, query,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const STORAGE_KEY = 'lc_announcements';

function getAnnouncements() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}

export default function AdminAnnouncements() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('info');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const u = Auth.getUser();
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);

    // Load from Firestore first, fallback to localStorage
    async function load() {
      try {
        const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const items = snap.docs.map(d => ({ ...d.data(), firestoreId: d.id }));
        if (items.length > 0) {
          setAnnouncements(items);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
          return;
        }
      } catch (e) {
        console.warn('Firestore load failed, using localStorage:', e.message);
      }
      setAnnouncements(getAnnouncements());
    }
    load();
  }, []);

  async function handlePost(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setSubmitting(true);
    const newAnn = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
      type,
      author: user.name || 'Admin',
      authorId: user.id,
      createdAt: new Date().toISOString(),
    };

    // Save to Firestore
    try {
      const ref = await addDoc(collection(db, 'announcements'), {
        ...newAnn,
        createdAt: serverTimestamp(),
      });
      newAnn.firestoreId = ref.id;
    } catch (e) {
      console.warn('Firestore announcement save failed:', e.message);
    }

    const updated = [newAnn, ...announcements];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setAnnouncements(updated);
    setTitle('');
    setBody('');
    setType('info');
    setSubmitting(false);
    showToast('📢 Announcement posted!', 'success');
  }

  async function deleteAnn(id) {
    const ann = announcements.find(a => a.id === id);
    // Delete from Firestore
    if (ann?.firestoreId) {
      try {
        await deleteDoc(doc(db, 'announcements', ann.firestoreId));
      } catch (e) {
        console.warn('Firestore delete failed:', e.message);
      }
    }
    const updated = announcements.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setAnnouncements(updated);
    showToast('Announcement removed', 'success');
  }

  const typeColors = {
    info:    { bg: 'rgba(44,88,255,0.1)',  border: 'rgba(44,88,255,0.3)',  color: '#2c58ff', label: '📢 Info' },
    success: { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  color: '#22c55e', label: '✅ Success' },
    warning: { bg: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.3)',  color: '#eab308', label: '⚠️ Warning' },
    urgent:  { bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)',  color: '#ef4444', label: '🚨 Urgent' },
  };

  if (!user) return null;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <span className="section-tag">Communication</span>
            <h1 className="text-glow">📢 Post <span className="gradient-text">Announcement</span></h1>
            <p style={{ maxWidth: '600px' }}>Broadcast messages to all students on the platform.</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '40px' }}>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>

            {/* COMPOSE FORM */}
            <div className="animate-in dashboard-card" style={{ flex: '1', minWidth: '340px', padding: '36px' }}>
              <h3 style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>✍️</span> Compose Announcement
              </h3>
              <form onSubmit={handlePost} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', marginBottom: '8px' }}>Title</label>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. New Course Released!"
                    required
                    style={{ width: '100%', padding: '14px 18px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', marginBottom: '8px' }}>Message</label>
                  <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Write your announcement..."
                    required
                    rows={5}
                    style={{ width: '100%', padding: '14px 18px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)', fontSize: '0.95rem', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-body)', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', marginBottom: '8px' }}>Type</label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {Object.entries(typeColors).map(([key, val]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setType(key)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '100px',
                          border: `1px solid ${type === key ? val.color : 'var(--border)'}`,
                          background: type === key ? val.bg : 'var(--surface2)',
                          color: type === key ? val.color : 'var(--text2)',
                          fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >{val.label}</button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '14px', padding: '16px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', marginTop: '8px', boxShadow: '0 8px 20px rgba(44,88,255,0.3)', transition: 'all 0.2s ease' }}
                >
                  {submitting ? 'Posting...' : '📢 Post Announcement'}
                </button>
              </form>
            </div>

            {/* FEED */}
            <div className="animate-in" style={{ flex: '1.2', minWidth: '340px', animationDelay: '0.1s' }}>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📋</span> Posted Announcements
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', background: 'var(--accent-light)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '100px', fontWeight: 800 }}>
                  {announcements.length} total
                </span>
              </h3>

              {announcements.length === 0 ? (
                <div className="dashboard-card" style={{ textAlign: 'center', padding: '60px 32px', color: 'var(--text3)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
                  <p style={{ fontWeight: 600 }}>No announcements yet. Post one!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {announcements.map(ann => {
                    const t = typeColors[ann.type] || typeColors.info;
                    return (
                      <div key={ann.id} className="dashboard-card" style={{ padding: '24px', border: `1px solid ${t.border}`, background: t.bg }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: t.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{t.label}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>by {ann.author} · {new Date(ann.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 style={{ fontWeight: 900, marginBottom: '8px', color: 'var(--text)' }}>{ann.title}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: '1.6', margin: 0 }}>{ann.body}</p>
                          </div>
                          <button onClick={() => deleteAnn(ann.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
