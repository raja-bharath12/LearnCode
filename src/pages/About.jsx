// src/pages/About.jsx
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <header className="top-header">
          <div className="container header-container">
            <Link to="/" className="header-brand">LearnCode</Link>
          </div>
        </header>

        <div className="page-header">
          <div className="container">
            <span className="section-tag">About Us</span>
            <h1>Our <span className="gradient-text">Mission</span></h1>
            <p>Free, world-class programming education for everyone.</p>
          </div>
        </div>

        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '32px' }}>
              LearnCode was founded with a simple belief: <strong style={{ color: 'var(--text1)' }}>everyone deserves access to quality programming education</strong>, regardless of background or budget.
            </p>
            <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '32px' }}>
              We offer 50+ structured courses covering Python, JavaScript, Java, C++, and more — all completely free, forever. Our hands-on learning approach combines theory with real code exercises, giving learners practical skills they can immediately apply.
            </p>
            <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {[
                { icon: '🌍', title: 'Accessible', desc: '100% free, no credit card, works on any device.' },
                { icon: '🛠️', title: 'Hands-on', desc: 'Code directly in the browser with instant feedback.' },
                { icon: '📈', title: 'Structured', desc: 'Carefully designed paths from beginner to expert.' },
                { icon: '🏆', title: 'Recognised', desc: 'Earn certificates to share with employers.' },
              ].map(item => (
                <div key={item.title} className="step-card">
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
