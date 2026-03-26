// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToastContainer from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentDetail from './pages/StudentDetail';
import AdminCourseManage from './pages/AdminCourseManage';
import AdminCourseEdit from './pages/AdminCourseEdit';
import AdminLessonEdit from './pages/AdminLessonEdit';
import About from './pages/About';
import Exams from './pages/Exams';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        
        {/* Protected Routes */}
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/lesson" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute><AdminCourseManage /></ProtectedRoute>} />
        <Route path="/admin/course/:id" element={<ProtectedRoute><AdminCourseEdit /></ProtectedRoute>} />
        <Route path="/admin/course/:courseId/lesson/:lessonId" element={<ProtectedRoute><AdminLessonEdit /></ProtectedRoute>} />
        <Route path="/admin/student/:id" element={<ProtectedRoute><StudentDetail /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/exams" element={<ProtectedRoute><Exams /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
