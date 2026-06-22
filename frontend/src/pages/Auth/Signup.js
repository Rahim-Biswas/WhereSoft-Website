import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Signup() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    const result = await signup(form.full_name, form.email, form.password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
    } else {
      setError(result.error);
    }
  };

  if (success) {
    return (
      <div className="auth-page page-wrapper">
        <div className="auth-bg"><div className="geo-grid-bg" /></div>
        <div className="auth-container">
          <div className="auth-card glass-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
            <h2>Account Created!</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
              Redirecting you to sign in...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page page-wrapper">
      <div className="auth-bg">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-purple" style={{ width: 500, height: 500, top: -100, right: -100, opacity: 0.12 }} />
      </div>

      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-logo">
            <Link to="/">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="url(#signupLogoGrad)" strokeWidth="1.5"/>
                <path d="M6 16 Q12 8 16 16 Q20 24 26 16" stroke="url(#signupLogoGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="3" fill="url(#signupLogoGrad)"/>
                <defs>
                  <linearGradient id="signupLogoGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#00D4FF"/>
                    <stop offset="100%" stopColor="#7C6FFF"/>
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          </div>

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the WhereSoft community</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                name="full_name"
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={form.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
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
              <label className="form-label" htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
              <input
                id="signup-confirm"
                name="confirm"
                type="password"
                className="form-input"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? <><div className="spinner" /> Creating account...</> : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
