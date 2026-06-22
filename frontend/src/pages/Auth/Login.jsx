import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form.email, form.password);
    if (result.success) {
      if (result.user.role === 'super_admin') navigate('/admin');
      else navigate(from);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page page-wrapper">
      <div className="auth-bg">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-cyan" style={{ width: 500, height: 500, top: -100, right: -100, opacity: 0.12 }} />
        <div className="glow-orb glow-orb-purple" style={{ width: 400, height: 400, bottom: -100, left: -100, opacity: 0.12 }} />
      </div>

      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-logo">
            <Link to="/">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="url(#authLogoGrad)" strokeWidth="1.5"/>
                <path d="M6 16 Q12 8 16 16 Q20 24 26 16" stroke="url(#authLogoGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="3" fill="url(#authLogoGrad)"/>
                <defs>
                  <linearGradient id="authLogoGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#00D4FF"/>
                    <stop offset="100%" stopColor="#7C6FFF"/>
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          </div>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your WhereSoft account</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? <><div className="spinner" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Create one →</Link>
          </p>

          <div className="auth-admin-hint">
            <span className="badge badge-purple">Admin?</span>
            <span>Use your admin credentials to access the dashboard.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
