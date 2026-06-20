// src/components/RichEditor.jsx
// Structured section editor: each section has a Heading + array of Items (Text/Code)

import { useState, useEffect } from 'react';

/* ── Parse markdown into structured blocks ───────────────────── */
function mdToBlocks(md) {
  if (!md) return [{ heading: '', items: [{ type: 'text', content: '' }] }];

  const lines = md.split('\n');
  const blocks = [];
  let cur = { heading: '', items: [] };
  let inCode = false;
  let codeLang = '';
  let curText = '';
  let curCode = '';

  const pushCurText = () => {
    if (curText.trim()) {
      cur.items.push({ type: 'text', content: curText.trim() });
    }
    curText = '';
  };

  const pushCurBlock = () => {
    pushCurText();
    if (cur.heading || cur.items.length > 0) {
      blocks.push(cur);
    }
    cur = { heading: '', items: [] };
  };

  for (const line of lines) {
    if (!inCode && line.startsWith('```')) {
      inCode = true;
      codeLang = line.slice(3).trim();
      pushCurText();
      continue;
    }
    if (inCode && line.startsWith('```')) {
      inCode = false;
      if (codeLang === 'quiz') {
        try {
          cur.items.push({ type: 'quiz', content: JSON.parse(curCode.trim()) });
        } catch {
          cur.items.push({ type: 'code', content: curCode.trim(), lang: codeLang });
        }
      } else {
        cur.items.push({ type: 'code', content: curCode.trim(), lang: codeLang });
      }
      curCode = '';
      continue;
    }
    if (inCode) {
      curCode += line + '\n';
      continue;
    }

    if (line.startsWith('## ')) {
      pushCurBlock();
      cur.heading = line.replace('## ', '');
      continue;
    }
    if (line.startsWith('# ')) {
      cur.heading = cur.heading || line.replace('# ', '');
      continue;
    }

    curText += (curText ? '\n' : '') + line;
  }
  pushCurBlock();

  // Ensure each block has at least one item
  blocks.forEach(b => {
    if (b.items.length === 0) {
      b.items.push({ type: 'text', content: '' });
    }
  });

  return blocks.length ? blocks : [{ heading: '', items: [{ type: 'text', content: '' }] }];
}

/* ── Convert blocks back to markdown ─────────────────────────── */
function blocksToMd(blocks) {
  return blocks.map(b => {
    let out = '';
    if (b.heading) out += `## ${b.heading}\n\n`;
    b.items.forEach(item => {
      if (item.type === 'text' && item.content.trim()) {
        out += `${item.content.trim()}\n\n`;
      } else if (item.type === 'code' && item.content.trim()) {
        out += '```' + (item.lang || '') + '\n' + item.content.trim() + '\n```\n\n';
      } else if (item.type === 'quiz' && item.content?.question) {
        out += '```quiz\n' + JSON.stringify(item.content, null, 2) + '\n```\n\n';
      }
    });
    return out;
  }).join('').trim();
}

