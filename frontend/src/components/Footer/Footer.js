import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const FOOTER_LINKS = {
  Services: [
    { label: 'GIS Consulting', path: '/services#gis-consulting' },
    { label: 'Web GIS Development', path: '/services#web-gis' },
    { label: 'Remote Sensing', path: '/services#remote-sensing' },
    { label: 'Spatial Analytics', path: '/services#spatial-analytics' },
    { label: '3D Visualization', path: '/services#3d-viz' },
  ],
  Industries: [
    { label: 'Government & Defense', path: '/industries#government' },
    { label: 'Urban Planning', path: '/industries#urban' },
    { label: 'Agriculture', path: '/industries#agriculture' },
    { label: 'Infrastructure', path: '/industries#infrastructure' },
    { label: 'Environment', path: '/industries#environment' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog & Insights', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="ws-footer">
      <div className="footer-geo-bg">
        <div className="geo-grid-bg" />
      </div>

      <div className="container">
        {/* Top */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="url(#fLogoGrad)" strokeWidth="1.5"/>
                <path d="M6 16 Q12 8 16 16 Q20 24 26 16" stroke="url(#fLogoGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="3" fill="url(#fLogoGrad)"/>
                <defs>
                  <linearGradient id="fLogoGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#00D4FF"/>
                    <stop offset="100%" stopColor="#7C6FFF"/>
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <div className="footer-logo-name">WhereSoft</div>
                <div className="footer-logo-sub">Technologies Pvt. Ltd.</div>
              </div>
            </div>
            <p className="footer-tagline">
              Transforming the world through the power of geospatial intelligence. 
              We build smarter spatial solutions for a connected planet.
            </p>
            <div className="footer-contact-info">
              <a href="mailto:team@wheresoft.in" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                team@wheresoft.in
              </a>
              <a href="tel:+914049501950" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18C0 1.08.86.1 1.96.01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +91 4049501950
              </a>
              <div className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Pragathi Nagar, Hyderabad — 500090
              </div>
            </div>
          </div>

          <div className="footer-links-grid">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section} className="footer-link-col">
                <h4 className="footer-col-title">{section}</h4>
                <ul className="footer-link-list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path} className="footer-link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} WhereSoft Technologies Private Limited. All rights reserved.
          </div>
          <div className="footer-coords">
            <span className="footer-coord-label">HQ</span>
            <span>17.5042°N, 78.3760°E · Hyderabad, India</span>
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
