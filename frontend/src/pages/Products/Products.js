import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const PRODUCTS = [
  {
    id: 'wheremap',
    name: 'WhereMap',
    version: '2.0',
    tagline: 'The Web GIS Platform for Modern Teams',
    desc: 'WhereMap is WhereSoft\'s flagship web mapping platform — a powerful, browser-first GIS that allows organizations to publish, visualize, and analyze spatial data without GIS expertise on the user side.',
    features: [
      'Multi-layer map canvas with drag-and-drop layers',
      'Vector and raster data visualization',
      'Real-time data streaming via WebSocket',
      'Role-based access control',
      'Custom styling with SLD/MapboxGL',
      'OGC-compliant WMS/WFS/WMTS services',
      'Attribute queries & spatial filters',
      'Export to PDF, PNG, GeoJSON, SHP',
    ],
    badge: 'Flagship Product',
    badgeColor: 'cyan',
    icon: '🗺️',
    status: 'Available Now',
  },
  {
    id: 'wheresight',
    name: 'WhereSight',
    version: '1.5',
    tagline: 'Satellite Imagery Analytics Suite',
    desc: 'WhereSight brings the power of remote sensing analytics to your browser. Process and analyze satellite imagery, generate indices (NDVI, NDWI), run change detection, and deliver insights — all without leaving your browser.',
    features: [
      'Multi-temporal satellite image comparison',
      'Spectral index computation (NDVI, NDWI, SAVI, EVI)',
      'Land use / land cover classification',
      'Change detection & monitoring alerts',
      'Cloud mask filtering',
      'Export processed rasters (GeoTIFF, COG)',
      'API access for automation',
      'Dashboard with analytics visualizations',
    ],
    badge: 'Remote Sensing',
    badgeColor: 'green',
    icon: '🛰️',
    status: 'Available Now',
  },
  {
    id: 'wheretrack',
    name: 'WhereTrack',
    version: '1.0',
    tagline: 'Real-Time Asset Tracking & Fleet Management',
    desc: 'WhereTrack is a GPS-based real-time tracking platform for field assets, vehicles, and personnel. Monitor locations, set geofences, generate route reports, and integrate with IoT sensors from a unified map interface.',
    features: [
      'Real-time GPS tracking on live map',
      'Geofence alerts & notifications',
      'Historical route playback',
      'Fleet analytics & utilization reports',
      'IoT sensor integration (temperature, fuel)',
      'Mobile app for field teams',
      'REST API for integration',
      'Multi-tenant organization support',
    ],
    badge: 'Tracking & IoT',
    badgeColor: 'amber',
    icon: '📍',
    status: 'Available Now',
  },
  {
    id: 'whereplan',
    name: 'WherePlan',
    version: '0.9',
    tagline: 'Collaborative Spatial Planning Tool',
    desc: 'WherePlan enables multi-stakeholder spatial planning and collaboration — annotate maps, sketch planning zones, run suitability analyses, and share interactive planning documents with decision-makers.',
    features: [
      'Collaborative map annotation tools',
      'Zone & polygon sketching',
      'Multi-criteria suitability analysis',
      'Planning document sharing',
      'Comment & feedback on map features',
      'Scenario comparison tools',
      'Integration with WhereMap',
      'Printable planning reports',
    ],
    badge: 'Planning & Collaboration',
    badgeColor: 'purple',
    icon: '📐',
    status: 'Beta',
  },
];

const COMPARISON = [
  { feature: 'Web-based (no install)', wheremap: true, wheresight: true, wheretrack: true, whereplan: true },
  { feature: 'Real-time data', wheremap: true, wheresight: false, wheretrack: true, whereplan: false },
  { feature: 'Satellite imagery', wheremap: false, wheresight: true, wheretrack: false, whereplan: false },
  { feature: 'Multi-user collaboration', wheremap: true, wheresight: false, wheretrack: false, whereplan: true },
  { feature: 'API access', wheremap: true, wheresight: true, wheretrack: true, whereplan: false },
  { feature: 'Mobile support', wheremap: true, wheresight: false, wheretrack: true, whereplan: true },
];

export default function Products() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="products-page page-wrapper">

      {/* Hero */}
      <section className="products-hero">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-cyan" style={{ width: 500, height: 500, top: -100, left: '-5%', opacity: 0.15 }} />
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Our Products</div>
            <h1 className="products-hero-title">
              Geospatial Software<br /><span className="text-gradient">Built to Perform</span>
            </h1>
            <p className="products-hero-desc">
              Purpose-built geospatial products designed for real-world operational needs — 
              from web mapping platforms to remote sensing analytics suites.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container">
          {PRODUCTS.map((p, i) => (
            <div key={p.id} id={p.id} className={`product-showcase ${i % 2 !== 0 ? 'reversed' : ''} reveal`}>
              <div className="product-visual">
                <div className={`product-icon-card badge-${p.badgeColor}`}>
                  <div className="product-emoji">{p.icon}</div>
                  <div className="product-name-display">{p.name}</div>
                  <div className="product-version">v{p.version}</div>
                  <div className={`product-status badge badge-${p.badgeColor}`}>{p.status}</div>
                </div>
              </div>
              <div className="product-info">
                <div className={`badge badge-${p.badgeColor}`} style={{ marginBottom: 12 }}>{p.badge}</div>
                <h2 className="product-title">{p.name} <span className="product-ver">v{p.version}</span></h2>
                <div className="product-tagline">{p.tagline}</div>
                <p className="product-desc">{p.desc}</p>
                <ul className="product-features">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="product-feature">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="product-actions">
                  <Link to="/contact" className="btn btn-primary">Request Demo</Link>
                  <Link to="/contact" className="btn btn-ghost">Get Pricing</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section comparison-section" style={{ position: 'relative' }}>
        <div className="dot-grid-bg" style={{ opacity: 0.3 }} />
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <div className="section-tag">Compare Products</div>
            <h2 className="section-title">Find the Right <span className="text-gradient">Tool</span></h2>
          </div>
          <div className="comparison-table-wrap reveal">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {PRODUCTS.map(p => (
                    <th key={p.id}>
                      <span className="ct-icon">{p.icon}</span>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td>{row.wheremap ? '✓' : '–'}</td>
                    <td>{row.wheresight ? '✓' : '–'}</td>
                    <td>{row.wheretrack ? '✓' : '–'}</td>
                    <td>{row.whereplan ? '✓' : '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="products-cta glass-card reveal">
            <h2 className="section-title">Ready to See It in <span className="text-gradient">Action?</span></h2>
            <p className="section-desc" style={{ margin: '0 auto 32px' }}>
              Schedule a live demo with our product team and see how WhereSoft products can transform your workflows.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">Book a Demo →</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
