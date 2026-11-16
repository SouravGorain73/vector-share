import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Share2, Loader2, AlertCircle } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

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
        const timer = setTimeout(() => navigate('/dashboard', { replace: true }), 500);
        return () => clearTimeout(timer);
      } catch {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setError("We couldn't log you in with Google. Please try again.");
      }
    } else {
      setError('No login token received. Please try signing in again.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex items-center justify-center px-4 font-sans bg-grid-technical relative">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md text-center animate-fade-in-up bg-[var(--bg-card)] border border-red-500/20 p-8 rounded-xl shadow-xl">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 mb-5">
            <AlertCircle size={28} />
          </div>
          <div className="text-xs font-medium uppercase tracking-wider text-red-500 mb-1">
            Sign In Error
          </div>
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">
            Couldn't Sign You In
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 px-6 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] font-medium text-sm rounded-lg transition-colors cursor-pointer"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex items-center justify-center px-4 font-sans bg-grid-technical relative">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <ThemeToggle />
      </div>
      <div className="text-center relative z-10 animate-fade-in-up bg-[var(--bg-card)] border border-[var(--border-color)] p-10 rounded-xl shadow-xl max-w-md w-full">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--accent)] mb-6 shadow-sm">
          <Share2 size={26} />
        </div>
        <h1 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">
          Logging You In...
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">
          Finalizing your sign in, just a moment...
        </p>
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          <Loader2 size={20} className="animate-spin text-[var(--accent)]" />
          <span>Loading your workspace...</span>
        </div>
      </div>
    </div>
  );
}

export default OAuthSuccess;
