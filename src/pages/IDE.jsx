import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DEFAULT_FILES = {
  'Main.java': {
    name: 'Main.java',
    language: 'java',
    content: '// You are using Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from LearnCode!");\n    }\n}'
  },
  'index.js': {
    name: 'index.js',
    language: 'javascript',
    content: '// You are using Node.js\nconsole.log("Welcome to the LearnCode IDE!");\n\nconst greet = (name) => {\n  console.log(`Hello, ${name}!`);\n};\n\ngreet("Developer");'
  },
  'script.py': {
    name: 'script.py',
    language: 'python',
    content: '# You are using Python\nprint("Hello from the Python script!")\n\ndef add(a, b):\n    return a + b\n\nprint(f"Result: {add(5, 10)}")'
  },
  'app.cpp': {
    name: 'app.cpp',
    language: 'cpp',
    content: '// You are using C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    return 0;\n}'
  }
};

export default function IDE() {
  const navigate = useNavigate();
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [activeFileName, setActiveFileName] = useState('Main.java');
  const [activeFile, setActiveFile] = useState(DEFAULT_FILES['Main.java']);
  const [terminalOutput, setTerminalOutput] = useState('Welcome to LearnCode Terminal\nType code and click "Run" to see output.');
  const [isCompiling, setIsCompiling] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(true);

  useEffect(() => {
    setActiveFile(files[activeFileName]);
  }, [activeFileName, files]);

  const handleEditorChange = (value) => {
    setFiles(prev => ({
      ...prev,
      [activeFileName]: { ...prev[activeFileName], content: value }
    }));
  };

  const runCode = () => {
    setIsCompiling(true);
    setTerminalOutput('Compiling ' + activeFileName + '...\n');
    
    setTimeout(() => {
      const code = activeFile.content;
      const lang = activeFile.language;

      if (lang === 'javascript') {
        try {
          const logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '))
          };
          // eslint-disable-next-line no-new-func
          new Function('console', code)(customConsole);
          setTerminalOutput(prev => prev + 'Compilation successful.\n\nRunning index.js...\n' + (logs.join('\n') || '[Process exited with 0]'));
        } catch (err) {
          setTerminalOutput(prev => prev + 'Compilation failed.\n\nError: ' + err.message);
        }
      } else {
        // Simulation for other languages
        setTimeout(() => {
          const lines = code.split('\n');
          const results = [];
          lines.forEach(line => {
             if (line.includes('print(') || line.includes('System.out.println(') || line.includes('cout <<')) {
               const match = line.match(/(['"])(.*?)\1/);
               if (match) results.push(match[2]);
             }
          });
          
          setTerminalOutput(prev => prev + 'Compilation successful.\n\nExecuting ' + activeFileName + '...\n' + (results.join('\n') || '[Process exited with 0]'));
        }, 800);
      }
      setIsCompiling(false);
    }, 1200);
  };

  return (
    <div className="app-container" style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <Sidebar />
      <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header showBrand />
        
        <div className="vscode-layout" style={{ 
          display: 'flex', flex: 1, background: '#1e1e1e', overflow: 'hidden',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          {/* ACTIVITY BAR */}
          <div className="activity-bar" style={{ 
            width: '48px', background: '#333333', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', paddingTop: '10px', gap: '20px' 
          }}>
            <div title="Explorer" style={{ fontSize: '24px', color: '#fff', cursor: 'pointer', opacity: 1 }}>📄</div>
            <div title="Search" style={{ fontSize: '23px', color: '#858585', cursor: 'pointer' }}>🔍</div>
            <div title="Git" style={{ fontSize: '24px', color: '#858585', cursor: 'pointer' }}>🍴</div>
            <div title="Debug" style={{ fontSize: '24px', color: '#858585', cursor: 'pointer' }}>🐞</div>
            <div title="Extensions" style={{ fontSize: '24px', color: '#858585', cursor: 'pointer', marginTop: 'auto', marginBottom: '20px' }}>🧩</div>
          </div>

          {/* SIDEBAR / EXPLORER */}
          <div className="vscode-sidebar" style={{ 
            width: '240px', background: '#252526', display: 'flex', flexDirection: 'column',
            borderRight: '1px solid #333'
          }}>
            <div style={{ padding: '10px 20px', fontSize: '11px', color: '#bbbbbb', textTransform: 'uppercase', fontWeight: 600 }}>Explorer</div>
            <div style={{ flex: 1 }}>
              <div style={{ padding: '4px 20px', background: '#37373d', color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>▼</span> <strong>LEARNCODE-WORK</strong>
              </div>
              <div style={{ padding: '0 10px' }}>
                {Object.keys(files).map(name => (
                  <div 
                    key={name}
                    onClick={() => setActiveFileName(name)}
                    style={{
                      padding: '4px 10px', fontSize: '13px', cursor: 'pointer',
                      background: activeFileName === name ? '#37373d' : 'transparent',
                      color: activeFileName === name ? '#fff' : '#cccccc',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                  >
                    <span style={{ fontSize: '14px' }}>{name.endsWith('.js') ? '🟨' : (name.endsWith('.java') ? '☕' : (name.endsWith('.py') ? '🐍' : '🟦'))}</span>
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EDITOR & PANEL AREA */}
          <div className="editor-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* TABS */}
            <div className="editor-tabs" style={{ background: '#2d2d2d', display: 'flex', height: '35px' }}>
              <div style={{ 
                padding: '0 15px', background: '#1e1e1e', color: '#fff', fontSize: '13px', 
                display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid var(--accent)'
              }}>
                {activeFileName} <span style={{ fontSize: '10px', opacity: 0.6 }}>✕</span>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingRight: '15px' }}>
                <button 
                  onClick={runCode}
                  disabled={isCompiling}
                  style={{
                    background: '#0e639c', color: '#fff', border: 'none', padding: '4px 12px',
                    borderRadius: '2px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  {isCompiling ? 'Running...' : '▶ Run Code'}
                </button>
              </div>
            </div>

            {/* MONACO EDITOR */}
            <div style={{ flex: 1, position: 'relative' }}>
              <Editor
                height="100%"
                theme="vs-dark"
                language={activeFile.language}
                value={activeFile.content}
                onChange={handleEditorChange}
                options={{
                  fontSize: 14,
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 10 }
                }}
              />
            </div>

            {/* TERMINAL PANEL */}
            {terminalOpen && (
              <div className="terminal-panel" style={{ 
                height: '250px', background: '#1e1e1e', borderTop: '1px solid #333',
                display: 'flex', flexDirection: 'column'
              }}>
                <div style={{ 
                  height: '35px', background: '#1e1e1e', display: 'flex', alignItems: 'center', 
                  padding: '0 20px', borderBottom: '1px solid #333', gap: '20px'
                }}>
                  <div style={{ fontSize: '11px', color: '#fff', borderBottom: '1px solid #fff', height: '100%', display: 'flex', alignItems: 'center', fontWeight: 600 }}>TERMINAL</div>
                  <div style={{ fontSize: '11px', color: '#858585', height: '100%', display: 'flex', alignItems: 'center' }}>OUTPUT</div>
                  <div style={{ fontSize: '11px', color: '#858585', height: '100%', display: 'flex', alignItems: 'center' }}>DEBUG CONSOLE</div>
                  <div style={{ marginLeft: 'auto', cursor: 'pointer', color: '#858585' }} onClick={() => setTerminalOpen(false)}>✕</div>
                </div>
                <div style={{ 
                  flex: 1, padding: '10px 20px', color: '#cccccc', fontFamily: 'var(--font-mono)',
                  fontSize: '13px', overflowY: 'auto', whiteSpace: 'pre-wrap', background: '#000'
                }}>
                  {terminalOutput}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
