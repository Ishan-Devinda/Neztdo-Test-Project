import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, Eye, EyeOff, Briefcase, ArrowRight, Loader2 } from 'lucide-react';
import { PasswordStrengthMeter, getPasswordCriteria } from './PasswordStrengthMeter';
import { SocialButtons } from './SocialButtons';

interface RegisterFormProps {
  onRegisterSuccess: (user: { name: string; email: string; workspace: string }) => void;
  onNavigateToLogin: () => void;
  onSocialLogin: (provider: 'Google' | 'GitHub' | 'Microsoft') => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  onSocialLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [workspace, setWorkspace] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid corporate email address');
      return;
    }
    const criteria = getPasswordCriteria(password);
    if (!criteria.minLength) {
      setError('Password must contain at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service & Privacy Policy');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess({
        name,
        email,
        workspace: workspace.trim() || `${name.split(' ')[0]}'s Workspace`,
      });
    }, 1000);
  };

  return (
    <div className="auth-card-body animate-fade-in">
      <div className="auth-header">
        <h1 className="auth-title">Create your workspace</h1>
        <p className="auth-subtitle">Join thousands of high-velocity teams managing projects with Neztdo</p>
      </div>

      {error && (
        <div className="form-error-alert animate-fade-in" role="alert">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="reg-name" className="form-label">
            Full Name
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <UserIcon size={18} />
            </span>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Connor"
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Work Email */}
        <div className="form-group">
          <label htmlFor="reg-email" className="form-label">
            Work Email
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Mail size={18} />
            </span>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@company.com"
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Workspace Name */}
        <div className="form-group">
          <label htmlFor="reg-workspace" className="form-label">
            Workspace / Team Name <span className="optional-tag">(Optional)</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Briefcase size={18} />
            </span>
            <input
              id="reg-workspace"
              type="text"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              placeholder="Acme Product Team"
              className="form-input"
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="reg-password" className="form-label">
            Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Lock size={18} />
            </span>
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create strong password"
              className="form-input password-input"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {/* Dynamic strength meter */}
          <PasswordStrengthMeter password={password} />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="reg-confirm" className="form-label">
            Confirm Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Lock size={18} />
            </span>
            <input
              id="reg-confirm"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="remember-row">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span className="checkmark"></span>
            <span className="checkbox-label">
              I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="submit-btn primary-gradient-btn"
          id="btn-register"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="spinner" />
              <span>Creating your workspace...</span>
            </>
          ) : (
            <>
              <span>Get Started Free</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Social options */}
      <SocialButtons onSocialLogin={onSocialLogin} />

      {/* Footer Switcher */}
      <div className="auth-footer">
        <span>Already have an account?</span>
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="inline-switch-btn"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
