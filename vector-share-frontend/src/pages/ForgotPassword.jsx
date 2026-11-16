import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Share2, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import authService from '../services/authService';
import toast from 'react-hot-toast';

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authService.sendPasswordResetOtp(email);
      toast.success('Password reset code sent to your email');
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to send reset code. Please try again.';
      setError(typeof msg === 'string' ? msg : 'Failed to send reset code. Please try again.');
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
      toast.success('Code verified successfully!');
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Invalid verification code. Please check and try again.';
      setError(typeof msg === 'string' ? msg : 'Invalid verification code. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(email, newPassword);
      toast.success('Password reset successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to reset password. Please try again.';
      setError(typeof msg === 'string' ? msg : 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            Reset Your Password
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
            {step === 1 && 'Enter your registered email to receive a password reset code'}
            {step === 2 && 'Enter the 6-digit verification code sent to your email'}
            {step === 3 && 'Choose a strong new password for your account'}
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
                <label htmlFor="forgot-email" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1 sm:mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="forgot-email"
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
                    <span>Send Reset Code</span>
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
                  Code sent to: <span className="font-semibold text-[var(--text-primary)]">{email}</span>
                </p>
              </div>

              <div>
                <label htmlFor="forgot-otp" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1 sm:mb-1.5 text-center">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="forgot-otp"
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

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-2.5 sm:space-y-3">
              <div className="text-center mb-2 sm:mb-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-medium">
                  <ShieldCheck size={13} />
                  Verified: {email}
                </div>
              </div>

              <div>
                <label htmlFor="forgot-new-password" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  New password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="forgot-new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
              </div>

              <div>
                <label htmlFor="forgot-confirm-password" className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Confirm new password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="forgot-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    minLength={6}
                    className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="text-xs text-red-500 font-medium mt-1">Passwords do not match</p>
                )}
              </div>

              <button
                id="forgot-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-6 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] font-medium text-sm rounded-lg transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2.5 sm:mt-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Login link */}
          <div className="mt-3.5 pt-3 sm:mt-4 sm:pt-3.5 border-t border-[var(--border-color)] text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--accent)] hover:underline font-semibold">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
