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
        <section className="hero">
          <div className="hero-bg-grid"></div>
          <div className="container hero-container">
            <div className="hero-content">
              <div className="hero-badge">100% Free • No Credit Card</div>
              <h1>Learn to <span className="gradient-text">Code</span><br />Change Your World</h1>
              <p className="hero-sub">Master Python, JavaScript, C++, Java and more with hands-on lessons, live code editors, and real projects — completely free, forever.</p>
              <div className="hero-cta">
                <Link to="/courses" className="btn-primary">Explore Courses →</Link>
              </div>
              <div className="hero-stats">
                <div className="stat"><span className="stat-num">{courses.length || 50}+</span><span className="stat-label">Courses</span></div>
                <div className="stat-divider"></div>
                <div className="stat"><span className="stat-num">{totalLessons || 200}+</span><span className="stat-label">Lessons</span></div>
                <div className="stat-divider"></div>
                <div className="stat"><span className="stat-num" id="learner-count">{learnerCount}</span><span className="stat-label">Learners</span></div>
              </div>
            </div>
            <div className="hero-code-window">
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
            <div className="section-header">
              <span className="section-tag">Popular</span>
              <h2>Start With These Courses</h2>
              <p>Structured paths from beginner to pro.</p>
            </div>
            <div className="courses-grid">
              {featured.map(c => (
                <Link key={c.id} to={`/lesson?course=${c.id}`} className="course-card">
                  <div className="course-card-top" style={{ '--accent': c.color || 'var(--accent)' }}>
                    <span className="course-icon">{c.icon || ''}</span>
                    <span className={`course-level level-${(c.level || 'Beginner').toLowerCase()}`}>{c.level || 'Beginner'}</span>
                  </div>
                  <div className="course-card-body">
                    <h3>{c.title}</h3>
                    <p>{c.language || c.lang} • {c.lessons} Lessons</p>
                  </div>
                  <div className="course-card-footer">
                    <span className="free-badge">FREE</span>
                    <span className="start-link">Start →</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="section-cta">
              <Link to="/courses" className="btn-primary">View All Courses →</Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section section-dark">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Process</span>
              <h2>How LearnCode Works</h2>
            </div>
            <div className="steps-grid">
              {[
                { num: '01', title: 'Pick a Course', desc: 'Choose from 50+ free courses across languages, frameworks, and domains.' },
                { num: '02', title: 'Learn by Doing', desc: 'Read bite-sized theory, then code right in your browser with instant feedback.' },
                { num: '03', title: 'Build Projects', desc: 'Apply your skills on real projects that you can add to your portfolio.' },
                { num: '04', title: 'Earn Certificates', desc: 'Complete a course and earn a free verifiable certificate to share with employers.' },
              ].map((step, i) => (
                <>
                  <div key={step.num} className="step-card">
                    <div className="step-num">{step.num}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                  {i < 3 && <div key={`arrow-${i}`} className="step-arrow">→</div>}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* CAREER PATHS */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Career Paths</span>
              <h2>Where Do You Want to Go?</h2>
            </div>
            <div className="paths-grid">
              <Link to="/courses?filter=web" className="path-card path-web">
                <div className="path-icon"></div>
                <h3>Web Development</h3>
                <p>HTML, CSS, JS, React, Node.js</p>
                <span className="path-courses">{counts.web} Courses</span>
              </Link>
              <Link to="/courses?filter=data" className="path-card path-data">
                <div className="path-icon"></div>
                <h3>Data Science</h3>
                <p>Python, Pandas, ML, Visualization</p>
                <span className="path-courses">{counts.data} Courses</span>
              </Link>
              <Link to="/courses?filter=mobile" className="path-card path-mobile">
                <div className="path-icon"></div>
                <h3>Mobile Dev</h3>
                <p>Flutter, React Native, Kotlin</p>
                <span className="path-courses">{counts.mobile} Courses</span>
              </Link>
              <Link to="/courses?filter=backend" className="path-card path-backend">
                <div className="path-icon">️</div>
                <h3>Backend Engineering</h3>
                <p>Java, Go, Databases, APIs</p>
                <span className="path-courses">{counts.backend} Courses</span>
              </Link>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section section-dark">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Community</span>
              <h2>What Our Learners Say</h2>
            </div>
            <div className="testimonials-grid">
              {[
                { init: 'AK', name: 'Arjun Kumar', role: 'Frontend Dev @ Startup', quote: '"LearnCode helped me go from zero to landing my first developer job in 8 months. The projects made all the difference."' },
                { init: 'PS', name: 'Priya Sharma', role: 'Data Analyst', quote: '"I tried many platforms. LearnCode is the only one that felt like it was designed for actual learning, not just content consumption."' },
                { init: 'MR', name: 'Mohamed Rafi', role: 'CS Student', quote: '"The in-browser code editor is amazing. No setup headaches — I can code on my phone during my commute!"' },
              ].map((t, i) => (
                <div key={i} className="testimonial-card">
                  <p>{t.quote}</p>
                  <div className="testimonial-author">
                    <div className={`avatar av${i+1}`}>{t.init}</div>
                    <div><strong>{t.name}</strong><br /><small>{t.role}</small></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="cta-banner">
          <div className="container">
            <h2>Ready to write your first line of code?</h2>
            <p>Join 10,000+ learners building their future — for free.</p>
            <Link to="/register" className="btn-primary btn-large">Get Started Free →</Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
