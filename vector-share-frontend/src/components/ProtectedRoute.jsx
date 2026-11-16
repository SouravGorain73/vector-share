import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111827]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#D7FF64]/20 border-t-[#D7FF64] rounded-full animate-spin"></div>
          <p className="text-[#737373] text-xs font-mono tracking-widest uppercase">AUTHENTICATING SESSION...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
