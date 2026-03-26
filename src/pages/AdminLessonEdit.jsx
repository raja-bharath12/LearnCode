// src/pages/AdminLessonEdit.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { marked } from 'marked';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AdminStore } from '../utils/adminStore';
import { Auth } from '../utils/auth';

export default function AdminLessonEdit() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const user = Auth.getUser();
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    const c = AdminStore.getCourse(courseId);
    if (!c) {
      navigate('/admin/courses');
      return;
    }
    setCourse(c);
    
    const l = (c.lessons_list || []).find(it => String(it.id) === String(lessonId));
    if (!l) {
      navigate(`/admin/course/${courseId}`);
      return;
    }
    setLesson(l);

    // Load content from AdminStore (override) or fetch from source
    const stored = AdminStore.getLessonContent(courseId, lessonId);
    if (stored) {
      setContent(stored);
    } else {
      if (l.url) {
        setFetchedStatus('Loading...');
        fetch(l.url)
          .then(res => res.text())
          .then(text => setContent(text))
          .catch(() => setContent('# ' + (l.name || l.title) + '\nStart writing...'));
      } else {
        setContent('# ' + (l.name || l.title) + '\nStart writing...');
      }
    }
  }, [courseId, lessonId, navigate]);

  const [fetchedStatus, setFetchedStatus] = useState('');

  const handleSave = () => {
    setSaving(true);
    AdminStore.saveLessonContent(courseId, lessonId, content);
    setTimeout(() => {
      setSaving(false);
    }, 800);
  };

  if (!course || !lesson) return null;

  return (
    <div className="app-container" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div className="main-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
        <Header showBrand={false} />
        
        {/* EDITOR CONTROLS */}
        <div style={{ 
          padding: '12px 30px', 
          background: 'var(--surface1)', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to={`/admin/course/${courseId}`} className="glass-pill" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
              ✕ Close
            </Link>
            <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text3)', fontWeight: 800 }}>COURSE: {course.title.toUpperCase()}</div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Editing: <span className="gradient-text">{lesson.name}</span></div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button 
              className="glass-pill"
              onClick={() => setShowPreview(!showPreview)}
              style={{ padding: '8px 16px', fontSize: '0.75rem', background: showPreview ? 'var(--accent-light)' : 'transparent', color: showPreview ? 'var(--accent)' : 'inherit' }}
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <div style={{ fontSize: '0.75rem', color: saving ? 'var(--accent)' : 'var(--text3)' }}>
              {saving ? 'Saving...' : 'Draft saved locally'}
            </div>
            <button 
              className="btn-primary shimmer" 
              onClick={handleSave}
              disabled={saving}
              style={{ padding: '10px 24px', borderRadius: '12px', minWidth: '120px' }}
            >
              {saving ? '...' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* EDITOR & PREVIEW AREA */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* MONACO EDITOR */}
          <div style={{ flex: 1, position: 'relative', borderRight: showPreview ? '1px solid var(--border)' : 'none' }}>
            <Editor
              height="100%"
              defaultLanguage="markdown"
              theme="vs-dark"
              value={content}
              onChange={(val) => setContent(val || '')}
              options={{
                fontSize: 15,
                minimap: { enabled: false },
                wordWrap: 'on',
                padding: { top: 30, right: 30, bottom: 30, left: 30 },
                lineNumbers: 'on',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 24,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'hidden'
                }
              }}
            />
          </div>

          {/* PREVIEW PANE */}
          {showPreview && (
            <div style={{ 
              flex: 1, 
              background: 'var(--surface1)', 
              overflowY: 'auto', 
              padding: '40px',
              color: 'var(--text1)'
            }}>
              <div className="markdown-content">
                 <div dangerouslySetInnerHTML={{ __html: marked.parse(content || '') }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

