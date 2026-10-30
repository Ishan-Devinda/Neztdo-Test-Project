export type AuthMode = 'login' | 'register' | 'forgot' | 'otp' | 'reset-password' | 'success';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  workspace: string;
  avatarUrl?: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface PasswordCriteria {
  minLength: boolean;
  hasNumber: boolean;
  hasUpper: boolean;
  hasSpecial: boolean;
}
