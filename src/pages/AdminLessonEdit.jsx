// src/pages/AdminLessonEdit.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AdminStore } from '../utils/adminStore';
import { Auth } from '../utils/auth';

// Configure marked with highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (__) {}
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

export default function AdminLessonEdit() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [fetchedStatus, setFetchedStatus] = useState('');
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
      const rawPath = l.contentPath || l.url;
      if (rawPath) {
        // Ensure path is absolute from public root
        const path = rawPath.startsWith('http') || rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
        setFetchedStatus('Loading...');
        fetch(path)
          .then(res => {
            if (!res.ok) throw new Error('Not found');
            return res.text();
          })
          .then(text => setContent(text))
          .catch(() => setContent('# ' + l.title + '\nStart writing...'));
      } else {
        setContent('# ' + l.title + '\nStart writing...');
      }
    }
  }, [courseId, lessonId, navigate]);

  // Remove duplicate setFetchedStatus declaration below (already moved up)

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
              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Editing: <span className="gradient-text">{lesson.title}</span></div>
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
          {/* PREVIEW PANE (NOW ON LEFT) */}
          {showPreview && (
            <div style={{ 
              flex: 1, 
              background: 'var(--surface-alt)', 
              overflowY: 'auto', 
              padding: '60px',
              color: 'var(--text1)',
              borderRight: '1px solid var(--border)'
            }}>
              <div className="markdown-content">
                 <div dangerouslySetInnerHTML={{ __html: marked.parse(content || '') }} />
              </div>
            </div>
          )}

          {/* MONACO EDITOR (NOW ON RIGHT) */}
          <div style={{ flex: 1, position: 'relative' }}>
            <Editor
              height="100%"
              defaultLanguage="markdown"
              theme="vs-dark"
              value={content}
              onChange={(val) => setContent(val || '')}
              options={{
                fontSize: 16,
                minimap: { enabled: false },
                wordWrap: 'on',
                padding: { top: 40, right: 40, bottom: 40, left: 40 },
                lineNumbers: 'on',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 28,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'hidden'
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

