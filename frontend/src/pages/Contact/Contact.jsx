import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MessageCircle, Send, Navigation } from 'lucide-react';
import { FaTwitter } from 'react-icons/fa';
import api from '../../services/api';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './Contact.css';
import { Compass } from "lucide-react";

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

// Using Melbourne coordinates to match the provided image
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
      setErrorMsg(err.response?.data?.detail || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-page-modern">
      <div className="contact-left-map">
        <MapContainer
          center={[OFFICE.lat, OFFICE.lng]}
          zoom={4}
          className="contact-map-full"
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
            <Popup>WhereSoft Office</Popup>
          </Marker>
        </MapContainer>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${OFFICE.lat},${OFFICE.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="map-direction-btn"
          title="Get Directions on Google Maps"
        >
          <Compass size={20} strokeWidth={2} />
        </a>
      </div>

      <div className="contact-right-form">
        <div className="contact-right-inner">
          <h1 className="contact-title">Contact us</h1>
          <p className="contact-subtitle">
            We're here to help. Get in touch with our team for any<br />
            project requirements or queries.
          </p>

          <form className="contact-form-modern" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="phone-input-group">
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v || '' })}
                  className="modern-phone-input"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="form-group message-group">
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="form-textarea"
                style={{ resize: 'vertical' }}
              />
            </div>

            {status === 'error' && <div className="form-error">{errorMsg}</div>}
            {status === 'success' && <div className="form-success">Message sent successfully!</div>}

            <button type="submit" className="submit-btn" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
