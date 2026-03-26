// src/pages/Courses.jsx
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchCourses, Progress } from '../utils/auth';
import { AdminStore } from '../utils/adminStore';

const FILTERS = ['all','beginner','intermediate','advanced','Python','JavaScript','Java','C++','web','mobile','data','backend'];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 1. Initially load from AdminStore (sync)
    const adminCourses = AdminStore.getCourses();
    const visibleCourses = adminCourses.filter(c => !c.hidden);
    setCourses(visibleCourses);

    // 2. Refresh from backend (async)
    fetchCourses().then(data => {
      if (data?.courses) {
        setCourses(AdminStore.getCourses().filter(c => !c.hidden));
      }
    });

    const filter = searchParams.get('filter');
    if (filter) setActiveFilter(filter);
  }, [searchParams]);

  const filtered = courses.filter(c => {
    if (activeFilter === 'all') return true;
    return (
      (c.language || '').toLowerCase() === activeFilter.toLowerCase() ||
      (c.level || '').toLowerCase() === activeFilter.toLowerCase() ||
      (c.category || '') === activeFilter
    );
  });

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <span className="section-tag">Explore Curriculum</span>
            <h1 className="text-glow">Learn Any Language, <span className="gradient-text">Free Forever</span></h1>
            <p style={{ maxWidth: '700px', fontSize: '1.2rem' }}>Master the most in-demand tech skills with our industry-leading, structured learning paths.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="filter-bar animate-in" style={{ padding: '0 0 48px', justifyContent: 'flex-start', border: 'none', gap: '12px' }}>
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  className={`glass-pill${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="courses-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
              {filtered.map((c, idx) => {
                const progress = Progress.getPercent(c.id, c.lessons);
                return (
                  <Link
                    key={c.id}
                    to={`/lesson?course=${c.id}`}
                    className="dashboard-card animate-in"
                    style={{ animationDelay: `${idx * 0.05}s`, padding: 0, overflow: 'hidden' }}
                  >
                    <div className="course-card-top" style={{ background: `${c.color || 'var(--accent)'}15`, padding: '32px', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                          {c.icon || c.title.charAt(0)}
                        </div>
                        <span className={`course-level level-${(c.level || 'Beginner').toLowerCase()}`} style={{ height: 'fit-content' }}>
                          {c.level || 'Beginner'}
                        </span>
                      </div>
                    </div>
                    <div className="course-card-body" style={{ padding: '32px' }}>
                      <p style={{ color: 'var(--text3)', fontSize: '0.9rem', fontWeight: 800, marginBottom: '8px' }}>{c.language || c.lang} • {c.lessons} Lessons</p>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '16px' }}>{c.title}</h3>
                      <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: '1.7', height: '80px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {c.description || c.desc || "Dive deep into the fundamentals and advanced concepts with our comprehensive guide or take on real-world projects."}
                      </p>
                      
                      {progress > 0 && (
                        <div style={{ marginTop: '32px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text3)' }}>YOUR PROGRESS</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--accent)' }}>{progress}%</span>
                          </div>
                          <div className="progress-bar" style={{ height: '10px', background: 'var(--surface2)', borderRadius: '20px', overflow: 'hidden' }}>
                            <div className="progress-fill" style={{ 
                              width: `${progress}%`, 
                              background: 'linear-gradient(90deg, var(--accent), #7c3aed)',
                              boxShadow: '0 0 10px rgba(44, 88, 255, 0.2)'
                            }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="course-card-footer" style={{ padding: '20px 32px', background: 'var(--surface2)', borderTop: '1px solid var(--border)' }}>
                      <span className="free-badge shimer">PREMIUM FREE</span>
                      <span className="start-link" style={{ fontWeight: 800, color: 'var(--accent)' }}>
                        {progress > 0 ? 'Continue Voyage →' : 'Start Journey →'}
                      </span>
                    </div>
                  </Link>
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
