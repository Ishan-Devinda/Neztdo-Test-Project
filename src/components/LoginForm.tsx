import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { SocialButtons } from './SocialButtons';

interface LoginFormProps {
  onLoginSuccess: (email: string) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgot: () => void;
  onSocialLogin: (provider: 'Google' | 'GitHub' | 'Microsoft') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToForgot,
  onSocialLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email or username');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
    }, 900);
  };

  const handleFillDemo = (type: 'designer' | 'lead') => {
    if (type === 'designer') {
      setEmail('alex.morgan@neztdo.com');
      setPassword('DesignPro#2026');
    } else {
      setEmail('sarah.connor@neztdo.com');
      setPassword('TechLead#2026');
    }
    setError(null);
  };

  return (
    <div className="auth-card-body animate-fade-in">
      <div className="auth-header">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Enter your credentials to access your Neztdo workspace</p>
      </div>

      {/* Demo Credentials Helper Pill */}
      <div className="demo-credentials-banner">
        <div className="demo-header">
          <Sparkles size={14} className="demo-icon" />
          <span>Quick Test Logins:</span>
        </div>
        <div className="demo-buttons">
          <button
            type="button"
            onClick={() => handleFillDemo('lead')}
            className="demo-pill-btn"
          >
            Team Lead
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo('designer')}
            className="demo-pill-btn"
          >
            Product Designer
          </button>
        </div>
      </div>

      {error && (
        <div className="form-error-alert animate-fade-in" role="alert">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="login-email" className="form-label">
            Email or Username
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Mail size={18} />
            </span>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="form-input"
              autoComplete="email"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <div className="form-label-row">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            {/* <button
              type="button"
              onClick={onNavigateToForgot}
              className="forgot-password-link"
            >
              Forgot password?
            </button> */}
          </div>
          <div className="input-wrapper">
            <span className="input-icon">
              <Lock size={18} />
            </span>
            {/* <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="form-input password-input"
              autoComplete="current-password"
              required
            /> */}
            {/* <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button> */}
          </div>
        </div>

        {/* Remember Me */}
        <div className="remember-row">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="checkmark"></span>
            <span className="checkbox-label">Keep me signed in for 30 days</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="submit-btn primary-gradient-btn"
          id="btn-sign-in"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="spinner" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Neztdo</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Social Logins */}
      <SocialButtons onSocialLogin={onSocialLogin} />

      {/* Footer Switcher */}
      <div className="auth-footer">
        <span>Don't have an account yet?</span>
        <button
          type="button"
          onClick={onNavigateToRegister}
          className="inline-switch-btn"
        >
          Create account
        </button>
      </div>
    </div>
  );
};
