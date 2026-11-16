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

  if (score <= 1) return { score: 1, label: 'Weak Cryptographic Entitlement', color: 'bg-red-500' };
  if (score <= 2) return { score: 2, label: 'Fair Entropy', color: 'bg-amber-400' };
  if (score <= 3) return { score: 3, label: 'Acceptable Key Strength', color: 'bg-[#D7FF64]' };
  if (score <= 4) return { score: 4, label: 'High Security Profile', color: 'bg-[#D7FF64]' };
  return { score: 5, label: 'Maximum Cryptographic Depth', color: 'bg-[#D7FF64]' };
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
      toast.success('Verification code dispatched to your inbox');
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to dispatch verification code';
      setError(typeof msg === 'string' ? msg : 'Failed to dispatch verification code');
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
      toast.success('Email verified successfully');
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Invalid verification code';
      setError(typeof msg === 'string' ? msg : 'Invalid verification code');
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

  const stepLabels = {
    1: '01 / 03 — EMAIL IDENTITY',
    2: '02 / 03 — OTP VERIFICATION',
    3: '03 / 03 — CREDENTIAL GEN',
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
            [INGESTION // PROVISIONING]
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[#FFFFFF] tracking-tight mt-1">
            ESTABLISH VAULT
          </h1>
          <p className="mt-1 text-xs text-[#737373]">Provision your encrypted file repository</p>
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
          {step === 1 && (
            <>
              <GoogleButton label="Provision with Google" onClick={handleGoogleSignUp} />
              <div className="auth-divider my-6">or initialize with email</div>
            </>
          )}

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
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="register-email"
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
                    <span>Transmit Verification Code</span>
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
                  DISPATCHED CODE TO: <span className="text-[#FFFFFF]">{email}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-2 text-center">
                  6-Digit Verification Token
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="register-otp"
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
                    <span>Verify Token</span>
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

          {/* Step 3: Name + Password */}
          {step === 3 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151F2E] border border-[#D7FF64]/30 text-[#D7FF64] text-xs font-mono">
                  <ShieldCheck size={13} />
                  VERIFIED: {email}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-1.5">
                  Operator Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="register-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-[#151F2E] border border-[#E5E3DA]/15 rounded text-sm text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-1.5">
                  Master Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-sm transition-all duration-200 ${
                            i <= strength.score ? strength.color : 'bg-[#151F2E]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-mono text-[#737373]">
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                  <input
                    id="register-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#151F2E] border border-[#E5E3DA]/15 rounded text-sm text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] transition-colors"
                  />
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-xs font-mono text-red-400 mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Submit */}
              <button
                id="register-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#111827]/30 border-t-[#111827] rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Initialize Account</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Login link */}
          <div className="mt-6 pt-5 border-t border-[#E5E3DA]/10 text-center">
            <p className="text-xs text-[#737373]">
              Existing repository?{' '}
              <Link to="/login" className="text-[#D7FF64] font-semibold hover:underline">
                Authenticate Here
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

export default Register;
