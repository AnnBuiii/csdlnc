import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from '../store/authStore';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user } = authStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      navigate('/unauthorized');
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, user, requiredRole, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return children;
}
