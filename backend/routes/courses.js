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

    // Return lesson metadata (actual content is in frontend for this demo)
    const lessonCount = course.lessons;
    const lessons = Array.from({ length: lessonCount }, (_, i) => ({
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

module.exports = router;
