import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Share2, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';
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
      toast.success('Reset code sent to your email!');
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to send reset code';
      setError(typeof msg === 'string' ? msg : 'Failed to send reset code');
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
      toast.success('Code verified!');
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Invalid code';
      setError(typeof msg === 'string' ? msg : 'Invalid code');
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
      toast.success('Password reset successfully! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to reset password';
      setError(typeof msg === 'string' ? msg : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-orb"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-orb-2"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-xl shadow-purple-500/25 mb-4">
            <Share2 size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Reset password</h1>
          <p className="mt-2 text-gray-400">
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the code sent to your email"}
            {step === 3 && "Choose a new password"}
          </p>
        </div>

        {stepIndicator}

        <div className="glass-card p-8">
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
                    id="forgot-email"
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
                className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Reset Code
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
                  Code sent to <span className="text-purple-400 font-medium">{email}</span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reset Code</label>
                <div className="relative">
                  <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="forgot-otp"
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
                className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Verify Code
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

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <ShieldCheck size={14} />
                  Verified: {email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="forgot-new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm new password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="forgot-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    required
                    minLength={6}
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 ${
                      confirmPassword && confirmPassword !== newPassword
                        ? 'border-red-500/50'
                        : confirmPassword && confirmPassword === newPassword
                          ? 'border-emerald-500/50'
                          : 'border-gray-700/50'
                    }`}
                  />
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="text-xs text-red-400 mt-1.5">Passwords don&apos;t match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
