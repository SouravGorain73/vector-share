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
      toast.success('Recovery token dispatched to your email');
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to dispatch recovery code';
      setError(typeof msg === 'string' ? msg : 'Failed to dispatch recovery code');
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
      toast.success('Recovery code validated');
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Invalid recovery code';
      setError(typeof msg === 'string' ? msg : 'Invalid recovery code');
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
      toast.success('Master password reset complete. Please authenticate.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to reset password';
      setError(typeof msg === 'string' ? msg : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const stepLabels = {
    1: '01 / 03 — RECOVERY IDENTITY',
    2: '02 / 03 — OTP VERIFICATION',
    3: '03 / 03 — NEW CREDENTIALS',
  };

  return (
    <div className="min-h-screen bg-[#111827] text-[#F5F3EB] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-grid-technical font-sans">
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#151F2E] border border-[#D7FF64]/40 text-[#D7FF64] mb-3 hover:border-[#D7FF64] transition-colors">
            <Share2 size={22} />
          </Link>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#737373]">
            [SECURITY // RECOVERY]
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[#FFFFFF] tracking-tight mt-1">
            KEY RECOVERY
          </h1>
          <p className="mt-1 text-xs text-[#737373]">
            {step === 1 && "Submit verified email for cryptographic challenge"}
            {step === 2 && "Enter 6-digit challenge token dispatched to email"}
            {step === 3 && "Configure new master vault credentials"}
          </p>
        </div>

        {/* Monospaced Step Ledger */}
        <div className="mb-6 p-3 bg-[#0E1522] border border-[#E5E3DA]/10 rounded flex items-center justify-between text-xs font-mono">
          <span className="text-[#D7FF64] font-bold">{stepLabels[step]}</span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`w-2 h-2 rounded-full transition-all ${
                  step === s ? 'bg-[#D7FF64] ring-2 ring-[#D7FF64]/30' : step > s ? 'bg-[#D7FF64]/50' : 'bg-[#151F2E]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-8 shadow-2xl">
          {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-5 flex items-center gap-2">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-2">
                  Vault Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#151F2E] border border-[#E5E3DA]/15 rounded text-sm text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] focus:ring-1 focus:ring-[#D7FF64] transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#111827]/30 border-t-[#111827] rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Dispatch Reset Challenge</span>
                    <Mail size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center mb-4 p-4 bg-[#111827] border border-[#E5E3DA]/10 rounded">
                <div className="w-10 h-10 rounded mx-auto bg-[#151F2E] border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64] mb-2">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-xs text-[#737373] font-mono">
                  CHALLENGE DISPATCHED TO: <span className="text-[#FFFFFF]">{email}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-2 text-center">
                  6-Digit Challenge Token
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="forgot-otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    required
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-[#151F2E] border border-[#E5E3DA]/15 rounded text-center text-lg tracking-widest font-mono text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] focus:ring-1 focus:ring-[#D7FF64] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#111827]/30 border-t-[#111827] rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Authorize Challenge</span>
                    <ShieldCheck size={15} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(''); setError(''); }}
                className="w-full text-xs font-mono text-[#737373] hover:text-[#FFFFFF] transition-colors text-center"
              >
                ← RE-ENTER IDENTITY
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151F2E] border border-[#D7FF64]/30 text-[#D7FF64] text-xs font-mono">
                  <ShieldCheck size={13} />
                  RECOVERY VERIFIED: {email}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-1.5">
                  New Master Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="forgot-new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-11 py-2.5 bg-[#151F2E] border border-[#E5E3DA]/15 rounded text-sm text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] transition-colors"
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

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-1.5">
                  Confirm Master Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="forgot-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#151F2E] border border-[#E5E3DA]/15 rounded text-sm text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] transition-colors"
                  />
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="text-xs font-mono text-red-400 mt-1">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#111827]/30 border-t-[#111827] rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Commit New Password</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Login link */}
          <div className="mt-6 pt-5 border-t border-[#E5E3DA]/10 text-center">
            <Link to="/login" className="text-xs font-mono text-[#D7FF64] hover:underline">
              ← RETURN TO AUTHENTICATION
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
