import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Phone, Mail, User, MessageSquare, ArrowRight, Briefcase } from 'lucide-react';
import api from '../../services/api';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './Contact.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle map zooming via Control key + Scroll or Zoom Control Buttons
function MapScrollControl() {
  const map = useMap();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Disable scroll wheel zoom by default to prevent page scroll trapping
    map.scrollWheelZoom.disable();

    let hintTimer;

    const handleKeyDown = (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        map.scrollWheelZoom.enable();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        map.scrollWheelZoom.disable();
      }
    };

    const handleWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) {
        setShowHint(true);
        clearTimeout(hintTimer);
        hintTimer = setTimeout(() => setShowHint(false), 1800);
      }
    };

    const container = map.getContainer();
    container.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearTimeout(hintTimer);
    };
  }, [map]);

  return showHint ? (
    <div className="map-scroll-hint">
      Use Ctrl + Scroll to zoom the map
    </div>
  ) : null;
}

// Custom violet marker matching WhereSoft theme
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const OFFICE = { lat: 17.532028009614812, lng: 78.38881943307665 };

export default function Contact() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await api.post('/api/contact/', {
        full_name: `${form.first_name} ${form.last_name}`,
        email: form.email,
        phone: form.phone || '',
        subject: 'General Inquiry',
        message: form.message
      });
      setStatus('success');
      setForm({ first_name: '', last_name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.detail || "Something went wrong on our end. We're actively working to fix it! In the meantime, feel free to email our team");
    }
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-container-card">
        {/* Top Header Section */}
        <div className="contact-header-section">
          <div className="contact-header-left">
            <h1 className="contact-main-title">Get In Touch</h1>
            <p className="contact-main-desc">
              We'd love to hear from you! Whether you have questions, need support, or want to learn more about our services, our team is here to help.
            </p>
          </div>

          <div className="contact-info-cards">
            <div className="contact-info-card">
              <div className="info-icon-badge">
                <MapPin size={22} />
              </div>
              <div className="info-text-content">
                <h4 className="info-title">Our Address</h4>
                <p className="info-detail">Pragathi Nagar, Hyderabad</p>
                <p className="info-detail">500090, Telangana, India</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="info-icon-badge">
                <Phone size={22} />
              </div>
              <div className="info-text-content">
                <h4 className="info-title">Our Contact Info</h4>
                <p className="info-detail">+91 4049501950</p>
                <p className="info-detail">team@wheresoft.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Map Section */}
        <div className="contact-map-section">
          <MapContainer
            center={[OFFICE.lat, OFFICE.lng]}
            zoom={14}
            className="contact-leaflet-map"
            scrollWheelZoom={false}
            zoomControl={true}
          >
            <MapScrollControl />
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
              <LayersControl.BaseLayer name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
              </LayersControl.BaseLayer>
            </LayersControl>
            <Marker position={[OFFICE.lat, OFFICE.lng]} icon={customIcon}>
              <Popup>WhereSoft Technologies</Popup>
            </Marker>
          </MapContainer>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${OFFICE.lat},${OFFICE.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="get-directions-btn"
          >
            Get Directions <ArrowRight size={18} />
          </a>
        </div>

        {/* Bottom Form Section */}
        <div className="contact-form-section">
          <div className="form-section-header">
            <h2 className="form-section-title">Request a Demo</h2>
            <p className="form-section-subtitle">
              Are you interested in partnering with us? Then what are you waiting for? Let's get in touch.
            </p>
          </div>

          <form className="contact-form-grid" onSubmit={handleSubmit}>
            <div className="form-fields-grid">
              <div className="input-field-wrapper">
                <label className="field-label">First Name*</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Enter your name..."
                    value={form.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-field-wrapper">
                <label className="field-label">Last Name*</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Enter your last name..."
                    value={form.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-field-wrapper">
                <label className="field-label">Email Address*</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-field-wrapper">
                <label className="field-label">Phone Number*</label>
                <div className="input-with-icon phone-field-container">
                  <Phone className="input-icon" size={18} />
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v || '' })}
                    className="modern-phone-input"
                    placeholder="Enter your phone number..."
                  />
                </div>
              </div>

              <div className="input-field-wrapper full-width">
                <label className="field-label">Message*</label>
                <div className="input-with-icon textarea-wrapper">
                  <MessageSquare className="input-icon textarea-icon" size={18} />
                  <textarea
                    name="message"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {status === 'error' && (
              <div className="form-error-msg">
                <p className="error-text">{errorMsg}</p>
                <a
                  href="mailto:team@wheresoft.in?subject=Contact%20Form%20Inquiry"
                  className="error-email-btn"
                >
                  <Mail size={16} /> Send an Email
                </a>
              </div>
            )}
            {status === 'success' && <div className="form-success-msg">Message sent successfully! We will contact you soon.</div>}

            <div className="form-submit-wrapper">
              <button type="submit" className="teal-submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send message'}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
