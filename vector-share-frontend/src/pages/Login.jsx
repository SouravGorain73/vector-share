import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Share2, ArrowRight } from 'lucide-react';
import GoogleButton from '../components/GoogleButton';
import authService from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) { return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = authService.getGoogleOAuthUrl();
  };

  return (
    <div className="min-h-screen bg-[#111827] text-[#F5F3EB] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-grid-technical font-sans">
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#151F2E] border border-[#D7FF64]/40 text-[#D7FF64] mb-4 hover:border-[#D7FF64] transition-colors">
            <Share2 size={22} />
          </Link>
          <div className="text-xs font-mono uppercase tracking-widest text-[#737373] mb-1">
            [ACCESS // VERIFICATION]
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[#FFFFFF] tracking-tight">
            AUTHENTICATE VAULT
          </h1>
          <p className="mt-1.5 text-xs text-[#737373]">Enter credentials for cryptographic token release</p>
        </div>

        {/* Editorial Dossier Card */}
        <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-8 shadow-2xl">
          {/* Google OAuth */}
          <GoogleButton label="Authenticate with Google" onClick={handleGoogleLogin} />

          <div className="auth-divider my-6">or continue with email credentials</div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#151F2E] border border-[#E5E3DA]/15 rounded text-sm text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] focus:ring-1 focus:ring-[#D7FF64] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-mono text-[#D7FF64] hover:underline">
                  Recovery?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secret token"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-11 py-3 bg-[#151F2E] border border-[#E5E3DA]/15 rounded text-sm text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] focus:ring-1 focus:ring-[#D7FF64] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#FFFFFF] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#111827]/30 border-t-[#111827] rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Unlock Vault</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Registration link */}
          <div className="mt-6 pt-5 border-t border-[#E5E3DA]/10 text-center">
            <p className="text-xs text-[#737373]">
              Unregistered entity?{' '}
              <Link to="/register" className="text-[#D7FF64] font-semibold hover:underline">
                Establish Vault Account
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs font-mono text-[#737373] hover:text-[#FFFFFF] transition-colors">
            ← RETURN TO SPECIFICATION
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
