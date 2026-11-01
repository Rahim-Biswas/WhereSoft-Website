import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Check,
  X,
  Compass,
  ExternalLink
} from 'lucide-react';
import { FaLinkedinIn, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import contactBgImg from '../../assets/images/contactPage/bg2.png';
import api from '../../services/api';
import './Contact.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const OFFICE = { lat: 17.532028009614812, lng: 78.38881943307665 };

const TOPICS = [
  'General Inquiry',
  'WhereOne Web GIS & Digital Twin Demo',
  'Custom Geospatial Software Development',
  'Remote Sensing & Satellite Analytics',
  'Spatial Analytics & Location Intelligence',
  'Enterprise Partnership & Advisory'
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'General Inquiry',
    message: '',
    phone: '',
    newsletter: false
  });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await api.post('/api/contact/', {
        full_name: form.name,
        email: form.email,
        phone: form.phone || '',
        subject: form.topic,
        message: form.message
      });
      setStatus('success');
      setForm({
        name: '',
        email: '',
        topic: 'General Inquiry',
        message: '',
        phone: '',
        newsletter: false
      });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.detail || "Something went wrong on our end. Please reach out directly to team@wheresoft.in");
    }
  };

  return (
    <div className="contact-editorial-page page-wrapper">
      <div className="contact-split-container">

        {/* ── LEFT PANE: Form ── */}
        <div className="contact-form-pane">
          <div className="contact-form-content">

            <div className="contact-header-block">
              <h1 className="contact-editorial-title">
                Contact <span className="title-accent-word">us</span>
              </h1>
              <p className="contact-editorial-subtitle">
                Get in touch and let us know how we can help
              </p>
            </div>

            <form className="editorial-form" onSubmit={handleSubmit}>

              {/* Row 1: Name & Email */}
              <div className="form-line-row two-cols">
                <div className="line-field">
                  <label htmlFor="name" className="line-label">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="line-input"
                  />
                </div>

                <div className="line-field">
                  <label htmlFor="email" className="line-label">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                    className="line-input"
                  />
                </div>
              </div>

              {/* Row 2: Topic & Optional Phone */}
              <div className="form-line-row two-cols">
                <div className="line-field select-field">
                  <label htmlFor="topic" className="line-label">Topic</label>
                  <div className="select-wrapper">
                    <select
                      id="topic"
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      className="line-input line-select"
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="select-chevron" />
                  </div>
                </div>

                <div className="line-field">
                  <label htmlFor="phone" className="line-label">Phone <span className="label-optional">(Optional)</span></label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="line-input"
                  />
                </div>
              </div>

              {/* Row 3: Your Message */}
              <div className="form-line-row">
                <div className="line-field">
                  <label htmlFor="message" className="line-label">Your message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, timeline, or requirements..."
                    required
                    rows={3}
                    className="line-input line-textarea"
                  />
                </div>
              </div>

              {/* Row 4: Newsletter Checkbox */}
              <div className="newsletter-checkbox-row">
                <label className="custom-checkbox-container">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={handleChange}
                  />
                  <span className="checkbox-custom-mark">
                    {form.newsletter && <Check size={13} strokeWidth={3} />}
                  </span>
                  <span className="checkbox-label-text">
                    Please sign me up for the WhereSoft newsletter
                  </span>
                </label>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="editorial-alert alert-success">
                  <Check size={18} />
                  <span>Thank you! Your message has been sent successfully. We will reply within 24 hours.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="editorial-alert alert-error">
                  <p>{errorMsg}</p>
                  <a href="mailto:team@wheresoft.in" className="fallback-email-link">
                    <Mail size={14} /> Send an Email Directly
                  </a>
                </div>
              )}

              {/* Row 5: Action & Social Row */}
              <div className="form-action-social-row">

                {/* Send Button */}
                <button
                  type="submit"
                  className="editorial-send-btn"
                  disabled={status === 'loading'}
                >
                  <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                  <ArrowRight size={18} />
                </button>

                {/* Follow WhereSoft */}
                <div className="follow-box">
                  <div className="follow-title">Follow WhereSoft</div>
                  <div className="social-icon-links">
                    <a
                      href="https://www.linkedin.com/company/wheresoft-technologies-pvt-ltd/home/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-circle-btn"
                      title="Follow on LinkedIn"
                    >
                      <FaLinkedinIn size={14} />
                    </a>
                    <a
                      href="https://www.instagram.com/wheresoft.technologies?rpxt=MXdycjdxYWpvaWRsag=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-circle-btn"
                      title="Follow on Instagram"
                    >
                      <FaInstagram size={15} />
                    </a>
                  </div>
                </div>

              </div>

            </form>

            {/* Bottom Sub-bar */}
            <div className="editorial-subfooter">
              <span className="copyright-text">
                All Rights Reserved &copy; {new Date().getFullYear()} WhereSoft Technologies
              </span>
              <div className="subfooter-links">
                <Link to="/contact">Contact Us</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
              </div>
            </div>

          </div>
        </div>

        {/* ── RIGHT PANE: Themed Graphic & Illustration ── */}
        <div className="contact-graphic-pane">
          <div className="graphic-pane-bg-pattern" />

          {/* Quick Contact & Map Trigger Pill */}
          <div className="pane-top-floating-badge">
            <button
              onClick={() => setShowMapModal(true)}
              className="map-modal-pill-btn"
              title="Click to view interactive office location map"
            >
              <MapPin size={15} />
              <span>Hyderabad Office Map</span>
              <ExternalLink size={13} />
            </button>
          </div>

          {/* Thematic Editorial Illustration Image */}
          <div className="editorial-art-container">
            <img
              src={contactBgImg}
              alt="WhereSoft Geospatial Creation"
              className="editorial-art-img"
            />
          </div>

          {/* Bottom Contact Details Card */}
          <div className="pane-bottom-info-card">
            <div className="info-chip">
              <MapPin size={16} className="chip-icon" />
              <div className="chip-text">
                <strong>Hyderabad, India</strong>
                <span></span>
              </div>
            </div>

            <div className="info-chip">
              <Mail size={16} className="chip-icon" />
              <div className="chip-text">
                <strong>team@wheresoft.in</strong>
                <span></span>
              </div>
            </div>

            <div className="info-chip">
              <Phone size={16} className="chip-icon" />
              <div className="chip-text">
                <strong>+91 6309871347</strong>
                <span></span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── MODAL: Interactive Leaflet Map ── */}
      {showMapModal && (
        <div className="map-modal-backdrop" onClick={() => setShowMapModal(false)}>
          <div className="map-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="map-modal-header">
              <div className="modal-title-group">
                <div>
                  <h3>WhereSoft Technologies Headquarters</h3>
                  <p>Plot No: 92 Vishnu Priya Nagar, Pragathi Nagar, Hyderabad 500090</p>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowMapModal(false)}
                aria-label="Close Map"
              >
                <X size={20} />
              </button>
            </div>

            <div className="map-modal-body">
              <MapContainer
                center={[OFFICE.lat, OFFICE.lng]}
                zoom={15}
                className="modal-leaflet-map"
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
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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

            <div className="map-modal-footer">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${OFFICE.lat},${OFFICE.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Get Directions on Google Maps <ExternalLink size={15} />
              </a>
              <button
                className="btn btn-ghost"
                onClick={() => setShowMapModal(false)}
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
