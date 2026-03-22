// src/pages/Lesson.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Progress } from '../utils/auth';
import { COURSES } from '../utils/courseData';
import { showToast } from '../components/Toast';

export default function Lesson() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = parseInt(searchParams.get('course')) || 1;
  const course = COURSES[courseId] || COURSES[1];

  const [currentLesson, setCurrentLesson] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('// Output will appear here');
  const [outputColor, setOutputColor] = useState('var(--green)');
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setCode(course.lessons[currentLesson]?.starter || '// Write your code here');
    setOutput('// Output will appear here');
    document.title = `${course.lessons[currentLesson]?.title} — LearnCode`;
  }, [currentLesson]);

  function goToLesson(i) { setCurrentLesson(i); setActiveTab('overview'); }

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
            {/* TABS */}
            <div className="content-tabs" style={{ display: 'flex', backgroundColor: 'var(--bg-top)', borderBottom: '1px solid var(--border)', padding: '0 32px' }}>
              <div
                className={`content-tab${activeTab === 'overview' ? ' active' : ''}`}
                onClick={() => setActiveTab('overview')}
                style={{
                  padding: '16px 20px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                  color: activeTab === 'overview' ? 'var(--accent)' : 'var(--text2)',
                  borderBottom: activeTab === 'overview' ? '3px solid var(--accent)' : 'none'
                }}
              >
                Overview
              </div>
              <div
                className={`content-tab${activeTab === 'lab' ? ' active' : ''}`}
                onClick={() => setActiveTab('lab')}
                style={{
                  padding: '16px 20px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                  color: activeTab === 'lab' ? 'var(--accent)' : 'var(--text2)',
                  borderBottom: activeTab === 'lab' ? '3px solid var(--accent)' : 'none'
                }}
              >
                Attempt
              </div>
            </div>

            {/* OVERVIEW PANE */}
            {activeTab === 'overview' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '32px 48px' }}>
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                <div className="lesson-nav" style={{ marginTop: '40px' }}>
                  <button className="btn-ghost" onClick={prevLesson} disabled={currentLesson === 0}>← Previous</button>
                  <button className="btn-primary" onClick={nextLesson}>
                    {currentLesson === course.lessons.length - 1 ? '✓ Finish' : 'Next →'}
                  </button>
                </div>
              </div>
            )}

            {/* CODE EDITOR PANE */}
            {activeTab === 'lab' && (
              <aside className={`editor-panel${fullscreen ? ' fullscreen' : ''}`} style={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
                <div className="editor-tabs">
                  <div className="editor-tab active">Code Editor</div>
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
                  style={{ flex: 1 }}
                />
                <div className="editor-run-bar">
                  <span style={{ fontSize: '0.78rem', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>▶ Run your code</span>
                  <button className="run-btn" onClick={executeCode}>▶ Run</button>
                </div>
                <div className="output-area" style={{ height: '150px', color: outputColor }}>{output}</div>
              </aside>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
