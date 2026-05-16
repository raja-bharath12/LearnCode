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
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
              {/* LEFT — text */}
              <div style={{ textAlign: 'left', maxWidth: '560px' }}>
                <span className="section-tag">Explore Curriculum</span>
                <h1 className="text-glow" style={{ margin: '12px 0' }}>
                  Learn Any Language, <span className="gradient-text">Free Forever</span>
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text2)', lineHeight: '1.7', margin: 0 }}>
                  Master the most in-demand tech skills with our industry-leading, structured learning paths.
                </p>
              </div>

              {/* RIGHT — clockwise orbiting tech badges */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {(() => {
                const LANGS = [
                  { label: 'Python',  icon: '🐍', color: '#3776ab' },
                  { label: 'JS',      icon: '⚡', color: '#f7df1e' },
                  { label: 'Java',    icon: '☕', color: '#f89820' },
                  { label: 'C++',     icon: '⚙️', color: '#00599c' },
                  { label: 'React',   icon: '⚛️', color: '#61dafb' },
                  { label: 'SQL',     icon: '🗄️', color: '#f44336' },
                  { label: 'HTML',    icon: '🌐', color: '#e44d26' },
                  { label: 'Node',    icon: '🟢', color: '#68a063' },
                ];
                const N = LANGS.length;
                const SIZE = 280;   // container px
                const R    = 108;   // orbit radius
                const C    = SIZE / 2;
                const BADGE = 52;

                return (
                  <div style={{ position: 'relative', width: SIZE, height: SIZE, flexShrink: 0 }}>
                    {/* LearnCode logo in center */}
                    <div style={{
                      position: 'absolute',
                      top: C - 32, left: C - 32,
                      width: 64, height: 64,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #2c58ff, #6366f1)',
                      boxShadow: '0 0 32px #2c58ff80, 0 0 64px #6366f130, 0 8px 24px rgba(44,88,255,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 900,
                      fontSize: '1.4rem',
                      fontFamily: 'monospace',
                      letterSpacing: '-1px',
                      zIndex: 10,
                      border: '2px solid rgba(255,255,255,0.2)',
                    }}>
                      {'</>'}
                    </div>

                    {/* orbit ring (faint) */}
                    <div style={{
                      position: 'absolute',
                      top: C - R - 1, left: C - R - 1,
                      width: R * 2 + 2, height: R * 2 + 2,
                      borderRadius: '50%',
                      border: '1px dashed rgba(255,255,255,0.12)',
                    }} />

                    {/* rotating wrapper */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      animation: 'orbit-cw 16s linear infinite',
                    }}>
                      {LANGS.map((lang, i) => {
                        const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
                        const cx = C + R * Math.cos(angle);
                        const cy = C + R * Math.sin(angle);
                        return (
                          <div
                            key={lang.label}
                            style={{
                              position: 'absolute',
                              top: cy - BADGE / 2,
                              left: cx - BADGE / 2,
                              width: BADGE,
                              height: BADGE,
                              animation: 'counter-cw 16s linear infinite',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <div style={{
                              width: BADGE,
                              height: BADGE,
                              borderRadius: '16px',
                              background: `linear-gradient(135deg, ${lang.color}30, ${lang.color}12)`,
                              border: `1.5px solid ${lang.color}60`,
                              boxShadow: `0 0 16px ${lang.color}50`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.35rem',
                              backdropFilter: 'blur(10px)',
                              cursor: 'default',
                            }}>
                              {lang.icon}
                            </div>
                            <span style={{
                              fontSize: '0.58rem',
                              fontWeight: 800,
                              color: 'rgba(255,255,255,0.6)',
                              letterSpacing: '0.5px',
                              textTransform: 'uppercase',
                              whiteSpace: 'nowrap',
                            }}>
                              {lang.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
              </div>

            </div>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="filter-bar animate-in" style={{ padding: '0 0 48px', justifyContent: 'flex-start', border: 'none', gap: '12px', flexWrap: 'nowrap', overflowX: 'auto', paddingRight: '24px' }}>
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  className={`glass-pill${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                  style={{ border: 'none', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}
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
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '20px',
                          background: `linear-gradient(135deg, ${c.color || '#2c58ff'}, ${c.color || '#2c58ff'}99)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.6rem',
                          fontWeight: 900,
                          color: 'white',
                          letterSpacing: '-1px',
                          fontFamily: 'var(--font-body)',
                          boxShadow: `0 8px 24px ${c.color || '#2c58ff'}55, 0 2px 8px rgba(0,0,0,0.2)`,
                          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          flexShrink: 0,
                        }}>
                          {c.icon || c.title.charAt(0).toUpperCase()}
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
