// src/utils/auth.js — Auth helpers (mirrors original Auth object)

export const Auth = {
  getUser() {
    try { return JSON.parse(localStorage.getItem('lc_user')); } catch { return null; }
  },
  setUser(user) { localStorage.setItem('lc_user', JSON.stringify(user)); },
  logout() { localStorage.removeItem('lc_user'); window.location.href = '/'; },
  isLoggedIn() { return !!this.getUser(); },
  getToken() {
    const user = this.getUser();
    return user?.token || null;
  }
};

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const MOCK_COURSES = [
  {
    id: 1, title: "Python for Beginners", slug: "python-beginners",
    language: "Python", level: "Beginner", lessons: 24, duration: "8 hours",
    icon: "", color: "#3776ab", category: "data",
    description: "Start your coding journey with Python — the world's most beginner-friendly language. Learn variables, loops, functions, and more.",
    topics: ["Variables & Data Types", "Control Flow", "Functions", "Lists & Dicts", "File I/O", "OOP Basics"],
    instructor: "Dr. Sarah Chen", rating: 4.9, enrolled: 3200
  },
  {
    id: 2, title: "JavaScript Fundamentals", slug: "javascript-fundamentals",
    language: "JavaScript", level: "Beginner", lessons: 30, duration: "10 hours",
    icon: "", color: "#f7df1e", category: "web",
    description: "Master the language of the web. Learn JS from scratch and start building interactive websites.",
    topics: ["Variables & Types", "DOM Manipulation", "Events", "Functions", "Arrays", "Async/Await"],
    instructor: "Alex Rivera", rating: 4.8, enrolled: 4100
  },
  {
    id: 3, title: "Java Complete Course", slug: "java-complete",
    language: "Java", level: "Intermediate", lessons: 40, duration: "15 hours",
    icon: "", color: "#f89820", category: "backend",
    description: "A comprehensive Java course covering OOP, data structures, and enterprise programming patterns.",
    topics: ["OOP Concepts", "Inheritance", "Interfaces", "Collections", "Exception Handling", "Threads"],
    instructor: "Prof. Mike Johnson", rating: 4.7, enrolled: 2800
  },
  {
    id: 4, title: "Web Dev with HTML & CSS", slug: "html-css",
    language: "HTML/CSS", level: "Beginner", lessons: 20, duration: "6 hours",
    icon: "", color: "#00bcd4", category: "web",
    description: "Build beautiful, responsive websites from scratch with HTML5 and modern CSS3.",
    topics: ["HTML5 Semantics", "CSS Flexbox", "CSS Grid", "Responsive Design", "Animations", "Forms"],
    instructor: "Emma Wilson", rating: 4.9, enrolled: 5600
  },
  {
    id: 5, title: "Data Structures & Algorithms", slug: "dsa",
    language: "C++", level: "Intermediate", lessons: 35, duration: "14 hours",
    icon: "", color: "#9c27b0", category: "backend",
    description: "Master the algorithms and data structures needed to crack coding interviews at top companies.",
    topics: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Sorting", "Dynamic Programming", "Complexity"],
    instructor: "Dr. Raj Patel", rating: 4.8, enrolled: 3900
  },
  {
    id: 6, title: "React.js Crash Course", slug: "react-crash",
    language: "JavaScript", level: "Intermediate", lessons: 28, duration: "11 hours",
    icon: "", color: "#61dafb", category: "web",
    description: "Build modern web applications with React — the most popular frontend JavaScript library.",
    topics: ["Components & JSX", "State & Props", "Hooks", "Routing", "Context API", "REST APIs"],
    instructor: "Jake Thompson", rating: 4.9, enrolled: 4700
  },
  {
    id: 7, title: "Python Data Science", slug: "python-data-science",
    language: "Python", level: "Intermediate", lessons: 32, duration: "12 hours",
    icon: "", color: "#4caf50", category: "data",
    description: "Learn to analyze and visualize data with Python's most powerful libraries.",
    topics: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Statistics", "Machine Learning Intro"],
    instructor: "Dr. Priya Singh", rating: 4.8, enrolled: 3100
  },
  {
    id: 8, title: "C++ for Beginners", slug: "cpp-beginners",
    language: "C++", level: "Beginner", lessons: 26, duration: "9 hours",
    icon: "", color: "#00599c", category: "backend",
    description: "Learn C++ — the powerful language behind games, operating systems, and high-performance applications.",
    topics: ["Syntax & Variables", "Pointers", "Memory Management", "OOP", "STL", "File I/O"],
    instructor: "Carlos Mendez", rating: 4.7, enrolled: 2200
  },
  {
    id: 9, title: "Node.js & Express", slug: "nodejs-express",
    language: "JavaScript", level: "Intermediate", lessons: 24, duration: "10 hours",
    icon: "", color: "#539e43", category: "backend",
    description: "Build scalable backend applications and REST APIs using Node.js and Express.",
    topics: ["Node.js Basics", "Express Framework", "REST APIs", "Middleware", "Authentication", "Deployment"],
    instructor: "Nina Kowalski", rating: 4.8, enrolled: 3400
  },
  {
    id: 10, title: "SQL & Databases", slug: "sql-databases",
    language: "SQL", level: "Beginner", lessons: 18, duration: "7 hours",
    icon: "", color: "#f44336", category: "backend",
    description: "Master SQL queries, database design, and everything you need to work with data.",
    topics: ["SELECT Queries", "JOINs", "Aggregations", "Indexes", "Database Design", "Transactions"],
    instructor: "Tom Baker", rating: 4.9, enrolled: 4200
  },
  {
    id: 11, title: "TypeScript Essentials", slug: "typescript",
    language: "TypeScript", level: "Intermediate", lessons: 22, duration: "8 hours",
    icon: "", color: "#3178c6", category: "web",
    description: "Add static typing to your JavaScript for safer, more maintainable code.",
    topics: ["Types & Interfaces", "Generics", "Enums", "Decorators", "Modules", "Config"],
    instructor: "Lisa Park", rating: 4.8, enrolled: 2900
  },
  {
    id: 12, title: "Advanced Python", slug: "python-advanced",
    language: "Python", level: "Advanced", lessons: 36, duration: "14 hours",
    icon: "", color: "#ff5722", category: "data",
    description: "Take your Python skills to the next level with advanced patterns and techniques.",
    topics: ["Decorators", "Generators", "Async/Await", "Metaclasses", "Design Patterns", "Performance"],
    instructor: "Dr. Sarah Chen", rating: 4.9, enrolled: 1800
  },
  {
    id: 13, title: "Flutter Mastery", slug: "flutter-mastery",
    language: "Dart", level: "Intermediate", lessons: 45, duration: "18 hours",
    icon: "", color: "#02569b", category: "mobile",
    description: "Build professional, multi-platform applications from a single codebase with Flutter.",
    topics: ["Dart Basics", "Widget Lifecycle", "State Management", "Animations", "Firebase", "App Store Prep"],
    instructor: "Maria Garcia", rating: 4.9, enrolled: 1500
  },
  {
    id: 14, title: "Swift iOS Bootcamp", slug: "swift-ios",
    language: "Swift", level: "Beginner", lessons: 38, duration: "16 hours",
    icon: "", color: "#f05138", category: "mobile",
    description: "Start building native iOS apps with Swift and SwiftUI. Learn the Apple way of development.",
    topics: ["Swift Syntax", "SwiftUI", "Combine", "Core Data", "Networking", "App Store Guidelines"],
    instructor: "James Cook", rating: 4.8, enrolled: 2100
  },
  {
    id: 15, title: "Android with Kotlin", slug: "android-kotlin",
    language: "Kotlin", level: "Intermediate", lessons: 42, duration: "20 hours",
    icon: "", color: "#3ddc84", category: "mobile",
    description: "Master modern Android development using Kotlin, Coroutines, and Jetpack Compose.",
    topics: ["Kotlin Coroutines", "Jetpack Compose", "MVVM Architecture", "Hilt DI", "Room DB", "Play Store"],
    instructor: "Elena Volkov", rating: 4.7, enrolled: 1900
  },
  {
    id: 16, title: "Next.js 14 Deep Dive", slug: "nextjs-deep-dive",
    language: "JavaScript", level: "Advanced", lessons: 25, duration: "9 hours",
    icon: "", color: "#000000", category: "web",
    description: "Build incredibly fast web apps with Server Actions, App Router, and specialized caching.",
    topics: ["App Router", "Server Components", "Server Actions", "Streaming", "Auth.js", "Vercel Deployment"],
    instructor: "Tim Neutkens", rating: 4.9, enrolled: 3500
  },
  {
    id: 17, title: "Deep Learning with PyTorch", slug: "pytorch-dl",
    language: "Python", level: "Advanced", lessons: 50, duration: "25 hours",
    icon: "", color: "#ee4c2c", category: "data",
    description: "Dive into neural networks, computer vision, and NLP using the industry-standard PyTorch.",
    topics: ["Tensors", "AutoGrad", "CNNs", "RNNs & LSTMs", "Transformers", "Model Deployment"],
    instructor: "Dr. Andrej Karpathy", rating: 5.0, enrolled: 1200
  },
  {
    id: 18, title: "Go Backend Mastery", slug: "go-backend",
    language: "Go", level: "Intermediate", lessons: 28, duration: "12 hours",
    icon: "", color: "#00add8", category: "backend",
    description: "Learn to build high-performance distributed systems and microservices with Golang.",
    topics: ["Goroutines", "Channels", "Standard Library", "gRPC", "Docker & K8s", "Testing in Go"],
    instructor: "Rob Pike", rating: 4.8, enrolled: 2400
  },
  {
    id: 19, title: "Vue.js 3 Masterclass", slug: "vue-3",
    language: "JavaScript", level: "Intermediate", lessons: 32, duration: "13 hours",
    icon: "", color: "#42b883", category: "web",
    description: "The most approachable framework — master the Composition API and Pinia.",
    topics: ["Composition API", "Vue Router", "Pinia", "Vite", "Server Side Rendering", "Custom Hooks"],
    instructor: "Evan You", rating: 4.9, enrolled: 3100
  },
  {
    id: 20, title: "Cybersecurity Basics", slug: "cybersec",
    language: "Security", level: "Beginner", lessons: 15, duration: "5 hours",
    icon: "", color: "#546e7a", category: "backend",
    description: "Understand the fundamentals of network security, ethical hacking, and safe coding.",
    topics: ["Network Security", "Encryption", "OWASP Top 10", "Social Engineering", "OSINT", "Pentesting"],
    instructor: "Kevin Mitnick", rating: 4.8, enrolled: 4500
  }
];

