import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const SERVICES = [
  {
    id: 'gis-consulting',
    icon: '🗺️',
    title: 'GIS Consulting',
    tagline: 'Strategic spatial intelligence for informed decisions',
    desc: 'Our GIS consulting services help organizations develop geospatial roadmaps, evaluate technology stacks, design spatial databases, and establish GIS governance frameworks. We bring decades of combined domain knowledge to guide your journey from concept to implementation.',
    features: ['Geospatial needs assessment', 'Technology stack evaluation', 'Spatial database design', 'GIS governance frameworks', 'Capacity building & training', 'Standards compliance (OGC, ISO)'],
    color: 'cyan',
  },
  {
    id: 'web-gis',
    icon: '🌐',
    title: 'Web GIS Development',
    tagline: 'Browser-based mapping that scales with your mission',
    desc: 'We design and build custom web GIS applications using modern open standards — from lightweight map viewers to full-featured geospatial platforms with real-time data integration, multi-user collaboration, and advanced query capabilities.',
    features: ['Custom map application development', 'Leaflet.js & OpenLayers integration', 'GeoServer & MapServer deployment', 'RESTful & OGC API services', 'Real-time data streaming (WebSocket)', 'Mobile-responsive geospatial apps'],
    color: 'purple',
  },
  {
    id: 'remote-sensing',
    icon: '🛰️',
    title: 'Remote Sensing & Image Analysis',
    tagline: 'Extracting intelligence from satellite and aerial data',
    desc: 'Our remote sensing experts process multispectral, hyperspectral, LiDAR, and SAR datasets to deliver actionable geospatial intelligence. From land use classification to change detection and precision agriculture, we turn raw imagery into decisions.',
    features: ['Satellite imagery processing', 'Land use / land cover classification', 'Vegetation & crop health analysis', 'Change detection & monitoring', 'SAR & LiDAR data processing', 'AI-powered feature extraction'],
    color: 'green',
  },
  {
    id: 'spatial-analytics',
    icon: '📊',
    title: 'Spatial Analytics',
    tagline: 'Location intelligence that drives competitive advantage',
    desc: 'We deliver deep spatial analytics including hotspot analysis, network routing, suitability modeling, predictive spatial modeling, and geospatial data science pipelines. Our Python and R-based workflows integrate seamlessly with your existing data ecosystem.',
    features: ['Hotspot & clustering analysis', 'Network analysis & routing', 'Suitability & site selection modeling', 'Predictive spatial modeling', 'Python/R geospatial pipelines', 'Business intelligence integration'],
    color: 'amber',
  },
  {
    id: '3d-viz',
    icon: '🏙️',
    title: '3D Visualization',
    tagline: 'Bringing spatial data to life in three dimensions',
    desc: 'From textured 3D terrain models to dynamic urban digital scenes, our 3D visualization services create immersive spatial experiences for stakeholder presentations, planning simulations, and public engagement.',
    features: ['3D terrain modeling & DEM processing', 'CityGML & urban 3D modeling', 'WebGL-based 3D map rendering', 'Drone data & photogrammetry', 'Virtual flythrough animations', 'Cesium.js & Three.js integration'],
    color: 'purple',
  },
  {
    id: 'digital-twin',
    icon: '🔮',
    title: 'Digital Twin Solutions',
    tagline: 'Real-time virtual mirrors of the physical world',
    desc: 'We build geospatial digital twins that synchronize with real-world sensor data, enabling organizations to simulate, monitor, and optimize physical environments in real time — from smart city infrastructure to industrial facilities.',
    features: ['IoT sensor data integration', 'Real-time geospatial synchronization', 'Simulation & scenario modeling', 'Smart city infrastructure twins', 'Environmental monitoring twins', 'Predictive maintenance analytics'],
    color: 'cyan',
  },
  {
    id: 'data-integration',
    icon: '🔗',
    title: 'Data Integration & ETL',
    tagline: 'Unifying multi-source geospatial data at scale',
    desc: 'Our data engineering team builds robust spatial ETL pipelines that ingest, transform, and harmonize geospatial data from diverse sources — GPS, IoT sensors, open data portals, government databases, and commercial data providers.',
    features: ['Multi-format data ingestion (SHP, GeoJSON, KML)', 'PostGIS & SpatiaLite databases', 'GDAL/OGR transformation pipelines', 'Cloud storage integration (S3, Azure)', 'Data quality validation & cleansing', 'Automated spatial ETL scheduling'],
    color: 'green',
  },
  {
    id: 'training',
    icon: '🎓',
    title: 'Training & Capacity Building',
    tagline: 'Empowering your team with geospatial skills',
    desc: 'We offer tailored GIS training programs — from introductory QGIS workshops to advanced web GIS development courses. Our hands-on curriculum is designed for government officers, field teams, analysts, and developers.',
    features: ['QGIS & ArcGIS training', 'Web GIS development workshops', 'Remote sensing & image analysis', 'Python for geospatial analysis', 'Custom curriculum design', 'On-site & virtual delivery'],
    color: 'amber',
  },
];

