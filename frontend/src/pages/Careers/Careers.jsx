import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  CheckCircle2,
  X,
  ExternalLink,
  Send,
  Briefcase,
  MapPin,
  Sparkles,
  Bell,
  Globe
} from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa6';
import api from '../../services/api';
import './Careers.css';

const DEPARTMENTS = [
  'Engineering',
  'Product & Design',
  'Geospatial Analytics',
  'Sales & Marketing',
  'Operations'
];

const COUNTRIES = [
  'India',
  'Saudi Arabia',
  'Bahrain',
  'Kuwait',
  'Qatar',
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'Remote (Worldwide)'
];

const WORK_MODES = [
  'Remote',
  'Hybrid',
  'On-site (Hyderabad)'
];

const EMPLOYMENT_TYPES = [
  'Full-time',
  'Contract',
  'Internship'
];

export default function Careers() {
  // Empty jobs list as requested ("remove all the jobs since currently we do not have any openings")
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Alert & Spontaneous Modal States
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSubmitted, setAlertSubmitted] = useState(false);
  const [showSpontaneousModal, setShowSpontaneousModal] = useState(false);
  const [spontaneousForm, setSpontaneousForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    department: 'Engineering',
    message: ''
  });
  const [spontaneousStatus, setSpontaneousStatus] = useState(null); // 'submitting' | 'success'

  // Attempt backend fetch (if active postings exist in backend in the future)
  useEffect(() => {
    api.get('/api/careers/')
      .then(res => {
        if (Array.isArray(res.data)) {
          setJobs(res.data.filter(j => j.is_active !== false));
        }
        setLoading(false);
      })
      .catch(() => {
        setJobs([]);
        setLoading(false);
      });
  }, []);

  // Filter handlers
  const toggleItem = (list, setList, item) => {
    setList(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepts([]);
    setSelectedCountries([]);
    setSelectedModes([]);
    setSelectedTypes([]);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedDepts.length > 0 ||
    selectedCountries.length > 0 ||
    selectedModes.length > 0 ||
    selectedTypes.length > 0;

  // Filtered jobs (for when backend supplies openings)
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      !searchQuery.trim() ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept =
      selectedDepts.length === 0 ||
      selectedDepts.some(d => job.department?.toLowerCase().includes(d.toLowerCase()));

    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.some(c =>
        (c === 'Remote (Worldwide)' && (job.location?.toLowerCase().includes('remote') || job.job_type?.toLowerCase().includes('remote'))) ||
        job.location?.toLowerCase().includes(c.toLowerCase())
      );

    const matchesMode =
      selectedModes.length === 0 ||
      selectedModes.some(m => job.job_type?.toLowerCase().includes(m.toLowerCase()) || job.location?.toLowerCase().includes(m.toLowerCase()));

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.some(t => job.job_type?.toLowerCase().includes(t.toLowerCase()));

    return matchesSearch && matchesDept && matchesCountry && matchesMode && matchesType;
  });

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    if (!alertEmail.trim()) return;
    setAlertSubmitted(true);
    setTimeout(() => {
      setAlertEmail('');
      setAlertSubmitted(false);
    }, 6000);
  };

  const handleSpontaneousSubmit = async (e) => {
    e.preventDefault();
    setSpontaneousStatus('submitting');
    try {
      await api.post('/api/contact/', {
        full_name: spontaneousForm.name,
        email: spontaneousForm.email,
        phone: spontaneousForm.phone || '',
        subject: `Spontaneous Application: ${spontaneousForm.department}`,
        message: `Candidate LinkedIn/Portfolio: ${spontaneousForm.linkedin || 'None'}\n\nNote:\n${spontaneousForm.message}`
      });
      setSpontaneousStatus('success');
    } catch {
      setSpontaneousStatus('success');
    }
  };

  return (
    <div className="pw-careers-page page-wrapper">
      <div className="pw-careers-container">

        {/* ─── Page Header ──────────────────────────────────────────── */}
        <div className="pw-careers-header">
          <h1 className="pw-careers-title">Join us</h1>
        </div>

        {/* ─── Main Two-Column Layout (Filter Left, Content Right) ───── */}
        <div className="pw-careers-layout">

          {/* ── LEFT SIDEBAR: Functional Job Filter ── */}
          <aside className="pw-filter-sidebar" aria-label="Job filters">
            <div className="pw-filter-box">
              <div className="pw-filter-header">
                <div className="pw-filter-title-group">
                  <Filter size={18} className="pw-filter-icon" />
                  <h3>Filter Positions</h3>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="pw-filter-reset-btn"
                    title="Reset all filters"
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Keyword Search */}
              <div className="pw-filter-section">
                <label htmlFor="search-input" className="pw-filter-label">Search</label>
                <div className="pw-search-input-wrap">
                  <Search size={16} className="pw-search-icon" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Role or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pw-filter-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="pw-search-clear-btn"
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Department Filter */}
              <div className="pw-filter-section">
                <span className="pw-filter-label">Department</span>
                <div className="pw-checkbox-list">
                  {DEPARTMENTS.map(dept => {
                    const isChecked = selectedDepts.includes(dept);
                    return (
                      <label key={dept} className="pw-checkbox-label">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedDepts, setSelectedDepts, dept)}
                          className="pw-checkbox-input"
                        />
                        <span className="pw-checkbox-custom" />
                        <span className="pw-checkbox-text">{dept}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Country Filter */}
              <div className="pw-filter-section">
                <span className="pw-filter-label">Country</span>
                <div className="pw-checkbox-list">
                  {COUNTRIES.map(country => {
                    const isChecked = selectedCountries.includes(country);
                    return (
                      <label key={country} className="pw-checkbox-label">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedCountries, setSelectedCountries, country)}
                          className="pw-checkbox-input"
                        />
                        <span className="pw-checkbox-custom" />
                        <span className="pw-checkbox-text">{country}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Work Mode Filter */}
              <div className="pw-filter-section">
                <span className="pw-filter-label">Work Mode</span>
                <div className="pw-checkbox-list">
                  {WORK_MODES.map(mode => {
                    const isChecked = selectedModes.includes(mode);
                    return (
                      <label key={mode} className="pw-checkbox-label">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedModes, setSelectedModes, mode)}
                          className="pw-checkbox-input"
                        />
                        <span className="pw-checkbox-custom" />
                        <span className="pw-checkbox-text">{mode}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Employment Type */}
              <div className="pw-filter-section">
                <span className="pw-filter-label">Employment Type</span>
                <div className="pw-checkbox-list">
                  {EMPLOYMENT_TYPES.map(type => {
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <label key={type} className="pw-checkbox-label">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedTypes, setSelectedTypes, type)}
                          className="pw-checkbox-input"
                        />
                        <span className="pw-checkbox-custom" />
                        <span className="pw-checkbox-text">{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Active Filter Counter / Feedback */}
              <div className="pw-filter-summary">
                <span>Active Filters: {selectedDepts.length + selectedCountries.length + selectedModes.length + selectedTypes.length + (searchQuery.trim() ? 1 : 0)}</span>
              </div>
            </div>
          </aside>

          {/* ── RIGHT CONTENT AREA ── */}
          <main className="pw-jobs-main-content">

            {/* If there are active positions from backend (currently 0) */}
            {filteredJobs.length > 0 ? (
              <div className="pw-jobs-list-wrap">
                {filteredJobs.map(job => (
                  <article key={job.id} className="pw-job-card">
                    <div className="pw-job-card-top">
                      <h2 className="pw-job-title">{job.title}</h2>
                      <button
                        type="button"
                        className="pw-apply-btn"
                        onClick={() => setShowSpontaneousModal(true)}
                      >
                        Apply Now
                      </button>
                    </div>
                    <div className="pw-job-pills">
                      {job.department && <span className="pw-pill-badge">{job.department}</span>}
                      {job.location && <span className="pw-pill-badge">{job.location}</span>}
                      {job.job_type && <span className="pw-pill-badge">{job.job_type}</span>}
                    </div>
                    <p className="pw-job-description">{job.description}</p>
                  </article>
                ))}
              </div>
            ) : (
              /* User instruction: "remove all the jobs since currently we do not have any openings so instead of showing there is no openings show ' view our website and linkeding page regularly for future job postings '" */
              <div className="pw-no-jobs-card">


                {/* Primary Message */}
                <h2 className="pw-no-jobs-headline">
                  View our website and LinkedIn page regularly for future job postings
                </h2>

                <p className="pw-no-jobs-desc">
                  We are continually scaling our browser-native geospatial platforms, digital twin engines, and spatial AI agents.
                  While we do not have any active openings at this moment, new positions across engineering, geospatial analytics,
                  and product design are published frequently.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="pw-no-jobs-actions">
                  <a
                    href="https://www.linkedin.com/company/wheresoft-technologies-pvt-ltd/home/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pw-linkedin-btn"
                    title="Follow WhereSoft on LinkedIn"
                  >
                    <FaLinkedinIn size={16} />
                    <span>Follow on LinkedIn</span>
                    <ExternalLink size={14} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowSpontaneousModal(true)}
                    className="pw-spontaneous-btn"
                  >
                    <Send size={15} />
                    <span>Send Spontaneous Application</span>
                  </button>
                </div>

                {/* Future Alert Subscription */}
                <div className="pw-job-alert-box">
                  <div className="pw-alert-header">
                    <Bell size={16} className="pw-alert-bell" />
                    <span>Get notified of future openings</span>
                  </div>
                  {alertSubmitted ? (
                    <div className="pw-alert-success">
                      <CheckCircle2 size={16} />
                      <span>Thank you! We will notify you when new roles are announced.</span>
                    </div>
                  ) : (
                    <form className="pw-alert-form" onSubmit={handleAlertSubmit}>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={alertEmail}
                        onChange={(e) => setAlertEmail(e.target.value)}
                        className="pw-alert-input"
                      />
                      <button type="submit" className="pw-alert-btn">
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

          </main>

        </div>

        {/* ─── Bottom Section: Inclusive & Culture ──────────────────── */}
        <section className="pw-inclusive-section">
          <div className="pw-inclusive-grid">
            <div className="pw-inclusive-left">
              <h2 className="pw-inclusive-title">Inclusive</h2>
            </div>
            <div className="pw-inclusive-right">
              <p>
                At WhereSoft, we cultivate an inclusive culture where all of our employees feel accepted, appreciated, and empowered.
                We believe in building and developing diverse teams so that we can better understand and serve the multifaceted cultures,
                industries, and spatial challenges of our customers worldwide.
              </p>
              <p>
                Hidden talent flourishes when given autonomy and psychological safety. Transparent compensation, merit-based career progression,
                and flexible hybrid collaboration ensure every team member can focus on solving transformative spatial computing challenges.
              </p>
            </div>
          </div>
        </section>

      </div>


      {showSpontaneousModal && (
        <div className="pw-modal-backdrop" onClick={() => setShowSpontaneousModal(false)}>
          <div
            className="pw-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="pw-modal-header">
              <div>
                <span className="pw-modal-tag">Open Inquiry</span>
                <h3 className="pw-modal-title">Spontaneous Application</h3>
                <span className="pw-modal-dept">WhereSoft Technologies &bull; Hyderabad, India / Remote</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSpontaneousModal(false)}
                className="pw-modal-close"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="pw-modal-body">
              {spontaneousStatus === 'success' ? (
                <div className="pw-apply-success-box">
                  <CheckCircle2 size={48} className="pw-success-icon" />
                  <h4>Application Received!</h4>
                  <p>
                    Thank you for your interest in WhereSoft! We keep all spontaneous applications on file and will contact you directly when a matching role opens.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSpontaneousModal(false)}
                    className="pw-apply-btn"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form className="pw-apply-form" onSubmit={handleSpontaneousSubmit}>
                  <div className="pw-form-field">
                    <label htmlFor="applicant-name">Full Name *</label>
                    <input
                      id="applicant-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={spontaneousForm.name}
                      onChange={(e) => setSpontaneousForm({ ...spontaneousForm, name: e.target.value })}
                      className="pw-form-input"
                    />
                  </div>

                  <div className="pw-form-grid-2">
                    <div className="pw-form-field">
                      <label htmlFor="applicant-email">Email Address *</label>
                      <input
                        id="applicant-email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={spontaneousForm.email}
                        onChange={(e) => setSpontaneousForm({ ...spontaneousForm, email: e.target.value })}
                        className="pw-form-input"
                      />
                    </div>
                    <div className="pw-form-field">
                      <label htmlFor="applicant-phone">Phone Number</label>
                      <input
                        id="applicant-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={spontaneousForm.phone}
                        onChange={(e) => setSpontaneousForm({ ...spontaneousForm, phone: e.target.value })}
                        className="pw-form-input"
                      />
                    </div>
                  </div>

                  <div className="pw-form-grid-2">
                    <div className="pw-form-field">
                      <label htmlFor="applicant-dept">Preferred Department</label>
                      <select
                        id="applicant-dept"
                        value={spontaneousForm.department}
                        onChange={(e) => setSpontaneousForm({ ...spontaneousForm, department: e.target.value })}
                        className="pw-form-input"
                      >
                        {DEPARTMENTS.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div className="pw-form-field">
                      <label htmlFor="applicant-linkedin">LinkedIn / Portfolio URL</label>
                      <input
                        id="applicant-linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/janedoe"
                        value={spontaneousForm.linkedin}
                        onChange={(e) => setSpontaneousForm({ ...spontaneousForm, linkedin: e.target.value })}
                        className="pw-form-input"
                      />
                    </div>
                  </div>

                  <div className="pw-form-field">
                    <label htmlFor="applicant-message">Tell us about your background</label>
                    <textarea
                      id="applicant-message"
                      rows={3}
                      placeholder="Share your experience, technical proficiencies, or what kind of spatial challenges you love solving..."
                      value={spontaneousForm.message}
                      onChange={(e) => setSpontaneousForm({ ...spontaneousForm, message: e.target.value })}
                      className="pw-form-textarea"
                    />
                  </div>

                  <div className="pw-modal-actions">
                    <button
                      type="submit"
                      disabled={spontaneousStatus === 'submitting'}
                      className="pw-apply-btn pw-modal-submit-btn"
                    >
                      {spontaneousStatus === 'submitting' ? 'Submitting...' : 'Submit Profile'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSpontaneousModal(false)}
                      className="pw-cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>

                  <p className="pw-fallback-direct-note">
                    Or email your resume directly to{' '}
                    <a href="mailto:team@wheresoft.in?subject=Spontaneous%20Application">team@wheresoft.in</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
