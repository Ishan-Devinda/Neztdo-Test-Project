import React, { useState, useEffect } from 'react';
import { Kanban, Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Kanban,
    title: 'Intuitive Kanban & Sprints',
    desc: 'Plan, track, and ship high-impact features with real-time collaborative boards.',
  },
  {
    icon: Zap,
    title: 'Sub-millisecond Realtime Sync',
    desc: 'Instant updates across tasks, attachments, and subtask dependencies.',
  },
  {
    icon: Shield,
    title: 'Enterprise-grade Security',
    desc: 'End-to-end encrypted workspaces, granular RBAC, and SOC-2 compliance.',
  },
];

export const AuthSidePanel: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="auth-side-panel">
      {/* Dynamic Background Ambient Glow Orbs */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-grid-overlay"></div>

      {/* Brand Header */}
      <div className="side-brand-header">
        <div className="brand-logo-pill">
          <img
            src="/onbLogo.png"
            alt="Neztdo Logo"
            className="brand-logo-img"
            onError={(e) => {
              // Fallback if image doesn't render
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="brand-name">Neztdo</span>
          <span className="brand-badge">2.0</span>
        </div>
        <p className="side-tagline">
          The intelligent operating system for product and engineering teams.
        </p>
      </div>

      {/* Central Visual Showcase: Floating Card Mockup */}
      <div className="showcase-card-container">
        <div className="showcase-glass-card">
          <div className="glass-card-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
            <span className="glass-title">Sprint 42 • Final Delivery</span>
          </div>

          <div className="glass-card-content">
            <div className="task-preview-item">
              <div className="task-icon-wrap">
                <CheckCircle2 size={16} className="task-check" />
              </div>
              <div className="task-info">
                <span className="task-title">NT-139 Test Attachment Handler</span>
                <span className="task-sub">Completed by Ishan • 2m ago</span>
              </div>
              <span className="task-priority-tag">High</span>
            </div>

            <div className="task-preview-item">
              <div className="task-icon-wrap active">
                <div className="pulsing-dot"></div>
              </div>
              <div className="task-info">
                <span className="task-title">Design System & Auth UI</span>
                <span className="task-sub">In progress • 4 subtasks done</span>
              </div>
              <span className="task-status-tag">Active</span>
            </div>

            {/* Metrics row */}
            <div className="glass-metric-row">
              <div className="metric-box">
                <span className="metric-val">99.4%</span>
                <span className="metric-lbl">Sprint Velocity</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-val">12 ms</span>
                <span className="metric-lbl">API Latency</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-val">+34%</span>
                <span className="metric-lbl">Efficiency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating review badge */}
        <div className="floating-review-badge">
          <Sparkles size={16} className="badge-sparkle" />
          <div>
            <strong>"Neztdo eliminated 6 hours</strong> of weekly sprint sync meetings."
          </div>
        </div>
      </div>

      {/* Feature Carousel Indicator & Items */}
      <div className="side-features-wrapper">
        <div className="features-carousel">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            const isActive = i === activeHighlight;
            return (
              <div
                key={h.title}
                className={`feature-slide ${isActive ? 'active' : ''}`}
                onClick={() => setActiveHighlight(i)}
              >
                <div className="feature-icon-box">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="feature-title">{h.title}</h4>
                  <p className="feature-desc">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="carousel-dots">
          {HIGHLIGHTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveHighlight(i)}
              className={`carousel-dot ${i === activeHighlight ? 'active' : ''}`}
              aria-label={`Show slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
