import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, ArrowLeft, ArrowRight, Loader2, CheckCircle2, RotateCw } from 'lucide-react';
import { PasswordStrengthMeter, getPasswordCriteria } from './PasswordStrengthMeter';

interface ForgotPasswordFormProps {
  onNavigateToLogin: () => void;
  onResetSuccessNotify: () => void;
}

type ForgotStep = 'email' | 'otp' | 'new-password' | 'done';

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onNavigateToLogin,
  onResetSuccessNotify,
}) => {
  const [step, setStep] = useState<ForgotStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(45);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle email step submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid account email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(45);
    }, 800);
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i];
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pasted.length, 5);
      otpInputs.current[nextIndex]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the full 6-digit verification code');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('new-password');
    }, 700);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const criteria = getPasswordCriteria(newPassword);
    if (!criteria.minLength) {
      setError('Password must contain at least 8 characters');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('done');
      onResetSuccessNotify();
    }, 900);
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    setTimer(45);
    setOtp(['', '', '', '', '', '']);
    setError(null);
  };

  return (
    <div className="auth-card-body animate-fade-in">
      {/* Back button */}
      {step !== 'done' && (
        <button
          type="button"
          onClick={() => {
            if (step === 'email') onNavigateToLogin();
            else if (step === 'otp') setStep('email');
            else if (step === 'new-password') setStep('otp');
          }}
          className="back-btn"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      )}

      {/* Step 1: Email Form */}
      {step === 'email' && (
        <>
          <div className="auth-header">
            <h1 className="auth-title">Reset your password</h1>
            <p className="auth-subtitle">
              Enter your verified email and we will send a secure 6-digit authentication code.
            </p>
          </div>

          {error && (
            <div className="form-error-alert animate-fade-in">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="forgot-email" className="form-label">
                Account Email
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Mail size={18} />
                </span>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn primary-gradient-btn"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  <span>Sending code...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Code</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </>
      )}

      {/* Step 2: 6-Digit OTP Form */}
      {step === 'otp' && (
        <>
          <div className="auth-header">
            <h1 className="auth-title">Enter verification code</h1>
            <p className="auth-subtitle">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
          </div>

          {error && (
            <div className="form-error-alert animate-fade-in">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleOtpSubmit} className="auth-form">
            <div className="otp-inputs-grid" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpInputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="otp-digit-input"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <div className="otp-resend-row">
              {timer > 0 ? (
                <span className="otp-timer-text">Resend code in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="resend-active-btn"
                >
                  <RotateCw size={14} />
                  <span>Resend Code</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn primary-gradient-btn"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  <span>Verifying code...</span>
                </>
              ) : (
                <>
                  <span>Verify Code</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </>
      )}

      {/* Step 3: Set New Password */}
      {step === 'new-password' && (
        <>
          <div className="auth-header">
            <h1 className="auth-title">Create new password</h1>
            <p className="auth-subtitle">
              Choose a strong password to safeguard your Neztdo workspace.
            </p>
          </div>

          {error && (
            <div className="form-error-alert animate-fade-in">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="new-pw" className="form-label">
                New Password
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock size={18} />
                </span>
                <input
                  id="new-pw"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="form-input"
                  required
                />
              </div>
              <PasswordStrengthMeter password={newPassword} />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-new-pw" className="form-label">
                Confirm New Password
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock size={18} />
                </span>
                <input
                  id="confirm-new-pw"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn primary-gradient-btn"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  <span>Updating password...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </>
      )}

      {/* Step 4: Done / Success */}
      {step === 'done' && (
        <div className="success-step-container animate-fade-in">
          <div className="success-icon-badge">
            <CheckCircle2 size={44} className="success-checkmark-svg" />
          </div>
          <h2 className="success-title">Password successfully reset!</h2>
          <p className="success-desc">
            Your credentials have been securely updated. You can now log into your Neztdo workspace with your new password.
          </p>

          <button
            type="button"
            onClick={onNavigateToLogin}
            className="submit-btn primary-gradient-btn"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
