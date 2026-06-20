// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, Progress, fetchCourses, fetchStudents } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [progressTick, setProgressTick] = useState(0); // incremented after Firestore sync
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const u = Auth.getUser();
    if (!u) { navigate('/login'); return; }
    setUser(u);

    // Fetch full profile from Firestore
    Auth.getProfile().then(profile => {
      if (profile) setUser(prev => ({ ...prev, ...profile }));
    }).catch(() => {});

    // Sync Firestore progress into localStorage FIRST, then load courses
    // so Progress.getPercent() reads the real synced values on first render
    Progress.syncAll()
      .then(() => setProgressTick(t => t + 1)) // force re-render with synced data
      .catch(() => {})
      .finally(() => {
        fetchCourses().then(data => {
          if (data?.courses) setCourses(data.courses);
        });
      });
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      fetchStudents().then(students => {
        if (!students) return;
        
        let settings = {};
        try { settings = JSON.parse(localStorage.getItem('lc_academy_settings')) || {}; } catch {}
        const ptsEnroll = settings.pointsForEnroll !== undefined ? Number(settings.pointsForEnroll) : 10;
        const ptsTest = settings.pointsForTest !== undefined ? Number(settings.pointsForTest) : 20;

        const scoredStudents = students.map(s => {
          let score = 0;
          const docs = s.progressDocs || [];
          const sEnrolledCount = docs.length;
          score += sEnrolledCount * ptsEnroll;
          
          let sCompletedCount = 0;
          docs.forEach(p => {
            const course = courses.find(c => c.id === p.courseId);
            if (course) {
              const cLessons = p.completedLessons?.length || 0;
              score += cLessons * 5;
              if (cLessons === course.lessons) {
                sCompletedCount++;
              }
            } else {
              score += (p.completedLessons?.length || 0) * 5;
              if (p.completed) sCompletedCount++;
            }
          });
          score += sCompletedCount * ptsTest;
          
          return { ...s, score };
        });
        
        scoredStudents.sort((a, b) => b.score - a.score);
        setLeaderboard(scoredStudents.slice(0, 5));
      }).catch(err => console.error("Error fetching students:", err));
    }
  }, [courses]);

  if (!user) return null;

  // Re-computed every time courses load OR after Firestore sync completes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const completedCourses = courses.filter(c => Progress.getPercent(c.id, c.lessons) === 100);
  const ongoingCourses = courses.filter(c => {
    const p = Progress.getPercent(c.id, c.lessons);
    return Progress.isEnrolled(c.id) && p < 100;
  });
  void progressTick; // consumed so eslint doesn't warn about unused var

  // Calculate User Score
  let userScore = 0;
  let enrolledCount = 0;
  let completedCount = 0;
  let totalCompletedLessons = 0;

  courses.forEach(c => {
    const pArray = Progress.get(c.id) || [];
    const p = pArray.length;
    if (Progress.isEnrolled(c.id)) {
      enrolledCount++;
      totalCompletedLessons += p;
      if (p === c.lessons) {
        completedCount++;
      }
    }
  });
  let userSettings = {};
  try { userSettings = JSON.parse(localStorage.getItem('lc_academy_settings')) || {}; } catch {}
  const uPtsEnroll = userSettings.pointsForEnroll !== undefined ? Number(userSettings.pointsForEnroll) : 10;
  const uPtsTest = userSettings.pointsForTest !== undefined ? Number(userSettings.pointsForTest) : 20;

  userScore = (enrolledCount * uPtsEnroll) + (totalCompletedLessons * 5) + (completedCount * uPtsTest);

  const stats = [
    { label: 'Completed', value: completedCourses.length, icon: '🏆', color: '#22c55e' },
    { label: 'Ongoing', value: ongoingCourses.length, icon: '⚡', color: '#eab308' },
    { label: 'Total Score', value: userScore, icon: '⭐', color: '#8b5cf6' },
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
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)', fontWeight: 600 }}>NAME</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{user.name || '—'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)', fontWeight: 600 }}>D.O.B</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                      {user.dob ? new Date(user.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </span>
                  </div>
                </div>
                <button onClick={() => navigate('/profile')} className="btn-primary" style={{ width: '100%', marginTop: '24px', borderRadius: '16px', textAlign: 'center' }}>
                  Edit
                </button>
              </div>

              {/* SCOREBOARD */}
              <div className="animate-in" style={{ marginTop: '40px', animationDelay: '0.5s' }}>
                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>⭐</span> Top Students
                </h3>
                <div className="dashboard-card" style={{ padding: '24px' }}>
                  {leaderboard.length > 0 ? (
                    leaderboard.map((student, idx) => (
                      <div key={student.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        borderBottom: idx < leaderboard.length - 1 ? '1px solid var(--border)' : 'none'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: idx === 0 ? '#fbbf24' : idx === 1 ? '#94a3b8' : idx === 2 ? '#b45309' : 'var(--surface2)',
                            color: idx < 3 ? 'white' : 'var(--text2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                          }}>
                            {idx + 1}
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, display: 'block', fontSize: '0.95rem' }}>
                              {student.name} {student.id === user.id && '(You)'}
                            </span>
                          </div>
                        </div>
                        <span style={{
                          color: 'var(--accent)',
                          fontWeight: 900,
                          fontSize: '1rem'
                        }}>
                          {student.score} pts
                        </span>
                      </div>
                    ))
                  ) : (
                    <p style={{ textAlign: 'center', color: 'var(--text3)', margin: 0 }}>Loading scoreboard...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
