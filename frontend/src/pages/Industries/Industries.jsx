import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  ShieldCheck,
  Building2,
  Sprout,
  Layers,
  Leaf,
  Radio,
  Flame,
  Truck,
  Building,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import './Industries.css';

const INDUSTRIES = [
  {
    id: 'government',
    icon: Landmark,
    titlePrefix: 'Government &',
    titleGradient: 'Public Sector',
    desc: 'Land administration, e-governance GIS portals, census mapping, and digital governance transformation for state and central government departments.',
    usecases: ['Land records & cadastral mapping', 'Public infrastructure management', 'Electoral boundary demarcation', 'Revenue & survey departments'],
    color: 'cyan'
  },
  {
    id: 'defense',
    icon: ShieldCheck,
    titlePrefix: 'Defense &',
    titleGradient: 'National Security',
    desc: 'Mission-critical geospatial intelligence, terrain analysis, border surveillance, and secure tactical mapping solutions for defense and security agencies.',
    usecases: ['Terrain analysis & route planning', 'Surveillance & reconnaissance', 'Logistics & supply chain GIS', 'Secure air-gapped map portals'],
    color: 'purple'
  },
  {
    id: 'urban',
    icon: Building2,
    titlePrefix: 'Urban Planning &',
    titleGradient: 'Smart Cities',
    desc: 'Integrated geospatial platforms for urban growth analysis, zoning management, utility network mapping, and smart city infrastructure coordination.',
    usecases: ['Master plan & zoning management', 'Underground utility networks', 'Traffic flow & mobility analytics', 'Building permit & spatial approvals'],
    color: 'cyan'
  },
  {
    id: 'agriculture',
    icon: Sprout,
    titlePrefix: 'Agriculture &',
    titleGradient: 'Forestry',
    desc: 'Precision agriculture solutions leveraging satellite imagery, multi-temporal crop health monitoring, soil analysis, and forest canopy tracking.',
    usecases: ['Crop health & yield forecasting', 'Soil moisture & drought monitoring', 'Forest cover & biomass tracking', 'Irrigation planning & watershed management'],
    color: 'green'
  },
  {
    id: 'infrastructure',
    icon: Layers,
    titlePrefix: 'Infrastructure &',
    titleGradient: 'Utilities',
    desc: 'GIS-based asset management, pipeline mapping, electrical grid topology, and large-scale engineering geospatial coordination platforms.',
    usecases: ['Asset lifecycle management', 'Pipeline & power line mapping', 'Network routing optimization', 'Construction progress monitoring'],
    color: 'amber'
  },
  {
    id: 'environment',
    icon: Leaf,
    titlePrefix: 'Environment &',
    titleGradient: 'Conservation',
    desc: 'Geospatial tools for environmental impact assessment, biodiversity protection, pollution source identification, and climate risk resilience.',
    usecases: ['Environmental impact assessment (EIA)', 'Biodiversity & wildlife habitats', 'Air & water pollution mapping', 'Climate risk & coastal modeling'],
    color: 'green'
  },
  {
    id: 'telecom',
    icon: Radio,
    titlePrefix: 'Telecom &',
    titleGradient: 'Networks',
    desc: 'Network coverage planning, tower site suitability analysis, fiber optic route optimization, and subscriber density spatial analytics.',
    usecases: ['Cell tower coverage analysis', 'Fiber route design & optimization', 'Subscriber density heatmaps', 'Network coverage gap discovery'],
    color: 'purple'
  },
  {
    id: 'oil-gas',
    icon: Flame,
    titlePrefix: 'Oil, Gas &',
    titleGradient: 'Energy',
    desc: 'Exploration planning, right-of-way corridor analysis, pipeline integrity management, and environmental compliance mapping for energy sector leaders.',
    usecases: ['Exploration concession planning', 'Corridor route feasibility', 'Facility risk & hazard mapping', 'Environmental compliance monitoring'],
    color: 'amber'
  },
  {
    id: 'transport',
    icon: Truck,
    titlePrefix: 'Transportation &',
    titleGradient: 'Logistics',
    desc: 'Dynamic route optimization, fleet telematics, freight corridor modeling, and multimodal transit planning for logistics enterprises and public transit authorities.',
    usecases: ['Dynamic dispatch & routing', 'Fleet telematics & tracking', 'Multimodal transit analysis', 'Last-mile logistics planning'],
    color: 'cyan'
  },
  {
    id: 'real-estate',
    icon: Building,
    titlePrefix: 'Real Estate &',
    titleGradient: 'Land Records',
    desc: 'Property valuation models, spatial demographic analysis, commercial site selection, and verified digital land registry visualization.',
    usecases: ['Demographic catchment analysis', 'Commercial site suitability', 'Parcels & land title mapping', 'Property portfolio visualization'],
    color: 'purple'
  },
  {
    id: 'disaster',
    icon: AlertTriangle,
    titlePrefix: 'Disaster &',
    titleGradient: 'Emergency Management',
    desc: 'Real-time situational awareness platforms, flood inundation modeling, earthquake hazard assessment, and post-disaster rapid damage evaluation.',
    usecases: ['Flood inundation simulations', 'Hazard & vulnerability mapping', 'Real-time incident response', 'Post-event damage assessment'],
    color: 'amber'
  },
];

export default function Industries() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="industries-page page-wrapper">

      {/* Hero */}
      <section className="industries-hero">
        <div className="geo-grid-bg" />
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Sectors We Serve</div>
            <h1 className="industries-hero-title">
              Geospatial Solutions for<br /><span className="text-gradient">Every Industry</span>
            </h1>
            <p className="industries-hero-desc">
              WhereSoft Technologies delivers domain-tailored spatial solutions across major public and commercial verticals — addressing the nuanced operational and compliance requirements of each sector.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section industries-grid-section">
        <div className="container">
          <div className="industries-grid">
            {INDUSTRIES.map((ind) => {
              const IconComp = ind.icon;
              return (
                <div key={ind.id} id={ind.id} className="industry-card-modern reveal">
                  <div className="industry-card-top">
                    <div className={`industry-icon-box industry-icon-${ind.color}`}>
                      <IconComp size={24} />
                    </div>
                  </div>

                  <h3 className="industry-card-title">
                    {ind.titlePrefix} <span className="text-gradient">{ind.titleGradient}</span>
                  </h3>
                  <p className="industry-card-desc">{ind.desc}</p>

                  <div className="industry-usecases-wrap">
                    <div className="usecases-label">Key Applications:</div>
                    <ul className="industry-usecases-list">
                      {ind.usecases.map((u, j) => (
                        <li key={j} className="industry-usecase-item">
                          <span className={`usecase-bullet dot-${ind.color}`} />
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="industry-card-action">
                    <Link to="/contact" className="industry-explore-btn">
                      Request Solution Brief <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section industries-cta-section">
        <div className="container">
          <div className="industries-cta-box glass-card reveal">
            <div className="section-tag">Custom Solutions</div>
            <h2 className="section-title">Don't See Your Sector?</h2>
            <p className="section-desc" style={{ margin: '0 auto 32px' }}>
              We design specialized geospatial platforms and analytics algorithms for unique domain workflows. Talk to our technical team about your spatial data needs.
            </p>
            <div className="cta-button-group">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Talk to Our Experts <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn btn-ghost btn-lg">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
