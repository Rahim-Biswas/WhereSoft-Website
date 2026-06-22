import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Industries.css';

const INDUSTRIES = [
  {
    id: 'government',
    icon: '🏛️',
    title: 'Government & Public Sector',
    desc: 'Land administration, e-governance GIS portals, census mapping, and digital governance transformation for state and central government departments.',
    usecases: ['Land records & cadastral mapping', 'Public infrastructure management', 'Electoral boundary demarcation', 'Revenue & survey departments'],
    color: 'cyan'
  },
  {
    id: 'defense',
    icon: '🛡️',
    title: 'Defense & Security',
    desc: 'Mission-critical geospatial intelligence, terrain analysis, border surveillance, and secure mapping solutions for defense and security agencies.',
    usecases: ['Terrain analysis & route planning', 'Surveillance & reconnaissance', 'Logistics & supply chain GIS', 'Secure classified map portals'],
    color: 'purple'
  },
  {
    id: 'urban',
    icon: '🏙️',
    title: 'Urban Planning & Smart Cities',
    desc: 'Integrated geospatial platforms for urban growth analysis, zoning management, utility mapping, and smart city infrastructure planning.',
    usecases: ['Master plan & land use mapping', 'Utility network management', 'Traffic & mobility analytics', 'Building permit & GIS'],
    color: 'green'
  },
  {
    id: 'agriculture',
    icon: '🌾',
    title: 'Agriculture & Forestry',
    desc: 'Precision agriculture solutions using satellite imagery, crop health monitoring, soil analysis, and forest cover change detection.',
    usecases: ['Crop health & yield forecasting', 'Soil moisture monitoring', 'Forest cover change detection', 'Irrigation planning & water management'],
    color: 'green'
  },
  {
    id: 'infrastructure',
    icon: '🏗️',
    title: 'Infrastructure & Utilities',
    desc: 'GIS-based asset management, pipeline mapping, network analysis, and construction project geospatial coordination platforms.',
    usecases: ['Asset lifecycle management', 'Pipeline & power line mapping', 'Network routing optimization', 'Construction progress monitoring'],
    color: 'amber'
  },
  {
    id: 'environment',
    icon: '🌿',
    title: 'Environment & Conservation',
    desc: 'Geospatial tools for environmental impact assessment, biodiversity mapping, pollution monitoring, and conservation planning.',
    usecases: ['Environmental impact assessment', 'Biodiversity & wildlife mapping', 'Pollution source identification', 'Climate risk analysis'],
    color: 'green'
  },
  {
    id: 'telecom',
    icon: '📡',
    title: 'Telecom & Networks',
    desc: 'Network coverage planning, tower site analysis, subscriber density mapping, and fiber optic route optimization for telecom operators.',
    usecases: ['Cell tower coverage analysis', 'Fiber route optimization', 'Subscriber density mapping', 'Network gap analysis'],
    color: 'purple'
  },
  {
    id: 'oil-gas',
    icon: '⛽',
    title: 'Oil, Gas & Mining',
    desc: 'Exploration planning, pipeline corridor analysis, facility management, and environmental compliance mapping for energy sector clients.',
    usecases: ['Exploration zone analysis', 'Pipeline corridor planning', 'Facility risk mapping', 'Environmental compliance GIS'],
    color: 'amber'
  },
  {
    id: 'transport',
    icon: '🚂',
    title: 'Transportation & Logistics',
    desc: 'Route optimization, fleet tracking, multimodal transport planning, and freight corridor analysis for transport authorities and logistics companies.',
    usecases: ['Route optimization & planning', 'Fleet tracking & telematics', 'Multimodal transport GIS', 'Last-mile delivery analytics'],
    color: 'cyan'
  },
  {
    id: 'disaster',
    icon: '🆘',
    title: 'Disaster Management',
    desc: 'Real-time situational awareness platforms, flood risk mapping, earthquake hazard assessment, and post-disaster damage mapping tools.',
    usecases: ['Flood inundation modeling', 'Hazard risk zoning', 'Real-time situational mapping', 'Post-disaster damage assessment'],
    color: 'amber'
  },
];

export default function Industries() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="industries-page page-wrapper">

      {/* Hero */}
      <section className="industries-hero">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-purple" style={{ width: 500, height: 500, top: -100, right: -100, opacity: 0.18 }} />
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Sectors We Serve</div>
            <h1 className="industries-hero-title">
              Geospatial Solutions for<br /><span className="text-gradient">Every Industry</span>
            </h1>
            <p className="industries-hero-desc">
              WhereSoft Technologies delivers specialized geospatial solutions across 10+ industry verticals — 
              understanding the unique spatial challenges each sector faces.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section">
        <div className="container">
          <div className="industries-grid">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.id} id={ind.id} className={`industry-card card reveal`}>
                <div className={`industry-icon-wrap industry-icon-${ind.color}`}>
                  <span className="industry-emoji">{ind.icon}</span>
                </div>
                <h3 className="industry-title">{ind.title}</h3>
                <p className="industry-desc">{ind.desc}</p>
                <ul className="industry-usecases">
                  {ind.usecases.map((u, j) => (
                    <li key={j} className="industry-usecase">
                      <span className={`usecase-dot dot-${ind.color}`} />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="industries-cta glass-card reveal">
            <div className="section-tag">Your Industry</div>
            <h2 className="section-title">Don't See Your Sector?</h2>
            <p className="section-desc" style={{ margin: '0 auto 32px' }}>
              We work across many more domains. Tell us about your geospatial challenge 
              and we'll design a tailored solution.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">Talk to Our Experts</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
