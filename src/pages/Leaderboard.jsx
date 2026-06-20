import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchCourses, fetchStudents, Auth } from '../utils/auth';

export default function Leaderboard() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const u = Auth.getUser();
    if (!u) { navigate('/login'); return; }
    setCurrentUser(u);

    async function loadLeaderboard() {
      try {
        const { courses } = await fetchCourses();
        if (!courses || courses.length === 0) return;

        const students = await fetchStudents();
        if (!students) return;

        const scoredStudents = students.map(s => {
          let score = 0;
          const docs = s.progressDocs || [];
          const sEnrolledCount = docs.length;
          score += sEnrolledCount * 10;

          let sCompletedCount = 0;
          docs.forEach(p => {
            const course = courses.find(c => c.id === p.courseId);
            if (course) {
              const cLessons = p.completedLessons?.length || 0;
              score += cLessons * 5;
              if (cLessons === course.lessons) {
                sCompletedCount++;
              }
            } else {
              score += (p.completedLessons?.length || 0) * 5;
              if (p.completed) sCompletedCount++;
            }
          });
          score += sCompletedCount * 20;

          return { ...s, score };
        });

        // Sort by score (descending), then by lastLogin (most recent first)
        scoredStudents.sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          const timeA = new Date(a.lastLogin).getTime();
          const timeB = new Date(b.lastLogin).getTime();
          return timeB - timeA;
        });

        setLeaderboard(scoredStudents);
      } catch (err) {
        console.error("Error loading leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [navigate]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <span className="section-tag">Global Rankings</span>
            <h1 className="text-glow"><span className="gradient-text">Top Performers</span></h1>
            <p style={{ color: 'var(--text2)' }}>
              See how you stack up against other learners. Keep pushing!
            </p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '-40px' }}>
          <div className="dashboard-card animate-in" style={{ padding: '30px', minHeight: '400px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 150px 120px',
              padding: '16px 20px',
              borderBottom: '2px solid var(--border)',
              fontWeight: 800,
              color: 'var(--text3)',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              <div>Rank</div>
              <div>Student</div>
              <div style={{ textAlign: 'center' }}>Last Active</div>
              <div style={{ textAlign: 'right' }}>Score</div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text3)' }}>
                <h3>Loading Rankings...</h3>
              </div>
            ) : leaderboard.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                {leaderboard.map((student, idx) => {
                  const isCurrentUser = currentUser && student.id === currentUser.id;
                  
                  // Styling for Top 3
                  let rankBg = 'var(--surface2)';
                  let rankColor = 'var(--text2)';
                  let rowStyle = {
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 150px 120px',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: isCurrentUser ? 'var(--accent-light)' : 'transparent',
                    border: isCurrentUser ? '1px solid var(--accent)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  };

                  if (idx === 0) { rankBg = '#fbbf24'; rankColor = '#fff'; }
                  else if (idx === 1) { rankBg = '#94a3b8'; rankColor = '#fff'; }
                  else if (idx === 2) { rankBg = '#b45309'; rankColor = '#fff'; }

                  const formatRelativeTime = (dateString) => {
                    const date = new Date(dateString);
                    const now = new Date();
                    const diffMs = now - date;
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    
                    if (diffDays === 0) return 'Today';
                    if (diffDays === 1) return 'Yesterday';
                    if (diffDays < 7) return `${diffDays} days ago`;
                    return date.toLocaleDateString();
                  };

                  return (
                    <div key={student.id} className="leaderboard-row hover-scale" style={rowStyle}>
                      <div>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: rankBg,
                          color: rankColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: '1.1rem',
                          boxShadow: idx < 3 ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
                        }}>
                          {idx + 1}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: '1.2rem',
                          boxShadow: '0 4px 12px rgba(44, 88, 255, 0.3)'
                        }}>
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {student.name}
                            {isCurrentUser && <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'var(--accent)', color: 'white', borderRadius: '100px' }}>YOU</span>}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>{student.courseCount} Courses Enrolled</span>
                        </div>
                      </div>

                      <div style={{ textAlign: 'center', color: 'var(--text2)', fontSize: '0.9rem', fontWeight: 600 }}>
                        {formatRelativeTime(student.lastLogin)}
                      </div>

                      <div style={{ textAlign: 'right', fontWeight: 900, fontSize: '1.4rem', color: 'var(--accent)' }}>
                        {student.score}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text3)' }}>
                <h3>No students on the leaderboard yet.</h3>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
