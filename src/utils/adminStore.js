// src/utils/adminStore.js — Firestore-backed admin data store

import { doc, getDoc, setDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MOCK_COURSES } from './auth';
import { COURSES } from './courseData';

const LS_COURSES  = 'lc_admin_courses';
const LS_LESSONS  = 'lc_admin_lesson_content';

export const AdminStore = {

  // ─── COURSES ────────────────────────────────────────────────

  async syncCourses() {
    try {
      const snap = await getDocs(collection(db, 'courses'));
      const overrides = JSON.parse(localStorage.getItem(LS_COURSES)) || {};
      snap.forEach(doc => {
        const data = doc.data();
        if (data.updatedAt) delete data.updatedAt; // Don't store timestamp object in local storage
        overrides[doc.id] = { ...overrides[doc.id], ...data };
      });
      localStorage.setItem(LS_COURSES, JSON.stringify(overrides));
    } catch (e) {
      console.warn('Firestore courses sync failed:', e);
    }
  },


  getCourses() {
    const overrides = JSON.parse(localStorage.getItem(LS_COURSES)) || {};
    return MOCK_COURSES.map(course => {
      const override = overrides[course.id] || {};
      const staticData = COURSES[course.id] || {};
      const staticLessons = (staticData.lessons || []).map(l => ({
        id: l.id, title: l.title, contentPath: l.contentPath
      }));

      let lessonsList = override.lessons_list || staticLessons;
      lessonsList = lessonsList.map(l => {
        const sl = staticLessons.find(s => String(s.id) === String(l.id));
        return {
          ...l,
          title: l.title || l.name || sl?.title || 'Untitled Lesson',
          contentPath: l.contentPath || l.url || sl?.contentPath || '',
        };
      });

      return { ...course, ...override, lessons_list: lessonsList };
    });
  },

  getCourse(id) {
    return this.getCourses().find(c => String(c.id) === String(id));
  },

  async updateCourse(id, updates) {
    // 1. Local
    const overrides = JSON.parse(localStorage.getItem(LS_COURSES)) || {};
    overrides[id] = { ...overrides[id], ...updates };
    localStorage.setItem(LS_COURSES, JSON.stringify(overrides));

    // 2. Firestore: courses/{id}
    try {
      await setDoc(doc(db, 'courses', String(id)), {
        ...updates,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore course update failed:', e);
    }
  },

  // ─── LESSON CONTENT ─────────────────────────────────────────

  getLessonContent(courseId, lessonId) {
    const lessons = JSON.parse(localStorage.getItem(LS_LESSONS)) || {};
    return lessons[`${courseId}_${lessonId}`] || '';
  },

  async saveLessonContent(courseId, lessonId, content) {
    // 1. Local immediately
    const lessons = JSON.parse(localStorage.getItem(LS_LESSONS)) || {};
    const key = `${courseId}_${lessonId}`;
    lessons[key] = content;
    localStorage.setItem(LS_LESSONS, JSON.stringify(lessons));

    // 2. Firestore: lesson_contents/{courseId_lessonId}
    try {
      await setDoc(doc(db, 'lesson_contents', `${courseId}_${lessonId}`), {
        courseId: String(courseId),
        lessonId: String(lessonId),
        content,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore lesson content save failed:', e);
    }
  },

  // Load lesson content from Firestore (called by Lesson.jsx)
  async fetchLessonContent(courseId, lessonId) {
    // Check local cache first
    const cached = this.getLessonContent(courseId, lessonId);
    if (cached) return cached;

    // Fetch from Firestore
    try {
      const snap = await getDoc(doc(db, 'lesson_contents', `${courseId}_${lessonId}`));
      if (snap.exists()) {
        const content = snap.data().content || '';
        // Cache locally
        const lessons = JSON.parse(localStorage.getItem(LS_LESSONS)) || {};
        lessons[`${courseId}_${lessonId}`] = content;
        localStorage.setItem(LS_LESSONS, JSON.stringify(lessons));
        return content;
      }
    } catch (e) {
      console.warn('Firestore lesson content fetch failed:', e);
    }
    return '';
  },

  // ─── LESSONS ────────────────────────────────────────────────

  addLesson(courseId, lesson) {
    const course = this.getCourse(courseId);
    if (!course) return;
    const newLessons = [...(course.lessons_list || []), lesson];
    this.updateCourse(courseId, { lessons_list: newLessons, lessons: newLessons.length });
  },

  removeLesson(courseId, lessonId) {
    const course = this.getCourse(courseId);
    if (!course) return;
    const newLessons = (course.lessons_list || []).filter(l => l.id !== lessonId);
    this.updateCourse(courseId, { lessons_list: newLessons, lessons: newLessons.length });
  },
};
