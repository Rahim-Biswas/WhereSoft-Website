import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const NAV_ITEMS = [
  {
    label: 'Services',
    path: '/services',
    columns: [
      {
        title: 'CORE SERVICES',
        links: [
          { label: 'GIS Consulting', desc: 'Expert spatial strategy & advisory', path: '/services#gis-consulting' },
          { label: 'Web GIS Development', desc: 'Browser-based mapping solutions', path: '/services#web-gis' },
          { label: 'Remote Sensing', desc: 'Satellite & aerial image analysis', path: '/services#remote-sensing' },
          { label: 'Spatial Analytics', desc: 'Location intelligence & insights', path: '/services#spatial-analytics' },
        ]
      },
      {
        title: 'ADVANCED SOLUTIONS',
        links: [
          { label: '3D Visualization', desc: 'Immersive spatial data rendering', path: '/services#3d-viz' },
          { label: 'Digital Twin', desc: 'Real-time environment modeling', path: '/services#digital-twin' },
          { label: 'Data Integration', desc: 'Multi-source geospatial pipelines', path: '/services#data-integration' },
          { label: 'Training & Support', desc: 'GIS capacity building programs', path: '/services#training' },
        ]
      }
    ],
    featured: {
      label: 'FEATURED SERVICE',
      title: 'Cloud-Native Web GIS',
      desc: 'Scalable, browser-first geospatial applications with real-time data streaming.',
      cta: 'Explore Services',
      path: '/services'
    }
  },
  {
    label: 'Industries',
    path: '/industries',
    columns: [
      {
        title: 'SECTORS WE SERVE',
        links: [
          { label: 'Government & Defense', path: '/industries#government' },
          { label: 'Urban Planning & Smart Cities', path: '/industries#urban' },
          { label: 'Agriculture & Forestry', path: '/industries#agriculture' },
          { label: 'Infrastructure & Utilities', path: '/industries#infrastructure' },
          { label: 'Environment & Conservation', path: '/industries#environment' },
        ]
      },
      {
        title: 'MORE INDUSTRIES',
        links: [
          { label: 'Telecom & Networks', path: '/industries#telecom' },
          { label: 'Oil, Gas & Mining', path: '/industries#oil-gas' },
          { label: 'Transportation & Logistics', path: '/industries#transport' },
          { label: 'Disaster Management', path: '/industries#disaster' },
          { label: 'Real Estate & Land Records', path: '/industries#real-estate' },
        ]
      }
    ],
    featured: {
      label: 'FEATURED INDUSTRY',
      title: 'Smart City Solutions',
      desc: 'Transforming urban landscapes with integrated geospatial intelligence.',
      cta: 'All Industries',
      path: '/industries'
    }
  },
  {
    label: 'Products',
    path: '/products',
    columns: [
      {
        title: 'OUR PRODUCTS',
        links: [
          { label: 'WhereMap', desc: 'Interactive web mapping platform', path: '/products#wheremap' },
          { label: 'WhereSight', desc: 'Remote sensing analytics suite', path: '/products#wheresight' },
          { label: 'WhereTrack', desc: 'Real-time asset tracking system', path: '/products#wheretrack' },
          { label: 'WherePlan', desc: 'Spatial planning & collaboration tool', path: '/products#whereplan' },
        ]
      }
    ],
    featured: {
      label: 'NEW PRODUCT',
      title: 'WhereMap 2.0',
      desc: 'Next-generation web GIS platform with AI-powered spatial analysis built in.',
      cta: 'View Products',
      path: '/products'
    }
  },
  { label: 'About', path: '/about', simple: true },
  { label: 'Blog', path: '/blog', simple: true },
  { label: 'Careers', path: '/careers', simple: true },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coords, setCoords] = useState({ lat: '17.5042°N', lng: '78.3760°E' });
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        lat: (17.5042 + (Math.random() - 0.5) * 0.001).toFixed(4) + '°N',
        lng: (78.3760 + (Math.random() - 0.5) * 0.001).toFixed(4) + '°E'
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openMenu = (label) => {
    clearTimeout(timerRef.current);
    setActiveMenu(label);
  };

  const closeMenu = () => {
    timerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const keepMenu = () => clearTimeout(timerRef.current);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className={`ws-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="url(#logoGrad)" strokeWidth="1.5"/>
                <path d="M6 16 Q12 8 16 16 Q20 24 26 16" stroke="url(#logoGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="3" fill="url(#logoGrad)"/>
                <line x1="16" y1="2" x2="16" y2="30" stroke="url(#logoGrad)" strokeWidth="0.5" opacity="0.4"/>
                <line x1="2" y1="16" x2="30" y2="16" stroke="url(#logoGrad)" strokeWidth="0.5" opacity="0.4"/>
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#00D4FF"/>
                    <stop offset="100%" stopColor="#7C6FFF"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-name">WhereSoft</span>
              <span className="logo-sub">Technologies</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav hide-mobile">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`nav-item ${activeMenu === item.label ? 'active' : ''}`}
                onMouseEnter={() => !item.simple && openMenu(item.label)}
                onMouseLeave={() => !item.simple && closeMenu()}
              >
                {item.simple ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link nav-link-dropdown ${isActive ? 'nav-link-active' : ''}`}
                  >
                    {item.label}
                    <svg className="nav-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            <div className="coord-display hide-mobile">{coords.lat} · {coords.lng}</div>

            {isLoggedIn ? (
              <div className="user-menu">
                <button className="user-btn">
                  <div className="user-avatar">{user?.full_name?.[0] || 'U'}</div>
                  <span className="user-name hide-mobile">{user?.full_name?.split(' ')[0]}</span>
                </button>
                <div className="user-dropdown">
                  {isAdmin && (
                    <Link to="/admin" className="user-dropdown-item">
                      <span>⚙️</span> Admin Dashboard
                    </Link>
                  )}
                  <button className="user-dropdown-item" onClick={handleLogout}>
                    <span>→</span> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-actions">
                <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
                <Link to="/signup" className="btn btn-primary btn-sm">Get Started</Link>
              </div>
            )}

            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${mobileOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mega Dropdown */}
        {NAV_ITEMS.filter(i => !i.simple).map((item) => (
          <div
            key={item.label}
            className={`mega-menu ${activeMenu === item.label ? 'mega-menu-open' : ''}`}
            onMouseEnter={keepMenu}
            onMouseLeave={closeMenu}
          >
            <div className="mega-inner">
              <div className="mega-columns">
                {item.columns?.map((col) => (
                  <div key={col.title} className="mega-col">
                    <div className="mega-col-title">{col.title}</div>
                    <ul className="mega-links">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            to={link.path}
                            className="mega-link"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className="mega-link-label">{link.label}</span>
                            {link.desc && <span className="mega-link-desc">{link.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to={item.path} className="mega-all-link">
                      All {item.label} →
                    </Link>
                  </div>
                ))}
              </div>
              {item.featured && (
                <div className="mega-featured">
                  <div className="mega-featured-tag">{item.featured.label}</div>
                  <div className="mega-featured-map">
                    <div className="mini-globe">
                      <svg viewBox="0 0 200 200" width="100%" height="100%">
                        <defs>
                          <radialGradient id="globeGrad" cx="40%" cy="35%">
                            <stop offset="0%" stopColor="#1a3a6e"/>
                            <stop offset="100%" stopColor="#0a0e1a"/>
                          </radialGradient>
                        </defs>
                        <circle cx="100" cy="100" r="90" fill="url(#globeGrad)" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>
                        <ellipse cx="100" cy="100" rx="40" ry="90" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1"/>
                        <ellipse cx="100" cy="100" rx="70" ry="90" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="1"/>
                        <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(0,212,255,0.12)" strokeWidth="1"/>
                        <line x1="10" y1="70" x2="190" y2="70" stroke="rgba(0,212,255,0.08)" strokeWidth="0.5"/>
                        <line x1="10" y1="130" x2="190" y2="130" stroke="rgba(0,212,255,0.08)" strokeWidth="0.5"/>
                        <circle cx="117" cy="92" r="4" fill="#00D4FF" opacity="0.8"/>
                        <circle cx="117" cy="92" r="8" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.4"/>
                        <circle cx="117" cy="92" r="14" fill="none" stroke="#00D4FF" strokeWidth="0.5" opacity="0.2"/>
                      </svg>
                    </div>
                  </div>
                  <h4 className="mega-featured-title">{item.featured.title}</h4>
                  <p className="mega-featured-desc">{item.featured.desc}</p>
                  <Link to={item.featured.path} className="mega-featured-cta" onClick={() => setActiveMenu(null)}>
                    {item.featured.cta} →
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mobile-auth">
            {isLoggedIn ? (
              <>
                {isAdmin && <Link to="/admin" className="btn btn-ghost" onClick={() => setMobileOpen(false)}>Admin</Link>}
                <button className="btn btn-outline" onClick={() => { handleLogout(); setMobileOpen(false); }}>Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/signup" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