const PROCESS = [
  { step: '01', title: 'Discovery', desc: 'We start by deeply understanding your spatial data, workflows, and organizational goals.' },
  { step: '02', title: 'Design', desc: 'Our team architects the optimal geospatial solution — from data models to UI wireframes.' },
  { step: '03', title: 'Develop', desc: 'Agile, sprint-based development with regular demos and stakeholder feedback loops.' },
  { step: '04', title: 'Deploy', desc: 'Production deployment with comprehensive documentation, training, and handover.' },
  { step: '05', title: 'Support', desc: 'Ongoing maintenance, monitoring, feature additions, and capacity building.' },
];

export default function Services() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="services-page page-wrapper">

      {/* Hero */}
      <section className="services-hero">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-cyan" style={{ width: 500, height: 500, top: -150, right: -100, opacity: 0.15 }} />
        <div className="container">
          <div className="reveal">
            <div className="section-tag">What We Offer</div>
            <h1 className="services-hero-title">
              End-to-End<br /><span className="text-gradient">Geospatial Services</span>
            </h1>
            <p className="services-hero-desc">
              From strategic consulting to advanced software development and remote sensing analytics — 
              WhereSoft delivers comprehensive geospatial solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section services-list">
        <div className="container">
          {SERVICES.map((s, i) => (
            <div key={s.id} id={s.id} className={`service-row ${i % 2 !== 0 ? 'reversed' : ''} reveal`}>
              <div className={`service-row-icon service-row-icon-${s.color}`}>
                <span className="service-row-emoji">{s.icon}</span>
                <div className="service-row-glow" />
              </div>
              <div className="service-row-content">
                <div className={`service-badge badge badge-${s.color}`}>{s.tagline}</div>
                <h2 className="service-row-title">{s.title}</h2>
                <p className="service-row-desc">{s.desc}</p>
                <ul className="service-features">
                  {s.features.map((f, fi) => (
                    <li key={fi} className="service-feature">
                      <span className="service-feature-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-outline">
                  Discuss This Service →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section process-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid-bg" style={{ opacity: 0.4 }} />
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <div className="section-tag">How We Work</div>
            <h2 className="section-title">Our Delivery <span className="text-gradient">Process</span></h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              A proven, agile methodology refined across 50+ geospatial projects.
            </p>
          </div>
          <div className="process-steps">
            {PROCESS.map((p, i) => (
              <div key={i} className="process-step reveal">
                <div className="process-step-num">{p.step}</div>
                <h4 className="process-step-title">{p.title}</h4>
                <p className="process-step-desc">{p.desc}</p>
                {i < PROCESS.length - 1 && <div className="process-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="services-cta glass-card reveal">
            <h2 className="section-title">Ready to Start Your <span className="text-gradient">Project?</span></h2>
            <p className="section-desc" style={{ margin: '0 auto 32px' }}>
              Tell us about your geospatial challenge and our team will craft a tailored solution.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">Get a Free Consultation</Link>
              <Link to="/products" className="btn btn-ghost btn-lg">View Our Products</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
