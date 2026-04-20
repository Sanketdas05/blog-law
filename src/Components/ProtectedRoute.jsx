import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — wraps author-only pages.
 * Redirects to /login if not authenticated or not an author.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAuthor, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0a192f]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthor) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
