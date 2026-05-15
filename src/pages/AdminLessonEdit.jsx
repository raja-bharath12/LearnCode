// src/pages/AdminLessonEdit.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { marked } from 'marked';
import hljs from 'highlight.js';
import Sidebar from '../components/Sidebar';
import RichEditor from '../components/RichEditor';
import { AdminStore } from '../utils/adminStore';
import { Auth } from '../utils/auth';
import { showToast } from '../components/Toast';

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try { return hljs.highlight(code, { language: lang }).value; } catch (__) {}
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
});

export default function AdminLessonEdit() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const scrollRef = useRef(null);

  // Update word count whenever content changes
  useEffect(() => {
    const words = content.replace(/[#*`>~_\-]/g, '').trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [content]);

  /* ── Load content ─────────────────────────────────── */
  useEffect(() => {
    const user = Auth.getUser();
    if (!user || user.role !== 'admin') { navigate('/login'); return; }

    const c = AdminStore.getCourse(courseId);
    if (!c) { navigate('/admin/courses'); return; }
    setCourse(c);

    const l = (c.lessons_list || []).find(it => String(it.id) === String(lessonId));
    if (!l) { navigate(`/admin/course/${courseId}`); return; }
    setLesson(l);

    const stored = AdminStore.getLessonContent(courseId, lessonId);
    if (stored) {
      setContent(stored);
    } else {
      const rawPath = l.contentPath || l.url;
      if (rawPath) {
        const path = rawPath.startsWith('http') || rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
        fetch(path)
          .then(r => { if (!r.ok) throw new Error(); return r.text(); })
          .then(text => setContent(text))
          .catch(() => setContent(`# ${l.title}\n\nStart writing your lesson content here.\n\n## Introduction\n\nAdd an introduction.\n\n## Key Concepts\n\nList the key concepts.\n`));
      } else {
        setContent(`# ${l.title}\n\nStart writing your lesson content here.\n\n## Introduction\n\nAdd an introduction.\n`);
      }
    }
  }, [courseId, lessonId, navigate]);

  /* ── Save ─────────────────────────────────────────── */
  async function handleSave() {
    setSaving(true);
    await AdminStore.saveLessonContent(courseId, lessonId, content);
    setSaving(false);
    showToast('✅ Lesson saved!', 'success');
  }

  if (!course || !lesson) return null;

  const renderMd = (text) => ({ __html: marked.parse(text || '') });

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '80px', overflow: 'hidden' }}>

        {/* ── TOP BAR ── */}
        <div style={{
          padding: '10px 24px',
          background: 'var(--bg-top)',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 20, flexShrink: 0, gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to={`/admin/course/${courseId}`}
              style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text3)', textDecoration: 'none', padding: '6px 14px', border: '1px solid var(--border)', borderRadius: '8px' }}
            >✕ Close</Link>
            <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '16px' }}>
              <div style={{ fontSize: '0.6rem', color: 'var(--text3)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {course.title}
              </div>
              <div style={{ fontWeight: 900, fontSize: '0.95rem' }}>
                Editing: <span style={{ background: 'linear-gradient(135deg, var(--accent), #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{lesson.title}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text3)', fontWeight: 600 }}>
              {wordCount} words
            </span>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '10px 28px',
                background: saving ? 'var(--border)' : 'var(--accent)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                boxShadow: saving ? 'none' : '0 6px 18px rgba(44,88,255,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {saving ? '💾 Saving…' : '💾 Save Lesson'}
            </button>
          </div>
        </div>

        {/* ── SPLIT BODY ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* LEFT — Live Preview */}
          <div ref={scrollRef} style={{
            flex: 1,
            overflowY: 'auto',
            borderRight: '2px solid var(--border)',
            background: 'var(--bg)',
          }}>
            <div style={{
              padding: '24px 40px 12px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface)',
              position: 'sticky', top: 0, zIndex: 5,
            }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: '1.5px', color: 'var(--accent)',
                background: 'var(--accent-light)', padding: '3px 10px', borderRadius: '100px',
              }}>
                👁 Live Student Preview
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '8px 0 0', color: 'var(--text)' }}>
                {lesson.title}
              </h2>
              <div style={{ height: '3px', width: '48px', background: 'linear-gradient(90deg, var(--accent), #7c3aed)', borderRadius: '100px', marginTop: '6px' }} />
            </div>
            <div className="markdown-content" style={{ padding: '32px 40px 80px' }}>
              <div dangerouslySetInnerHTML={renderMd(content)} />
            </div>
          </div>

          {/* RIGHT — Rich Word-like Editor */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Editor title bar */}
            <div style={{
              padding: '8px 16px',
              background: 'var(--surface2)',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: '1.5px', color: '#f59e0b',
                background: 'rgba(245,158,11,0.12)', padding: '3px 10px', borderRadius: '100px',
              }}>
                ✏️ Rich Text Editor
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600 }}>
                Formatting auto-saves as Markdown
              </span>
            </div>

            {/* The Word-like editor fills remaining height */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <RichEditor value={content} onChange={setContent} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
