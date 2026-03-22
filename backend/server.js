// LearnCode — Backend Server
// Node.js + Express + MongoDB

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors({
  origin: [
    'http://localhost:3000',  // React (Vite dev server)
    'http://localhost:5173',  // Vite alternate port
    'http://127.0.0.1:5500',
    'http://localhost:5500'
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

// ===== DATABASE =====
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/learncode';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.warn('⚠️  MongoDB not connected — running in demo mode');
    console.warn('   Set MONGO_URI in .env to connect a real database');
  });

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);

// Stats
app.get('/api/stats', async (req, res) => {
  try {
    let userCount = 1; // Default
    if (mongoose.connection.readyState === 1) {
      const User = require('./models/User');
      userCount = await User.countDocuments();
      if (userCount === 0) userCount = 0; // if you want 0 to be 0
    }
    res.json({ users: userCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'LearnCode API is running',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
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
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
