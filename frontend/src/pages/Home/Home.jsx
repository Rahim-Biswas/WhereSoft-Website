import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const STATS = [
  { value: '50+', label: 'Projects Delivered', suffix: '' },
  { value: '20+', label: 'Industry Clients', suffix: '' },
  { value: '8+', label: 'Years of Expertise', suffix: '' },
  { value: '15+', label: 'Team Members', suffix: '' },
];

const SERVICES = [
  {
    icon: '🗺️',
    title: 'GIS Consulting',
    desc: 'Expert geospatial strategy, system design, and implementation advisory for organizations at any stage of their GIS journey.',
    color: 'cyan',
    path: '/services#gis-consulting'
  },
  {
    icon: '🌐',
    title: 'Web GIS Development',
    desc: 'Custom browser-based mapping applications with real-time data integration, built on modern open standards.',
    color: 'purple',
    path: '/services#web-gis'
  },
  {
    icon: '🛰️',
    title: 'Remote Sensing',
    desc: 'Satellite and aerial imagery processing, classification, and actionable insight extraction for diverse sectors.',
    color: 'green',
    path: '/services#remote-sensing'
  },
  {
    icon: '📊',
    title: 'Spatial Analytics',
    desc: 'Location-based intelligence, hotspot analysis, predictive modeling, and geospatial data science solutions.',
    color: 'amber',
    path: '/services#spatial-analytics'
  },
  {
    icon: '🏙️',
    title: '3D Visualization',
    desc: 'Immersive terrain rendering, urban 3D models, and dynamic geospatial scene creation for stakeholder engagement.',
    color: 'purple',
    path: '/services#3d-viz'
  },
  {
    icon: '🔮',
    title: 'Digital Twin',
    desc: 'Real-time virtual representations of physical environments enabling simulation, planning, and optimization.',
    color: 'cyan',
    path: '/services#digital-twin'
  },
];

const INDUSTRIES = [
  { icon: '🏛️', label: 'Government' },
  { icon: '🌾', label: 'Agriculture' },
  { icon: '🏗️', label: 'Infrastructure' },
  { icon: '🌿', label: 'Environment' },
  { icon: '🏙️', label: 'Urban Planning' },
  { icon: '🛡️', label: 'Defense' },
  { icon: '📡', label: 'Telecom' },
  { icon: '⛽', label: 'Oil & Gas' },
];

