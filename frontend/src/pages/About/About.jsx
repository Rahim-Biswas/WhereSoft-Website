import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  Navigation,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
  Globe
} from 'lucide-react';
import aboutHeroImg from '../../assets/images/aboutus/corporate_office.jpg';
import './About.css';

// Fix Leaflet default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker matching brand styling
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const OFFICE = { lat: 17.532028009614812, lng: 78.38881943307665 };

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-editorial-page page-wrapper">

      {/* ─── Hero Section (Matching Reference Design) ───────────────── */}
      <section
        className="about-editorial-hero"
        style={{ backgroundImage: `url(${aboutHeroImg})` }}
      >
        <div className="about-hero-overlay-gradient" />
        <div className="container about-hero-container">
          <div className="about-hero-text-block reveal">
            <h1 className="about-hero-title">About Us</h1>
            <p className="about-hero-subtitle">
              Our mission is to provide businesses with the browser-native spatial tools they need to thrive in today's market.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Our Story Section (Three-Column Layout with Vertical Dividers) ─── */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-header reveal">
            <h2 className="about-story-title">Our Story</h2>
          </div>

          <div className="about-story-grid reveal">

            {/* Column 1: History Of The Company */}
            <div className="story-col">
              <h3 className="story-col-title">History Of The Company</h3>
              <p className="story-col-desc">
                WhereSoft was founded with a conviction that <strong>geospatial data should be fast, accessible, and secure</strong>.
                What began as a specialized team of cartographers and software engineers in Hyderabad has grown into an <strong>industry-recognized geospatial pioneer</strong>,
                partnering with national mapping authorities, infrastructure leaders, and enterprises to deliver <strong>cutting-edge web GIS solutions</strong> that
                eliminate the constraints of legacy desktop software.
              </p>
            </div>

            {/* Column 2: Mission */}
            <div className="story-col">
              <h3 className="story-col-title">Mission</h3>
              <p className="story-col-desc">
                Our mission is to deliver <strong>sub-second client-side spatial intelligence</strong> with <strong>zero data exfiltration</strong>.
                We bridge the gap between complex GIS pipelines and decision-makers by engineering high-performance <strong>3D digital twins, spatial AI agents, and seamless interoperability</strong>,
                empowering organizations to turn complex location datasets into <strong>strategic and sustainable actions</strong>.
              </p>
            </div>

            {/* Column 3: Company Values */}
            <div className="story-col">
              <h3 className="story-col-title">Company Values</h3>
              <p className="story-col-desc">
                We operate on a <strong>spatial-first foundation</strong> anchored in continuous technological innovation, open geospatial standards, and uncompromising integrity.
                We hold ourselves to the <strong>highest standards of engineering excellence</strong>, fostering a diverse and collaborative environment where visionary minds <strong>solve critical real-world challenges</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Interactive Map & Location Section (Preserved as requested) ─── */}
      <section className="about-location-section">
        <div className="container">
          <div className="about-location-card reveal">

            {/* Left: Office Information */}
            <div className="location-info-panel">
              <h2 className="location-panel-title">Our Office</h2>
              <p className="location-panel-subtitle">
                Visit our geospatial engineering hub in Hyderabad or get in touch with our team.
              </p>

              <div className="location-details-list">
                <div className="location-detail-row">
                  <div>
                    <strong>Hyderabad Headquarters</strong>
                    <p>
                      Plot No: 92 Vishnu Priya Nagar,<br />
                      Pragathi Nagar, Nizampet,<br />
                      Hyderabad, Telangana 500090
                    </p>
                  </div>
                </div>

                <div className="location-detail-row">
                  <div>
                    <strong>Direct Inquiries</strong>
                    <p>
                      <a href="mailto:team@wheresoft.in">team@wheresoft.in</a>
                    </p>
                  </div>
                </div>

                <div className="location-detail-row">
                  <div>
                    <strong>Phone Support</strong>
                    <p>
                      <a href="tel:+916309871347">+91 6309871347</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="location-panel-actions">
                <Link to="/contact" className="btn btn-primary">
                  Get in Touch <ArrowRight size={15} />
                </Link>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${OFFICE.lat},${OFFICE.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Navigation size={15} />
                  <span>Get Directions</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Right: Interactive Leaflet Map */}
            <div className="location-map-container">
              <MapContainer
                center={[OFFICE.lat, OFFICE.lng]}
                zoom={14}
                className="about-leaflet-map"
                scrollWheelZoom={false}
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
                    <strong>WhereSoft Technologies</strong><br />
                    Pragathi Nagar, Hyderabad
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