export const MOCK_STUDENTS = [
  { id: 's1', name: 'Arjun Sharma', email: 'arjun@example.com', createdAt: '2026-01-15T10:00:00Z', stats: { attendedCourses: 5, courses: [1, 2, 3, 4, 5] } },
  { id: 's2', name: 'Priya Patel', email: 'priya@example.com', createdAt: '2026-02-01T11:30:00Z', stats: { attendedCourses: 3, courses: [1, 6, 9] } },
  { id: 's3', name: 'Rohan Gupta', email: 'rohan@example.com', createdAt: '2026-02-10T09:15:00Z', stats: { attendedCourses: 7, courses: [2, 4, 6, 8, 10, 11, 12] } },
  { id: 's4', name: 'Ananya Iyer', email: 'ananya@example.com', createdAt: '2026-03-05T14:45:00Z', stats: { attendedCourses: 2, courses: [1, 2] } },
  { id: 's5', name: 'Vikram Singh', email: 'vikram@example.com', createdAt: '2026-03-10T08:00:00Z', stats: { attendedCourses: 4, courses: [3, 5, 7, 13] } },
];

export async function fetchCourses(params = '') {
  try {
    const res = await fetch(`${API_BASE}/courses${params}`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (e) {
    console.warn('Backend not reachable — using fallback data');
    return { courses: MOCK_COURSES };
  }
}

export async function apiRequest(path, options = {}) {
  const token = Auth.getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  return res;
}

export const Progress = {
  get(courseId) {
    try { return JSON.parse(localStorage.getItem(`lc_progress_${courseId}`)) || []; } catch { return []; }
  },
  mark(courseId, lessonId) {
    const p = this.get(courseId);
    if (!p.includes(lessonId)) {
      p.push(lessonId);
      localStorage.setItem(`lc_progress_${courseId}`, JSON.stringify(p));
    }
  },
  getPercent(courseId, total) {
    if (!total) return 0;
    return Math.round((this.get(courseId).length / total) * 100);
  },
  getTimer(courseId, lessonId) {
    try {
      const timers = JSON.parse(localStorage.getItem(`lc_timers_${courseId}`)) || {};
      return timers[lessonId] !== undefined ? timers[lessonId] : null;
    } catch { return null; }
  },
  saveTimer(courseId, lessonId, seconds) {
    try {
      const timers = JSON.parse(localStorage.getItem(`lc_timers_${courseId}`)) || {};
      timers[lessonId] = seconds;
      localStorage.setItem(`lc_timers_${courseId}`, JSON.stringify(timers));
    } catch (e) { console.error("Failed to save timer:", e); }
  }
};

