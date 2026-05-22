import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'user')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user } = useAuthStore();

  // If user is not authenticated, redirect to landing page
  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  // If role isn't authorized for this route, redirect to base dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
