// src/pages/Lesson.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Progress } from '../utils/auth';
import { COURSES } from '../utils/courseData';
import { showToast } from '../components/Toast';
import { marked } from 'marked';

export default function Lesson() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = parseInt(searchParams.get('course')) || 1;
  const course = COURSES[courseId] || COURSES[1];

  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('// Output will appear here');
  const [outputColor, setOutputColor] = useState('var(--green)');
  const [fullscreen, setFullscreen] = useState(false);
  const [fetchedContent, setFetchedContent] = useState('');

  useEffect(() => {
    const lesson = course.lessons[currentLesson];
    setCode(lesson?.starter || '// Write your code here');
    setOutput('// Output will appear here');
    document.title = `${lesson?.title} — LearnCode`;

    // Fetch dynamic content if path exists
    if (lesson?.contentPath) {
      setFetchedContent('<p style="color:var(--text3)">Loading lesson content...</p>');
      fetch(lesson.contentPath)
        .then(res => res.text())
        .then(md => {
          setFetchedContent(marked.parse(md));
        })
        .catch(err => {
          console.error("Failed to load lesson:", err);
          setFetchedContent('<p style="color:var(--red)">Failed to load lesson content. Please try again later.</p>');
        });
    } else {
      setFetchedContent(lesson?.content || '');
    }
  }, [currentLesson, course]);

  function goToLesson(i) { setCurrentLesson(i); }

  function prevLesson() { if (currentLesson > 0) goToLesson(currentLesson - 1); }

  function nextLesson() {
    Progress.mark(courseId, course.lessons[currentLesson].id);
    if (currentLesson < course.lessons.length - 1) {
      goToLesson(currentLesson + 1);
    } else {
      showToast(' Course Complete!', 'success');
      navigate('/courses');
    }
  }

  function executeCode() {
    setOutput('');
    if (course.lang === 'javascript') {
      try {
        const logs = [];
        const c = { log: (...a) => logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x) : x).join(' ')) };
        // eslint-disable-next-line no-new-func
        new Function('console', code)(c);
        setOutput(logs.join('\n') || '// No output');
        setOutputColor('var(--green)');
      } catch (e) {
        setOutput(`Error: ${e.message}`);
        setOutputColor('var(--red)');
      }
    } else {
      const lines = code.split('\n');
      const res = [];
      lines.forEach(line => {
        const m = line.match(/print\(f?["'](.+?)["']\)/);
        if (m) res.push(m[1]);
        const m2 = line.match(/print\((.+)\)/);
        if (m2 && !m) res.push(`[output of: ${m2[1]}]`);
      });
      setOutput(res.length ? res.join('\n') : '// Run this in a real Python environment for full output');
      setOutputColor('var(--green)');
    }
  }

  const lesson = course.lessons[currentLesson];

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        {/* TOP HEADER */}
        <header className="top-header">
          <div className="container header-container">
            <div className="search-bar">
              <span></span>
              <input type="text" placeholder="Search lessons, docs..." />
            </div>
            <div className="top-actions" style={{ gap: '16px' }}>
              <button className="btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => navigate('/courses')}>
                ← Courses
              </button>
            </div>
          </div>
        </header>

        <div className="lesson-layout" style={{ marginTop: 0, height: 'calc(100vh - var(--top-height))' }}>
          {/* LESSON SIDEBAR */}
          <aside className="lesson-sidebar glass-panel" style={{ margin: '16px', height: 'calc(100% - 32px)', borderRadius: '24px' }}>
            <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)', marginBottom: '12px' }}>
              <Link to="/courses" style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>← Back to Courses</Link>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '12px', color: 'var(--text)' }}>{course.title}</h2>
            </div>
            <div className="sidebar-title" style={{ paddingLeft: '20px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Course Lessons</div>
            <div style={{ overflowY: 'auto', flex: 1, padding: '0 12px 24px' }}>
              {course.lessons.map((l, i) => {
                const done = Progress.get(courseId).includes(l.id);
                const active = i === currentLesson;
                return (
                  <div
                    key={l.id}
                    className={`lesson-item${active ? ' active' : ''}`}
                    onClick={() => goToLesson(i)}
                    style={{ 
                      padding: '12px 16px', 
                      borderRadius: '12px', 
                      marginBottom: '4px',
                      background: active ? 'var(--accent-light)' : 'transparent',
                      border: active ? '1px solid var(--accent)' : '1px solid transparent'
                    }}
                  >
                    <div style={{ 
                      width: '24px', height: '24px', 
                      borderRadius: '50%', 
                      border: done ? 'none' : '2px solid var(--border)',
                      background: done ? 'var(--green)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', color: done ? 'white' : 'var(--text3)',
                      marginRight: '12px', flexShrink: 0
                    }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span className="ltitle" style={{ fontSize: '0.9rem', color: active ? 'var(--accent)' : 'var(--text)', fontWeight: active ? 700 : 500 }}>{l.title}</span>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lesson-content" style={{ background: 'var(--bg)', padding: 0, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              
              <div className="lesson-header-glass">
                <div className="lesson-meta">
                  <div className="meta-item"><span>Beginner</span></div>
                  <div className="meta-item"><span>10 min read</span></div>
                  <div className="meta-item"><span style={{ color: 'var(--green)' }}>✓ Verified Content</span></div>
                </div>
                <h1>{lesson.title}</h1>
                <div style={{ width: '60px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginTop: '24px' }}></div>
              </div>

              {/* OVERVIEW PANE */}
              <div style={{ padding: '0 48px 48px' }} className="markdown-content">
                <div dangerouslySetInnerHTML={{ __html: fetchedContent }} />
              </div>

              {/* WORKBENCH EDITOR */}
              <div className="workbench-container">
                <div className="workbench-inner">
                  <div className="workbench-header">
                    <div className="workbench-title">Interactive Workbench — {course.lang}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                    </div>
                  </div>
                  <textarea
                    id="code-editor"
                    className="workbench-editor-ui"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="# Write your professional code here..."
                  />
                  <div className="workbench-footer">
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', color: 'var(--text3)', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--green)' }}>●</span> System Online
                    </div>
                    <button className="run-btn" onClick={executeCode} style={{ padding: '10px 24px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700 }}>
                      ▶ Run Code
                    </button>
                  </div>
                  <div className="workbench-output" style={{ color: outputColor }}>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '8px', textTransform: 'uppercase' }}>Terminal Output</div>
                    {output}
                  </div>
                </div>
              </div>

              <div className="lesson-nav" style={{ padding: '0 48px 60px', margin: '0 48px', border: 'none' }}>
                <button className="btn-ghost" onClick={prevLesson} disabled={currentLesson === 0} style={{ padding: '14px 28px', borderRadius: '12px' }}>
                  ← Previous Lesson
                </button>
                <button className="btn-primary" onClick={nextLesson} style={{ padding: '14px 40px', borderRadius: '12px', boxShadow: '0 10px 20px rgba(44,88,255,0.2)' }}>
                  {currentLesson === course.lessons.length - 1 ? 'Complete Course' : 'Next Lesson →'}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
