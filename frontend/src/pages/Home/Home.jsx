import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import GridDistortion from '../../components/GridDistortion/GridDistortion';
import bg1 from '../../assets/bg_1.webp';
import bg2 from '../../assets/bg_2.webp';
import bg3 from '../../assets/bg_3.webp';
import bg4 from '../../assets/bg_4.webp';
import bg5 from '../../assets/bg_5.webp';
import bg6 from '../../assets/bg_6.webp';
import consultImg from '../../assets/images/homePage/consult.jpg';
import developmentImg from '../../assets/images/homePage/development.jpg';
import trainingImg from '../../assets/images/homePage/training.jpg';
import gisAnalysisImg from '../../assets/images/homePage/gis-analysis.jpg';
import droneDataCollectionImg from '../../assets/images/homePage/droneDataCollection.jpg';
import customToolImg from '../../assets/images/homePage/custom_tool.jpg';

import FlowingMenu from '../../components/FlowingMenu/FlowingMenu';



import './Home.css';

const BACKGROUND_IMAGES = [bg4, bg6, bg1, bg5, bg2, bg3];

const FLOWING_INDUSTRIES = [
  {
    link: '#', text: 'Infrastructure', image: [
      'https://images.pexels.com/photos/33349024/pexels-photo-33349024.jpeg',
      'https://images.pexels.com/photos/5132561/pexels-photo-5132561.jpeg',
      'https://images.pexels.com/photos/10619941/pexels-photo-10619941.jpeg'
    ]
  },
  {
    link: '#', text: 'Environment', image: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    ]
  },
  {
    link: '#', text: 'Urban Planning', image: [
      'https://images.pexels.com/photos/4192245/pexels-photo-4192245.jpeg',
      'https://images.pexels.com/photos/19234024/pexels-photo-19234024.jpeg',
      'https://images.pexels.com/photos/10619946/pexels-photo-10619946.jpeg'
    ]
  },
  {
    link: '#', text: 'Telecom', image: [
      'https://images.pexels.com/photos/36725391/pexels-photo-36725391.jpeg',
      'https://images.pexels.com/photos/13021713/pexels-photo-13021713.jpeg',
      'https://images.pexels.com/photos/36962826/pexels-photo-36962826.jpeg'
    ]
  },
];

const SERVICES = [
  {
    title: 'Custom Software Development',
    desc: 'Custom browser-based mapping applications with real-time data integration.',
    color: 'purple',
    path: '/services#web-gis',
    image: developmentImg,
    borderColor: 'var(--accent-purple)',
  },
  {
    title: 'Spatial Analytics',
    desc: 'Location-based intelligence, predictive spatial modeling & spatial SQL.',
    color: 'amber',
    path: '/services#spatial-analytics',
    image: gisAnalysisImg,
    borderColor: 'var(--accent-amber)',
  },
  {
    title: 'Custom Geospatial Tool Development',
    desc: 'We build custom scripts and plugins to automate data processing tasks.',
    color: 'cyan',
    path: '/services#digital-twin',
    image: customToolImg,
    borderColor: 'var(--accent-cyan)',
  },
  {
    title: 'Drone Data Acquisition & Processing',
    desc: 'Partner with certified Drone Service Providers to collect & process drone data.',
    color: 'purple',
    path: '/services#3d-viz',
    image: droneDataCollectionImg,
    borderColor: 'var(--accent-purple)',
  },
  {
    title: 'GIS Consulting',
    desc: 'Expert geospatial strategy, system design, and implementation advisory.',
    color: 'cyan',
    path: '/services#gis-consulting',
    image: consultImg,
    borderColor: 'var(--accent-cyan)',
  },
  {
    title: 'Training & Support',
    desc: 'Upskilling engineering and analyst teams with modern GIS technologies.',
    color: 'green',
    path: '/services#training',
    image: trainingImg,
    borderColor: 'var(--accent-green)',
  },
];

const INDUSTRIES = [
  { icon: '', label: 'Government' },
  { icon: '', label: 'Agriculture' },
  { icon: '', label: 'Infrastructure' },
  { icon: '', label: 'Environment' },
  { icon: '', label: 'Urban Planning' },
  { icon: '', label: 'Telecom' },
  { icon: '', label: 'Oil & Gas' },
];

