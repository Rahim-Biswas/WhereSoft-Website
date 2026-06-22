import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Blog.css';

const CATEGORIES = ['All', 'Technology', 'Education', 'Industry', 'Company News'];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/api/blog/').then(r => {
      setPosts(r.data);
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
  }, [posts]);

  const filtered = posts.filter(p => category === 'All' || p.category === category);

  const openPost = async (slug) => {
    try {
      const r = await api.get(`/api/blog/${slug}`);
      setSelected(r.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  if (selected) {
    return (
      <div className="blog-page page-wrapper">
        <div className="container" style={{ paddingTop: 48, maxWidth: 800 }}>
          <button className="btn btn-ghost" style={{ marginBottom: 24 }} onClick={() => setSelected(null)}>
            ← Back to Blog
          </button>
          <div className="post-meta-row">
            {selected.category && <span className="badge badge-cyan">{selected.category}</span>}
            <span className="post-date">{new Date(selected.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="post-author">By {selected.author}</span>
            <span className="post-views">👁 {selected.views} views</span>
          </div>
          <h1 className="post-title">{selected.title}</h1>
          {selected.excerpt && <p className="post-excerpt">{selected.excerpt}</p>}
          <div className="divider" />
          <div className="post-content">
            {selected.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
              if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
              if (line.startsWith('- ')) return <li key={i} style={{ color: 'var(--text-secondary)', marginLeft: 20, marginBottom: 6 }}>{line.slice(2)}</li>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i}>{line}</p>;
            })}
          </div>
          <div className="divider" />
          <div className="post-footer">
            <div className="section-tag">Share this article</div>
            <button className="btn btn-ghost" onClick={() => setSelected(null)}>← More Articles</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page page-wrapper">

      {/* Hero */}
      <section className="blog-hero">
        <div className="geo-grid-bg" />
        <div className="glow-orb glow-orb-purple" style={{ width: 400, height: 400, top: -100, right: -100, opacity: 0.15 }} />
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Insights & Stories</div>
            <h1 className="blog-hero-title">
              The WhereSoft<br /><span className="text-gradient">Knowledge Hub</span>
            </h1>
            <p className="blog-hero-desc">
              Deep dives into geospatial technology, remote sensing, GIS trends, and the spatial data science 
              insights driving the future of our industry.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Filter */}
          <div className="blog-filters reveal">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`filter-pill ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '64px', gap: 16 }}>
              <div className="spinner" /> Loading articles...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📝</div>
              <h3>No posts in this category yet.</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map((post, i) => (
                <article key={post.id} className={`blog-card card reveal ${i === 0 ? 'featured' : ''}`} onClick={() => openPost(post.slug)}>
                  <div className="blog-card-header">
                    <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                      {post.category && <span className="badge badge-purple">{post.category}</span>}
                    </div>
                    <span className="blog-date">
                      {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
                  <div className="blog-card-footer">
                    <div className="blog-author">
                      <div className="blog-author-avatar">{post.author?.[0] || 'W'}</div>
                      <span>{post.author}</span>
                    </div>
                    <span className="blog-read-more">Read article →</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
