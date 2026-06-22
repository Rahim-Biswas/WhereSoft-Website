import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../../services/api';
import './Contact.css';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom glowing marker
const customIcon = new L.DivIcon({
  html: `
    <div class="map-marker-pin">
      <div class="pin-dot"></div>
      <div class="pin-ring ring-1"></div>
      <div class="pin-ring ring-2"></div>
      <div class="pin-ring ring-3"></div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  className: ''
});

const OFFICE = { lat: 17.5042, lng: 78.3760 };

const SUBJECTS = [
  'GIS Consulting Inquiry',
  'Web GIS Development Project',
  'Remote Sensing Services',
  'Spatial Analytics Project',
  'Product Demo Request',
  'Partnership Inquiry',
  'Career Inquiry',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    subject: SUBJECTS[0],
    message: ''
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await api.post('/api/contact/', form);
      setStatus('success');
      setForm({ full_name: '', email: '', phone: '', organization: '', subject: SUBJECTS[0], message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.detail || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-page page-wrapper">

      {/* Hero */}
      <section className="contact-hero">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-cyan" style={{ width: 400, height: 400, top: -100, right: -100, opacity: 0.15 }} />
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Get In Touch</div>
            <h1 className="contact-hero-title">
              Let's Build Something<br /><span className="text-gradient">Extraordinary</span>
            </h1>
            <p className="contact-hero-desc">
              Have a geospatial project in mind? Want to learn more about our services? 
              Our team is ready to help — reach out today.
            </p>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">

            {/* Left: Form */}
            <div className="contact-form-wrap reveal">
              <h2 className="contact-form-title">Send Us a Message</h2>

              {status === 'success' ? (
                <div className="contact-success">
                  <div className="success-icon">✅</div>
                  <h3>Message Received!</h3>
                  <p>Thank you for reaching out. Our team will get back to you within 1–2 business days.</p>
                  <button className="btn btn-primary" onClick={() => setStatus(null)}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="full_name">Full Name *</label>
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        className="form-input"
                        placeholder="Your full name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="organization">Organization</label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        className="form-input"
                        placeholder="Your organization name"
                        value={form.organization}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    >
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      placeholder="Tell us about your project or inquiry..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <div className="form-error">{errorMsg}</div>
                  )}

                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <><div className="spinner" /> Sending...</>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Info + Map */}
            <div className="contact-info-wrap">
              <div className="contact-info-card glass-card reveal">
                <h3>Contact Information</h3>
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">📍</div>
                    <div>
                      <div className="contact-info-label">Office Address</div>
                      <div className="contact-info-val">
                        Plot No: 92 Vishnu Priya Nagar,<br />
                        Pragathi Nagar, Nizampet,<br />
                        Hyderabad, Telangana 500090
                      </div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">✉️</div>
                    <div>
                      <div className="contact-info-label">Email</div>
                      <a href="mailto:team@wheresoft.in" className="contact-info-val contact-link">
                        team@wheresoft.in
                      </a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">📞</div>
                    <div>
                      <div className="contact-info-label">Phone</div>
                      <a href="tel:+914049501950" className="contact-info-val contact-link">
                        +91 4049501950
                      </a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">🕐</div>
                    <div>
                      <div className="contact-info-label">Business Hours</div>
                      <div className="contact-info-val">Mon – Sat: 9:00 AM – 6:00 PM IST</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="contact-map-wrap reveal">
                <div className="map-header">
                  <span className="map-header-title">📍 WhereSoft Office</span>
                  <span className="coord-display">17.5042°N · 78.3760°E</span>
                </div>
                <MapContainer
                  center={[OFFICE.lat, OFFICE.lng]}
                  zoom={15}
                  className="leaflet-map"
                  scrollWheelZoom={false}
                  zoomControl={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  <Marker position={[OFFICE.lat, OFFICE.lng]} icon={customIcon}>
                    <Popup className="custom-popup">
                      <strong>WhereSoft Technologies</strong><br />
                      Pragathi Nagar, Hyderabad
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
