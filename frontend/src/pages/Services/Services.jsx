import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Code2,
  Satellite,
  BarChart3,
  Box,
  Cpu,
  Database,
  GraduationCap,
  Search,
  PenTool,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import './Services.css';

const SERVICES = [
  {
    id: 'gis-consulting',
    category: 'Core Service',
    icon: Compass,
    titlePrefix: 'GIS',
    titleGradient: 'Consulting',
    tagline: 'Expert spatial strategy, system architecture & governance',
    desc: 'Our GIS consulting services help enterprises and public agencies develop comprehensive geospatial roadmaps, evaluate open-source vs. proprietary technology stacks, design scalable spatial databases, and establish data governance frameworks. We bring decades of domain knowledge to guide your journey from discovery to execution.',
    features: [
      'Geospatial needs assessment & strategy',
      'Technology stack evaluation (FOSS4G & Esri)',
      'Spatial database architecture & schema design',
      'GIS data governance & lifecycle policies',
      'Cloud GIS migration & infrastructure planning',
      'Open standard compliance (OGC, ISO/TC 211)'
    ],
    color: 'cyan',
  },
  {
    id: 'web-gis',
    category: 'Core Service',
    icon: Code2,
    titlePrefix: 'Web GIS',
    titleGradient: 'Development',
    tagline: 'Browser-based mapping that scales with your mission',
    desc: 'We design and engineer bespoke web GIS applications leveraging modern open standards. From high-responsiveness interactive viewers to full-featured cloud geospatial platforms, our solutions support real-time sensor streaming, multi-user role permissions, and advanced client-side querying.',
    features: [
      'Custom React, TypeScript & WebGL map viewers',
      'MapLibre, Leaflet & OpenLayers integration',
      'GeoServer, MapServer & PostGIS deployment',
      'OGC API Features, Tiles & Vector Tile endpoints',
      'Real-time WebSocket & IoT telemetry feeds',
      'Fully responsive mobile & touch interfaces'
    ],
    color: 'purple',
  },
  {
    id: 'remote-sensing',
    category: 'Core Service',
    icon: Satellite,
    titlePrefix: 'Remote Sensing &',
    titleGradient: 'Analysis',
    tagline: 'Actionable spatial intelligence from satellite and aerial data',
    desc: 'Our remote sensing specialists process multispectral, hyperspectral, LiDAR, and synthetic aperture radar (SAR) datasets to extract actionable intelligence. From large-scale land use classification to historical change detection and vegetation health monitoring, we transform raw pixels into decisive insights.',
    features: [
      'Multispectral & hyperspectral imagery processing',
      'Automated Land Use / Land Cover (LULC) mapping',
      'Normalized Difference Vegetation Index (NDVI) analytics',
      'Temporal change detection & deformation tracking',
      'High-resolution drone & photogrammetric pipelines',
      'Deep learning-based geospatial feature extraction'
    ],
    color: 'green',
  },
  {
    id: 'spatial-analytics',
    category: 'Core Service',
    icon: BarChart3,
    titlePrefix: 'Spatial',
    titleGradient: 'Analytics',
    tagline: 'Location intelligence that unlocks competitive advantage',
    desc: 'We engineer spatial analytics workflows including spatial autocorrelation, service area optimization, suitability modeling, and predictive spatial machine learning. Our Python and spatial SQL pipelines integrate seamlessly into your data warehouse and enterprise BI dashboards.',
    features: [
      'Spatial clustering, hotspot & dispersion analysis',
      'Network routing, accessibility & isochrone models',
      'Multi-criteria site suitability evaluations',
      'Predictive spatial regression & risk modeling',
      'In-browser DuckDB & GeoArrow query acceleration',
      'PowerBI, Superset & enterprise BI connectivity'
    ],
    color: 'amber',
  },
  {
    id: '3d-viz',
    category: 'Advanced Solution',
    icon: Box,
    titlePrefix: '3D Spatial',
    titleGradient: 'Visualization',
    tagline: 'Immersive spatial data rendering in high fidelity',
    desc: 'Transform complex spatial phenomena into intuitive, immersive 3D digital environments. From textured 3D digital terrain models (DTM/DEM) to photorealistic urban CityGML scenes and point-cloud exploration, we create engaging visual experiences for executive decisions and public engagement.',
    features: [
      'WebGL, Three.js & Cesium.js globe rendering',
      '3D terrain mesh generation from DEM & LiDAR',
      'BIM (IFC) and CAD georeferencing & integration',
      'Photogrammetric 3D mesh & reality capture',
      'Interactive sunlight, shadow & line-of-sight analysis',
      'Virtual flythroughs & cinematic camera paths'
    ],
    color: 'purple',
  },
  {
    id: 'digital-twin',
    category: 'Advanced Solution',
    icon: Cpu,
    titlePrefix: 'Digital Twin',
    titleGradient: 'Solutions',
    tagline: 'Real-time virtual mirrors of the physical world',
    desc: 'We architect geospatial digital twins that synchronize continuous IoT telemetry with spatial structures. This enables infrastructure operators, city planners, and campus managers to monitor live operational state, simulate environmental scenarios, and trigger automated preventative maintenance.',
    features: [
      'Live IoT telemetry mapping & dynamic alerts',
      'Smart campus, utility & facility twin models',
      'Micro-climate & hydrological simulation integration',
      'Automated threshold alarms & spatial geofencing',
      'Historical replay & predictive operational simulation',
      'Open twin APIs for enterprise ERP integration'
    ],
    color: 'cyan',
  },
  {
    id: 'data-integration',
    category: 'Advanced Solution',
    icon: Database,
    titlePrefix: 'Data Integration &',
    titleGradient: 'ETL',
    tagline: 'Harmonizing multi-source geospatial data at enterprise scale',
    desc: 'Our data engineering specialists build resilient spatial ETL/ELT pipelines that ingest, reproject, clean, and synchronize disparate geospatial feeds. Whether reconciling legacy CAD drawings, proprietary ESRI Shapefiles, GeoJSON, or real-time GPS coordinates, we ensure data integrity across your enterprise.',
    features: [
      'Universal format conversion (GeoJSON, Parquet, SHP, KML)',
      'Automated coordinate reference system (CRS) reprojection',
      'GDAL/OGR, Python GeoPandas & PostGIS orchestration',
      'Automated geometry validation & topological cleaning',
      'Cloud spatial data lakehouses (AWS S3, Azure Blob, GCS)',
      'Scheduled incremental pipelines & schema enforcement'
    ],
    color: 'green',
  },
  {
    id: 'training',
    category: 'Advanced Solution',
    icon: GraduationCap,
    titlePrefix: 'Training &',
    titleGradient: 'Capacity',
    tagline: 'Upskilling engineering and analyst teams with modern GIS',
    desc: 'Empower your internal teams with practical, production-focused geospatial engineering capabilities. We deliver tailored corporate training programs ranging from foundational GIS analysis in QGIS to building modern full-stack web mapping applications and spatial data science workflows in Python.',
    features: [
      'Hands-on QGIS & open-source desktop GIS bootcamps',
      'Modern web GIS development with React & Leaflet/OpenLayers',
      'Spatial SQL & PostGIS masterclasses for DBAs',
      'Python geospatial workflows (GeoPandas, Shapely, Rasterio)',
      'Curated real-world project assignments & code reviews',
      'On-site workshops or interactive virtual cohorts'
    ],
    color: 'amber',
  },
];

