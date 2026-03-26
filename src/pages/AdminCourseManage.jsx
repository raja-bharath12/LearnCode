// src/pages/AdminCourseManage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AdminStore } from '../utils/adminStore';
import { Auth } from '../utils/auth';

export default function AdminCourseManage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = Auth.getUser();
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    setCourses(AdminStore.getCourses());
    setLoading(false);
  }, [navigate]);

  const toggleVisibility = (id, currentHidden) => {
    AdminStore.updateCourse(id, { hidden: !currentHidden });
    setCourses(AdminStore.getCourses());
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />
        
        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
              <Link to="/admin-dashboard" className="glass-pill" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>←</span> Back to Dashboard
              </Link>
              <span className="section-tag">Curriculum Control</span>
            </div>
            <h1 className="text-glow">Manage <span className="gradient-text">Courses</span></h1>
            <p style={{ color: 'var(--text2)' }}>Toggle visibility, manage lessons, and edit content across the platform.</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '-40px' }}>
          <div className="dashboard-card animate-in" style={{ animationDelay: '0.2s' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Course Name</th>
                    <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Language</th>
                    <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Lessons</th>
                    <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, idx) => (
                    <tr key={course.id} className="table-row-hover" style={{ borderBottom: idx === courses.length - 1 ? 'none' : '1px solid var(--border)' }}>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ fontWeight: 800 }}>{course.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>ID: {course.id}</div>
                      </td>
                      <td style={{ padding: '20px 24px', color: 'var(--text2)' }}>{course.language}</td>
                      <td style={{ padding: '20px 24px' }}>
                        <span className="glass-pill" style={{ fontSize: '0.75rem' }}>{course.lessons} Lessons</span>
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div 
                            className={`toggle-switch ${course.hidden ? '' : 'active'}`}
                            onClick={() => toggleVisibility(course.id, course.hidden)}
                            style={{ 
                              width: '40px', 
                              height: '20px', 
                              background: course.hidden ? 'var(--surface2)' : 'var(--green)',
                              borderRadius: '20px',
                              position: 'relative',
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                          >
                            <div style={{ 
                              width: '16px', 
                              height: '16px', 
                              background: '#fff', 
                              borderRadius: '50%',
                              position: 'absolute',
                              top: '2px',
                              left: course.hidden ? '2px' : '22px',
                              transition: 'all 0.3s'
                            }}></div>
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: course.hidden ? 'var(--text3)' : 'var(--green)' }}>
                            {course.hidden ? 'Hidden' : 'Visible'}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                        <Link 
                          to={`/admin/course/${course.id}`} 
                          className="btn-primary" 
                          style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '10px' }}
                        >
                          Manage →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
