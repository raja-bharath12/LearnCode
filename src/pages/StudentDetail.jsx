import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, fetchStudentById, fetchCourses } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';



export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const u = Auth.getUser();
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);

    fetchStudentById(id).then(s => {
      if (!s) { navigate('/admin-dashboard'); return; }
      setStudent(s);
    });

    fetchCourses().then(data => {
      if (data?.courses) setCourses(data.courses);
    });
  }, [id]);

  if (!user || !student) return null;

  const handleToggleBlock = async () => {
    const action = student.isBlocked ? 'unblock' : 'block';
    if (window.confirm(`Are you sure you want to ${action} this student?`)) {
      try {
        await updateDoc(doc(db, 'users', student.id), { isBlocked: !student.isBlocked });
        setStudent({ ...student, isBlocked: !student.isBlocked });
        import('../components/Toast').then(({ showToast }) => showToast(`Student ${action}ed successfully.`, 'success'));
      } catch (e) {
        import('../components/Toast').then(({ showToast }) => showToast(`Failed to ${action} student.`, 'error'));
      }
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  // Build a map of courseId -> real progress % from Firestore progress docs
  const progressMap = {};
  (student.progressDocs || []).forEach(p => {
    const course = courses.find(c => c.id === p.courseId);
    if (course && course.lessons) {
      progressMap[p.courseId] = Math.min(100, Math.round((p.completedLessons?.length || 0) / course.lessons * 100));
    }
  });

  // Courses this student has any progress on
  const activeCourseIds = (student.progressDocs || []).map(p => p.courseId);
  const studentCourses = courses.filter(c => activeCourseIds.includes(c.id));

  const formatDate = (iso) => {
    try { return new Date(iso).toLocaleDateString(); } catch { return '—'; }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
              <Link to="/admin-dashboard" className="glass-pill" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>←</span> Back to Dashboard
              </Link>
              <span className="section-tag">Student Intelligence</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h1 className="text-glow"><span className="gradient-text">{student.name}</span></h1>
                <p style={{ color: 'var(--text2)' }}>
                  {student.email} • Joined {new Date(student.createdAt).toLocaleDateString()}
                  {student.isBlocked && <span style={{ color: '#ef4444', fontWeight: 'bold', marginLeft: '10px' }}>[BLOCKED]</span>}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={handleExportPDF} className="btn-alt" style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '12px', background: 'var(--surface2)' }}>
                  📄 Export PDF
                </button>
                <button 
                  onClick={handleToggleBlock} 
                  className="btn-primary" 
                  style={{ 
                    padding: '10px 20px', 
                    fontSize: '0.9rem', 
                    borderRadius: '12px', 
                    background: student.isBlocked ? '#22c55e' : '#ef4444', 
                    border: 'none',
                    boxShadow: 'none'
                  }}
                >
                  {student.isBlocked ? '✅ Unblock Student' : '🚫 Block Student'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '-40px' }}>
          {/* COURSE PROGRESS OVERVIEW */}
          <div className="animate-in" style={{ marginBottom: '40px' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📈</span> Course Progress Summary
            </h3>
            <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px' }}>
              {studentCourses.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text3)', padding: '20px' }}>No course activity recorded yet.</p>
              ) : (
                studentCourses.map(c => {
                  const pct = progressMap[c.id] ?? 0;
                  return (
                    <div key={c.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 800 }}>{c.title}</span>
                        <span style={{ color: pct === 100 ? 'var(--green)' : 'var(--accent)', fontWeight: 900 }}>{pct}%</span>
                      </div>
                      <div className="progress-bar" style={{ height: '10px', background: 'var(--surface2)', borderRadius: '20px', overflow: 'hidden' }}>
                        <div className="progress-fill" style={{
                          width: `${pct}%`,
                          background: pct === 100 ? 'var(--green)' : 'linear-gradient(90deg, var(--accent), #7c3aed)',
                          boxShadow: '0 0 10px rgba(44,88,255,0.2)'
                        }} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {/* ENROLLED COURSES */}
            <div className="animate-in" style={{ flex: '2', minWidth: '400px', animationDelay: '0.2s' }}>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📖</span> Participating Courses
              </h3>
              <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {studentCourses.length > 0 ? (
                  studentCourses.map(c => {
                    const progress = progressMap[c.id] ?? 0;
                    return (
                      <div key={c.id} className="gradient-border-card" style={{ padding: '24px', background: 'var(--surface1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                          <div>
                            <h4 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: 900 }}>{c.title}</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text3)' }}>{c.language} • {c.lessons} Lessons</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ 
                              color: progress === 100 ? 'var(--green)' : 'var(--accent)', 
                              fontWeight: 900, 
                              fontSize: '1.1rem' 
                            }}>
                              {progress}%
                            </span>
                          </div>
                        </div>
                        <div className="progress-bar" style={{ height: '10px', background: 'var(--surface2)', borderRadius: '20px', overflow: 'hidden' }}>
                          <div className="progress-fill" style={{ 
                            width: `${progress}%`, 
                            background: progress === 100 ? 'var(--green)' : 'linear-gradient(90deg, var(--accent), #7c3aed)',
                            boxShadow: '0 0 10px rgba(44, 88, 255, 0.2)'
                          }}></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--text3)', padding: '40px' }}>This student has not started any courses yet.</p>
                )}
              </div>
            </div>

            {/* PERFORMANCE SUMMARY */}
            <div className="animate-in" style={{ flex: '1', minWidth: '300px', animationDelay: '0.3s' }}>
              <h3 style={{ marginBottom: '24px' }}>Performance Radar</h3>
              <div className="dashboard-card" style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '24px', 
                  background: 'var(--accent-light)', 
                  color: 'var(--accent)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '2rem', 
                  margin: '0 auto 20px' 
                }}>
                  {student.name.charAt(0)}
                </div>
                <h4 style={{ margin: '0 0 4px' }}>{student.name}</h4>
                <p style={{ color: 'var(--text3)', fontSize: '0.85rem', marginBottom: '16px' }}>{student.email}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface2)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Joined</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{formatDate(student.createdAt)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface2)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Courses Active</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{studentCourses.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface2)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Completed</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--green)' }}>
                      {Object.values(progressMap).filter(p => p === 100).length}
                    </span>
                  </div>
                  {student.dob && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface2)', padding: '12px 16px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>D.O.B</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                        {new Date(student.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