const TESTIMONIALS = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Director, Urban Development Authority',
    text: 'WhereSoft delivered a sophisticated land-use mapping platform that transformed how our department analyzes urban growth. The spatial analytics capabilities are truly world-class.',
    avatar: 'RK'
  },
  {
    name: 'Priya Sharma',
    role: 'VP Technology, AgroSense India',
    text: 'Their remote sensing solution helped us monitor crop health across 50,000 hectares with remarkable accuracy. A genuine geospatial partner who understands our domain.',
    avatar: 'PS'
  },
  {
    name: 'Col. (Retd.) Arun Mehta',
    role: 'Chief GIS Officer, Infrastructure Corp',
    text: 'The web GIS platform developed by WhereSoft integrates seamlessly with our existing workflows. Real-time visibility into field assets has been a game changer.',
    avatar: 'AM'
  }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (globeRef.current) {
        globeRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home-page page-wrapper">

      {/* ── HERO ── */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="geo-grid-bg" />
          <div className="hero-glow glow-orb glow-orb-cyan" style={{ width: 600, height: 600, top: -100, right: -100 }} />
          <div className="hero-glow glow-orb glow-orb-purple" style={{ width: 400, height: 400, bottom: -50, left: '20%' }} />
        </div>

        {/* SVG Globe */}
        <div className="hero-globe" ref={globeRef}>
          <svg viewBox="0 0 500 500" width="100%" height="100%">
            <defs>
              <radialGradient id="globeBase" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#1a3464" />
                <stop offset="60%" stopColor="#0d1a3a" />
                <stop offset="100%" stopColor="#080c18" />
              </radialGradient>
              <radialGradient id="glowGrad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(0,212,255,0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <clipPath id="globeClip">
                <circle cx="250" cy="250" r="220" />
              </clipPath>
            </defs>
            {/* Globe base */}
            <circle cx="250" cy="250" r="220" fill="url(#globeBase)" />
            {/* Glow */}
            <circle cx="250" cy="250" r="230" fill="url(#glowGrad)" />
            {/* Latitude lines */}
            {[50, 100, 150, 200, 250, 300, 350, 400, 450].map(y => (
              <line key={y} x1="30" y1={y} x2="470" y2={y} stroke="rgba(0,212,255,0.08)" strokeWidth="0.8" />
            ))}
            {/* Longitude arcs */}
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map(offset => (
              <ellipse key={offset} cx="250" cy="250" rx={offset + 30} ry="220"
                stroke="rgba(0,212,255,0.07)" strokeWidth="0.8" fill="none"
                clipPath="url(#globeClip)" />
            ))}
            {/* Land masses (simplified) */}
            <g fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" clipPath="url(#globeClip)">
              <path d="M200 160 Q230 140 260 155 Q285 150 300 170 Q320 180 310 210 Q290 230 260 225 Q230 230 210 210 Q190 195 200 160Z" />
              <path d="M150 230 Q175 220 200 235 Q215 245 210 265 Q195 280 170 275 Q148 265 145 248Z" />
              <path d="M300 200 Q330 190 360 210 Q380 220 375 245 Q360 265 335 260 Q310 255 305 235 Q298 218 300 200Z" />
              <path d="M230 290 Q265 280 290 300 Q305 315 295 340 Q275 360 250 355 Q228 348 222 325 Q217 308 230 290Z" />
              <path d="M130 180 Q150 170 165 185 Q175 200 165 220 Q148 235 132 225 Q118 212 122 195Z" />
            </g>
            {/* Hotspots */}
            {[
              { cx: 262, cy: 180 }, { cx: 175, cy: 248 }, { cx: 340, cy: 225 },
              { cx: 254, cy: 318 }, { cx: 145, cy: 197 }
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.cx} cy={p.cy} r="4" fill="#00D4FF" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={p.cx} cy={p.cy} r="10" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" values="8;14;8" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
            {/* Globe border */}
            <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              Geospatial Technology Company · Hyderabad, India
            </div>
            <h1 className="hero-title">
              Where Data Meets<br />
              <span className="text-gradient">The Earth</span>
            </h1>
            <p className="hero-desc">
              WhereSoft Technologies delivers cutting-edge geospatial solutions — from intelligent web-GIS platforms to 
              advanced remote sensing analytics — empowering organizations to unlock the full power of spatial data.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary btn-lg">Explore Services</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Start a Project →</Link>
            </div>
            <div className="hero-badges">
              <span className="badge badge-cyan">Web GIS</span>
              <span className="badge badge-purple">Remote Sensing</span>
              <span className="badge badge-green">Spatial Analytics</span>
              <span className="badge badge-amber">Digital Twin</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item reveal">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section services-section">
        <div className="dot-grid-bg" style={{ position: 'absolute', opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-header reveal">
            <div className="section-tag">What We Do</div>
            <h2 className="section-title">
              Geospatial Services That<br /><span className="text-gradient">Drive Real Impact</span>
            </h2>
            <p className="section-desc">
              From strategic GIS consulting to full-stack spatial application development, 
              our expert team delivers end-to-end geospatial solutions.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <Link to={s.path} key={i} className={`service-card service-card-${s.color} reveal`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-arrow">Learn more →</div>
              </Link>
            ))}
          </div>

          <div className="section-cta reveal">
            <Link to="/services" className="btn btn-outline btn-lg">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── WHY WHERESOFT ── */}
      <section className="section why-section" style={{ position: 'relative' }}>
        <div className="glow-orb glow-orb-purple" style={{ width: 500, height: 500, top: 0, left: '-10%', opacity: 0.2 }} />
        <div className="container">
          <div className="why-grid">
            <div className="why-visual reveal">
              <div className="why-map-card glass-card">
                <div className="why-map-header">
                  <div className="why-map-dots">
                    <span /><span /><span />
                  </div>
                  <span className="coord-display">GIS Platform v2.0</span>
                </div>
                <div className="why-map-body">
                  <svg viewBox="0 0 300 200" width="100%" height="180">
                    <rect width="300" height="200" fill="#0a0e1a" />
                    {/* Grid */}
                    {[0,30,60,90,120,150,180].map(y => (
                      <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(0,212,255,0.05)" strokeWidth="1" />
                    ))}
                    {[0,50,100,150,200,250,300].map(x => (
                      <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(0,212,255,0.05)" strokeWidth="1" />
                    ))}
                    {/* Polygons */}
                    <polygon points="60,40 120,30 150,60 130,90 70,85" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5" />
                    <polygon points="160,50 220,45 240,80 210,100 170,90" fill="rgba(124,111,255,0.12)" stroke="rgba(124,111,255,0.4)" strokeWidth="1.5" />
                    <polygon points="80,110 150,100 160,140 100,155 70,140" fill="rgba(0,232,135,0.1)" stroke="rgba(0,232,135,0.35)" strokeWidth="1.5" />
                    {/* Points */}
                    <circle cx="95" cy="60" r="4" fill="#00D4FF" opacity="0.9" />
                    <circle cx="95" cy="60" r="8" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.4" />
                    <circle cx="190" cy="70" r="4" fill="#7C6FFF" opacity="0.9" />
                    <circle cx="190" cy="70" r="8" fill="none" stroke="#7C6FFF" strokeWidth="1" opacity="0.4" />
                    <circle cx="120" cy="130" r="4" fill="#00E887" opacity="0.9" />
                    {/* Labels */}
                    <text x="95" y="52" textAnchor="middle" fill="#00D4FF" fontSize="7" fontFamily="JetBrains Mono">17.5°N</text>
                    <text x="190" y="62" textAnchor="middle" fill="#7C6FFF" fontSize="7" fontFamily="JetBrains Mono">78.3°E</text>
                  </svg>
                </div>
                <div className="why-map-footer">
                  <div className="map-stat"><span className="badge badge-cyan">3 Layers</span></div>
                  <div className="map-stat"><span className="badge badge-green">Live Data</span></div>
                  <div className="map-stat"><span className="badge badge-purple">AI Insights</span></div>
                </div>
              </div>
            </div>

            <div className="why-content">
              <div className="section-tag reveal">Why WhereSoft</div>
              <h2 className="section-title reveal">
                Built by Geospatial<br /><span className="text-gradient">Experts, For Impact</span>
              </h2>
              <div className="why-points">
                {[
                  { icon: '🎯', title: 'Domain Expertise', desc: 'Deep roots in GIS, remote sensing, and spatial data science across multiple industries.' },
                  { icon: '⚡', title: 'Agile Delivery', desc: 'Rapid, iterative development cycles with continuous stakeholder feedback loops.' },
                  { icon: '🔒', title: 'Enterprise Security', desc: 'SOC-compliant data handling with robust access control and audit trails.' },
                  { icon: '🌍', title: 'Open Standards', desc: 'Built on OGC-compliant, interoperable geospatial standards — no vendor lock-in.' },
                ].map((p, i) => (
                  <div key={i} className="why-point reveal">
                    <div className="why-point-icon">{p.icon}</div>
                    <div>
                      <h4 className="why-point-title">{p.title}</h4>
                      <p className="why-point-desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-primary reveal">About WhereSoft →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section industries-section">
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <div className="section-tag">Industries We Serve</div>
            <h2 className="section-title">
              Geospatial Solutions Across <span className="text-gradient">Every Sector</span>
            </h2>
          </div>
          <div className="industries-ticker">
            <div className="industries-track">
              {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
                <div key={i} className="industry-chip">
                  <span className="industry-icon">{ind.icon}</span>
                  <span>{ind.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="section-cta reveal" style={{ textAlign: 'center' }}>
            <Link to="/industries" className="btn btn-outline">Explore All Industries →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section" style={{ position: 'relative' }}>
        <div className="glow-orb glow-orb-cyan" style={{ width: 400, height: 400, top: '20%', right: '-5%', opacity: 0.15 }} />
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <div className="section-tag">Client Stories</div>
            <h2 className="section-title">Trusted by Industry Leaders</h2>
          </div>
          <div className="testimonial-carousel">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testimonial-card glass-card ${i === activeTestimonial ? 'active' : ''}`}>
                <div className="quote-mark">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card glass-card reveal">
            <div className="cta-geo-decoration">
              <svg viewBox="0 0 400 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                {[...Array(10)].map((_, i) => (
                  <circle key={i} cx={i * 45} cy={100 + Math.sin(i) * 40} r={2} fill="rgba(0,212,255,0.4)" />
                ))}
                <path d="M0 100 Q100 60 200 100 Q300 140 400 100" stroke="rgba(0,212,255,0.2)" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="cta-content">
              <div className="section-tag">Ready to Begin?</div>
              <h2 className="cta-title">
                Let's Build Your<br /><span className="text-gradient">Geospatial Solution</span>
              </h2>
              <p className="cta-desc">
                Whether you need a web GIS platform, spatial analytics solution, or remote sensing pipeline — 
                our team is ready to bring your vision to life.
              </p>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">Contact Our Team</Link>
                <Link to="/careers" className="btn btn-ghost btn-lg">Join WhereSoft</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
