// routes/courses.js — Course Routes (Supabase)

const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// GET /api/courses — Get all courses
router.get('/', async (req, res) => {
  try {
    const { level, language, category, search } = req.query;

    let query = supabase.from('courses').select('*');

    if (level) query = query.ilike('level', `%${level}%`);
    if (language) query = query.ilike('language', `%${language}%`);
    if (category) query = query.eq('category', category.toLowerCase());
    if (search) {
      query = query.or(`title.ilike.%${search}%,language.ilike.%${search}%`);
    }

    const { data: courses, error } = await query;
    if (error) throw error;

    res.json({ count: courses.length, courses });

  } catch (err) {
    console.error('Courses fetch error:', err);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// GET /api/courses/:id — Get single course (supports numeric ID or slug)
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const isNumeric = !isNaN(id);

    let query = supabase.from('courses').select('*');
    if (isNumeric) {
      query = query.eq('course_id', parseInt(id));
    } else {
      query = query.eq('slug', id);
    }

    const { data: course, error } = await query.single();
    if (error || !course) return res.status(404).json({ error: 'Course not found' });

    res.json({ course });

  } catch (err) {
    res.status(500).json({ error: 'Error fetching course' });
  }
});

// GET /api/courses/:id/lessons — Get lessons for a course
router.get('/:id/lessons', async (req, res) => {
  try {
    const { data: course, error } = await supabase
      .from('courses')
      .select('course_id, lessons_count, lessons_list')
      .eq('course_id', parseInt(req.params.id))
      .single();

    if (error || !course) return res.status(404).json({ error: 'Course not found' });

    const lessons = course.lessons_list && course.lessons_list.length > 0
      ? course.lessons_list
      : Array.from({ length: course.lessons_count }, (_, i) => ({
          id: i + 1,
          title: `Lesson ${i + 1}`,
          order: i + 1,
          completed: false
        }));

    res.json({ courseId: course.course_id, lessons });

  } catch (err) {
    res.status(500).json({ error: 'Error fetching lessons' });
  }
});

// GET /api/courses/:courseId/lesson/:lessonId/content — Get lesson content
router.get('/:courseId/lesson/:lessonId/content', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('lesson_contents')
      .select('content')
      .eq('course_id', req.params.courseId)
      .eq('lesson_id', req.params.lessonId)
      .single();

    res.json({ content: data?.content || '' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// ADMIN: Update course (visibility, lessons_list, etc.)
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;

    // Map camelCase to snake_case if needed
    const dbUpdates = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.language !== undefined) dbUpdates.language = updates.language;
    if (updates.level !== undefined) dbUpdates.level = updates.level;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.visible !== undefined) dbUpdates.visible = updates.visible;
    if (updates.lessons_list !== undefined) dbUpdates.lessons_list = updates.lessons_list;
    if (updates.lessons !== undefined) dbUpdates.lessons_count = updates.lessons;
    if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
    if (updates.color !== undefined) dbUpdates.color = updates.color;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.instructor !== undefined) dbUpdates.instructor = updates.instructor;
    if (updates.topics !== undefined) dbUpdates.topics = updates.topics;

    const { data: course, error } = await supabase
      .from('courses')
      .update(dbUpdates)
      .eq('course_id', id)
      .select()
      .single();

    if (error || !course) return res.status(404).json({ error: 'Course not found' });

    res.json({ success: true, course });

  } catch (err) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// ADMIN: Save lesson content (upsert)
router.post('/:courseId/lesson/:lessonId/content', async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const { content } = req.body;

    const { error } = await supabase
      .from('lesson_contents')
      .upsert(
        { course_id: courseId, lesson_id: lessonId, content },
        { onConflict: 'course_id,lesson_id' }
      );

    if (error) throw error;

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: 'Failed to save lesson content' });
  }
});

module.exports = router;
