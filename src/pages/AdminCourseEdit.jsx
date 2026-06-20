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
  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, idx) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    const nextLessons = [...lessons];
    const draggedItem = nextLessons.splice(draggedIdx, 1)[0];
    nextLessons.splice(targetIdx, 0, draggedItem);
    setLessons(nextLessons);
    AdminStore.updateCourse(id, { lessons_list: nextLessons });
    setDraggedIdx(null);
  };

  useEffect(() => {
    let isMounted = true;
    const user = Auth.getUser();
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    AdminStore.syncCourses().then(() => {
      if (!isMounted) return;
      const c = AdminStore.getCourse(id);
      if (!c) {
        navigate('/admin/courses');
        return;
      }
      setCourse(c);
      setLessons(c.lessons_list || []);
      setMetadata({ title: c.title || '', language: c.language || '', description: c.description || '' });
    });
    return () => { isMounted = false; };
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
                      draggable
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDrop={(e) => handleDrop(e, idx)}
                      style={{ 
                        padding: '20px 24px', 
                        background: draggedIdx === idx ? 'var(--surface2)' : 'var(--surface)', 
                        border: draggedIdx === idx ? '1px dashed var(--accent)' : '1px solid var(--border)',
                        opacity: draggedIdx === idx ? 0.5 : 1,
                        borderRadius: '16px',
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (draggedIdx === null) {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,88,255,0.08)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (draggedIdx === null) {
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div 
                          style={{ 
                            cursor: 'grab', color: 'var(--text3)', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            padding: '4px', opacity: 0.6, transition: 'opacity 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.opacity = 1}
                          onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
                          title="Drag to reorder"
                        >
                          <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                            <circle cx="2" cy="2" r="1.5" />
                            <circle cx="8" cy="2" r="1.5" />
                            <circle cx="2" cy="8" r="1.5" />
                            <circle cx="8" cy="8" r="1.5" />
                            <circle cx="2" cy="14" r="1.5" />
                            <circle cx="8" cy="14" r="1.5" />
                          </svg>
                        </div>
                        <span style={{ 
                          width: '32px', height: '32px', borderRadius: '8px', 
                          background: 'var(--surface2)', color: 'var(--text3)', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', 
                          fontWeight: 800, fontSize: '0.85rem' 
                        }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', marginLeft: '4px' }}>{lesson.title}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Link 
                          to={`/admin/course/${course.id}/lesson/${lesson.id}`} 
                          style={{ 
                            padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px', 
                            background: 'var(--surface2)', color: 'var(--text)', 
                            border: '1px solid var(--border)', fontWeight: 700, 
                            textDecoration: 'none', transition: 'all 0.2s' 
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                        >
                          ✏️ Edit
                        </Link>
                        <button 
                          onClick={() => removeLesson(lesson.id)}
                          style={{ 
                            padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px', 
                            background: 'rgba(239, 68, 68, 0.05)', color: 'var(--red)', 
                            border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 700, 
                            cursor: 'pointer', transition: 'all 0.2s' 
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'; }}
                        >
                          🗑 Delete
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
