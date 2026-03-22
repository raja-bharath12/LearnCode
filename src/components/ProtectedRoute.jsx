// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { Auth } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!Auth.isLoggedIn()) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
