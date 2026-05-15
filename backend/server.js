// LearnCode — Backend Server
// Node.js + Express + JSON file storage (no external DB needed)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/progress', progressRoutes);

// ===== STATS =====
app.get('/api/stats', (req, res) => {
  try {
    const db = require('./db');
    const users = db.getUsers();
    res.json({ users: users.length, courses: 20 });
  } catch {
    res.json({ users: 0, courses: 20 });
  }
});

// ===== HEALTH =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'LearnCode API is running',
    timestamp: new Date().toISOString(),
    db: 'json-file',
    backend: 'express'
  });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// ===== START =====
app.listen(PORT, () => {
  console.log(`\n🚀 LearnCode API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Storage: JSON files in ./data/`);
  console.log(`   Env: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
