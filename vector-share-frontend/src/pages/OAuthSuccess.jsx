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
        const timer = setTimeout(() => navigate('/dashboard', { replace: true }), 500);
        return () => clearTimeout(timer);
      } catch {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setError('Failed to process authentication token. Please re-authenticate.');
      }
    } else {
      setError('No authentication token received from identity provider.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#111827] text-[#F5F3EB] flex items-center justify-center px-4 font-sans bg-grid-technical">
        <div className="w-full max-w-md text-center animate-fade-in-up bg-[#0E1522] border border-red-500/20 p-8 rounded-lg shadow-2xl">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded bg-red-500/10 border border-red-500/30 text-red-400 mb-5">
            <AlertCircle size={28} />
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-red-400 mb-1">
            [OAUTH // FAULT]
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#FFFFFF] mb-2">
            Authentication Incomplete
          </h1>
          <p className="text-xs text-[#737373] mb-6 font-mono leading-relaxed">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 px-6 bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
          >
            Return to Authentication
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#F5F3EB] flex items-center justify-center px-4 font-sans bg-grid-technical">
      <div className="text-center relative z-10 animate-fade-in-up bg-[#0E1522] border border-[#E5E3DA]/15 p-10 rounded-lg shadow-2xl max-w-md w-full">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded bg-[#151F2E] border border-[#D7FF64]/40 text-[#D7FF64] mb-6">
          <Share2 size={26} />
        </div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF64] mb-1">
          [OAUTH // HANDSHAKE]
        </div>
        <h1 className="font-display font-extrabold text-2xl text-[#FFFFFF] mb-2">
          Verifying Identity
        </h1>
        <p className="text-xs text-[#737373] mb-8 font-mono">
          Synchronizing OAuth2 bearer token with vault state...
        </p>
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#D7FF64]">
          <Loader2 size={20} className="animate-spin text-[#D7FF64]" />
          <span>ESTABLISHING SESSION</span>
        </div>
      </div>
    </div>
  );
}

export default OAuthSuccess;
