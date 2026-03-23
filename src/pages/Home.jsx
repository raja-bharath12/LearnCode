// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchCourses, API_BASE } from '../utils/auth';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [learnerCount, setLearnerCount] = useState('10K+');
  const [counts, setCounts] = useState({ web: 0, data: 0, mobile: 0, backend: 0 });

  useEffect(() => {
    fetchCourses().then(data => {
      if (data?.courses) {
        setCourses(data.courses);
        const c = { web: 0, data: 0, mobile: 0, backend: 0 };
        data.courses.forEach(course => {
          if (course.category && c[course.category] !== undefined) c[course.category]++;
        });
        setCounts(c);
      }
    });

    fetch(`${API_BASE}/stats`)
      .then(r => r.json())
      .then(d => { if (d.users !== undefined) setLearnerCount(d.users); })
      .catch(() => {});
  }, []);

  const featured = courses.slice(0, 6);
  const totalLessons = courses.reduce((sum, c) => sum + (c.lessons || 0), 0);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        {/* HERO */}
        <section className="hero premium-mesh-bg animate-in">
          <div className="hero-bg-grid"></div>
          <div className="container hero-container">
            <div className="hero-content">
              <div className="hero-badge animate-in" style={{ animationDelay: '0.1s' }}>100% Free • No Credit Card</div>
              <h1 className="animate-in" style={{ animationDelay: '0.2s' }}>Learn to <span className="gradient-text">Code</span><br />Change Your World</h1>
              <p className="hero-sub animate-in" style={{ animationDelay: '0.3s' }}>Master Python, JavaScript, C++, Java and more with hands-on lessons, live code editors, and real projects — completely free, forever.</p>
              <div className="hero-cta animate-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/courses" className="btn-primary shimmer">Explore Courses →</Link>
                <Link to="/about" className="btn-ghost" style={{ marginLeft: '12px' }}>How it Works</Link>
              </div>
              <div className="hero-stats animate-in" style={{ animationDelay: '0.5s' }}>
                <div className="stat"><span className="stat-num">{courses.length || 50}+</span><span className="stat-label">Courses</span></div>
                <div className="stat-divider"></div>
                <div className="stat"><span className="stat-num">{totalLessons || 200}+</span><span className="stat-label">Lessons</span></div>
                <div className="stat-divider"></div>
                <div className="stat"><span className="stat-num" id="learner-count">{learnerCount}</span><span className="stat-label">Learners</span></div>
              </div>
            </div>
            <div className="hero-code-window hover-glow animate-in" style={{ animationDelay: '0.6s' }}>
              <div className="code-window-header">
                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                <span className="code-filename">hello_world.py</span>
              </div>
              <pre className="code-body"><code>
                <span className="c-keyword">def</span> <span className="c-fn">greet</span>(name):{'\n'}
                {'  '}<span className="c-keyword">return</span> <span className="c-str">f"Hello, {'{'}name{'}'} "</span>{'\n\n'}
                <span className="c-comment"># Start your journey</span>{'\n'}
                message = greet(<span className="c-str">"World"</span>){'\n'}
                <span className="c-fn">print</span>(message){'\n\n'}
                <span className="c-comment"># Output:</span>{'\n'}
                <span className="c-output">Hello, World! </span>
              </code></pre>
              <div className="code-cursor"></div>
            </div>
          </div>
        </section>

        {/* LANGUAGES BANNER */}
        <section className="languages-banner">
          <div className="languages-track">
            {['Python','JavaScript','Java','C++','TypeScript','Go','Rust','SQL','HTML/CSS','React','Node.js','Django',
              'Python','JavaScript','Java','C++','TypeScript','Go','Rust','SQL','HTML/CSS','React','Node.js','Django']
              .map((lang, i) => <span key={i}>{lang}</span>)}
          </div>
        </section>

        {/* FEATURED COURSES */}
        <section className="section" id="courses">
          <div className="container">
            <div className="section-header animate-in">
              <span className="section-tag">Popular</span>
              <h2 className="text-glow">Start With These Courses</h2>
              <p>Structured paths from beginner to pro.</p>
            </div>
            <div className="courses-grid">
              {featured.map((c, idx) => (
                <Link key={c.id} to={`/lesson?course=${c.id}`} className="dashboard-card animate-in" style={{ animationDelay: `${idx * 0.1}s`, padding: 0, overflow: 'hidden' }}>
                  <div className="course-card-top" style={{ background: `${c.color || 'var(--accent)'}15`, padding: '24px', borderBottom: '1px solid var(--border)' }}>
                    <span className="course-icon" style={{ fontSize: '2.5rem' }}>{c.icon || '💻'}</span>
                    <span className={`course-level level-${(c.level || 'Beginner').toLowerCase()}`}>{c.level || 'Beginner'}</span>
                  </div>
                  <div className="course-card-body" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>{c.title}</h3>
                    <p style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>{c.language || c.lang} • {c.lessons} Lessons</p>
                  </div>
                  <div className="course-card-footer" style={{ padding: '16px 24px', background: 'var(--surface2)', borderTop: '1px solid var(--border)' }}>
                    <span className="free-badge">FREE</span>
                    <span className="start-link" style={{ fontWeight: 800, color: 'var(--accent)' }}>Start Learning →</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="section-cta animate-in">
              <Link to="/courses" className="btn-primary shimmer">View All Courses →</Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section section-dark">
          <div className="container">
            <div className="section-header animate-in">
              <span className="section-tag">Process</span>
              <h2 className="text-glow">How LearnCode Works</h2>
            </div>
            <div className="steps-grid">
              {[
                { num: '01', title: 'Pick a Course', desc: 'Choose from 50+ free courses across languages, frameworks, and domains.', icon: '🔍' },
                { num: '02', title: 'Learn by Doing', desc: 'Read bite-sized theory, then code right in your browser with instant feedback.', icon: '💻' },
                { num: '03', title: 'Build Projects', desc: 'Apply your skills on real projects that you can add to your portfolio.', icon: '🏗️' },
                { num: '04', title: 'Earn Certificates', desc: 'Complete a course and earn a free verifiable certificate to share with employers.', icon: '📜' },
              ].map((step, i) => (
                <div key={step.num} style={{ display: 'contents' }}>
                  <div className="dashboard-card animate-in" style={{ animationDelay: `${i * 0.15}s`, maxWidth: '280px', textAlign: 'center' }}>
                    <div className="step-num" style={{ fontSize: '1.5rem', opacity: 1, marginBottom: '20px', background: 'var(--accent-light)', color: 'var(--accent)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      {step.num}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>{step.title}</h3>
                    <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: '1.6' }}>{step.desc}</p>
                  </div>
                  {i < 3 && <div className="step-arrow" style={{ opacity: 0.3 }}>→</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAREER PATHS */}
        <section className="section">
          <div className="container">
            <div className="section-header animate-in">
              <span className="section-tag">Career Paths</span>
              <h2 className="text-glow">Where Do You Want to Go?</h2>
            </div>
            <div className="paths-grid">
              <Link to="/courses?filter=web" className="dashboard-card path-card path-web animate-in" style={{ animationDelay: '0.1s' }}>
                <div className="path-icon" style={{ fontSize: '3rem', marginBottom: '16px' }}>🌐</div>
                <h3 style={{ fontWeight: 800 }}>Web Development</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>HTML, CSS, JS, React, Node.js</p>
                <span className="path-courses" style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '100px', fontWeight: 800, fontSize: '0.75rem' }}>{counts.web} Courses</span>
              </Link>
              <Link to="/courses?filter=data" className="dashboard-card path-card path-data animate-in" style={{ animationDelay: '0.2s' }}>
                <div className="path-icon" style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
                <h3>Data Science</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>Python, Pandas, ML, Visualization</p>
                <span className="path-courses" style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--green)', padding: '4px 12px', borderRadius: '100px', fontWeight: 800, fontSize: '0.75rem' }}>{counts.data} Courses</span>
              </Link>
              <Link to="/courses?filter=mobile" className="dashboard-card path-card path-mobile animate-in" style={{ animationDelay: '0.3s' }}>
                <div className="path-icon" style={{ fontSize: '3rem', marginBottom: '16px' }}>📱</div>
                <h3>Mobile Dev</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>Flutter, React Native, Kotlin</p>
                <span className="path-courses" style={{ background: 'rgba(124,58,237,0.1)', color: '#a78bfa', padding: '4px 12px', borderRadius: '100px', fontWeight: 800, fontSize: '0.75rem' }}>{counts.mobile} Courses</span>
              </Link>
              <Link to="/courses?filter=backend" className="dashboard-card path-card path-backend animate-in" style={{ animationDelay: '0.4s' }}>
                <div className="path-icon" style={{ fontSize: '3rem', marginBottom: '16px' }}>⚙️</div>
                <h3>Backend Engineering</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>Java, Go, Databases, APIs</p>
                <span className="path-courses" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--yellow)', padding: '4px 12px', borderRadius: '100px', fontWeight: 800, fontSize: '0.75rem' }}>{counts.backend} Courses</span>
              </Link>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section section-dark">
          <div className="container">
            <div className="section-header animate-in">
              <span className="section-tag">Community</span>
              <h2 className="text-glow">What Our Learners Say</h2>
            </div>
            <div className="testimonials-grid">
              {[
                { init: 'AK', name: 'Arjun Kumar', role: 'Frontend Dev @ Startup', quote: '"LearnCode helped me go from zero to landing my first developer job in 8 months. The projects made all the difference."' },
                { init: 'PS', name: 'Priya Sharma', role: 'Data Analyst', quote: '"I tried many platforms. LearnCode is the only one that felt like it was designed for actual learning, not just content consumption."' },
                { init: 'MR', name: 'Mohamed Rafi', role: 'CS Student', quote: '"The in-browser code editor is amazing. No setup headaches — I can code on my phone during my commute!"' },
              ].map((t, i) => (
                <div key={i} className="dashboard-card animate-in" style={{ animationDelay: `${i * 0.1}s`, textAlign: 'left' }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--text)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '24px' }}>{t.quote}</p>
                  <div className="testimonial-author">
                    <div className={`avatar av${i+1}`} style={{ width: '50px', height: '50px', borderRadius: '15px' }}>{t.init}</div>
                    <div><strong style={{ fontWeight: 800 }}>{t.name}</strong><br /><small style={{ color: 'var(--text3)' }}>{t.role}</small></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="cta-banner premium-mesh-bg animate-in">
          <div className="container">
            <h2 className="text-glow">Ready to write your first line of code?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>Join 10,000+ learners building their future — for free.</p>
            <Link to="/register" className="btn-primary btn-large shimmer">Get Started Free →</Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
