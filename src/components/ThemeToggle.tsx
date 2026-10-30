import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-icon-wrap">
        {theme === 'dark' ? (
          <Sun size={18} className="theme-icon sun" />
        ) : (
          <Moon size={18} className="theme-icon moon" />
        )}
      </div>
      <span className="theme-toggle-label">
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  );
};
