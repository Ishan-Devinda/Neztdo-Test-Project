import React from 'react';
import { LogOut, CheckCircle2, Layout, Clock, Users, ArrowUpRight } from 'lucide-react';
import type { User as UserType } from '../types/auth';

interface DashboardPreviewProps {
  user: UserType;
  onLogout: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ user, onLogout }) => {
  return (
    <div className="dashboard-preview-card animate-fade-in">
      {/* Top Banner */}
      <div className="dash-header">
        <div className="dash-user-badge">
          <div className="dash-avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} />
            ) : (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <div className="dash-welcome">Welcome back,</div>
            <h2 className="dash-name">{user.name}</h2>
            <div className="dash-role-meta">
              <span className="role-chip">{user.role}</span>
              <span className="workspace-chip">{user.workspace}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="logout-action-btn"
          title="Sign out to return to auth UI"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="dash-auth-success-alert">
        <CheckCircle2 size={20} className="success-icon" />
        <div>
          <strong>Authentication Succeeded!</strong>
          <p>You have successfully signed into Neztdo using React 19 and TypeScript.</p>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="dash-stats-grid">
        <div className="dash-stat-item">
          <div className="stat-icon-wrap icon-purple">
            <Layout size={18} />
          </div>
          <div>
            <div className="stat-number">28</div>
            <div className="stat-label">Active Tasks</div>
          </div>
        </div>

        <div className="dash-stat-item">
          <div className="stat-icon-wrap icon-blue">
            <Clock size={18} />
          </div>
          <div>
            <div className="stat-number">4 Days</div>
            <div className="stat-label">Sprint Remaining</div>
          </div>
        </div>

        <div className="dash-stat-item">
          <div className="stat-icon-wrap icon-green">
            <Users size={18} />
          </div>
          <div>
            <div className="stat-number">12</div>
            <div className="stat-label">Team Collaborators</div>
          </div>
        </div>
      </div>

      {/* Recent Workspace Projects */}
      <div className="dash-projects-section">
        <div className="dash-section-title">
          <span>Active Workspaces</span>
          <a href="#viewall" onClick={(e) => e.preventDefault()} className="dash-view-all">
            All Projects <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="dash-projects-list">
          <div className="project-item">
            <div className="proj-color dot-coral"></div>
            <div className="proj-info">
              <div className="proj-title">Neztdo Web Core v2.0</div>
              <div className="proj-sub">Feature / NT-139 Test Attachment Handler</div>
            </div>
            <span className="proj-badge badge-active">In Review</span>
          </div>

          <div className="project-item">
            <div className="proj-color dot-indigo"></div>
            <div className="proj-info">
              <div className="proj-title">Backend API Infrastructure</div>
              <div className="proj-sub">Microservices & Auth Gateway</div>
            </div>
            <span className="proj-badge badge-done">Completed</span>
          </div>
        </div>
      </div>

      <div className="dash-footer">
        <button onClick={onLogout} className="dash-return-btn">
          Back to Login Screen Demo
        </button>
      </div>
    </div>
  );
};
