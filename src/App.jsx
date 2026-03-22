// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToastContainer from './components/Toast';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import IDE from './pages/IDE';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/ide" element={<ProtectedRoute><IDE /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
