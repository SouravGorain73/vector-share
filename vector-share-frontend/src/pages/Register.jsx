import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Share2, ArrowRight, User, ShieldCheck, KeyRound } from 'lucide-react';
import GoogleButton from '../components/GoogleButton';
import authService from '../services/authService';
import toast from 'react-hot-toast';

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
  if (score <= 3) return { score: 3, label: 'Good', color: 'bg-yellow-400' };
  if (score <= 4) return { score: 4, label: 'Strong', color: 'bg-emerald-400' };
  return { score: 5, label: 'Very Strong', color: 'bg-emerald-400' };
}

function Register() {
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: details
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authService.sendOtp(email);
      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to send OTP';
      setError(typeof msg === 'string' ? msg : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authService.verifyOtp(email, otp);
      toast.success('Email verified!');
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Invalid OTP';
      setError(typeof msg === 'string' ? msg : 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password);
    setIsLoading(false);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = authService.getGoogleOAuthUrl();
  };

  const stepIndicator = (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            step >= s
              ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
              : 'bg-gray-800/60 text-gray-500 border border-gray-700/50'
          }`}>
            {s}
          </div>
          {s < 3 && (
            <div className={`w-8 h-0.5 rounded-full transition-all duration-300 ${
              step > s ? 'bg-purple-500' : 'bg-gray-700/50'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-orb"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-orb-2"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up py-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-xl shadow-purple-500/25 mb-4">
            <Share2 size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-gray-400">Join VectorShare and start sharing</p>
        </div>

        {stepIndicator}

        {/* Form card */}
        <div className="glass-card p-8">
          {step === 1 && (
            <>
              <GoogleButton label="Sign up with Google" onClick={handleGoogleSignUp} />
              <div className="auth-divider my-6">or register with email</div>
            </>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-5">
              {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Verification Code
                    <Mail size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center mb-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-3">
                  <ShieldCheck size={28} className="text-purple-400" />
                </div>
                <p className="text-gray-400 text-sm">
                  We sent a verification code to <span className="text-purple-400 font-medium">{email}</span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Verification Code</label>
                <div className="relative">
                  <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="register-otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                    maxLength={6}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-center text-lg tracking-widest font-mono"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Verify Email
                    <ShieldCheck size={18} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(''); setError(''); }}
                className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                ← Change email address
              </button>
            </form>
          )}

          {/* Step 3: Name + Password */}
          {step === 3 && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <ShieldCheck size={14} />
                  Email verified: {email}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="register-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2.5">
                    <div className="flex gap-1.5 mb-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength.score ? strength.color : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${
                      strength.score <= 1 ? 'text-red-400' :
                      strength.score <= 2 ? 'text-amber-400' :
                      strength.score <= 3 ? 'text-yellow-400' :
                      'text-emerald-400'
                    }`}>
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="register-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    minLength={6}
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 ${
                      confirmPassword && confirmPassword !== password
                        ? 'border-red-500/50 focus:border-red-500/50'
                        : confirmPassword && confirmPassword === password
                          ? 'border-emerald-500/50 focus:border-emerald-500/50'
                          : 'border-gray-700/50 focus:border-purple-500/50'
                    }`}
                  />
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-xs text-red-400 mt-1.5">Passwords don&apos;t match</p>
                )}
              </div>

              {/* Submit */}
              <button
                id="register-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to landing */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
