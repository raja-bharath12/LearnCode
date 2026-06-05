// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, fetchCourses, fetchStudents } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AdminStore } from '../utils/adminStore';
import { jsPDF } from 'jspdf';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [exportingPdf, setExportingPdf] = useState(false);

  useEffect(() => {
    const u = Auth.getUser();
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);

    const data = AdminStore.getCourses();
    setCourses(data);
    AdminStore.syncCourses().then(() => {
      setCourses(AdminStore.getCourses());
    });

    // Fetch real students from Firestore
    fetchStudents()
      .then(list => setStudents(list))
      .catch(() => setStudents([]))
      .finally(() => setLoadingStudents(false));
  }, []);

  const handleExportPDF = () => {
    if (students.length === 0) return;
    setExportingPdf(true);
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      
      students.forEach((student, i) => {
        if (i > 0) {
          doc.addPage();
        }
        
        // --- Page Decorative Framing ---
        // Draw thin framing border (at 10mm margins)
        doc.setDrawColor(226, 232, 240); // #e2e8f0
        doc.setLineWidth(0.3);
        doc.rect(10, 10, 190, 277, 'S');

        // Corner decorative ticks
        doc.setDrawColor(148, 163, 184); // #94a3b8
        doc.setLineWidth(0.5);
        // Top-left
        doc.line(8, 10, 13, 10);
        doc.line(10, 8, 10, 13);
        // Top-right
        doc.line(197, 10, 202, 10);
        doc.line(200, 8, 200, 13);
        // Bottom-left
        doc.line(8, 287, 13, 287);
        doc.line(10, 284, 10, 289);
        // Bottom-right
        doc.line(197, 287, 202, 287);
        doc.line(200, 284, 200, 289);

        // Top solid accent strip
        doc.setFillColor(44, 88, 255); // #2c58ff
        doc.rect(10, 10, 190, 3, 'F');

        // --- 1. Page Header ---
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // #94a3b8
        doc.text('LEARNCODE ACADEMY', 15, 20);

        doc.setFont('Helvetica', 'normal');
        doc.text('OFFICIAL RECORD // STUDENT PROGRESS REPORT', 195, 20, { align: 'right' });

        doc.setDrawColor(226, 232, 240); // #e2e8f0
        doc.setLineWidth(0.5);
        doc.line(15, 23, 195, 23);
        
        // --- 2. Student Profile Hero Card ---
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(15, 28, 180, 42, 3, 3, 'FD');
        
        doc.setFillColor(44, 88, 255);
        doc.roundedRect(15, 28, 3, 42, 3, 3, 'F');
        doc.rect(17, 28, 1, 42, 'F'); // align square corner edge
        
        // Initial Avatar Circle
        const avatarInitial = student.name.charAt(0).toUpperCase();
        doc.setFillColor(224, 231, 255); // soft indigo background
        doc.circle(30, 49, 8, 'F');
        
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(79, 70, 229); // #4f46e5
        doc.text(avatarInitial, 30, 52.8, { align: 'center' });
        
        // Typography metadata columns
        // Col 1 (x = 44)
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139); // #64748b
        doc.text('STUDENT PROFILE', 44, 35);
        
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42); // #0f172a
        doc.text(student.name, 44, 42);
        
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text('EMAIL ADDRESS', 44, 51);
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85); // #334155
        doc.text(student.email, 44, 57);
        
        // Col 2 (x = 115)
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text('ENROLLMENT DATE', 115, 35);
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const joinedDate = new Date(student.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        doc.text(joinedDate, 115, 42);
        
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text('DATE OF BIRTH', 115, 51);
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const dobText = student.dob ? new Date(student.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'NOT RECORDED';
        doc.text(dobText, 115, 57);
        
        // --- 3. Academy Statistics Metrics Grid ---
        const progressDocs = student.progressDocs || [];
        const studentCourses = courses.filter(c => progressDocs.some(p => p.courseId === c.id));
        
        const completedCoursesCount = studentCourses.filter(c => {
          const pDoc = progressDocs.find(p => p.courseId === c.id);
          const totalLessons = c.lessons || c.lessons_list?.length || 0;
          const completedCount = pDoc?.completedLessons?.length || 0;
          return totalLessons > 0 && completedCount >= totalLessons;
        }).length;

        let avgProgress = 0;
        if (studentCourses.length > 0) {
          const totalPct = studentCourses.reduce((sum, c) => {
            const pDoc = progressDocs.find(p => p.courseId === c.id);
            const totalLessons = c.lessons || c.lessons_list?.length || 0;
            const completedCount = pDoc?.completedLessons?.length || 0;
            const pct = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;
            return sum + pct;
          }, 0);
          avgProgress = Math.round(totalPct / studentCourses.length);
        }

        // Card 1
        doc.setFillColor(241, 245, 249); // #f1f5f9
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(15, 76, 56, 20, 2, 2, 'FD');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text('ACTIVE ENROLLMENTS', 43, 82, { align: 'center' });
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42);
        doc.text(String(studentCourses.length), 43, 91, { align: 'center' });

        // Card 2
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(77, 76, 56, 20, 2, 2, 'FD');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text('COURSES COMPLETED', 105, 82, { align: 'center' });
        doc.setFontSize(13);
        doc.setTextColor(completedCoursesCount > 0 ? 22 : 15, completedCoursesCount > 0 ? 163 : 23, completedCoursesCount > 0 ? 74 : 42);
        doc.text(String(completedCoursesCount), 105, 91, { align: 'center' });

        // Card 3
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(139, 76, 56, 20, 2, 2, 'FD');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text('AVERAGE PROGRESS', 167, 82, { align: 'center' });
        doc.setFontSize(13);
        doc.setTextColor(79, 70, 229);
        doc.text(`${avgProgress}%`, 167, 91, { align: 'center' });
        
        // --- 4. Course Telemetry Table Section ---
        doc.setFillColor(44, 88, 255);
        doc.rect(15, 104, 3, 5, 'F');
        
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(15, 23, 42);
        doc.text('DETAILED COURSE TELEMETRY & PROGRESS', 21, 108);

        // Table Header
        doc.setFillColor(30, 41, 59); // #1e293b
        doc.roundedRect(15, 112, 180, 7, 1.5, 1.5, 'F');
        doc.rect(15, 115, 180, 4, 'F'); // flatten bottom
        
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(255, 255, 255);
        doc.text('COURSE TITLE', 18, 117);
        doc.text('LANGUAGE', 68, 117);
        doc.text('TIME SPENT', 86, 117);
        doc.text('PROGRESS', 106, 117);
        doc.text('TEST STATUS', 136, 117);
        doc.text('STATUS', 158, 117);
        doc.text('STATS', 192, 117, { align: 'right' });
        
        let rowY = 119;
        if (studentCourses.length === 0) {
          doc.setFillColor(248, 250, 252);
          doc.setDrawColor(226, 232, 240);
          doc.roundedRect(15, rowY, 180, 20, 2, 2, 'FD');
          doc.setFont('Helvetica', 'italic');
          doc.setFontSize(9.5);
          doc.setTextColor(148, 163, 184);
          doc.text('No active course participation registered for this student.', 105, rowY + 12, { align: 'center' });
        } else {
          studentCourses.forEach((c, idx) => {
            const pDoc = progressDocs.find(p => p.courseId === c.id);
            const totalLessons = c.lessons || c.lessons_list?.length || 0;
            const completedCount = pDoc?.completedLessons?.length || 0;
            const pct = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;
            
            // Zebra row background
            if (idx % 2 === 1) {
              doc.setFillColor(248, 250, 252);
              doc.rect(15, rowY, 180, 11, 'F');
            }
            
            // Bottom line border
            doc.setDrawColor(241, 245, 249);
            doc.setLineWidth(0.3);
            doc.line(15, rowY + 11, 195, rowY + 11);
            
            // Title
            const displayTitle = c.title.length > 25 ? c.title.substring(0, 23) + '...' : c.title;
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(8.5);
            doc.setTextColor(15, 23, 42);
            doc.text(displayTitle, 18, rowY + 7);
            
            // Language
            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(71, 85, 105);
            doc.text(c.language || 'N/A', 68, rowY + 7);
            
            // Time Spent
            const hrs = (completedCount * 0.25).toFixed(1);
            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(71, 85, 105);
            doc.text(`${hrs} hrs`, 86, rowY + 7);
            
            // Progress Bar Background Capsule
            doc.setFillColor(226, 232, 240);
            doc.roundedRect(106, rowY + 4.5, 16, 2.5, 0.5, 0.5, 'F');
            
            // Progress Bar Fill Capsule
            if (pct > 0) {
              if (pct === 100) {
                doc.setFillColor(34, 197, 94); // var(--green)
              } else {
                doc.setFillColor(44, 88, 255); // var(--accent)
              }
              const fillWidth = Math.max(0.8, 16 * (pct / 100));
              doc.roundedRect(106, rowY + 4.5, fillWidth, 2.5, 0.5, 0.5, 'F');
            }
            
            // Progress Text
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(100, 116, 139);
            doc.text(`${pct}%`, 124, rowY + 7);
            
            // Test Status Badge
            const isTestReady = pct === 100;
            const testText = isTestReady ? 'READY' : 'LOCKED';
            
            doc.setFillColor(isTestReady ? 220 : 241, isTestReady ? 252 : 245, isTestReady ? 231 : 249); // green fill vs grey fill
            doc.roundedRect(136, rowY + 4, 18, 4.5, 1, 1, 'F');
            
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(6);
            doc.setTextColor(isTestReady ? 21 : 100, isTestReady ? 128 : 116, isTestReady ? 61 : 139); // green text vs grey text
            doc.text(testText, 145, rowY + 7.2, { align: 'center' });
            
            // Course Status Badge (COMPLETED vs ACTIVE vs LOCKED)
            const isComp = pct === 100;
            const badgeText = isComp ? 'COMPLETED' : (pct > 0 ? 'ACTIVE' : 'LOCKED');
            
            doc.setFillColor(isComp ? 220 : (pct > 0 ? 224 : 241), isComp ? 252 : (pct > 0 ? 231 : 245), isComp ? 231 : (pct > 0 ? 255 : 249)); // green vs blue vs grey
            doc.roundedRect(158, rowY + 4, 18, 4.5, 1, 1, 'F');
            
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(6);
            doc.setTextColor(isComp ? 21 : (pct > 0 ? 79 : 100), isComp ? 128 : (pct > 0 ? 70 : 116), isComp ? 61 : (pct > 0 ? 229 : 139));
            doc.text(badgeText, 167, rowY + 7.2, { align: 'center' });
            
            // Completion Stats Numbers
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(100, 116, 139);
            doc.text(`${completedCount}/${totalLessons}`, 192, rowY + 7, { align: 'right' });
            
            rowY += 11;
          });
        }
        
        // --- 5. Footer ---
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(15, 272, 195, 272);
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(148, 163, 184);
        doc.text(`Report Generated on ${new Date().toLocaleString()}`, 15, 278);
        
        doc.setFont('Helvetica', 'bold');
        doc.text(`PAGE ${i + 1} OF ${students.length}`, 195, 278, { align: 'right' });
      });
      
      doc.save('learncode-student-roster.pdf');
    } catch (e) {
      console.error('PDF export failed:', e);
      alert('Failed to generate PDF. Check console for details.');
    } finally {
      setExportingPdf(false);
    }
  };

  if (!user) return null;

  const activeCourses = courses.filter(c => !c.hidden);

  const stats = [
    { label: 'Total Students', value: students.length, icon: '👥', color: '#6366f1', path: null },
    { label: 'Active Courses', value: activeCourses.length, icon: '📚', color: '#8b5cf6', path: '/admin/courses' },
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />

        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <span className="section-tag" style={{ background: 'rgba(255,255,255,0.2)' }}>Control Center</span>
            <h1 className="text-glow">Admin <span className="gradient-text">Command Hub</span></h1>
            <p style={{ maxWidth: '700px' }}>Manage your academy, oversee instructors, and track student success metrics at a glance.</p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '-40px' }}>
          {/* STATS GRID */}
          <div className="stats-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '24px', 
            marginBottom: '48px' 
          }}>
            {stats.map((s, idx) => (
              <div 
                key={s.label} 
                className="dashboard-card animate-in" 
                onClick={() => s.path && navigate(s.path)}
                style={{ 
                  animationDelay: `${idx * 0.1}s`, 
                  border: '1px solid var(--border)',
                  cursor: s.path ? 'pointer' : 'default'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: `${s.color}15`, 
                    color: s.color,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2px' }}>{s.value}</h2>
                    <p style={{ color: 'var(--text3)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {/* STUDENT ROSTER */}
            <div className="animate-in" style={{ flex: '2', minWidth: '400px', animationDelay: '0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📋</span> Student Roster
                </h3>
                <button
                  className="btn-premium-export"
                  onClick={handleExportPDF}
                  disabled={exportingPdf || loadingStudents || students.length === 0}
                >
                  {exportingPdf ? (
                    <>⏳ Exporting...</>
                  ) : (
                    <>
                      <span>📄</span> Export Roster
                    </>
                  )}
                </button>
              </div>
              <div className="dashboard-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Name</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Email</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Enrollment Date</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Courses</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingStudents ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text3)' }}>
                          ⏳ Loading students...
                        </td>
                      </tr>
                    ) : students.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text3)' }}>
                          No students registered yet.
                        </td>
                      </tr>
                    ) : (
                      students.map((student, idx) => (
                        <tr key={student.id} style={{ borderBottom: idx === students.length - 1 ? 'none' : '1px solid var(--border)' }}>
                          <td style={{ padding: '20px 24px', fontWeight: 800 }}>{student.name}</td>
                          <td style={{ padding: '20px 24px', color: 'var(--text2)' }}>{student.email}</td>
                          <td style={{ padding: '20px 24px', color: 'var(--text3)' }}>
                            {new Date(student.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '20px 24px' }}>
                            <span style={{ 
                              background: 'var(--accent-light)', 
                              color: 'var(--accent)', 
                              padding: '4px 12px', 
                              borderRadius: '100px', 
                              fontSize: '0.75rem', 
                              fontWeight: 900 
                            }}>
                              {student.courseCount} Courses
                            </span>
                          </td>
                          <td style={{ padding: '20px 24px' }}>
                            <Link to={`/admin/student/${student.id}`} className="start-link" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                              Detail →
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ADMIN ACTIONS */}
            <div className="animate-in" style={{ flex: '1', minWidth: '300px', animationDelay: '0.4s' }}>
              <h3 style={{ marginBottom: '24px' }}>Admin Actions</h3>
              <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button 
                  className="shimmer" 
                  onClick={() => navigate('/admin/courses')}
                  style={{ 
                    background: 'var(--accent)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '16px 20px', 
                    borderRadius: '16px', 
                    fontWeight: 800, 
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>➕</span> Add New Course
                  <span style={{ marginLeft: 'auto', opacity: 0.7, fontSize: '0.85rem' }}>→</span>
                </button>
                <button 
                  onClick={() => navigate('/admin/announcements')}
                  style={{ 
                    background: 'var(--surface2)', 
                    color: 'var(--text)', 
                    border: '1px solid var(--border)', 
                    padding: '16px 20px', 
                    borderRadius: '16px', 
                    fontWeight: 800, 
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  <span style={{ fontSize: '1.2rem' }}>📢</span> Post Announcement
                  <span style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '0.85rem' }}>→</span>
                </button>
                <button 
                  onClick={() => navigate('/admin/settings')}
                  style={{ 
                    background: 'var(--surface2)', 
                    color: 'var(--text)', 
                    border: '1px solid var(--border)', 
                    padding: '16px 20px', 
                    borderRadius: '16px', 
                    fontWeight: 800, 
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  <span style={{ fontSize: '1.2rem' }}>⚙️</span> Academy Settings
                  <span style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '0.85rem' }}>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
