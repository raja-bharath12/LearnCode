// src/pages/Exams.jsx
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchCourses, Progress } from '../utils/auth';

export default function Exams() {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({ completed: 0, inProgress: 0 });

  useEffect(() => {
    fetchCourses().then(data => {
      if (data?.courses) {
        setCourses(data.courses);
        
        let completed = 0;
        let inProgress = 0;
        
        data.courses.forEach(c => {
          const pct = Progress.getPercent(c.id, c.lessons);
          if (pct === 100) completed++;
          else if (pct > 0) inProgress++;
        });
        
        setStats({ completed, inProgress });
      }
    });
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header premium-mesh-bg animate-in">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
              
              {/* LEFT — text */}
              <div style={{ textAlign: 'left', maxWidth: '560px' }}>
                <span className="section-tag">Academic Records</span>
                <h1 className="text-glow" style={{ margin: '12px 0' }}>
                  Course <span className="gradient-text">Exams & Completion</span>
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text2)', lineHeight: '1.7', margin: 0 }}>
                  View your completed courses and eligibility for certificates.
                </p>
              </div>

              {/* RIGHT — stats */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--surface2)', padding: '20px 30px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '140px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#22c55e', lineHeight: 1 }}>{stats.completed}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text2)', fontWeight: 600, marginTop: '12px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Exam Ready</span>
                  </div>
                  <div style={{ background: 'var(--surface2)', padding: '20px 30px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '140px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{stats.inProgress}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text2)', fontWeight: 600, marginTop: '12px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>In Progress</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="exams-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {courses.map(c => {
                const progress = Progress.getPercent(c.id, c.lessons);
                const isCompleted = progress === 100;

                return (
                  <div key={c.id} className="course-card" style={{ cursor: 'default' }}>
                    <div className="course-card-top" style={{ background: `linear-gradient(135deg, ${c.color || 'var(--accent)'}22, ${c.color || 'var(--accent)'}44)` }}>
                      <span className="course-icon" style={{ color: c.color || 'var(--accent)' }}>
                        {c.title.charAt(0)}
                      </span>
                      <span className="course-level">{c.level || 'Beginner'}</span>
                    </div>
                    <div className="course-card-body">
                      <p>{c.language || c.lang} • {c.lessons} Lessons</p>
                      <h3>{c.title}</h3>
                      
                      <div style={{ marginTop: '24px' }}>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${progress}%`, backgroundColor: isCompleted ? '#22c55e' : 'var(--accent)' }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text3)', fontWeight: 800 }}>
                            {progress}% PROGRESS
                          </span>
                          {isCompleted && (
                            <span style={{ color: '#22c55e', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>
                              COMPLETED ✅
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="course-card-footer">
                      {isCompleted ? (
                        <span style={{ color: '#22c55e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                          Exam Ready
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>
                          Complete course to unlock exam
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
