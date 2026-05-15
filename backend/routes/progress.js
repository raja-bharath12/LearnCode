// routes/progress.js — User Progress Tracking (JSON file storage)

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'learncode_jwt_secret_dev_2026';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

// GET /api/progress/:courseId
router.get('/:courseId', authMiddleware, (req, res) => {
  const progress = db.getProgressForUser(req.user.id, req.params.courseId);
  res.json({
    progress: progress
      ? { completedLessons: progress.completedLessons, completed: progress.completed, lastActivity: progress.lastActivity }
      : { completedLessons: [], completed: false }
  });
});

// POST /api/progress/mark
router.post('/mark', authMiddleware, (req, res) => {
  const { courseId, lessonId, totalLessons } = req.body;

  if (!courseId || !lessonId) {
    return res.status(400).json({ error: 'courseId and lessonId are required.' });
  }

  const existing = db.getProgressForUser(req.user.id, courseId);
  let completedLessons = existing?.completedLessons || [];

  if (!completedLessons.includes(lessonId)) {
    completedLessons = [...completedLessons, lessonId];
  }

  const result = db.upsertProgress(req.user.id, courseId, completedLessons, totalLessons);

  res.json({
    success: true,
    completedLessons: result.completedLessons.length,
    completed: result.completed
  });
});

// GET /api/progress/summary/all
router.get('/summary/all', authMiddleware, (req, res) => {
  const all = db.getAllProgressForUser(req.user.id);
  res.json({
    summary: all.map(p => ({
      courseId: p.courseId,
      completedLessons: p.completedLessons?.length || 0,
      completed: p.completed,
      lastActivity: p.lastActivity
    }))
  });
});

module.exports = router;
