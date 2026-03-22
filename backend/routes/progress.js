// routes/progress.js — User Progress Tracking Routes

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET || 'learncode_secret_change_in_production';

const Progress = require('../models/Progress');

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token.' });
  }
}

// GET /api/progress/:courseId
router.get('/:courseId', authMiddleware, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ progress: { completedLessons: [], percent: 0 } });
    }

    const progress = await Progress.findOne({
      userId: req.user.id,
      courseId: parseInt(req.params.courseId)
    });

    res.json({
      progress: progress
        ? { completedLessons: progress.completedLessons, completed: progress.completed, lastActivity: progress.lastActivity }
        : { completedLessons: [], completed: false }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching progress.' });
  }
});

// POST /api/progress/mark — Mark a lesson as complete
router.post('/mark', authMiddleware, async (req, res) => {
  try {
    const { courseId, lessonId, totalLessons } = req.body;
    if (!courseId || !lessonId) return res.status(400).json({ error: 'courseId and lessonId required.' });

    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, message: 'Demo mode — progress saved locally.' });
    }

    let progress = await Progress.findOne({ userId: req.user.id, courseId });

    if (!progress) {
      progress = new Progress({ userId: req.user.id, courseId, completedLessons: [] });
    }

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    progress.lastActivity = new Date();

    if (totalLessons && progress.completedLessons.length >= totalLessons) {
      progress.completed = true;
      progress.completedAt = new Date();
    }

    await progress.save();

    res.json({
      success: true,
      completedLessons: progress.completedLessons.length,
      completed: progress.completed
    });

  } catch (err) {
    console.error('Progress mark error:', err);
    res.status(500).json({ error: 'Error saving progress.' });
  }
});

// GET /api/progress/summary/all — Get all progress for a user
router.get('/summary/all', authMiddleware, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ summary: [] });
    }

    const progressList = await Progress.find({ userId: req.user.id });

    res.json({
      summary: progressList.map(p => ({
        courseId: p.courseId,
        completedLessons: p.completedLessons.length,
        completed: p.completed,
        lastActivity: p.lastActivity
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching summary.' });
  }
});

module.exports = router;