/* ── Single block card ────────────────────────────────────────── */
function BlockCard({ block, idx, total, onChange, onDelete, onMoveUp, onMoveDown, onAddBelow }) {
  const isOnly = total === 1;

  const setHeading = (val) => onChange(idx, { ...block, heading: val });

  const setItem = (itemIdx, field, val) => {
    const nextItems = [...block.items];
    nextItems[itemIdx] = { ...nextItems[itemIdx], [field]: val };
    onChange(idx, { ...block, items: nextItems });
  };

  const deleteItem = (itemIdx) => {
    const nextItems = block.items.filter((_, i) => i !== itemIdx);
    if (nextItems.length === 0) nextItems.push({ type: 'text', content: '' });
    onChange(idx, { ...block, items: nextItems });
  };

  const moveItemUp = (itemIdx) => {
    if (itemIdx === 0) return;
    const nextItems = [...block.items];
    [nextItems[itemIdx - 1], nextItems[itemIdx]] = [nextItems[itemIdx], nextItems[itemIdx - 1]];
    onChange(idx, { ...block, items: nextItems });
  };

  const moveItemDown = (itemIdx) => {
    if (itemIdx === block.items.length - 1) return;
    const nextItems = [...block.items];
    [nextItems[itemIdx], nextItems[itemIdx + 1]] = [nextItems[itemIdx + 1], nextItems[itemIdx]];
    onChange(idx, { ...block, items: nextItems });
  };

  const addItem = (type) => {
    let newItem = { type, content: '' };
    if (type === 'code') newItem.lang = '';
    if (type === 'quiz') newItem.content = { question: '', options: ['', ''], correct: 0 };
    onChange(idx, { ...block, items: [...block.items, newItem] });
  };

  const cardStyle = {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(12px)',
    border: '1px solid var(--glass-border)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: 'var(--glass-shadow)',
    transition: 'all 0.3s',
  };

  const labelStyle = {
    fontSize: '0.65rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    color: 'var(--text3)',
    marginBottom: '0',
    display: 'block',
  };

  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    border: '1.5px solid var(--border)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '0.95rem',
    background: 'var(--surface2)',
    color: 'var(--text)',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    resize: 'none',
  };

  const btnSmall = (onClick, icon, title, danger = false) => (
    <button
      onClick={onClick}
      title={title}
      style={{
        padding: '5px 10px',
        background: danger ? 'rgba(239,68,68,0.1)' : 'var(--surface2)',
        border: danger ? '1px solid rgba(239,68,68,0.25)' : '1px solid var(--border)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.78rem',
        color: danger ? 'var(--red)' : 'var(--text2)',
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {icon}
    </button>
  );

  const itemBtnStyle = {
    background: 'transparent',
    border: 'none',
    color: 'var(--text3)',
    cursor: 'pointer',
    fontSize: '0.8rem',
    padding: '4px 6px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  };

  return (
    <div style={cardStyle}>
      {/* Card header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'var(--surface2)',
        borderBottom: '1.5px solid var(--border)',
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)',
          background: 'var(--accent-light)', padding: '3px 10px',
          borderRadius: '100px', letterSpacing: '0.5px',
        }}>
          {idx === 0 ? 'Main Lesson Content' : `Sub-division ${idx}`}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {btnSmall(onMoveUp,   '↑', 'Move up')}
          {btnSmall(onMoveDown, '↓', 'Move down')}
          {btnSmall(onAddBelow, '+ Add below', 'Add new section below')}
          {btnSmall(onDelete, '🗑 Delete Section', 'Delete section', true)}
        </div>
      </div>

      {/* Fields */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* HEADING */}
        <div>
          <label style={{...labelStyle, marginBottom: '6px'}}>
            {idx === 0 ? '📌 Main Heading (Optional)' : '📌 Sub-division Heading'}
          </label>
          <input
            type="text"
            placeholder="e.g. Introduction, Key Concepts, Example…"
            value={block.heading}
            onChange={e => setHeading(e.target.value)}
            style={{
              ...fieldStyle,
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text)',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* ITEMS (TEXT & CODE) */}
        {block.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={labelStyle}>
                {item.type === 'text' ? '📝 Content / Explanation' : item.type === 'quiz' ? '🧠 Quiz Check' : '💻 Code Block'}
              </label>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => moveItemUp(i)} title="Move Up" style={itemBtnStyle} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>↑</button>
                <button onClick={() => moveItemDown(i)} title="Move Down" style={itemBtnStyle} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>↓</button>
                <button onClick={() => deleteItem(i)} title="Delete" style={{...itemBtnStyle, color: 'var(--red)'}} onMouseEnter={e => e.currentTarget.style.color = '#dc2626'} onMouseLeave={e => e.currentTarget.style.color = 'var(--red)'}>🗑</button>
              </div>
            </div>
            
            {item.type === 'text' ? (
              <textarea
                rows={4}
                placeholder="Write the explanation, description or content for this section…"
                value={item.content}
                onChange={e => setItem(i, 'content', e.target.value)}
                style={fieldStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            ) : (
              <div style={{
                background: '#0d1117',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1.5px solid #30363d',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px',
                  background: '#161b22',
                  borderBottom: '1px solid #30363d',
                }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                  <input
                    value={item.lang || ''}
                    onChange={e => setItem(i, 'lang', e.target.value)}
                    placeholder="lang (e.g. py)"
                    style={{ marginLeft: '8px', fontSize: '0.72rem', color: '#8b949e', fontWeight: 600, background: 'transparent', border: 'none', outline: 'none', width: '80px' }}
                  />
                  <span style={{ fontSize: '0.72rem', color: '#8b949e', fontWeight: 600, marginLeft: 'auto' }}>
                    code snippet
                  </span>
                </div>
                <textarea
                  rows={5}
                  placeholder={'# Write your code here\nprint("Hello, World!")'}
                  value={item.content}
                  onChange={e => setItem(i, 'content', e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: '#0d1117',
                    color: '#e6edf3',
                    border: 'none',
                    outline: 'none',
                    padding: '14px 18px',
                    fontSize: '0.88rem',
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                    lineHeight: '1.7',
                    resize: 'vertical',
                  }}
                  onFocus={e => e.currentTarget.parentElement.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.currentTarget.parentElement.style.borderColor = '#30363d'}
                />
              </div>
            )}

            {item.type === 'quiz' && (
              <div style={{ position: 'relative', background: 'rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <input
                  type="text" placeholder="Enter question..."
                  value={item.content.question || ''}
                  onChange={e => setItem(i, 'content', { ...item.content, question: e.target.value })}
                  style={{...fieldStyle, marginBottom: '16px', fontWeight: 800, fontSize: '1rem', background: 'var(--surface)'}}
                />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(item.content.options || []).map((opt, oIdx) => (
                    <div key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input 
                        type="radio" 
                        name={`quiz-${idx}-${i}`} 
                        checked={item.content.correct === oIdx}
                        onChange={() => setItem(i, 'content', { ...item.content, correct: oIdx })}
                        style={{ accentColor: 'var(--green)', width: '20px', height: '20px', cursor: 'pointer' }}
                        title="Mark as correct answer"
                      />
                      <input
                        type="text" placeholder={`Option ${oIdx + 1}`}
                        value={opt}
                        onChange={e => {
                          const newOpts = [...item.content.options];
                          newOpts[oIdx] = e.target.value;
                          setItem(i, 'content', { ...item.content, options: newOpts });
                        }}
                        style={{...fieldStyle, padding: '10px 14px', flex: 1, background: item.content.correct === oIdx ? 'rgba(16, 185, 129, 0.05)' : 'var(--surface)', borderColor: item.content.correct === oIdx ? 'var(--green)' : 'var(--border)'}}
                      />
                      <button onClick={() => {
                        const newOpts = item.content.options.filter((_, idx2) => idx2 !== oIdx);
                        let newCorrect = item.content.correct;
                        if (newCorrect === oIdx) newCorrect = 0;
                        else if (newCorrect > oIdx) newCorrect--;
                        setItem(i, 'content', { ...item.content, options: newOpts, correct: newCorrect });
                      }} style={{...itemBtnStyle, color: 'var(--red)', opacity: item.content.options.length <= 2 ? 0.3 : 1}} disabled={item.content.options.length <= 2}>✕</button>
                    </div>
                  ))}
                </div>
                
                <button onClick={() => {
                   setItem(i, 'content', { ...item.content, options: [...item.content.options, ''] });
                }} style={{ background: 'transparent', border: '1px dashed var(--border)', color: 'var(--text3)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', marginTop: '16px', fontWeight: 700, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}>
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        {/* ADD ITEM BUTTONS */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
          <button
            onClick={() => addItem('text')}
            style={{ padding: '10px', background: 'var(--surface2)', border: '1px dashed var(--border)', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)', cursor: 'pointer', flex: 1, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >+ Add Text</button>
          <button
            onClick={() => addItem('code')}
            style={{ padding: '10px', background: 'var(--surface2)', border: '1px dashed var(--border)', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)', cursor: 'pointer', flex: 1, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >+ Add Code</button>
          <button
            onClick={() => addItem('quiz')}
            style={{ padding: '10px', background: 'var(--surface2)', border: '1px dashed var(--border)', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)', cursor: 'pointer', flex: 1, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >🧠 Add Quiz</button>
        </div>

      </div>
    </div>
  );
}

/* ── Main RichEditor ──────────────────────────────────────────── */
export default function RichEditor({ value, onChange }) {
  const [blocks, setBlocks] = useState([{ heading: '', items: [{ type: 'text', content: '' }] }]);

  // Parse incoming markdown into blocks on mount
  useEffect(() => {
    setBlocks(mdToBlocks(value));
  }, []);

  const commit = (newBlocks) => {
    setBlocks(newBlocks);
    onChange(blocksToMd(newBlocks));
  };

  const updateBlock = (idx, updated) => {
    const next = blocks.map((b, i) => i === idx ? updated : b);
    commit(next);
  };

  const deleteBlock = (idx) => {
    commit(blocks.filter((_, i) => i !== idx));
  };

  const addBlockAt = (afterIdx) => {
    const next = [...blocks];
    next.splice(afterIdx + 1, 0, { heading: '', items: [{ type: 'text', content: '' }] });
    commit(next);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...blocks];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    commit(next);
  };

  const moveDown = (idx) => {
    if (idx === blocks.length - 1) return;
    const next = [...blocks];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    commit(next);
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'transparent', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {blocks.map((block, idx) => (
          <BlockCard
            key={idx}
            block={block}
            idx={idx}
            total={blocks.length}
            onChange={updateBlock}
            onDelete={() => deleteBlock(idx)}
            onMoveUp={() => moveUp(idx)}
            onMoveDown={() => moveDown(idx)}
            onAddBelow={() => addBlockAt(idx)}
          />
        ))}

        {/* Add section at bottom */}
        <button
          onClick={() => addBlockAt(blocks.length - 1)}
          style={{
            padding: '16px',
            border: '2px dashed var(--border2)',
            borderRadius: '16px',
            background: 'transparent',
            color: 'var(--text3)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text3)'; }}
        >
          + Add New Section
        </button>

      </div>
    </div>
  );
}
