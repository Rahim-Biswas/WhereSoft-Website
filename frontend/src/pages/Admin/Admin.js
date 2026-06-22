import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Admin.css';

const TABS = ['Dashboard', 'Careers', 'Blog', 'Messages'];

export default function Admin() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Dashboard');
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) { navigate('/login'); return; }
    loadAll();
  }, [isAdmin]);

  const loadAll = async () => {
    try {
      const [statsR, jobsR, postsR, messagesR] = await Promise.all([
        api.get('/api/admin/stats'),
        api.get('/api/careers/all'),
        api.get('/api/blog/all'),
        api.get('/api/contact/'),
      ]);
      setStats(statsR.data);
      setJobs(jobsR.data);
      setPosts(postsR.data);
      setMessages(messagesR.data);
    } catch (err) {
      console.error('Failed to load admin data', err);
    }
  };

  const openModal = (type, data = {}) => {
    setModal(type);
    setFormData(data);
  };

  const closeModal = () => { setModal(null); setFormData({}); };

  const saveJob = async () => {
    setSaving(true);
    try {
      if (formData.id) await api.put(`/api/careers/${formData.id}`, formData);
      else await api.post('/api/careers/', formData);
      await loadAll();
      closeModal();
    } catch (e) { alert('Error: ' + e.response?.data?.detail); }
    setSaving(false);
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    await api.delete(`/api/careers/${id}`);
    await loadAll();
  };

  const savePost = async () => {
    setSaving(true);
    try {
      if (formData.id) await api.put(`/api/blog/${formData.id}`, formData);
      else await api.post('/api/blog/', formData);
      await loadAll();
      closeModal();
    } catch (e) { alert('Error: ' + e.response?.data?.detail); }
    setSaving(false);
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await api.delete(`/api/blog/${id}`);
    await loadAll();
  };

  const markRead = async (id) => {
    await api.put(`/api/contact/${id}/read`);
    await loadAll();
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <Link to="/">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="url(#adGrad)" strokeWidth="1.5"/>
              <path d="M6 16 Q12 8 16 16 Q20 24 26 16" stroke="url(#adGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="3" fill="url(#adGrad)"/>
              <defs>
                <linearGradient id="adGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#00D4FF"/>
                  <stop offset="100%" stopColor="#7C6FFF"/>
                </linearGradient>
              </defs>
            </svg>
          </Link>
          <span className="admin-logo-text">Admin</span>
        </div>

        <nav className="admin-nav">
          {TABS.map(t => (
            <button
              key={t}
              className={`admin-nav-item ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              <span className="admin-nav-icon">
                {t === 'Dashboard' ? '📊' : t === 'Careers' ? '💼' : t === 'Blog' ? '📝' : '✉️'}
              </span>
              {t}
              {t === 'Messages' && messages.filter(m => !m.is_read).length > 0 && (
                <span className="admin-badge">{messages.filter(m => !m.is_read).length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-avatar">{user?.full_name?.[0] || 'A'}</div>
            <div>
              <div className="admin-user-name">{user?.full_name}</div>
              <div className="admin-user-role">Super Admin</div>
            </div>
          </div>
          <button className="admin-logout" onClick={handleLogout}>Sign Out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h2 className="admin-page-title">{tab}</h2>
          <div className="coord-display">17.5042°N · 78.3760°E</div>
        </div>

        <div className="admin-content">

          {/* Dashboard */}
          {tab === 'Dashboard' && stats && (
            <div>
              <div className="admin-stats">
                {[
                  { label: 'Total Users', value: stats.users.total, icon: '👥', color: 'cyan' },
                  { label: 'Active Jobs', value: stats.jobs.active, icon: '💼', color: 'green' },
                  { label: 'Published Posts', value: stats.posts.published, icon: '📝', color: 'purple' },
                  { label: 'Unread Messages', value: stats.messages.unread, icon: '✉️', color: 'amber' },
                ].map((s, i) => (
                  <div key={i} className={`admin-stat-card stat-${s.color}`}>
                    <div className="admin-stat-icon">{s.icon}</div>
                    <div className="admin-stat-value">{s.value}</div>
                    <div className="admin-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="admin-quick-actions">
                <h3>Quick Actions</h3>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
                  <button className="btn btn-primary" onClick={() => { setTab('Careers'); openModal('job'); }}>+ Add Job</button>
                  <button className="btn btn-outline" onClick={() => { setTab('Blog'); openModal('post'); }}>+ New Post</button>
                  <Link to="/" className="btn btn-ghost">← View Website</Link>
                </div>
              </div>
            </div>
          )}

          {/* Careers */}
          {tab === 'Careers' && (
            <div>
              <div className="admin-table-header">
                <h3>{jobs.length} Job Listings</h3>
                <button className="btn btn-primary" onClick={() => openModal('job')}>+ Add Job</button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th><th>Department</th><th>Type</th><th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(j => (
                      <tr key={j.id}>
                        <td className="td-bold">{j.title}</td>
                        <td>{j.department}</td>
                        <td><span className="badge badge-cyan">{j.job_type}</span></td>
                        <td>
                          <span className={`badge ${j.is_active ? 'badge-green' : 'badge-amber'}`}>
                            {j.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-ghost btn-sm" onClick={() => openModal('job', j)}>Edit</button>
                            <button className="btn btn-sm admin-delete-btn" onClick={() => deleteJob(j.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Blog */}
          {tab === 'Blog' && (
            <div>
              <div className="admin-table-header">
                <h3>{posts.length} Blog Posts</h3>
                <button className="btn btn-primary" onClick={() => openModal('post')}>+ New Post</button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th><th>Category</th><th>Author</th><th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(p => (
                      <tr key={p.id}>
                        <td className="td-bold">{p.title}</td>
                        <td>{p.category || '—'}</td>
                        <td>{p.author}</td>
                        <td>
                          <span className={`badge ${p.is_published ? 'badge-green' : 'badge-amber'}`}>
                            {p.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-ghost btn-sm" onClick={() => openModal('post', p)}>Edit</button>
                            <button className="btn btn-sm admin-delete-btn" onClick={() => deletePost(p.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Messages */}
          {tab === 'Messages' && (
            <div>
              <div className="admin-table-header">
                <h3>{messages.length} Messages ({messages.filter(m => !m.is_read).length} unread)</h3>
              </div>
              <div className="messages-list">
                {messages.map(m => (
                  <div key={m.id} className={`message-card card ${!m.is_read ? 'unread' : ''}`}>
                    <div className="message-header">
                      <div className="message-from">
                        <strong>{m.full_name}</strong>
                        <span className="message-email">{m.email}</span>
                        {m.organization && <span className="badge badge-cyan">{m.organization}</span>}
                      </div>
                      <div className="message-meta">
                        <span className="badge badge-purple">{m.subject}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {new Date(m.created_at).toLocaleDateString('en-IN')}
                        </span>
                        {!m.is_read && (
                          <button className="btn btn-ghost btn-sm" onClick={() => markRead(m.id)}>Mark Read</button>
                        )}
                      </div>
                    </div>
                    <p className="message-body">{m.message}</p>
                    {m.phone && <p className="message-phone">📞 {m.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Modal: Job */}
      {modal === 'job' && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{formData.id ? 'Edit Job' : 'Add New Job'}</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="admin-modal-body">
              {[
                { key: 'title', label: 'Job Title', type: 'text', required: true },
                { key: 'department', label: 'Department', type: 'text', required: true },
                { key: 'location', label: 'Location', type: 'text' },
                { key: 'job_type', label: 'Job Type', type: 'text', placeholder: 'Full-time / Part-time / Contract' },
                { key: 'experience', label: 'Experience', type: 'text', placeholder: 'e.g. 2-4 years' },
              ].map(f => (
                <div key={f.key} className="form-group">
                  <label className="form-label">{f.label}</label>
                  <input
                    type={f.type}
                    className="form-input"
                    placeholder={f.placeholder || ''}
                    value={formData[f.key] || ''}
                    onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                    required={f.required}
                  />
                </div>
              ))}
              {['description', 'requirements', 'responsibilities'].map(key => (
                <div key={key} className="form-group">
                  <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    value={formData[key] || ''}
                    onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                  />
                </div>
              ))}
              {formData.id && (
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={formData.is_active ? 'true' : 'false'}
                    onChange={e => setFormData(p => ({ ...p, is_active: e.target.value === 'true' }))}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              )}
            </div>
            <div className="admin-modal-footer">
              <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={saveJob} disabled={saving}>
                {saving ? 'Saving...' : 'Save Job'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Blog Post */}
      {modal === 'post' && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal admin-modal-wide" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{formData.id ? 'Edit Post' : 'New Blog Post'}</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input type="text" className="form-input" value={formData.title || ''}
                  onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Slug *</label>
                <input type="text" className="form-input" placeholder="url-friendly-slug"
                  value={formData.slug || ''}
                  onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Author</label>
                  <input type="text" className="form-input" value={formData.author || 'WhereSoft Team'}
                    onChange={e => setFormData(p => ({ ...p, author: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input type="text" className="form-input" placeholder="Technology, Education..."
                    value={formData.category || ''}
                    onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Excerpt</label>
                <textarea className="form-textarea" rows={2} value={formData.excerpt || ''}
                  onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Content (Markdown)</label>
                <textarea className="form-textarea" rows={10} value={formData.content || ''}
                  onChange={e => setFormData(p => ({ ...p, content: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input type="text" className="form-input" placeholder="GIS, Remote Sensing"
                  value={formData.tags || ''}
                  onChange={e => setFormData(p => ({ ...p, tags: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={formData.is_published || false}
                    onChange={e => setFormData(p => ({ ...p, is_published: e.target.checked }))}
                    style={{ width: 16, height: 16 }} />
                  Publish immediately
                </label>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={savePost} disabled={saving}>
                {saving ? 'Saving...' : 'Save Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
