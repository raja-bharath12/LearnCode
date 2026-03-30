// routes/courses.js — Course Routes

const express = require('express');
const router = express.Router();

const Course = require('../models/Course');

// GET /api/courses — Get all courses
router.get('/', async (req, res) => {
  try {
    const { level, language, category, search } = req.query;
    let query = {};

    if (level) query.level = { $regex: new RegExp(level, 'i') };
    if (language) query.language = { $regex: new RegExp(language, 'i') };
    if (category) query.category = category.toLowerCase();
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { language: { $regex: new RegExp(search, 'i') } }
      ];
    }

    const coursesList = await Course.find(query);

    res.json({
      count: coursesList.length,
      courses: coursesList
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// GET /api/courses/:id — Get single course (supports ID or slug)
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const isNumeric = !isNaN(id);
    
    let course;
    if (isNumeric) {
      course = await Course.findOne({ id: parseInt(id) });
    } else {
      course = await Course.findOne({ slug: id });
    }

    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ course });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching course' });
  }
});

// GET /api/courses/:id/lessons — Get lessons for a course
router.get('/:id/lessons', async (req, res) => {
  try {
    const course = await Course.findOne({ id: parseInt(req.params.id) });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Use stored lessons_list from DB if available, else generate default
    let lessons = course.lessons_list && course.lessons_list.length > 0
      ? course.lessons_list 
      : Array.from({ length: course.lessons }, (_, i) => ({
          id: i + 1,
          title: `Lesson ${i + 1}`,
          order: i + 1,
          completed: false
        }));

    res.json({ courseId: course.id, lessons });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching lessons' });
  }
});

// GET /api/courses/:courseId/lesson/:lessonId/content — Get lesson content override
router.get('/:courseId/lesson/:lessonId/content', async (req, res) => {
  try {
    const contentDoc = await require('../models/LessonContent').findOne({ 
      courseId: req.params.courseId, 
      lessonId: req.params.lessonId 
    });
    res.json({ content: contentDoc?.content || '' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// ADMIN ONLY: Update course (visibility, lessons_list, etc.)
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    const course = await Course.findOneAndUpdate({ id }, updates, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// ADMIN ONLY: Save lesson content
router.post('/:courseId/lesson/:lessonId/content', async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const { content } = req.body;
    
    await require('../models/LessonContent').findOneAndUpdate(
      { courseId, lessonId },
      { content },
      { upsert: true, new: true }
    );
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save lesson content' });
  }
});

module.exports = router;
