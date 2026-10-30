import React from 'react';
import { Check, X } from 'lucide-react';
import type { PasswordCriteria } from '../types/auth';

interface PasswordStrengthMeterProps {
  password: string;
}

export const getPasswordCriteria = (password: string): PasswordCriteria => {
  return {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  if (!password) return null;

  const criteria = getPasswordCriteria(password);
  const score = Object.values(criteria).filter(Boolean).length;

  let strengthLabel = 'Weak';
  let strengthColorClass = 'strength-weak';

  if (score >= 4) {
    strengthLabel = 'Strong';
    strengthColorClass = 'strength-strong';
  } else if (score >= 2) {
    strengthLabel = 'Medium';
    strengthColorClass = 'strength-medium';
  }

  return (
    <div className="password-strength-container animate-fade-in">
      <div className="strength-header">
        <span className="strength-title">Password security</span>
        <span className={`strength-badge ${strengthColorClass}`}>{strengthLabel}</span>
      </div>

      <div className="strength-meter-track">
        <div
          className={`strength-meter-bar ${strengthColorClass}`}
          style={{ width: `${(score / 4) * 100}%` }}
        ></div>
      </div>

      <div className="strength-checklist">
        <div className={`criteria-item ${criteria.minLength ? 'valid' : ''}`}>
          {criteria.minLength ? <Check size={12} /> : <X size={12} />}
          <span>8+ characters</span>
        </div>
        <div className={`criteria-item ${criteria.hasUpper ? 'valid' : ''}`}>
          {criteria.hasUpper ? <Check size={12} /> : <X size={12} />}
          <span>Uppercase letter</span>
        </div>
        <div className={`criteria-item ${criteria.hasNumber ? 'valid' : ''}`}>
          {criteria.hasNumber ? <Check size={12} /> : <X size={12} />}
          <span>Number</span>
        </div>
        <div className={`criteria-item ${criteria.hasSpecial ? 'valid' : ''}`}>
          {criteria.hasSpecial ? <Check size={12} /> : <X size={12} />}
          <span>Special character</span>
        </div>
      </div>
    </div>
  );
};
