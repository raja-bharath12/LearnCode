// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, Progress, fetchCourses } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const u = Auth.getUser();
    if (!u) { navigate('/login'); return; }
    setUser(u);

    // Initial sync
    Progress.syncAll();

    fetchCourses().then(data => {
      if (data?.courses) setCourses(data.courses);
    });
  }, []);

  if (!user) return null;

  const completedCourses = courses.filter(c => Progress.getPercent(c.id, c.lessons) === 100);
  const ongoingCourses = courses.filter(c => {
    const p = Progress.getPercent(c.id, c.lessons);
    return p > 0 && p < 100;
  });

  const stats = [
    { label: 'Completed', value: completedCourses.length, icon: '🏆', color: '#22c55e' },
    { label: 'Ongoing', value: ongoingCourses.length, icon: '⚡', color: '#eab308' },
    { label: 'Exams Ready', value: completedCourses.length, icon: '🎯', color: '#8b5cf6' },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header dashboard-header animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <span className="section-tag">{getGreeting()}</span>
                <h1 style={{ margin: '8px 0' }}>Welcome Back, <span className="gradient-text">{user.name || 'Explorer'}!</span></h1>
                <p style={{ margin: 0 }}>You're making great progress. Keep it up!</p>
              </div>
              <div className="streak-badge">
                <span>🔥</span> 7 Day Streak!
              </div>
            </div>
          </div>
        </div>

        <div className="container dashboard-body" style={{ paddingBottom: '60px' }}>
          {/* STATS GRID */}
          <div className="stats-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px', 
            marginBottom: '48px' 
          }}>
            {stats.map((s, idx) => (
              <div key={s.label} className="dashboard-card animate-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="stat-card-inner">
                  <div className="stat-icon-wrapper" style={{ background: `${s.color}15`, color: s.color }}>
                    {s.icon}
                  </div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '4px' }}>{s.value}</h2>
                  <p style={{ color: 'var(--text3)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {/* PROGRESS LIST */}
            <div className="animate-in" style={{ flex: '2', minWidth: '350px', animationDelay: '0.3s' }}>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🚀</span> Recent Continuity
              </h3>
              <div className="gradient-border-card" style={{ padding: '32px' }}>
                {ongoingCourses.length > 0 ? (
                  ongoingCourses.map(c => {
                    const p = Progress.getPercent(c.id, c.lessons);
                    return (
                      <div key={c.id} style={{ marginBottom: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{c.title}</span>
                          <span style={{ color: 'var(--accent)', fontWeight: 900 }}>{p}%</span>
                        </div>
                        <div className="progress-bar" style={{ height: '12px', background: 'var(--surface2)', borderRadius: '20px', overflow: 'hidden' }}>
                          <div className="progress-fill" style={{ 
                            width: `${p}%`, 
                            background: 'linear-gradient(90deg, var(--accent), #7c3aed)',
                            boxShadow: '0 0 10px rgba(44, 88, 255, 0.3)'
                          }}></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: 'var(--text3)', textAlign: 'center', padding: '40px' }}>No active courses. Ready for a new challenge?</p>
                )}
              </div>

              {completedCourses.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                  <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>✅</span> Achievement Box
                  </h3>
                  <div className="dashboard-card">
                    {completedCourses.map(c => (
                      <div key={c.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginBottom: '16px', 
                        padding: '16px', 
                        background: 'var(--accent-light)', 
                        borderRadius: '16px',
                        border: '1px solid var(--border)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                            🏆
                          </div>
                          <span style={{ fontWeight: 800 }}>{c.title}</span>
                        </div>
                        <span style={{ 
                          color: 'var(--green)', 
                          fontWeight: 900, 
                          fontSize: '0.7rem', 
                          background: 'white', 
                          padding: '6px 14px', 
                          borderRadius: '100px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>CERTIFIED</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="animate-in" style={{ flex: '1', minWidth: '300px', animationDelay: '0.4s' }}>
              <h3 style={{ marginBottom: '24px' }}>Expert Identity</h3>
              <div className="dashboard-card" style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '30px', 
                  background: 'linear-gradient(135deg, var(--accent), #7c3aed)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '2.5rem', 
                  fontWeight: 900, 
                  margin: '0 auto 20px',
                  boxShadow: '0 10px 25px rgba(44, 88, 255, 0.4)',
                  transform: 'rotate(-5deg)'
                }}>
                  {(user.name || 'U').charAt(0)}
                </div>
                <h2 style={{ margin: '0 0 4px', fontWeight: 900 }}>{user.name}</h2>
                <p style={{ color: 'var(--text3)', fontSize: '0.95rem', marginBottom: '24px' }}>{user.email}</p>
                <div style={{ textAlign: 'left', background: 'var(--surface2)', padding: '20px', borderRadius: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)', fontWeight: 600 }}>RANK</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>ELITE LEARNER</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)', fontWeight: 600 }}>JOINED</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <button onClick={() => navigate('/profile')} className="btn-primary" style={{ width: '100%', marginTop: '24px', borderRadius: '16px' }}>
                  Edit Passport
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
