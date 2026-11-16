import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Share2, ArrowRight, User, ShieldCheck, KeyRound } from 'lucide-react';
import GoogleButton from '../components/GoogleButton';
import ThemeToggle from '../components/ThemeToggle';
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

  if (score <= 1) return { score: 1, label: 'Weak password', color: 'bg-red-500' };
  if (score <= 2) return { score: 2, label: 'Fair password', color: 'bg-amber-500' };
  if (score <= 3) return { score: 3, label: 'Good password', color: 'bg-[var(--accent)]' };
  if (score <= 4) return { score: 4, label: 'Strong password', color: 'bg-[var(--accent)]' };
  return { score: 5, label: 'Very strong password', color: 'bg-[var(--accent)]' };
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
      toast.success('Verification code sent to your email');
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to send verification code. Please try again.';
      setError(typeof msg === 'string' ? msg : 'Failed to send verification code. Please try again.');
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
      toast.success('Email verified successfully!');
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Invalid verification code. Please check and try again.';
      setError(typeof msg === 'string' ? msg : 'Invalid verification code. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password);
    setIsLoading(false);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error || 'Failed to create account. Please try again.');
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = authService.getGoogleOAuthUrl();
  };

  const stepLabels = {
    1: 'Step 1 of 3: Enter email',
    2: 'Step 2 of 3: Verify code',
    3: 'Step 3 of 3: Create password',
  };

  return (
    <div className="min-h-screen md:h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex items-center justify-center p-3 sm:p-4 relative overflow-y-auto md:overflow-hidden bg-grid-technical font-sans">
      {/* Top Header / Mode Switcher */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm sm:max-w-md relative z-10 animate-fade-in-up py-2">
        
        {/* Brand Header */}
        <div className="text-center mb-3 sm:mb-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--accent)] mb-1.5 sm:mb-2 hover:border-[var(--accent)] transition-colors shadow-sm"
          >
            <Share2 size={20} />
          </Link>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
            Create Your Account
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
            Sign up to start uploading and sharing your files
          </p>
        </div>

        {/* Step Progress Indicator */}
        <div className="mb-3 sm:mb-3.5 p-2 sm:p-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl flex items-center justify-between text-xs font-medium">
          <span className="text-[var(--accent)] font-semibold">{stepLabels[step]}</span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  step === s
                    ? 'bg-[var(--accent)] ring-2 ring-[var(--accent)]/30'
                    : step > s
                    ? 'bg-[var(--accent)]/60'
                    : 'bg-[var(--border-color)]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 sm:p-6 shadow-xl">
          {step === 1 && (
            <>
              <GoogleButton label="Sign up with Google" onClick={handleGoogleSignUp} />
              <div className="auth-divider my-3 sm:my-3.5 text-xs">or sign up with email</div>
            </>
          )}

          {error && (
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium mb-3 sm:mb-4 flex items-center gap-2">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-3 sm:space-y-3.5">
              <div>
                <label htmlFor="register-email" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1 sm:mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-6 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] font-medium text-sm rounded-lg transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-3 sm:mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <Mail size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-3 sm:space-y-3.5">
              <div className="text-center mb-3 p-3 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-xl">
                <div className="w-8 h-8 rounded-full mx-auto bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] mb-1.5 shadow-sm">
                  <ShieldCheck size={18} />
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  We sent a 6-digit verification code to <span className="font-semibold text-[var(--text-primary)]">{email}</span>
                </p>
              </div>

              <div>
                <label htmlFor="register-otp" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1 sm:mb-1.5 text-center">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="register-otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    required
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-lg text-center text-lg sm:text-xl tracking-widest font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-6 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] font-medium text-sm rounded-lg transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Verify Code</span>
                    <ShieldCheck size={16} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(''); setError(''); }}
                className="w-full text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-center cursor-pointer pt-1"
              >
                ← Change email address
              </button>
            </form>
          )}

          {/* Step 3: Name + Password */}
          {step === 3 && (
            <form onSubmit={handleRegister} className="space-y-2.5 sm:space-y-3">
              <div className="text-center mb-2 sm:mb-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-medium">
                  <ShieldCheck size={13} />
                  Verified: {email}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="register-name" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Your full name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="register-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    required
                    className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="register-password" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-9 pr-9 py-1.5 sm:py-2 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {password && (
                  <div className="mt-1.5 space-y-0.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-sm transition-all duration-200 ${
                            i <= strength.score ? strength.color : 'bg-[var(--border-color)]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="register-confirm-password" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="register-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    minLength={6}
                    className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-xs text-red-500 font-medium mt-1">Passwords do not match.</p>
                )}
              </div>

              {/* Submit */}
              <button
                id="register-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-6 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] font-medium text-sm rounded-lg transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2.5 sm:mt-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Login link */}
          <div className="mt-3.5 pt-3 sm:mt-4 sm:pt-3.5 border-t border-[var(--border-color)] text-center">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--accent)] font-semibold hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-2.5 sm:mt-3 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
