// src/pages/StudentDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, MOCK_STUDENTS, MOCK_COURSES, fetchCourses } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

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

    const s = MOCK_STUDENTS.find(item => item.id === id);
    if (!s) { navigate('/admin-dashboard'); return; }
    setStudent(s);

    fetchCourses().then(data => {
      if (data?.courses) setCourses(data.courses);
      else setCourses(MOCK_COURSES);
    });
  }, [id]);

  if (!user || !student) return null;

  // Enrolled courses for this student
  const studentCourses = courses.filter(c => student.stats.courses.includes(c.id));

  // Helper to generate a consistent but random-looking progress for demo students
  const getMockProgress = (studentId, courseId) => {
    const seed = (studentId.charCodeAt(1) || 0) + courseId;
    return (seed * 17) % 100;
  };

  // Helper to generate mock activity data from registration date to today
  const getActivityData = (student) => {
    const start = new Date(student.createdAt);
    const end = new Date();
    const data = [];
    const seed = (student.id.charCodeAt(1) || 0);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      data.push({
        name: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        minutes: Math.max(10, (seed * (data.length + 1) * 7) % 150 + Math.random() * 20)
      });
    }
    // If range is too small, show at least 7 days
    while (data.length < 7) {
      const prev = new Date(start);
      prev.setDate(prev.getDate() - (7 - data.length));
      data.unshift({
        name: prev.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        minutes: 0
      });
    }
    return data;
  };

  const activityData = getActivityData(student);

  const totalMinutes = activityData.reduce((acc, curr) => acc + curr.minutes, 0);
  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
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
            <h1 className="text-glow"><span className="gradient-text">{student.name}</span></h1>
            <p style={{ color: 'var(--text2)' }}>{student.email} • Joined {new Date(student.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '-40px' }}>
          {/* ACTIVITY CHART SECTION */}
          <div className="animate-in" style={{ marginBottom: '40px' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>⌛</span> Total Time Contribution (Since Registration)
            </h3>
            <div className="dashboard-card" style={{ height: '350px', padding: '30px 20px 20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text3)', fontSize: 10 }}
                    dy={10}
                    interval="preserveStartEnd"
                    minTickGap={30}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text3)', fontSize: 12 }}
                    unit="m"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--surface1)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
                    }}
                    itemStyle={{ color: 'var(--accent)', fontWeight: 800 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="minutes" 
                    stroke="var(--accent)" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorMinutes)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
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
                    const progress = getMockProgress(student.id, c.id);
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
                  <p style={{ textAlign: 'center', color: 'var(--text3)', padding: '40px' }}>This student has not enrolled in any courses yet.</p>
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
                <h4 style={{ margin: '0 0 8px' }}>{student.name}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface2)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Commitment</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>High</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface2)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Quiz Accuracy</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>92%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface2)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Total Active</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{formatTime(totalMinutes)}</span>
                  </div>
                </div>
                <button className="btn-primary" style={{ width: '100%', marginTop: '32px', borderRadius: '12px' }}>Send Message</button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
