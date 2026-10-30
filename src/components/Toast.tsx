import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import type { ToastNotification } from '../types/auth';

interface ToastProps {
  notifications: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ notifications, onDismiss }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite">
      {notifications.map((n) => {
        const Icon =
          n.type === 'success' ? CheckCircle2 : n.type === 'error' ? AlertCircle : Info;
        return (
          <div key={n.id} className={`toast-item toast-${n.type} animate-slide-in`}>
            <div className="toast-icon">
              <Icon size={18} />
            </div>
            <div className="toast-message">{n.message}</div>
            <button
              onClick={() => onDismiss(n.id)}
              className="toast-close-btn"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
