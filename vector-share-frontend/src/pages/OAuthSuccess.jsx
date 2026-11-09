import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Share2, Loader2, AlertCircle } from 'lucide-react';

function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      try {
        handleOAuthCallback(token);
        setTimeout(() => navigate('/dashboard', { replace: true }), 500);
      } catch {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setError('Failed to process authentication. Please try again.');
      }
    } else {
      setError('No authentication token received.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
  console.log(error)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/15 mb-6">
            <AlertCircle size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Authentication Failed</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/25"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="text-center relative z-10 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-xl shadow-purple-500/25 mb-6 animate-pulse-glow">
          <Share2 size={32} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Signing you in...</h1>
        <p className="text-gray-400 mb-8">Completing Google authentication</p>
        <Loader2 size={32} className="mx-auto text-purple-400 animate-spin" />
      </div>
    </div>
  );
}

export default OAuthSuccess;
