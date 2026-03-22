// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, API_BASE, MOCK_STUDENTS, MOCK_COURSES } from '../utils/auth';
import Header from '../components/Header';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const user = Auth.getUser();
    if (!user) { navigate('/login'); return; }

    fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${user.token || 'demo'}` }
    })
      .then(r => r.json())
      .then(d => { if (d.user) setUserData({ ...user, ...d.user }); else setUserData(user); })
      .catch(() => setUserData(user));
  }, []);

  if (!userData) return <div style={{ padding: '60px', color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>Loading dashboard...</div>;

  const stats = userData.stats || {
    neoPAT: { score: 0, level: 1 },
    solvedQuestions: { total: 0, easy: 0, medium: 0, hard: 0 },
    coding: { attempted: 0, correct: 0, score: 0, accuracy: 0 },
    projects: { attempted: 0, score: 0 },
    mcq: { attempted: 0, correct: 0, score: 0, accuracy: 0 },
    contributions: []
  };

  const sq = stats.solvedQuestions || {};
  const MAX_EASY = 1200, MAX_MEDIUM = 1000, MAX_HARD = 500;
  const MAX_TOTAL = MAX_EASY + MAX_MEDIUM + MAX_HARD;

  const easyPct   = ((sq.easy   || 0) / MAX_TOTAL * 100).toFixed(1);
  const medPct    = ((sq.medium || 0) / MAX_TOTAL * 100).toFixed(1);
  const hardPct   = ((sq.hard   || 0) / MAX_TOTAL * 100).toFixed(1);

  const donutGradient = `conic-gradient(
    var(--green)  0% ${easyPct}%,
    var(--yellow) ${easyPct}% ${(+easyPct + +medPct).toFixed(1)}%,
    var(--red)    ${(+easyPct + +medPct).toFixed(1)}% ${(+easyPct + +medPct + +hardPct).toFixed(1)}%,
    var(--border) ${(+easyPct + +medPct + +hardPct).toFixed(1)}% 100%
  )`;

  const initials = (userData.name || 'LC').substring(0, 2).toUpperCase();
  const isAdmin = userData.role === 'admin';

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="container dashboard-container">
          {/* USER BANNER */}
          <div className="user-banner">
            <div className="avatar-large">{initials}</div>
            <div className="user-info">
              <h2>{userData.name || 'User'} {isAdmin && <span className="badge-admin">Admin</span>}</h2>
              <div className="user-meta">
                <span>{userData.email || '—'}</span>
                <span>·</span>
                <span>{userData.createdAt ? `Joined ${new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` : 'Instructor'}</span>
              </div>
            </div>
          </div>

          {isAdmin ? (
            <div className="admin-view">
              {selectedStudent ? (
                <div className="student-details-card">
                  <div className="card-header-with-back">
                    <button className="back-btn" onClick={() => setSelectedStudent(null)}>← Back to Students</button>
                    <h3>Student Analytics: {selectedStudent.name}</h3>
                  </div>
                  
                  <div className="student-stats-summary">
                    <div className="mini-stat">
                      <span className="label">Courses Attended</span>
                      <span className="value">{selectedStudent.stats.attendedCourses}</span>
                    </div>
                    <div className="mini-stat">
                      <span className="label">Student ID</span>
                      <span className="value">{selectedStudent.id}</span>
                    </div>
                  </div>

                  <h4>Enrolled Courses</h4>
                  <div className="enrolled-list">
                    {selectedStudent.stats.courses.map(courseId => {
                      const course = MOCK_COURSES.find(c => c.id === courseId);
                      return (
                        <div key={courseId} className="enrolled-item">
                           <span className="icon">{course?.icon || '📚'}</span>
                           <div className="info">
                              <strong>{course?.title || 'Unknown Course'}</strong>
                              <span>{course?.language}</span>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="student-list-container">
                  <div className="list-header">
                    <h3>Registered Students</h3>
                    <p>Total students: {MOCK_STUDENTS.length}</p>
                  </div>
                  <div className="student-table-wrapper">
                    <table className="student-table">
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Email</th>
                          <th>Joined Date</th>
                          <th>Courses</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_STUDENTS.map(student => (
                          <tr key={student.id}>
                            <td><strong>{student.name}</strong></td>
                            <td>{student.email}</td>
                            <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                            <td style={{ fontFamily: 'var(--font-mono)' }}>{student.stats.attendedCourses}</td>
                            <td>
                              <button className="view-btn" onClick={() => setSelectedStudent(student)}>
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* TOP STATS */}
              <div className="stats-grid">
                {/* Solved Questions */}
                <div className="stat-card" style={{ gridColumn: 'span 3' }}>
                  <div className="stat-card-header">
                    <h3>Solved Questions</h3>
                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                  </div>
                  <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div className="chart-container">
                      <div className="donut-chart" style={{ background: donutGradient }}>
                        <div className="donut-inner">
                          <span className="donut-data-total">{sq.total || 0}</span>
                          <span className="donut-data-label">Solved</span>
                        </div>
                      </div>
                    </div>

                    <div className="difficulty-bars" style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }}>
                      {[
                        { id: 'easy', label: 'Easy', color: 'var(--green)', val: sq.easy || 0, max: MAX_EASY },
                        { id: 'medium', label: 'Medium', color: 'var(--yellow)', val: sq.medium || 0, max: MAX_MEDIUM },
                        { id: 'hard', label: 'Hard', color: 'var(--red)', val: sq.hard || 0, max: MAX_HARD },
                      ].map(d => (
                        <div key={d.id} className="difficulty-row">
                          <div className="diff-header">
                            <span style={{ color: d.color, fontWeight: 600 }}>{d.label}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{d.val}/{d.max}</span>
                          </div>
                          <div className="diff-bar">
                            <div className={`diff-fill fill-${d.id}`} style={{ width: `${Math.min((d.val / d.max) * 100, 100)}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '160px' }}>
                      {[['Easy', sq.easy], ['Medium', sq.medium], ['Hard', sq.hard]].map(([label, val]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                          <span style={{ color: 'var(--text2)', fontSize: '0.95rem' }}>{label}</span>
                          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem' }}>{val ?? '—'}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* HEATMAP */}
              <Heatmap contributions={stats.contributions || []} />
            </>
          )}
        </div>

        <footer className="footer" style={{ padding: '30px 0' }}>
          <div className="footer-bottom">
            <p>© 2026 LearnCode. Built to empower learners.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Heatmap({ contributions }) {
  const lookup = {};
  contributions.forEach(c => {
    if (c.date) {
      const key = new Date(c.date).toDateString();
      lookup[key] = (lookup[key] || 0) + c.count;
    }
  });

  const today = new Date();
  const cells = Array.from({ length: 371 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (370 - i));
    const key = d.toDateString();
    const count = lookup[key] || 0;
    let heat = '';
    if (count >= 10) heat = 'heat-4';
    else if (count >= 6) heat = 'heat-3';
    else if (count >= 3) heat = 'heat-2';
    else if (count >= 1) heat = 'heat-1';
    return { key, count, heat };
  });

  return (
    <div className="heatmap-container">
      <div className="heatmap-header">
        <h3 style={{ fontWeight: 700 }}>Contributions</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text3)' }}>
          <span>Less</span>
          {['', 'heat-1', 'heat-2', 'heat-3', 'heat-4'].map((h, i) => (
            <div key={i} className={`heat-cell ${h}`} style={!h ? { background: 'var(--surface2)' } : {}}></div>
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="heatmap-grid" id="heatmap-grid">
        {cells.map((c, i) => (
          <div key={i} className={`heat-cell ${c.heat}`} title={`${c.key}: ${c.count} activity`}></div>
        ))}
      </div>
    </div>
  );
}
