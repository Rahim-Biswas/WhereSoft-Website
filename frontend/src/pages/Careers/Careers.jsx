import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Careers.css';

const DEPARTMENTS = ['All', 'Engineering', 'Geospatial Analytics', 'Sales & Marketing', 'Operations'];
const JOB_TYPES = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];

const PERKS = [
  { icon: '🌍', title: 'Meaningful Work', desc: 'Work on impactful geospatial projects that shape infrastructure, agriculture, and governance.' },
  { icon: '📚', title: 'Learning Culture', desc: 'Regular tech talks, sponsored certifications, and conference attendance.' },
  { icon: '🏡', title: 'Flexible Work', desc: 'Hybrid work options with a collaborative, modern office in Hyderabad.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Market-competitive salaries with performance-linked incentives.' },
  { icon: '🤝', title: 'Great Team', desc: 'A passionate team of geospatial experts who love what they do.' },
  { icon: '🚀', title: 'Career Growth', desc: 'Clear career paths and opportunities to lead projects from day one.' },
];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ dept: 'All', type: 'All' });
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    api.get('/api/careers/').then(r => {
      setJobs(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [jobs]);

  const filtered = jobs.filter(j =>
    (filter.dept === 'All' || j.department === filter.dept) &&
    (filter.type === 'All' || j.job_type === filter.type)
  );

  return (
    <div className="careers-page page-wrapper">

      {/* Hero */}
      <section className="careers-hero">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-green" style={{ width: 400, height: 400, top: -100, right: -50, opacity: 0.15 }} />
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Join Our Team</div>
            <h1 className="careers-hero-title">
              Map the Future<br /><span className="text-gradient">With Us</span>
            </h1>
            <p className="careers-hero-desc">
              Join a team of passionate geospatial technologists building the next generation of spatial intelligence solutions. 
              Be part of something that matters.
            </p>
            <a href="#open-roles" className="btn btn-primary btn-lg">View Open Roles</a>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section perks-section">
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <div className="section-tag">Life at WhereSoft</div>
            <h2 className="section-title">Why Work With <span className="text-gradient">Us?</span></h2>
          </div>
          <div className="perks-grid">
            {PERKS.map((p, i) => (
              <div key={i} className="perk-card card reveal">
                <div className="perk-icon">{p.icon}</div>
                <h4 className="perk-title">{p.title}</h4>
                <p className="perk-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="section" style={{ position: 'relative' }}>
        <div className="dot-grid-bg" style={{ opacity: 0.3 }} />
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Opportunities</div>
            <h2 className="section-title">Open <span className="text-gradient">Positions</span></h2>
          </div>

          {/* Filters */}
          <div className="career-filters reveal">
            <div className="filter-group">
              <label className="filter-label">Department</label>
              <div className="filter-pills">
                {DEPARTMENTS.map(d => (
                  <button
                    key={d}
                    className={`filter-pill ${filter.dept === d ? 'active' : ''}`}
                    onClick={() => setFilter(f => ({ ...f, dept: d }))}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">Type</label>
              <div className="filter-pills">
                {JOB_TYPES.map(t => (
                  <button
                    key={t}
                    className={`filter-pill ${filter.type === t ? 'active' : ''}`}
                    onClick={() => setFilter(f => ({ ...f, type: t }))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="jobs-loading">
              <div className="spinner" />
              <span>Loading positions...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="jobs-empty">
              <div className="jobs-empty-icon">🔍</div>
              <h3>No positions found</h3>
              <p>We're always looking for talented people. Send us your resume!</p>
              <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
            </div>
          ) : (
            <div className="jobs-list">
              {filtered.map((job) => (
                <div key={job.id} className="job-card card reveal">
                  <div className="job-card-main">
                    <div className="job-info">
                      <h3 className="job-title">{job.title}</h3>
                      <div className="job-meta">
                        <span className="badge badge-cyan">{job.department}</span>
                        <span className="job-meta-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {job.location}
                        </span>
                        <span className="job-meta-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                          {job.job_type}
                        </span>
                        {job.experience && (
                          <span className="job-meta-item">🕐 {job.experience}</span>
                        )}
                      </div>
                      <p className="job-excerpt">
                        {job.description.substring(0, 160)}...
                      </p>
                    </div>
                    <button
                      className="btn btn-outline"
                      onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                    >
                      {selectedJob?.id === job.id ? 'Collapse' : 'View Details'}
                    </button>
                  </div>

                  {selectedJob?.id === job.id && (
                    <div className="job-detail">
                      <div className="job-section">
                        <h4>About the Role</h4>
                        <p>{job.description}</p>
                      </div>
                      <div className="job-section">
                        <h4>Requirements</h4>
                        <pre className="job-pre">{job.requirements}</pre>
                      </div>
                      {job.responsibilities && (
                        <div className="job-section">
                          <h4>Responsibilities</h4>
                          <pre className="job-pre">{job.responsibilities}</pre>
                        </div>
                      )}
                      <Link to="/contact" className="btn btn-primary">Apply Now →</Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* General Application */}
      <section className="section">
        <div className="container">
          <div className="general-apply glass-card reveal">
            <div className="section-tag">Don't See Your Role?</div>
            <h2 className="section-title">We're Always <span className="text-gradient">Hiring Great People</span></h2>
            <p className="section-desc" style={{ margin: '0 auto 32px' }}>
              Send us your resume and a note about what you're passionate about — we'll keep you in mind for future openings.
            </p>
            <a href="mailto:team@wheresoft.in?subject=General Application - WhereSoft Technologies" className="btn btn-primary btn-lg">
              Send Your Resume
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
