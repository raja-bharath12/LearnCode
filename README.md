# LearnCode — React Frontend + Node.js Backend

A full-stack learning platform converted from plain HTML/CSS/JS to **React (Vite)**.

---

## 📁 Project Structure

```
learncode-react/
├── backend/            ← Node.js + Express + MongoDB (unchanged logic)
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── src/                ← React frontend (Vite)
    ├── components/
    │   ├── Header.jsx
    │   ├── Sidebar.jsx
    │   ├── Footer.jsx
    │   └── Toast.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── AdminRegister.jsx
    │   ├── Courses.jsx
    │   ├── Lesson.jsx
    │   ├── Dashboard.jsx
    │   ├── Profile.jsx
    │   └── About.jsx
    ├── utils/
    │   ├── auth.js         ← Auth helpers, API calls, Progress tracker
    │   └── courseData.js   ← Static lesson content
    ├── style.css
    ├── dashboard.css
    ├── profile.css
    ├── App.jsx
    └── main.jsx
```

---

## 🚀 Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
# (optional) copy .env.example to .env and set MONGO_URI
npm run dev
```
Backend runs on **http://localhost:5000**

### 2. Start the React Frontend

```bash
# From the root (learncode-react/)
npm install
npm run dev
```
Frontend runs on **http://localhost:3000**

---

## 🔄 What Changed (HTML → React)

| Old (HTML) | New (React) |
|---|---|
| Separate `.html` files per page | Single-page app with React Router |
| `<script>` tags in each HTML file | React components with hooks |
| `window.location.href` navigation | `useNavigate()` / `<Link>` |
| Manual DOM manipulation (`getElementById`) | React state (`useState`, `useEffect`) |
| Inline `onsubmit="handleLogin(event)"` | `onSubmit={handleLogin}` JSX event |
| Global `Auth` object in `main.js` | Imported from `src/utils/auth.js` |
| Global `Progress` object | Imported from `src/utils/auth.js` |
| Toast via `document.createElement` | `<ToastContainer>` component |
| `<form>` page reloads | Controlled forms with `e.preventDefault()` |

## 🔌 Backend Changes

Only one small change was made to `backend/server.js`:

- **CORS origins** now includes `http://localhost:5173` (Vite's alternate port) in addition to `http://localhost:3000`.

All routes, models, and logic remain **100% identical**.

---

## 🌐 Pages / Routes

| Route | Page |
|---|---|
| `/` | Home (Hero, Featured Courses, Testimonials) |
| `/login` | Sign In |
| `/register` | Create Account |
| `/admin-register` | Admin/Instructor Register |
| `/courses` | All Courses (with filter) |
| `/lesson?course=1` | Lesson Viewer + Code Editor |
| `/dashboard` | User Dashboard (stats, heatmap) |
| `/profile` | Profile & Settings |
| `/about` | About page |