const PROCESS = [
  { step: '01', icon: Search, title: 'Discovery', desc: 'We conduct a thorough audit of your spatial datasets, organizational workflows, and performance requirements.' },
  { step: '02', icon: PenTool, title: 'Architecture', desc: 'Our architects design optimal data schemas, UI wireframes, and scalable infrastructure stacks.' },
  { step: '03', icon: Code2, title: 'Development', desc: 'Agile 2-week sprint cycles with live staging environments, bi-weekly reviews, and tight feedback loops.' },
  { step: '04', icon: Rocket, title: 'Deployment', desc: 'Production release with CI/CD automation, comprehensive technical documentation, and handover.' },
  { step: '05', icon: ShieldCheck, title: 'Support', desc: 'Proactive system monitoring, security updates, SLA-backed maintenance, and continuous capacity building.' },
];

export default function Services() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="services-page page-wrapper">

      {/* Hero */}
      <section className="services-hero">
        <div className="geo-grid-bg" />
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Capabilities & Solutions</div>
            <h1 className="services-hero-title">
              Enterprise Geospatial<br /><span className="text-gradient">Services & Solutions</span>
            </h1>
            <p className="services-hero-desc">
              From strategic GIS consulting and custom web mapping architectures to satellite remote sensing and real-time digital twins — WhereSoft delivers end-to-end geospatial capabilities engineered for enterprise scale.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section services-list-section">
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((s) => {
              const IconComp = s.icon;
              return (
                <div key={s.id} id={s.id} className="service-card-modern reveal">
                  <div className="service-card-header">
                    <div className={`service-icon-box service-icon-${s.color}`}>
                      <IconComp size={26} />
                    </div>
                    <span className="service-category-pill">{s.category}</span>
                  </div>

                  <h3 className="service-card-title">
                    {s.titlePrefix} <span className="text-gradient">{s.titleGradient}</span>
                  </h3>
                  <div className="service-tagline">{s.tagline}</div>
                  <p className="service-card-desc">{s.desc}</p>

                  <div className="service-features-list">
                    {s.features.map((f, fi) => (
                      <div key={fi} className="service-feature-item">
                        <CheckCircle2 size={15} className="feature-check-icon" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="service-card-footer">
                    <Link to="/contact" className="service-cta-btn">
                      Discuss This Service <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="section process-section">
        <div className="dot-grid-bg" style={{ opacity: 0.3 }} />
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Methodology</div>
            <h2 className="section-title">Our Delivery <span className="text-gradient">Process</span></h2>
            <p className="section-desc">
              A structured, agile geospatial delivery framework refined across complex enterprise and government deployments.
            </p>
          </div>

          <div className="process-timeline-grid">
            {PROCESS.map((p, i) => {
              const ProcessIcon = p.icon;
              return (
                <div key={i} className="process-card-step reveal">
                  <div className="process-step-badge">
                    <span className="process-step-num">{p.step}</span>
                    <ProcessIcon size={20} className="process-step-icon" />
                  </div>
                  <h4 className="process-step-title">{p.title}</h4>
                  <p className="process-step-desc">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section services-cta-section">
        <div className="container">
          <div className="services-cta-box glass-card reveal">
            <div className="section-tag">Get Started</div>
            <h2 className="section-title">Have a Geospatial Project in <span className="text-gradient">Mind?</span></h2>
            <p className="section-desc" style={{ margin: '0 auto 32px' }}>
              Connect with our geospatial solution architects for a free technical consultation and feasibility review.
            </p>
            <div className="cta-button-group">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Schedule a Consultation <ArrowRight size={16} />
              </Link>
              <Link to="/products" className="btn btn-ghost btn-lg">
                Explore WhereOne Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
