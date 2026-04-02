// routes/progress.js — User Progress Tracking Routes (Supabase)

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

const JWT_SECRET = process.env.JWT_SECRET || 'learncode_secret_change_in_production';

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
    const { data: progress, error } = await supabase
      .from('progress')
      .select('completed_lessons, completed, last_activity')
      .eq('user_id', req.user.id)
      .eq('course_id', parseInt(req.params.courseId))
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = row not found

    res.json({
      progress: progress
        ? { completedLessons: progress.completed_lessons, completed: progress.completed, lastActivity: progress.last_activity }
        : { completedLessons: [], completed: false }
    });

  } catch (err) {
    console.error('Progress fetch error:', err);
    res.status(500).json({ error: 'Error fetching progress.' });
  }
});

// POST /api/progress/mark — Mark a lesson as complete
router.post('/mark', authMiddleware, async (req, res) => {
  try {
    const { courseId, lessonId, totalLessons } = req.body;
    if (!courseId || !lessonId) return res.status(400).json({ error: 'courseId and lessonId required.' });

    // Get current progress
    const { data: existing } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('course_id', courseId)
      .single();

    let completedLessons = existing?.completed_lessons || [];

    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    const isCompleted = totalLessons && completedLessons.length >= totalLessons;

    const upsertData = {
      user_id: req.user.id,
      course_id: courseId,
      completed_lessons: completedLessons,
      last_activity: new Date().toISOString(),
      completed: isCompleted || false,
      ...(isCompleted ? { completed_at: new Date().toISOString() } : {})
    };

    if (!existing) {
      upsertData.started_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('progress')
      .upsert(upsertData, { onConflict: 'user_id,course_id' });

    if (error) throw error;

    res.json({
      success: true,
      completedLessons: completedLessons.length,
      completed: isCompleted || false
    });

  } catch (err) {
    console.error('Progress mark error:', err);
    res.status(500).json({ error: 'Error saving progress.' });
  }
});

// GET /api/progress/summary/all — Get all progress for current user
router.get('/summary/all', authMiddleware, async (req, res) => {
  try {
    const { data: progressList, error } = await supabase
      .from('progress')
      .select('course_id, completed_lessons, completed, last_activity')
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({
      summary: (progressList || []).map(p => ({
        courseId: p.course_id,
        completedLessons: p.completed_lessons?.length || 0,
        completed: p.completed,
        lastActivity: p.last_activity
      }))
    });

  } catch (err) {
    res.status(500).json({ error: 'Error fetching summary.' });
  }
});

module.exports = router;
