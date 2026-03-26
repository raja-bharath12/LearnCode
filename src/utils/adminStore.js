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
      const staticData = COURSES[course.id] || {};
      const staticLessons = (staticData.lessons || []).map(l => ({
        id: l.id,
        title: l.title,
        contentPath: l.contentPath
      }));
      
      // If override has a lessons_list, we use it, but we MUST ensure each lesson 
      // has its title and contentPath (inherited from static if missing)
      let lessonsList = override.lessons_list || staticLessons;
      
      // Patch missing titles or paths in overrides (migration/cleanup)
      lessonsList = lessonsList.map(l => {
        const staticL = staticLessons.find(sl => String(sl.id) === String(l.id));
        return {
          ...l,
          title: l.title || l.name || staticL?.title || 'Untitled Lesson',
          contentPath: l.contentPath || l.url || staticL?.contentPath || ''
        };
      });

      return {
        ...course,
        ...override,
        lessons_list: lessonsList
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
