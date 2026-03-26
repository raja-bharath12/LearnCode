// src/utils/adminStore.js
import { MOCK_COURSES } from './auth';
import { COURSES } from './courseData';

const STORAGE_KEY_COURSES = 'lc_admin_courses';
const STORAGE_KEY_LESSONS = 'lc_admin_lesson_content';

export const AdminStore = {
  // --- COURSE MANAGEMENT ---
  
  // Get all courses (merging mock data with local overrides)
  getCourses() {
    const overrides = JSON.parse(localStorage.getItem(STORAGE_KEY_COURSES)) || {};
    return MOCK_COURSES.map(course => {
      const override = overrides[course.id] || {};
      const staticLessons = COURSES[course.id]?.lessons || [];
      return {
        ...course,
        lessons_list: staticLessons.map(l => ({
          id: l.id,
          name: l.title,
          url: l.contentPath // provide the full path
        })),
        ...override
      };
    });
  },

  // Get a single course
  getCourse(id) {
    const courses = this.getCourses();
    return courses.find(c => String(c.id) === String(id));
  },

  // Update a course (visibility, title, lesson list, etc.)
  updateCourse(id, updates) {
    const overrides = JSON.parse(localStorage.getItem(STORAGE_KEY_COURSES)) || {};
    overrides[id] = { ...overrides[id], ...updates };
    localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(overrides));
  },

  // --- LESSON MANAGEMENT ---

  // Get lesson content
  getLessonContent(courseId, lessonId) {
    const lessons = JSON.parse(localStorage.getItem(STORAGE_KEY_LESSONS)) || {};
    const key = `${courseId}_${lessonId}`;
    return lessons[key] || ''; // Fallback to empty if not in store (fetch logic in component will handle fetching from disk)
  },

  // Save lesson content
  saveLessonContent(courseId, lessonId, content) {
    const lessons = JSON.parse(localStorage.getItem(STORAGE_KEY_LESSONS)) || {};
    const key = `${courseId}_${lessonId}`;
    lessons[key] = content;
    localStorage.setItem(STORAGE_KEY_LESSONS, JSON.stringify(lessons));
  },

  // Add a lesson to a course
  addLesson(courseId, lesson) {
    const course = this.getCourse(courseId);
    if (!course) return;
    const newLessons = [...(course.lessons_list || []), lesson];
    this.updateCourse(courseId, { lessons_list: newLessons, lessons: newLessons.length });
  },

  // Remove a lesson from a course
  removeLesson(courseId, lessonId) {
    const course = this.getCourse(courseId);
    if (!course) return;
    const newLessons = (course.lessons_list || []).filter(l => l.id !== lessonId);
    this.updateCourse(courseId, { lessons_list: newLessons, lessons: newLessons.length });
  }
};