// const TESTIMONIALS = [
//   {
//     name: 'Dr. Rajesh Kumar',
//     role: 'Director, Urban Development Authority',
//     text: 'WhereSoft delivered a sophisticated land-use mapping platform that transformed how our department analyzes urban growth. The spatial analytics capabilities are truly world-class.',
//     avatar: 'RK'
//   },
//   {
//     name: 'Priya Sharma',
//     role: 'VP Technology, AgroSense India',
//     text: 'Their remote sensing solution helped us monitor crop health across 50,000 hectares with remarkable accuracy. A genuine geospatial partner who understands our domain.',
//     avatar: 'PS'
//   },
//   {
//     name: 'Col. (Retd.) Arun Mehta',
//     role: 'Chief GIS Officer, Infrastructure Corp',
//     text: 'The web GIS platform developed by WhereSoft integrates seamlessly with our existing workflows. Real-time visibility into field assets has been a game changer.',
//     avatar: 'AM'
//   }
// ];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const heroRef = useRef(null);
  const globeRef = useRef(null);

  const nextBg = () => setBgIndex(p => (p + 1) % BACKGROUND_IMAGES.length);
  const prevBg = () => setBgIndex(p => (p - 1 + BACKGROUND_IMAGES.length) % BACKGROUND_IMAGES.length);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex(p => (p + 1) % BACKGROUND_IMAGES.length);
    }, 30000);
    return () => clearInterval(bgTimer);
  }, []);

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, []);

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
      <section className="hero dark-theme" ref={heroRef} style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'auto' }}>
          <GridDistortion
            grid={8}
            mouse={0.3}
            strength={0.5}
            relaxation={0.9}
            imageSrc={BACKGROUND_IMAGES[bgIndex]}
            className="wo-grid-distortion"
          />
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.50) 40%, rgba(0,0,0,0.60) 70%, rgba(0,0,0,0.70) 100%)`,
          zIndex: 2, pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
          zIndex: 3, pointerEvents: 'none'
        }} />

        {/* Slider Controls */}
        <button
          onClick={prevBg}
          style={{ position: 'absolute', left: '32px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'all 0.3s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <button
          onClick={nextBg}
          style={{ position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'all 0.3s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        <div className="container hero-content" style={{ position: "relative", zIndex: 4, pointerEvents: "none" }}>
          <div className="hero-text">
            {/* <div className="hero-tag">
              <span className="hero-tag-dot" />
              Geospatial Technology Company · Hyderabad, India
            </div> */}
            <h1 className="hero-title">
              Spatial Data<br />
              <span className="text-gradient">Science</span>
            </h1>
            {/* <p className="hero-desc">
              WhereSoft Technologies delivers cutting-edge geospatial solutions — from intelligent web-GIS platforms to 
              advanced remote sensing analytics — empowering organizations to unlock the full power of spatial data.
            </p> */}
            <div className="hero-actions" style={{ pointerEvents: "auto" }}>
              <Link to="/services" className="btn btn-primary btn-lg">Explore Services</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Contact Us →</Link>
            </div>
            {/* <div className="hero-badges">
              <span className="badge badge-cyan">Web GIS</span>
              <span className="badge badge-purple">Remote Sensing</span>
              <span className="badge badge-green">Spatial Analytics</span>
              <span className="badge badge-amber">Digital Twin</span>
            </div> */}
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section services-section">

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

          <div className="grid grid-3 gap-6" style={{ position: 'relative', marginTop: '3rem' }}>
            {SERVICES.map((s, idx) => (
              <Link to={s.path} key={idx} className="card home-service-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0', borderTop: `3px solid ${s.borderColor}` }}>
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="service-card-img" />
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-primary)', fontWeight: '700' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', flex: 1 }}>{s.desc}</p>
                  <div style={{ marginTop: '20px', color: s.borderColor, fontSize: '0.88rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Learn more <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="section-cta reveal">
            <Link to="/services" className="view-all-link">View All Services →</Link>
          </div>
        </div>
      </section>



      {/* ── INDUSTRIES ──
      <section className="section industries-section">
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'left' }}>
            <div className="section-tag">Industries</div>
            <h2 className="section-title">
              Geospatial Solution<br /><span className="text-gradient">Across Sectors</span>
            </h2>
          </div>
          <div style={{ height: '200px', position: 'relative', marginTop: '2rem', borderRadius: '24px', overflow: 'hidden' }}>
            <FlowingMenu
              items={FLOWING_INDUSTRIES}
              speed={5}
              textColor="#ffffff"
              bgColor="#009BC4"
              marqueeBgColor="#009BC4"
              marqueeTextColor="#ffffff"
              borderColor="rgba(255,255,255,0.15)"
            />
          </div>
          <div className="section-cta reveal" style={{ textAlign: 'center' }}>
            <Link to="/industries" className="view-all-link">Explore All Industries</Link>
          </div>

        </div>
      </section> */}

      {/* ── TESTIMONIALS ── */}
      {/* <section className="section testimonials-section" style={{ position: 'relative' }}>
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
      </section> */}

      {/* ── CTA ── */}
      {/* <section className="section cta-section">
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
      </section> */}

    </div>
  );
}
