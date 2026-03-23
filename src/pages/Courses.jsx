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
            <span className="section-tag">All Courses</span>
            <h1>Learn Any Language, <span className="gradient-text">Free</span></h1>
            <p>{courses.length}+ structured courses with hands-on coding exercises</p>
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
                    data-lang={c.language || c.lang}
                    data-category={c.category || ''}
                    data-level={(c.level || 'Beginner').toLowerCase()}
                  >
                    <div className="course-card-top" style={{ '--accent': c.color || 'var(--accent)' }}>
                      <span className="course-icon" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                        {c.title.charAt(0)}
                      </span>
                      <span className={`course-level level-${(c.level || 'Beginner').toLowerCase()}`}>{c.level || 'Beginner'}</span>
                    </div>
                    <div className="course-card-body">
                      <h3>{c.title}</h3>
                      <p>{c.language || c.lang} • {c.lessons} Lessons</p>
                      <p style={{ color: 'var(--text2)', fontFamily: 'var(--font-body)', marginTop: '8px', fontSize: '0.85rem' }}>
                        {c.description || c.desc}
                      </p>
                      {progress > 0 && (
                        <>
                          <div className="progress-bar" style={{ marginTop: '12px' }}>
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                            {progress}% complete
                          </p>
                        </>
                      )}
                    </div>
                    <div className="course-card-footer">
                      <span className="free-badge">FREE</span>
                      <span className="start-link">{progress > 0 ? 'Continue →' : 'Start →'}</span>
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
