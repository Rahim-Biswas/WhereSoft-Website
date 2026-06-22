import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const TIMELINE = [
  { year: '2016', title: 'Founded', desc: 'WhereSoft was founded in Hyderabad with a vision to democratize geospatial technology for Indian organizations.' },
  { year: '2018', title: 'First Major GIS Project', desc: 'Delivered a state-wide land records GIS platform serving over 200,000 survey parcels for a government authority.' },
  { year: '2020', title: 'Remote Sensing Division', desc: 'Launched dedicated remote sensing and satellite analytics practice, expanding into agriculture and environment sectors.' },
  { year: '2022', title: 'Product Launch', desc: 'Released WhereMap — our flagship web GIS product — now used across multiple enterprise clients.' },
  { year: '2024', title: 'Digital Twin & AI', desc: 'Integrated AI-powered spatial analysis and digital twin capabilities into our core service offerings.' },
  { year: '2026', title: 'Growing Forward', desc: 'Continuing to expand our team, product portfolio, and client base across South Asia and beyond.' },
];

const VALUES = [
  { icon: '🌍', title: 'Spatial First', desc: 'We believe location data is fundamental to understanding our world and making better decisions.' },
  { icon: '💡', title: 'Innovation', desc: 'We relentlessly pursue new geospatial techniques and technologies to deliver greater value.' },
  { icon: '🤝', title: 'Partnership', desc: 'We work alongside our clients as true partners in their geospatial journey — not just vendors.' },
  { icon: '✨', title: 'Excellence', desc: 'We hold ourselves to the highest standards of technical quality and professional delivery.' },
  { icon: '🔓', title: 'Openness', desc: 'We champion open standards and interoperability — empowering clients, not locking them in.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We apply geospatial intelligence to support environmental monitoring and sustainable development.' },
];

const TEAM = [
  { name: 'Rahim Biswas', role: 'Founder & CEO', initials: 'RB', specialty: 'GIS Architecture & Strategy' },
  { name: 'Priya Nair', role: 'Head of Engineering', initials: 'PN', specialty: 'Web GIS & Backend Systems' },
  { name: 'Aditya Reddy', role: 'Lead GIS Analyst', initials: 'AR', specialty: 'Spatial Analytics & QGIS' },
  { name: 'Sneha Kulkarni', role: 'Remote Sensing Expert', initials: 'SK', specialty: 'Satellite Imagery & Machine Learning' },
];

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page page-wrapper">

      {/* Hero */}
      <section className="about-hero">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-cyan" style={{ width: 500, height: 500, top: -100, right: -100, opacity: 0.2 }} />
        <div className="container">
          <div className="about-hero-content reveal">
            <div className="section-tag">About WhereSoft</div>
            <h1 className="about-hero-title">
              The Science of<br /><span className="text-gradient">Where</span>
            </h1>
            <p className="about-hero-desc">
              WhereSoft Technologies is a Hyderabad-based geospatial technology company dedicated to building 
              intelligent spatial solutions that transform how organizations understand and interact with their world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card glass-card reveal">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To empower organizations across every sector with accessible, powerful, and innovative geospatial solutions — making spatial intelligence a strategic advantage for all.</p>
            </div>
            <div className="mission-card glass-card reveal">
              <div className="mission-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>A world where every organization, regardless of size, can harness the transformative power of geospatial technology to make smarter, faster, and more impactful decisions.</p>
            </div>
            <div className="mission-card glass-card reveal">
              <div className="mission-icon">🌐</div>
              <h3>Our Approach</h3>
              <p>We combine deep GIS domain expertise with modern software engineering principles — delivering elegant, scalable, and user-centric spatial applications built on open standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section" style={{ position: 'relative' }}>
        <div className="dot-grid-bg" style={{ opacity: 0.4 }} />
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">From Vision to <span className="text-gradient">Impact</span></h2>
          </div>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} reveal`}>
                <div className="timeline-content card">
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">What Drives Us</div>
            <h2 className="section-title">Our Core <span className="text-gradient">Values</span></h2>
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card card reveal">
                <div className="value-icon">{v.icon}</div>
                <h4 className="value-title">{v.title}</h4>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section team-section" style={{ position: 'relative' }}>
        <div className="glow-orb glow-orb-purple" style={{ width: 400, height: 400, bottom: 0, right: '-5%', opacity: 0.2 }} />
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">The People Behind the Maps</div>
            <h2 className="section-title">Meet the <span className="text-gradient">Team</span></h2>
            <p className="section-desc">Passionate geospatial technologists committed to building spatial solutions that matter.</p>
          </div>
          <div className="team-grid">
            {TEAM.map((member, i) => (
              <div key={i} className="team-card card reveal">
                <div className="team-avatar">{member.initials}</div>
                <h4 className="team-name">{member.name}</h4>
                <div className="team-role badge badge-cyan">{member.role}</div>
                <p className="team-specialty">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section location-section">
        <div className="container">
          <div className="location-card glass-card reveal">
            <div className="location-info">
              <div className="section-tag">Find Us</div>
              <h2 className="section-title">Our <span className="text-gradient">Office</span></h2>
              <div className="location-details">
                <div className="location-item">
                  <span className="location-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>Plot No: 92 Vishnu Priya Nagar,<br />Pragathi Nagar, Nizampet,<br />Hyderabad, Telangana 500090</p>
                  </div>
                </div>
                <div className="location-item">
                  <span className="location-icon">✉️</span>
                  <div>
                    <strong>Email</strong>
                    <p><a href="mailto:team@wheresoft.in">team@wheresoft.in</a></p>
                  </div>
                </div>
                <div className="location-item">
                  <span className="location-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p><a href="tel:+914049501950">+91 4049501950</a></p>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
            </div>
            <div className="location-coords">
              <div className="coord-card">
                <div className="coord-label">LATITUDE</div>
                <div className="coord-value">17.5042° N</div>
              </div>
              <div className="coord-card">
                <div className="coord-label">LONGITUDE</div>
                <div className="coord-value">78.3760° E</div>
              </div>
              <div className="coord-card">
                <div className="coord-label">TIMEZONE</div>
                <div className="coord-value">IST (UTC+5:30)</div>
              </div>
              <div className="coord-card">
                <div className="coord-label">CITY</div>
                <div className="coord-value">Hyderabad, IN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
