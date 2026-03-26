// src/pages/AdminCourseEdit.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AdminStore } from '../utils/adminStore';
import { Auth } from '../utils/auth';

export default function AdminCourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [metadata, setMetadata] = useState({ title: '', language: '', description: '' });

  useEffect(() => {
    const user = Auth.getUser();
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    const c = AdminStore.getCourse(id);
    if (!c) {
      navigate('/admin/courses');
      return;
    }
    setCourse(c);
    setLessons(c.lessons_list || []);
    setMetadata({ title: c.title, language: c.language, description: c.description || '' });
  }, [id, navigate]);

  const saveMetadata = () => {
    AdminStore.updateCourse(id, metadata);
    setCourse({ ...course, ...metadata });
    setIsEditingMetadata(false);
  };

  const removeLesson = (lessonId) => {
    if (window.confirm('Are you sure you want to remove this lesson?')) {
      AdminStore.removeLesson(id, lessonId);
      setLessons(lessons.filter(l => l.id !== lessonId));
    }
  };

  const addLesson = () => {
    const title = window.prompt('Enter new lesson title:');
    if (title) {
      const newLesson = {
        id: `new-lesson-${Date.now()}`,
        title: title,
        contentPath: '', // default local path
        content: '# New Lesson\nStart writing content here...'
      };
      AdminStore.addLesson(id, newLesson);
      setLessons([...lessons, newLesson]);
    }
  };

  if (!course) return null;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header showBrand />
        
        <div className="page-header premium-mesh-bg animate-in">
          <div className="container" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
              <Link to="/admin/courses" className="glass-pill" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>←</span> Back to All Courses
              </Link>
              <span className="section-tag">Course Editor</span>
            </div>
            {isEditingMetadata ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', marginTop: '20px' }}>
                <input 
                  className="input-field" 
                  value={metadata.title} 
                  onChange={(e) => setMetadata({ ...metadata, title: e.target.value })} 
                  style={{ fontSize: '1.5rem', fontWeight: 900 }}
                />
                <input 
                  className="input-field" 
                  value={metadata.language} 
                  onChange={(e) => setMetadata({ ...metadata, language: e.target.value })} 
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-primary" onClick={saveMetadata}>Save Changes</button>
                  <button className="btn-alt" onClick={() => setIsEditingMetadata(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <div>
                  <h1 className="text-glow"><span className="gradient-text">{course.title}</span></h1>
                  <p style={{ color: 'var(--text2)' }}>{course.language} • {lessons.length} Lessons</p>
                </div>
                <button className="glass-pill" onClick={() => setIsEditingMetadata(true)}>Edit Details</button>
              </div>
            )}
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px', marginTop: '-40px' }}>
          <div className="animate-in" style={{ animationDelay: '0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0 }}>Lesson Structure</h3>
              <button 
                className="btn-primary" 
                onClick={addLesson}
                style={{ padding: '10px 20px', fontSize: '0.85rem', borderRadius: '12px' }}
              >
                + Add New Lesson
              </button>
            </div>
            
            <div className="dashboard-card" style={{ padding: '10px' }}>
              {lessons.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {lessons.map((lesson, idx) => (
                    <div 
                      key={lesson.id} 
                      className="gradient-border-card" 
                      style={{ 
                        padding: '16px 24px', 
                        background: 'var(--surface1)', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: 'var(--text3)', fontWeight: 800, fontSize: '0.8rem' }}>{idx + 1}</span>
                        <span style={{ fontWeight: 800 }}>{lesson.title}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Link 
                          to={`/admin/course/${course.id}/lesson/${lesson.id}`} 
                          className="btn-alt" 
                          style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: '8px' }}
                        >
                          Edit Content
                        </Link>
                        <button 
                          onClick={() => removeLesson(lesson.id)}
                          className="btn-danger-alt" 
                          style={{ 
                            padding: '6px 14px', 
                            fontSize: '0.75rem', 
                            borderRadius: '8px', 
                            background: 'rgba(239, 68, 68, 0.1)', 
                            color: '#ef4444', 
                            border: '1px solid rgba(239, 68, 68, 0.2)' 
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text3)' }}>
                  No lessons found in this course. Click "+ Add New Lesson" to get started.
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
