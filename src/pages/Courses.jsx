// src/pages/Courses.jsx
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchCourses, Progress } from '../utils/auth';

const FILTERS = ['all','beginner','intermediate','advanced','Python','JavaScript','Java','C++','web','mobile','data','backend'];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCourses().then(data => {
      if (data?.courses) setCourses(data.courses);
    });
    const filter = searchParams.get('filter');
    if (filter) setActiveFilter(filter);
  }, []);

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

        <div className="page-header">
          <div className="container">
            <span className="section-tag">Explore Curriculum</span>
            <h1>Learn Any Language, <span className="gradient-text" style={{ background: 'linear-gradient(90deg, var(--accent), #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Free Forever</span></h1>
            <p>Master the most in-demand tech skills with our industry-leading, structured learning paths.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="filter-bar">
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`filter-btn${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="courses-grid">
              {filtered.map(c => {
                const progress = Progress.getPercent(c.id, c.lessons);
                return (
                  <Link
                    key={c.id}
                    to={`/lesson?course=${c.id}`}
                    className="course-card"
                  >
                    <div className="course-card-top" style={{ background: `linear-gradient(135deg, ${c.color || 'var(--accent)'}22, ${c.color || 'var(--accent)'}44)` }}>
                      <span className="course-icon" style={{ color: c.color || 'var(--accent)' }}>
                        {c.title.charAt(0)}
                      </span>
                      <span className="course-level">{c.level || 'Beginner'}</span>
                    </div>
                    <div className="course-card-body">
                      <p>{c.language || c.lang} • {c.lessons} Lessons</p>
                      <h3>{c.title}</h3>
                      <p style={{ color: 'var(--text2)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400, marginTop: '8px', fontSize: '1rem', lineHeight: '1.6' }}>
                        {c.description || c.desc || "Dive deep into the fundamentals and advanced concepts with our comprehensive guide."}
                      </p>
                      {progress > 0 && (
                        <div style={{ marginTop: '24px' }}>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: '8px', fontWeight: 800 }}>
                            {progress}% COMPLETED
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="course-card-footer">
                      <span className="free-badge">★ PREMIUM FREE</span>
                      <span className="start-link">{progress > 0 ? 'Continue Journey →' : 'Start Learning →'}</span>
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
