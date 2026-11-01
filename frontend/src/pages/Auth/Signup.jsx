import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/wheresoft_logo.png';
import bgImg from '../../assets/bg_4.webp';
import './Auth.css';

export default function Signup() {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', terms: false });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(p => ({ ...p, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.terms) {
      setError('You must agree to the Terms & Conditions');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    const full_name = `${form.first_name} ${form.last_name}`.trim();
    const result = await signup(full_name, form.email, form.password);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
    } else {
      setError(result.error);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-right-panel" style={{ width: '100%', flexDirection: 'column' }}>
          <div style={{ color: 'var(--accent-green)', marginBottom: 16 }}>
            <CheckCircle2 size={54} />
          </div>
          <h2>Account Created!</h2>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>
            Redirecting you to sign in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      {/* LEFT PANEL */}
      <div className="auth-left-panel">
        <img src={bgImg} alt="Background" className="auth-image-bg" />
        <div className="auth-left-overlay" />
        
        <div className="auth-left-text" style={{ marginTop: 'auto' }}>
          <h2>Analyze Terrain,<br />Uncover Insights</h2>
          <p>Powerful geospatial tools for professionals and researchers</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right-panel">
        <div className="auth-top-nav" style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => navigate(-1)} className="auth-back-btn">
            <ArrowLeft size={18} /> Back
          </button>
          <Link to="/" className="auth-back-btn" style={{ textDecoration: 'none' }}>
            <Home size={18} /> Home
          </Link>
        </div>

        <div className="auth-container">
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '24px' }}>
            <img src={logoImg} alt="WhereSoft Logo" style={{ height: '72px', objectFit: 'contain' }} />
          </div>
          
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="first_name">First name</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  className="form-input"
                  placeholder="First name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="last_name">Last name</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  className="form-input"
                  placeholder="Last name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Enter your password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              <span>I agree to the <Link to="/terms" className="auth-link">Terms & Conditions</Link></span>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-btn-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or register with</span>
          </div>

          <div className="social-logins">
            <button className="social-btn" type="button" onClick={() => alert('Google signup coming soon')}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M24 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.73a5.75 5.75 0 0 1-2.49 3.77v3.13h4.03c2.36-2.18 3.73-5.38 3.73-9.08z" /><path fill="#34A853" d="M12 24c3.38 0 6.22-1.12 8.29-3.03l-4.03-3.13c-1.12.75-2.55 1.2-4.26 1.2-3.28 0-6.06-2.21-7.05-5.18H.79v3.23C2.86 21.2 7.12 24 12 24z" /><path fill="#FBBC05" d="M4.95 16.99A7.2 7.2 0 0 1 4.54 12c0-1.72.29-3.38.83-4.91V3.86H.79A11.96 11.96 0 0 0 0 12c0 1.93.46 3.77 1.28 5.43l3.67-2.84z" /><path fill="#4285F4" d="M12 4.96c1.84 0 3.49.63 4.8 1.88l3.6-3.6C18.2 1.2 15.36 0 12 0 7.12 0 2.86 2.8 .79 6.91l3.67 2.84c.99-2.97 3.77-4.79 7.54-4.79z" /></svg>
              Google
            </button>
            <button className="social-btn" type="button" onClick={() => alert('GitHub signup coming soon')}>
              <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z" /></svg>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
