// src/pages/Lesson.jsx
import { useState, useEffect, useRef } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [isCompletedLocally, setIsCompletedLocally] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(Progress.get(courseId));
  const scrollAreaRef = useRef(null);

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

  // TIMER LOGIC
  useEffect(() => {
    const lesson = course.lessons[currentLesson];
    const isDone = Progress.get(courseId).includes(lesson?.id);
    const savedTime = Progress.getTimer(courseId, lesson?.id);

    if (isDone) {
      setTimeLeft(0);
      setHasReachedBottom(true);
      setIsCompletedLocally(true);
    } else {
      setTimeLeft(savedTime !== null ? savedTime : 120);
      setHasReachedBottom(false);
      setIsCompletedLocally(false);
    }
    setCompletedLessons(Progress.get(courseId));
  }, [currentLesson, courseId, course.lessons]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          const next = t - 1;
          Progress.saveTimer(courseId, course.lessons[currentLesson]?.id, next);
          return next;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, courseId, currentLesson, course.lessons]);

  // SCROLL DETECTION
  const handleScroll = () => {
    if (!scrollAreaRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setHasReachedBottom(true);
    }
  };

  // AUTO COMPLETE LOGIC
  useEffect(() => {
    if (timeLeft === 0 && hasReachedBottom && !isCompletedLocally) {
      const lesson = course.lessons[currentLesson];
      const done = Progress.get(courseId).includes(lesson.id);
      if (!done) {
        Progress.mark(courseId, lesson.id);
        setCompletedLessons(Progress.get(courseId));
        setIsCompletedLocally(true);
      }
    }
  }, [timeLeft, hasReachedBottom, currentLesson, courseId, course.lessons, isCompletedLocally]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [currentLesson, courseId]);

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

        <div className="lesson-layout">
          {/* LESSON SIDEBAR */}
          <aside className="lesson-sidebar glass-panel">
            <div className="lesson-sidebar-header">
              <Link to="/courses" className="back-to-courses">← Back to Courses</Link>
              <h2 className="course-title-sidebar">{course.title}</h2>
            </div>
            <div className="sidebar-title">Course Lessons</div>
            <div className="lesson-list">
              {course.lessons.map((l, i) => {
                const done = completedLessons.includes(l.id);
                const active = i === currentLesson;
                return (
                  <div
                    key={l.id}
                    className={`lesson-item${active ? ' active' : ''}`}
                    onClick={() => goToLesson(i)}
                  >
                    <div className={`lesson-check ${done ? 'done' : ''}`}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span className="lesson-item-title">{l.title}</span>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lesson-content">

            <div className="lesson-scroll-area" ref={scrollAreaRef} onScroll={handleScroll}>
              
              {/* STICKY TIMER */}
              <div className="premium-status-hud animate-in">
                <div className="hud-timer">
                  <span className="hud-icon">⏱️</span>
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
              
              <div className="lesson-header-glass">
                <div className="lesson-meta">
                  <div className="meta-item"><span>Beginner</span></div>
                  <div className="meta-item"><span>10 min read</span></div>
                  <div className="meta-item"><span className="verified-badge">✓ Verified Content</span></div>
                </div>
                <h1>{lesson.title}</h1>
                <div className="header-underline"></div>
              </div>

              {/* OVERVIEW PANE */}
              <div className="markdown-content">
                <div dangerouslySetInnerHTML={{ __html: fetchedContent }} />
              </div>

              {/* WORKBENCH EDITOR */}
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
                <button className="btn-ghost" onClick={prevLesson} disabled={currentLesson === 0}>
                  ← Previous Lesson
                </button>
                <button className="btn-primary" onClick={nextLesson} disabled={!isCompletedLocally} style={{ opacity: isCompletedLocally ? 1 : 0.5, cursor: isCompletedLocally ? 'pointer' : 'not-allowed' }}>
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
