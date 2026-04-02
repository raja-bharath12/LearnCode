// LearnCode — Backend Server
// Node.js + Express + Supabase

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean)
  .concat([
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5500',
    'http://localhost:5500'
  ]);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);

// Stats
app.get('/api/stats', async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    if (error) throw error;
    res.json({ users: count || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  let dbStatus = 'unknown';
  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    dbStatus = error ? 'error' : 'connected';
  } catch {
    dbStatus = 'disconnected';
  }
  res.json({
    status: 'ok',
    message: 'LearnCode API is running',
    timestamp: new Date().toISOString(),
    db: dbStatus,
    backend: 'supabase'
  });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ===== START =====
app.listen(PORT, () => {
  console.log(`\n🚀 LearnCode API running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Database:     Supabase (${process.env.SUPABASE_URL})`);
  console.log(`   Environment:  ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
