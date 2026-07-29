import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
import './About.css';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker matching the design vibe
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const OFFICE = { lat: 17.532028009614812, lng: 78.38881943307665 };

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
  { name: 'Amzad Ali Khan', role: 'Founder & CEO' },
  { name: 'Shaik Mubeena', role: 'Co-Founder' },
  { name: 'Aditya Reddy', role: 'Lead GIS Analyst' },
  { name: 'Sneha Kulkarni', role: 'Remote Sensing Expert' },
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
            {/* <div className="section-tag">About WhereSoft</div> */}
            <h1 className="about-hero-title">
              Spatial<br /><span className="text-gradient">Data Science</span>
            </h1>
            <p className="about-hero-desc">
              WhereSoft Technologies is a Hyderabad based geospatial technology company dedicated to building
              modern spatial solutions that transform how organizations understand and interact with their world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card glass-card reveal">
              <div className="mission-icon"></div>
              <h3>Our Mission</h3>
              <p>To empower organizations across every sector with accessible, powerful, and innovative geospatial solutions — making spatial intelligence a strategic advantage for all.</p>
            </div>
            <div className="mission-card glass-card reveal">
              <div className="mission-icon"></div>
              <h3>Our Vision</h3>
              <p>A world where every organization, regardless of size, can harness the transformative power of geospatial technology to make smarter, faster, and more impactful decisions.</p>
            </div>
            <div className="mission-card glass-card reveal">
              <div className="mission-icon"></div>
              <h3>Our Approach</h3>
              <p>We combine deep GIS domain expertise with modern software engineering principles — delivering elegant, scalable, and user-centric spatial applications built on open standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/* <section className="section timeline-section" style={{ position: 'relative' }}>
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
      </section> */}

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            {/* <div className="section-tag">What Drives Us</div> */}
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

      {/* Founders / Team Section */}
      <section className="section founders-section">
        <div className="founders-grid-bg" />
        <div className="container">
          <div className="founders-header reveal">
            <h2 className="founders-title">
              Meet <span className="founders-title-accent">our</span> founders
            </h2>
            <p className="founders-subtitle">
              Our philosophy is simple; hire great people and give them the resources and support to do their best work.
            </p>
            <div className="founders-actions">
              <Link to="/contact" className="btn-founder-outline">
                <span className="play-icon-circle">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Book a demo
              </Link>
              <Link to="/contact" className="btn-founder-primary">
                Get in touch
              </Link>
            </div>
          </div>

          <div className="founders-grid reveal">
            {TEAM.map((member, i) => (
              <div key={i} className="founder-card">
                <div className="founder-avatar-container">
                  <svg
                    className="founder-blank-avatar"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="founder-info-box">
                  <h4 className="founder-name">{member.name}</h4>
                  <p className="founder-role">{member.role}</p>
                </div>
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
              {/* <div className="section-tag">Find Us</div> */}
              <h2 className="section-title">Our <span className="text-gradient">Office</span></h2>
              <div className="location-details">
                <div className="location-item">
                  <span className="location-icon"></span>
                  <div>
                    <strong>Address</strong>
                    <p>Plot No: 92 Vishnu Priya Nagar,<br />Pragathi Nagar, Nizampet,<br />Hyderabad, Telangana 500090</p>
                  </div>
                </div>
                <div className="location-item">
                  <span className="location-icon"></span>
                  <div>
                    <strong>Email</strong>
                    <p><a href="mailto:team@wheresoft.in">team@wheresoft.in</a></p>
                  </div>
                </div>
                <div className="location-item">
                  <span className="location-icon"></span>
                  <div>
                    <strong>Phone</strong>
                    <p><a href="tel:+914049501950">+91 4049501950</a></p>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
            </div>
            <div className="about-map-wrapper">
              <MapContainer
                center={[OFFICE.lat, OFFICE.lng]}
                zoom={3}
                className="about-map"
                scrollWheelZoom={true}
                zoomControl={true}
              >
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="Google Maps (Street)">
                    <TileLayer
                      url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                      attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Google Maps (Satellite)">
                    <TileLayer
                      url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                      attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Esri World Street Map">
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                      attribution='Tiles &copy; Esri'
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="OpenStreetMap">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                  </LayersControl.BaseLayer>
                </LayersControl>
                <Marker position={[OFFICE.lat, OFFICE.lng]} icon={customIcon}>
                  <Popup>
                    WhereSoft Office
                  </Popup>
                </Marker>
              </MapContainer>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${OFFICE.lat},${OFFICE.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-direction-btn"
                title="Get Directions on Google Maps"
              >
                <Navigation size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
