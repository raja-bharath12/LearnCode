// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="header-brand">LearnCode</Link>
          <p>Free programming education for everyone, everywhere.</p>
        </div>
        <div className="footer-links">
          <h4>Courses</h4>
          <ul>
            <li><a href="#">Python</a></li>
            <li><a href="#">JavaScript</a></li>
            <li><a href="#">Java</a></li>
            <li><a href="#">C++</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 LearnCode. Made with ❤️ for learners worldwide.</p>
      </div>
    </footer>
  );
}
