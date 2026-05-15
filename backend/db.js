// db.js — Simple JSON file-based database helper
// Reads/writes to ./data/*.json — no external DB needed

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ─── USERS ────────────────────────────────────────────────────

function getUsers() {
  return readFile('users.json');
}

function saveUsers(users) {
  writeFile('users.json', users);
}

function findUserByEmail(email) {
  return getUsers().find(u => u.email === email.toLowerCase());
}

function findUserById(id) {
  return getUsers().find(u => u.id === id);
}

function createUser(userData) {
  const users = getUsers();
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    ...userData,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

function updateUser(id, updates) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
  return users[idx];
}

// ─── PROGRESS ─────────────────────────────────────────────────

function getProgress() {
  return readFile('progress.json');
}

function saveProgress(data) {
  writeFile('progress.json', data);
}

function getProgressForUser(userId, courseId) {
  return getProgress().find(
    p => p.userId === userId && p.courseId === Number(courseId)
  );
}

function upsertProgress(userId, courseId, completedLessons, totalLessons) {
  const all = getProgress();
  const isCompleted = totalLessons && completedLessons.length >= totalLessons;
  const now = new Date().toISOString();
  const idx = all.findIndex(
    p => p.userId === userId && p.courseId === Number(courseId)
  );

  if (idx === -1) {
    all.push({
      userId,
      courseId: Number(courseId),
      completedLessons,
      completed: isCompleted || false,
      startedAt: now,
      lastActivity: now,
      ...(isCompleted ? { completedAt: now } : {}),
    });
  } else {
    all[idx] = {
      ...all[idx],
      completedLessons,
      completed: isCompleted || false,
      lastActivity: now,
      ...(isCompleted ? { completedAt: now } : {}),
    };
  }

  saveProgress(all);
  return { completedLessons, completed: isCompleted || false };
}

function getAllProgressForUser(userId) {
  return getProgress().filter(p => p.userId === userId);
}

// ─── LESSON CONTENT ───────────────────────────────────────────

function getLessonContents() {
  return readFile('lesson_contents.json');
}

function saveLessonContents(data) {
  writeFile('lesson_contents.json', data);
}

function getLessonContent(courseId, lessonId) {
  return getLessonContents().find(
    lc => String(lc.courseId) === String(courseId) && String(lc.lessonId) === String(lessonId)
  );
}

function upsertLessonContent(courseId, lessonId, content) {
  const all = getLessonContents();
  const idx = all.findIndex(
    lc => String(lc.courseId) === String(courseId) && String(lc.lessonId) === String(lessonId)
  );
  const now = new Date().toISOString();
  if (idx === -1) {
    all.push({ courseId: String(courseId), lessonId: String(lessonId), content, updatedAt: now });
  } else {
    all[idx] = { ...all[idx], content, updatedAt: now };
  }
  saveLessonContents(all);
}

module.exports = {
  getUsers, saveUsers, findUserByEmail, findUserById, createUser, updateUser,
  getProgressForUser, upsertProgress, getAllProgressForUser,
  getLessonContent, upsertLessonContent,
};
