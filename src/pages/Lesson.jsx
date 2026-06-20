// src/pages/Lesson.jsx
import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Auth, Progress } from '../utils/auth';
import { COURSES } from '../utils/courseData';
import { AdminStore } from '../utils/adminStore';
import { showToast } from '../components/Toast';
import { marked } from 'marked';
import hljs from 'highlight.js';

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

export default function Lesson() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const user = Auth.getUser();
  let maintenanceMode = false;
  try { maintenanceMode = JSON.parse(localStorage.getItem('lc_academy_settings'))?.maintenanceMode; } catch {}

  useEffect(() => {
    if (maintenanceMode && user?.role !== 'admin') {
      showToast('Platform is under maintenance. Lessons and exams are temporarily unavailable.', 'error');
      navigate('/courses');
    }
  }, [navigate, maintenanceMode, user?.role]);

  if (maintenanceMode && user?.role !== 'admin') return null;

  const courseId = parseInt(searchParams.get('course')) || 1;
  const course = AdminStore.getCourse(courseId) || COURSES[courseId] || COURSES[1];
  // Memoised so its reference stays stable across renders (prevents timer reset)
  const lessonsList = useMemo(
    () => course.lessons_list || (Array.isArray(course.lessons) ? course.lessons : []),
    [courseId] // only recompute when the course changes
  );

  const [currentLesson, setCurrentLesson] = useState(0);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('// Output will appear here');
  const [outputColor, setOutputColor] = useState('var(--green)');
  const [fullscreen, setFullscreen] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState('');
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [isCompletedLocally, setIsCompletedLocally] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(Progress.get(courseId));
  const [verifiedSubs, setVerifiedSubs] = useState(new Set());
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const p = Progress.sync(courseId);
    if (p) setCompletedLessons(Progress.get(courseId));
  }, [courseId]);

  useEffect(() => {
    const lesson = lessonsList[currentLesson];
    
    setCode(lesson?.starter || '// Write your code here');
    setOutput('// Output will appear here');
    document.title = `${lesson?.title} — LearnCode`;
    
    // Reset section pagination
    setCurrentSubIndex(0);
    setHasReachedBottom(false);
    setVerifiedSubs(new Set());
    
    if (!lesson) return;

    const stored = AdminStore.getLessonContent(courseId, lesson.id);
    if (stored) {
      setRawMarkdown(stored);
      return;
    }

    const loadContent = () => {
      const path = lesson.contentPath || lesson.url;
      if (path) {
        setRawMarkdown('# Loading...');
        fetch(path)
          .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
          })
          .then(md => setRawMarkdown(md))
          .catch(err => {
            console.error("Failed to load lesson:", err);
            setRawMarkdown(`# Error loading content\n${err.message}`);
          });
      } else {
        setRawMarkdown(lesson.content || '');
      }
    };

    loadContent();
  }, [currentLesson, courseId, lessonsList]);

  const subDivisions = useMemo(() => {
    if (!rawMarkdown) return [];
    const lines = rawMarkdown.split('\n');
    const sections = [];
    let cur = { title: 'Main Lesson Content', content: '' };
    let inCode = false;

    for (const line of lines) {
      if (line.startsWith('```')) inCode = !inCode;
      if (!inCode && line.startsWith('## ')) {
        if (cur.content.trim() || cur.title !== 'Main Lesson Content') {
          sections.push(cur);
        }
        cur = { title: line.replace('## ', '').trim(), content: line + '\n' };
      } else {
        cur.content += line + '\n';
      }
    }
    if (cur.content.trim() || cur.title !== 'Main Lesson Content') {
      sections.push(cur);
    }
    
    // Improve first section title if possible
    if (sections.length > 0 && sections[0].title === 'Main Lesson Content') {
      const m = sections[0].content.match(/^#\s+(.+)$/m);
      if (m) sections[0].title = m[1];
    }
    
    return sections.length ? sections : [{ title: 'Content', content: rawMarkdown }];
  }, [rawMarkdown]);

  const htmlContent = useMemo(() => {
    const currentSection = subDivisions[currentSubIndex] || { content: '' };
    return marked.parse(currentSection.content);
  }, [subDivisions, currentSubIndex]);

  useEffect(() => {
    const lesson = lessonsList[currentLesson];
    const isDone = Progress.get(courseId).includes(lesson?.id);

    if (isDone) {
      setHasReachedBottom(true);
      setIsCompletedLocally(true);
    } else {
      setHasReachedBottom(false);
      setIsCompletedLocally(false);
    }
    setCompletedLessons(Progress.get(courseId));
  }, [currentLesson, courseId, lessonsList]);

  useEffect(() => {
    if (hasReachedBottom && currentSubIndex >= 0) {
      setVerifiedSubs(prev => new Set(prev).add(currentSubIndex));
    }
  }, [hasReachedBottom, currentSubIndex]);

  const handleScroll = () => {
    if (!scrollAreaRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setHasReachedBottom(true);
    }
  };

  useEffect(() => {
    // Only mark lesson as completed if ALL sub-divisions are verified
    if (verifiedSubs.size === subDivisions.length && subDivisions.length > 0 && !isCompletedLocally) {
      const lesson = lessonsList[currentLesson];
      const done = Progress.get(courseId).includes(lesson.id);
      if (!done) {
        Progress.mark(courseId, lesson.id);
        setCompletedLessons(Progress.get(courseId));
        setIsCompletedLocally(true);
      }
    }
  }, [verifiedSubs.size, subDivisions.length, currentLesson, courseId, lessonsList, isCompletedLocally]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
      
      // Auto-verify if the content is too short to scroll
      setTimeout(() => {
        if (scrollAreaRef.current) {
          const { scrollHeight, clientHeight } = scrollAreaRef.current;
          const lesson = lessonsList[currentLesson];
          const isDone = Progress.get(courseId).includes(lesson?.id);
          
          if (isDone || scrollHeight <= clientHeight + 50) {
            setHasReachedBottom(true);
          } else {
            setHasReachedBottom(false);
          }
        }
      }, 100);
    }
  }, [currentLesson, currentSubIndex, courseId, lessonsList, htmlContent]);

  function goToLesson(i) { 
    setCurrentLesson(i); 
    setHasReachedBottom(false);
  }

  function prevLesson() { 
    if (currentSubIndex > 0) {
      setHasReachedBottom(false);
      setCurrentSubIndex(currentSubIndex - 1);
    } else if (currentLesson > 0) {
      goToLesson(currentLesson - 1); 
    }
  }

  function nextLesson() {
    if (currentSubIndex < subDivisions.length - 1) {
      setHasReachedBottom(false);
      setCurrentSubIndex(currentSubIndex + 1);
    } else {
      Progress.mark(courseId, lessonsList[currentLesson].id);
      if (currentLesson < lessonsList.length - 1) {
        goToLesson(currentLesson + 1);
      } else {
        showToast(' Course Complete!', 'success');
        navigate('/courses');
      }
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

  const lesson = lessonsList[currentLesson] || {};
  
  // Calculate button state
  const isLastSection = currentSubIndex === subDivisions.length - 1;
  const allVerified = verifiedSubs.size === subDivisions.length;
  
  let nextBtnText = isLastSection 
    ? (currentLesson === lessonsList.length - 1 ? 'Complete Course' : 'Next Lesson →')
    : 'Next Section →';
  
  let isNextDisabled = false;
  if (!isCompletedLocally) {
    if (isLastSection) {
      isNextDisabled = !allVerified;
      if (isNextDisabled && hasReachedBottom) {
        nextBtnText = 'Verify Skipped Sections';
      }
    } else {
      isNextDisabled = !hasReachedBottom;
    }
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
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

        <div className="lesson-layout">
          <aside className="lesson-sidebar glass-panel">
            <div className="lesson-sidebar-header">
              <Link to="/courses" className="back-to-courses">← Back to Courses</Link>
              <h2 className="course-title-sidebar">{course.title}</h2>
            </div>
            <div className="sidebar-title">Course Lessons</div>
            <div className="lesson-list">
              {lessonsList.map((l, i) => {
                const done = completedLessons.includes(l.id);
                const active = i === currentLesson;
                
                return (
                  <div key={l.id} className={`module-group ${active ? 'expanded' : ''}`}>
                    <div 
                      className="module-header" 
                      onClick={() => goToLesson(i)}
                      style={{ padding: '12px', background: active ? 'rgba(44, 88, 255, 0.1)' : 'transparent', borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent' }}
                    >
                      <div className="module-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: active ? 'var(--accent)' : 'var(--text)' }}>
                        <div className={`lesson-check ${done ? 'done' : ''}`} style={{ 
                          width: '22px', height: '22px', fontSize: '0.65rem', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', 
                          borderRadius: '6px', background: done ? 'var(--green)' : 'var(--surface2)', 
                          color: done ? '#fff' : 'var(--text3)' 
                        }}>
                          {done ? '✓' : i + 1}
                        </div>
                        {l.title || l.name}
                      </div>
                      {active && subDivisions.length > 1 && <span className="module-chevron">⌄</span>}
                    </div>
                    
                    {active && subDivisions.length > 1 && (
                      <div className="module-lessons">
                        {subDivisions.map((sub, sIdx) => {
                          const isSubActive = sIdx === currentSubIndex;
                          const isSubVerified = isCompletedLocally || verifiedSubs.has(sIdx);
                          
                          return (
                          <div 
                            key={sIdx} 
                            className="lesson-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (sIdx !== currentSubIndex) {
                                setHasReachedBottom(false);
                                setCurrentSubIndex(sIdx);
                              }
                            }}
                            style={{ 
                              paddingLeft: '44px', 
                              paddingTop: '8px', 
                              paddingBottom: '8px', 
                              fontSize: '0.8rem', 
                              color: isSubActive ? 'var(--accent)' : 'var(--text2)',
                              borderLeft: '2px solid var(--border)',
                              marginLeft: '22px',
                              cursor: 'pointer',
                              background: isSubActive ? 'rgba(44,88,255,0.05)' : 'transparent',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseLeave={e => { if (!isSubActive) e.currentTarget.style.color = 'var(--text2)' }}
                          >
                            <span style={{ 
                              color: isSubVerified ? 'var(--green)' : 'var(--accent)', 
                              marginRight: '8px', 
                              opacity: (isSubActive || isSubVerified) ? 1 : 0.5,
                              fontWeight: isSubVerified ? 800 : 'normal'
                            }}>
                              {isSubVerified ? '✓' : '-'}
                            </span>
                            {sub.title}
                          </div>
                        )})}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          <main className="lesson-content">
            <div className="lesson-scroll-area" ref={scrollAreaRef} onScroll={handleScroll}>
              
              <div className="lesson-header-glass">
                <h1>{lesson.title || lesson.name}</h1>
                <div className="header-underline"></div>
              </div>

              <div className="markdown-content">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </div>

              <div className="workbench-container">
                <div className="workbench-inner">
                  <div className="workbench-header">
                    <div className="workbench-title">Interactive Workbench — {course.lang}</div>
                    <div className="workbench-header-dots">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
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
                    <div className="workbench-status">
                      <span className="status-dot">●</span> System Online
                    </div>
                    <button className="run-btn" onClick={executeCode}>
                      ▶ Run Code
                    </button>
                  </div>
                  <div className="workbench-output" style={{ color: outputColor }}>
                    <div className="output-label">Terminal Output</div>
                    {output}
                  </div>
                </div>
              </div>

              <div className="lesson-nav">
                <button className="btn-ghost" onClick={prevLesson} disabled={currentLesson === 0 && currentSubIndex === 0}>
                  ← Previous
                </button>
                <div className="pagination-indicator" style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>
                  {subDivisions.length > 1 ? `Section ${currentSubIndex + 1} of ${subDivisions.length}` : ''}
                </div>
                <button 
                  className="btn-primary" 
                  onClick={nextLesson} 
                  disabled={isNextDisabled} 
                  style={{ opacity: isNextDisabled ? 0.5 : 1, cursor: isNextDisabled ? 'not-allowed' : 'pointer' }}
                >
                  {nextBtnText}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
