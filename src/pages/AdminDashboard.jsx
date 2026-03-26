// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, MOCK_STUDENTS, fetchCourses } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AdminStore } from '../utils/adminStore';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState(MOCK_STUDENTS || []);

  useEffect(() => {
    const u = Auth.getUser();
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);

    const data = AdminStore.getCourses();
    setCourses(data);
  }, []);

  if (!user) return null;

  const stats = [
    { label: 'Total Students', value: students.length, icon: '👥', color: '#6366f1', path: null },
    { label: 'Active Courses', value: courses.length, icon: '📚', color: '#8b5cf6', path: '/admin/courses' },
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <span className="section-tag" style={{ background: 'rgba(255,255,255,0.2)' }}>Control Center</span>
            <h1 className="text-glow">Admin <span className="gradient-text">Command Hub</span></h1>
            <p style={{ maxWidth: '700px' }}>Manage your academy, oversee instructors, and track student success metrics at a glance.</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '-40px' }}>
          {/* STATS GRID */}
          <div className="stats-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '24px', 
            marginBottom: '48px' 
          }}>
            {stats.map((s, idx) => (
              <div 
                key={s.label} 
                className="dashboard-card animate-in" 
                onClick={() => s.path && navigate(s.path)}
                style={{ 
                  animationDelay: `${idx * 0.1}s`, 
                  border: '1px solid var(--border)',
                  cursor: s.path ? 'pointer' : 'default'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: `${s.color}15`, 
                    color: s.color,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2px' }}>{s.value}</h2>
                    <p style={{ color: 'var(--text3)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {/* STUDENT ROSTER */}
            <div className="animate-in" style={{ flex: '2', minWidth: '400px', animationDelay: '0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📋</span> Student Roster
                </h3>
                <button className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Export Data</button>
              </div>
              <div className="dashboard-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Name</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Email</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Enrollment Date</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Courses</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr key={idx} style={{ borderBottom: idx === students.length - 1 ? 'none' : '1px solid var(--border)' }}>
                        <td style={{ padding: '20px 24px', fontWeight: 800 }}>{student.name}</td>
                        <td style={{ padding: '20px 24px', color: 'var(--text2)' }}>{student.email}</td>
                        <td style={{ padding: '20px 24px', color: 'var(--text3)' }}>{new Date(student.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: '20px 24px' }}>
                          <span style={{ 
                            background: 'var(--accent-light)', 
                            color: 'var(--accent)', 
                            padding: '4px 12px', 
                            borderRadius: '100px', 
                            fontSize: '0.75rem', 
                            fontWeight: 900 
                          }}>
                            {student.stats.attendedCourses} Courses
                          </span>
                        </td>
                        <td style={{ padding: '20px 24px' }}>
                          <Link to={`/admin/student/${student.id}`} className="start-link" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                            Detail →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ADMIN ACTIONS */}
            <div className="animate-in" style={{ flex: '1', minWidth: '300px', animationDelay: '0.4s' }}>
              <h3 style={{ marginBottom: '24px' }}>Admin Actions</h3>
              <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button 
                  className="shimmer" 
                  onClick={() => navigate('/admin/courses')}
                  style={{ 
                    background: 'var(--accent)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '16px', 
                    borderRadius: '16px', 
                    fontWeight: 800, 
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>➕</span> Add New Course
                </button>
                <button style={{ 
                  background: 'var(--surface2)', 
                  color: 'var(--text1)', 
                  border: '1px solid var(--border)', 
                  padding: '16px', 
                  borderRadius: '16px', 
                  fontWeight: 800, 
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📢</span> Post Announcement
                </button>
                <button style={{ 
                  background: 'var(--surface2)', 
                  color: 'var(--text1)', 
                  border: '1px solid var(--border)', 
                  padding: '16px', 
                  borderRadius: '16px', 
                  fontWeight: 800, 
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>⚙️</span> Academy Settings
                </button>
                
                <div style={{ marginTop: '20px', padding: '20px', background: 'var(--accent-light)', borderRadius: '20px', border: '1px dashed var(--accent)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text2)', lineHeight: '1.6' }}>
                    <strong>Note:</strong> Some administrative features are currently in read-only demo mode while the main server is offline.
                  </p>
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
