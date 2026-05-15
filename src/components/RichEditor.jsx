// src/components/RichEditor.jsx
// Structured section editor: each block has Heading + Text + Code

import { useState, useEffect } from 'react';

/* ── Parse markdown into structured blocks ───────────────────── */
function mdToBlocks(md) {
  if (!md) return [{ heading: '', text: '', code: '' }];

  const lines = md.split('\n');
  const blocks = [];
  let cur = { heading: '', text: '', code: '' };
  let inCode = false;
  let codeLang = '';

  const pushCur = () => {
    if (cur.heading || cur.text.trim() || cur.code.trim()) {
      blocks.push({ ...cur });
      cur = { heading: '', text: '', code: '' };
    }
  };

  for (const line of lines) {
    // Code fence start
    if (!inCode && line.startsWith('```')) {
      inCode = true;
      codeLang = line.slice(3).trim();
      continue;
    }
    // Code fence end
    if (inCode && line.startsWith('```')) {
      inCode = false;
      continue;
    }
    if (inCode) { cur.code += line + '\n'; continue; }

    // H2 heading → new block
    if (line.startsWith('## ')) {
      pushCur();
      cur.heading = line.replace('## ', '');
      continue;
    }
    // H1 → treat as heading too but don't push
    if (line.startsWith('# ')) {
      cur.heading = cur.heading || line.replace('# ', '');
      continue;
    }
    // Normal text
    if (line.trim()) cur.text += (cur.text ? '\n' : '') + line;
  }
  pushCur();

  return blocks.length ? blocks : [{ heading: '', text: '', code: '' }];
}

/* ── Convert blocks back to markdown ─────────────────────────── */
function blocksToMd(blocks) {
  return blocks.map((b, i) => {
    let out = '';
    if (b.heading) out += `## ${b.heading}\n\n`;
    if (b.text.trim()) out += `${b.text.trim()}\n\n`;
    if (b.code.trim()) out += '```\n' + b.code.trim() + '\n```\n\n';
    return out;
  }).join('').trim();
}

/* ── Single block card ────────────────────────────────────────── */
function BlockCard({ block, idx, total, onChange, onDelete, onMoveUp, onMoveDown, onAddBelow }) {
  const isOnly = total === 1;

  const set = (field, val) => onChange(idx, { ...block, [field]: val });

  const cardStyle = {
    background: 'white',
    border: '1.5px solid #e2e8f0',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s',
  };

  const labelStyle = {
    fontSize: '0.65rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    color: '#94a3b8',
    marginBottom: '6px',
    display: 'block',
  };

  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '0.95rem',
    background: '#f8fafc',
    color: '#1e293b',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    resize: 'none',
  };

  const btnSmall = (onClick, icon, title, danger = false) => (
    <button
      onClick={onClick}
      title={title}
      style={{
        padding: '5px 10px',
        background: danger ? 'rgba(239,68,68,0.08)' : '#f1f5f9',
        border: danger ? '1px solid rgba(239,68,68,0.25)' : '1px solid #e2e8f0',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.78rem',
        color: danger ? '#ef4444' : '#64748b',
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {icon}
    </button>
  );

  return (
    <div style={cardStyle}>
      {/* Card header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        background: '#f8fafc',
        borderBottom: '1.5px solid #e2e8f0',
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 800, color: '#6366f1',
          background: 'rgba(99,102,241,0.1)', padding: '3px 10px',
          borderRadius: '100px', letterSpacing: '0.5px',
        }}>
          Section {idx + 1}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {btnSmall(onMoveUp,   '↑', 'Move up')}
          {btnSmall(onMoveDown, '↓', 'Move down')}
          {btnSmall(onAddBelow, '+ Add below', 'Add new section below')}
          {!isOnly && btnSmall(onDelete, '🗑', 'Delete section', true)}
        </div>
      </div>

      {/* Fields */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* HEADING */}
        <div>
          <label style={labelStyle}>📌 Section Heading</label>
          <input
            type="text"
            placeholder="e.g. Introduction, Key Concepts, Example…"
            value={block.heading}
            onChange={e => set('heading', e.target.value)}
            style={{
              ...fieldStyle,
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#1e293b',
            }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {/* TEXT */}
        <div>
          <label style={labelStyle}>📝 Content / Explanation</label>
          <textarea
            rows={4}
            placeholder="Write the explanation, description or content for this section…"
            value={block.text}
            onChange={e => set('text', e.target.value)}
            style={fieldStyle}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {/* CODE BLOCK */}
        <div>
          <label style={labelStyle}>💻 Code Block (optional)</label>
          <div style={{
            background: '#0d1117',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1.5px solid #30363d',
          }}>
            {/* Code window chrome */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px',
              background: '#161b22',
              borderBottom: '1px solid #30363d',
            }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: '8px', fontSize: '0.72rem', color: '#8b949e', fontWeight: 600 }}>
                code snippet
              </span>
            </div>
            <textarea
              rows={5}
              placeholder={'# Write your code here\nprint("Hello, World!")'}
              value={block.code}
              onChange={e => set('code', e.target.value)}
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
              onFocus={e => e.currentTarget.parentElement.style.borderColor = '#58a6ff'}
              onBlur={e => e.currentTarget.parentElement.style.borderColor = '#30363d'}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Main RichEditor ──────────────────────────────────────────── */
export default function RichEditor({ value, onChange }) {
  const [blocks, setBlocks] = useState([{ heading: '', text: '', code: '' }]);

  // Parse incoming markdown into blocks on mount / when value changes externally
  useEffect(() => {
    setBlocks(mdToBlocks(value));
  }, []); // only on mount to avoid cursor reset

  const commit = (newBlocks) => {
    setBlocks(newBlocks);
    onChange(blocksToMd(newBlocks));
  };

  const updateBlock = (idx, updated) => {
    const next = blocks.map((b, i) => i === idx ? updated : b);
    commit(next);
  };

  const deleteBlock = (idx) => {
    if (blocks.length <= 1) return;
    commit(blocks.filter((_, i) => i !== idx));
  };

  const addBlockAt = (afterIdx) => {
    const next = [...blocks];
    next.splice(afterIdx + 1, 0, { heading: '', text: '', code: '' });
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
    <div style={{ height: '100%', overflowY: 'auto', background: '#f1f5f9', padding: '24px' }}>
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
            border: '2px dashed #cbd5e1',
            borderRadius: '16px',
            background: 'transparent',
            color: '#94a3b8',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#94a3b8'; }}
        >
          + Add New Section
        </button>

      </div>
    </div>
  );
}
