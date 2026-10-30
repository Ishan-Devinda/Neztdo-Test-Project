import { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import { AuthSidePanel } from './components/AuthSidePanel';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { DashboardPreview } from './components/DashboardPreview';
import { ThemeToggle } from './components/ThemeToggle';
import { Toast } from './components/Toast';
import type { AuthMode, User, ToastNotification } from './types/auth';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('neztdo_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [user, setUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Apply theme to html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('neztdo_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Action Handlers
  const handleLoginSuccess = (email: string) => {
    const isAlex = email.toLowerCase().includes('alex');
    const isSarah = email.toLowerCase().includes('sarah');

    const newUser: User = {
      id: 'usr_' + Date.now().toString().slice(-4),
      name: isAlex ? 'Alex Morgan' : isSarah ? 'Sarah Connor' : email.split('@')[0],
      email: email,
      role: isAlex ? 'Lead Product Designer' : 'Senior Engineering Manager',
      workspace: 'Neztdo Core Engineering',
    };

    setUser(newUser);
    addToast('success', `Welcome back, ${newUser.name}! Signed into Neztdo workspace.`);
  };

  const handleRegisterSuccess = (data: { name: string; email: string; workspace: string }) => {
    const newUser: User = {
      id: 'usr_' + Date.now().toString().slice(-4),
      name: data.name,
      email: data.email,
      role: 'Workspace Administrator',
      workspace: data.workspace,
    };

    setUser(newUser);
    addToast('success', `Workspace "${data.workspace}" created successfully!`);
  };

  const handleSocialLogin = (provider: 'Google' | 'GitHub' | 'Microsoft') => {
    const newUser: User = {
      id: 'usr_' + Date.now().toString().slice(-4),
      name: `${provider} Developer`,
      email: `dev@${provider.toLowerCase()}.user`,
      role: 'Staff Engineer',
      workspace: 'Neztdo Cloud Team',
    };

    setUser(newUser);
    addToast('success', `Signed in via ${provider} OAuth authentication.`);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthMode('login');
    addToast('info', 'You have been signed out.');
  };

  return (
    <div className="app-container">
      {/* Toast Notification Layer */}
      <Toast notifications={toasts} onDismiss={removeToast} />

      {/* Top Header Bar */}
      <header className="top-navbar">
        <a href="/" className="nav-brand-link">
          <img
            src="/onbLogo.png"
            alt="Neztdo"
            className="nav-logo-img"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="nav-brand-title">Neztdo</span>
        </a>

        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="auth-main-wrapper">
        {user ? (
          /* Authenticated Dashboard Preview */
          <DashboardPreview user={user} onLogout={handleLogout} />
        ) : (
          /* Split Auth Card Layout */
          <div className="auth-split-layout">
            {/* Left Brand Showcase */}
            <AuthSidePanel />

            {/* Right Interactive Auth Form */}
            <div className="auth-form-container">
              {/* Tabs for Sign In vs Register (only when in login/register mode) */}
              {(authMode === 'login' || authMode === 'register') && (
                <div className="auth-tabs-nav" role="tablist">
                  <button
                    role="tab"
                    aria-selected={authMode === 'login'}
                    onClick={() => setAuthMode('login')}
                    className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  >
                    Sign In
                  </button>
                  <button
                    role="tab"
                    aria-selected={authMode === 'register'}
                    onClick={() => setAuthMode('register')}
                    className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* Form Views */}
              {authMode === 'login' && (
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onNavigateToRegister={() => setAuthMode('register')}
                  onNavigateToForgot={() => setAuthMode('forgot')}
                  onSocialLogin={handleSocialLogin}
                />
              )}

              {authMode === 'register' && (
                <RegisterForm
                  onRegisterSuccess={handleRegisterSuccess}
                  onNavigateToLogin={() => setAuthMode('login')}
                  onSocialLogin={handleSocialLogin}
                />
              )}

              {authMode === 'forgot' && (
                <ForgotPasswordForm
                  onNavigateToLogin={() => setAuthMode('login')}
                  onResetSuccessNotify={() =>
                    addToast('success', 'Password reset successfully! Please sign in.')
                  }
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
