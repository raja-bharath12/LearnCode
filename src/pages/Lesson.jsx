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
      showToast('🎉 Course Complete!', 'success');
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
              <span>🔍</span>
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
          <aside className="lesson-sidebar">
            <div style={{ padding: '0 20px 16px', borderBottom: '1px solid var(--border)', marginBottom: '12px' }}>
              <Link to="/courses" style={{ fontSize: '0.8rem', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>← All Courses</Link>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '8px' }}>{course.title}</h2>
            </div>
            <div className="sidebar-title">Lessons</div>
            <div>
              {course.lessons.map((l, i) => {
                const done = Progress.get(courseId).includes(l.id);
                return (
                  <div
                    key={l.id}
                    className={`lesson-item${i === currentLesson ? ' active' : ''}`}
                    onClick={() => goToLesson(i)}
                  >
                    <span className="lnum">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ltitle">{l.title}</span>
                    {done && <span className="lcheck">✓</span>}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lesson-content" style={{ background: 'var(--bg)', padding: 0, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* OVERVIEW PANE */}
              <div style={{ padding: '32px 48px' }} className="markdown-content">
                <div dangerouslySetInnerHTML={{ __html: fetchedContent }} />
              </div>

              {/* CODE EDITOR PANE */}
              <aside className={`editor-panel${fullscreen ? ' fullscreen' : ''}`} style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)', background: 'var(--surface2)', margin: '0 48px 48px', borderRadius: '12px', overflow: 'hidden' }}>
                <div className="editor-tabs" style={{ background: 'var(--bg-top)' }}>
                  <div className="editor-tab active">Interactive Lab</div>
                  <div className="editor-tab">{course.lang}</div>
                  <button
                    className="editor-tab"
                    onClick={() => setFullscreen(!fullscreen)}
                    style={{ marginLeft: 'auto', border: 'none', background: 'transparent', fontSize: '1.1rem', padding: '0 15px' }}
                  >
                    {fullscreen ? '✕' : '⛶'}
                  </button>
                </div>
                <textarea
                  id="code-editor"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="# Write your code here..."
                  style={{ height: '200px', backgroundColor: 'transparent' }}
                />
                <div className="editor-run-bar">
                  <span style={{ fontSize: '0.78rem', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>▶ Run your code</span>
                  <button className="run-btn" onClick={executeCode}>▶ Run</button>
                </div>
                <div className="output-area" style={{ height: '120px', color: outputColor }}>{output}</div>
              </aside>

              <div className="lesson-nav" style={{ padding: '0 48px 48px' }}>
                <button className="btn-ghost" onClick={prevLesson} disabled={currentLesson === 0}>← Previous</button>
                <button className="btn-primary" onClick={nextLesson}>
                  {currentLesson === course.lessons.length - 1 ? '✓ Finish' : 'Next →'}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
