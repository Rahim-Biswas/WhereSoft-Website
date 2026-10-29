import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Compass,
  Database,
  Eye,
  Ruler,
  Sliders,
  Sparkles,
  FileCode,
  Activity,
  Image as ImageIcon,
  ChevronDown,
  X,
  Maximize2
} from 'lucide-react';
import './Products.css';

// User Screenshots
import whereoneEonAi from '../../assets/images/whereone/whereone-eon-ai-agent.jpeg';
import whereone3DWorkspace from '../../assets/images/whereone/whereone-3d-analysis-workspace.png';
import whereone2DCanvas from '../../assets/images/whereone/whereone-2d-analysis-workspace.jpeg';
import whereoneOsm3D from '../../assets/images/whereone/whereone-osm-3d-buildings.png';
import whereoneSpatialHub from '../../assets/images/whereone/whereone-spatial-hub.png';
import whereoneProjects from '../../assets/images/whereone/whereone-projects-dashboard.png';
import whereonearcgisservercompt from '../../assets/images/whereone/whereone-arcgis-server-compt.jpeg';
import whereoneAuth from '../../assets/images/whereone/whereone-auth.png';
import whereonebimgeoref from '../../assets/images/whereone/whereone-bim-georef.jpg';

// Concise Showcase Cards (Eloqwnt Style)
const SHOWCASE_CARDS = [
  {
    id: 'whereone-eon-ai',
    tag: 'Client-Side AI Copilot',
    title: 'Eon AI Agent',
    titleDisplay: (
      <>
        Eon <span className="text-gradient">AI Agent</span>
      </>
    ),
    category: 'ai',
    desc: 'Capable of performing various spatial analysis directly in the browser with zero data exfiltration, keeping sensitive datasets on your machine with metadata-only transmission.',
    image: whereoneEonAi,
    imageBadge: 'Eon AI Spatial Agent',
    linkText: 'Explore',
  },
  {
    id: 'whereone-3d',
    tag: 'Globe-Scale 3D Digital Twin',
    title: 'WhereOne 3D',
    titleDisplay: (
      <>
        WhereOne <span className="text-gradient">3D</span>
      </>
    ),
    category: '3d',
    desc: 'Stream terrain, photorealistic tiles, and 3D buildings with native Line of Sight and Viewshed analytics and more.',
    image: whereone3DWorkspace,
    imageBadge: 'WhereOne 3D',
    linkText: 'Explore',
  },
  {
    id: 'whereone-2d',
    tag: 'In-Browser 2D Analytical Engine',
    title: 'WhereOne 2D',
    titleDisplay: (
      <>
        WhereOne <span className="text-gradient">2D</span>
      </>
    ),
    category: '2d',
    desc: 'Capable of performing various geospatial analysis on client side with no data exfiltration.',
    image: whereone2DCanvas,
    imageBadge: 'WhereOne 2D',
    linkText: 'Explore',
  },
  {
    id: 'arcgis-server-compatibility',
    tag: 'Enterprise Compatibility',
    title: 'ArcGIS Server Compatibility',
    titleDisplay: (
      <>
        ArcGIS Server <span className="text-gradient">Compatibility</span>
      </>
    ),
    category: 'arcgis',
    desc: 'Directly connect and stream secure Esri ArcGIS Server, FeatureServer, MapServer, and VectorTileServer services with portal authentication and dynamic layer symbology.',
    image: whereonearcgisservercompt,
    imageBadge: 'ArcGIS Server Compatibility',
    linkText: 'Explore',
  },
  {
    id: 'bim-cad-suite',
    tag: 'BIM & CAD Suite',
    title: 'BIM / CAD Georeferencing',
    titleDisplay: (
      <>
        BIM / CAD <span className="text-gradient">Georeferencing</span>
      </>
    ),
    category: 'bim',
    desc: 'Place, orient, and scale .ifc, .gltf, .glb, .obj, and .dxf models into geographic coordinate space, aligning architectural designs with Cesium World Terrain and 3D urban contexts.',
    image: whereonebimgeoref,
    imageBadge: 'BIM / CAD Georeferencing',
    linkText: 'Explore',
  },
  {
    id: 'spatial-hub',
    tag: 'Cloud Data Catalog',
    title: 'Spatial Hub',
    titleDisplay: (
      <>
        Spatial <span className="text-gradient">Hub</span>
      </>
    ),
    category: 'hub',
    desc: 'Curated catalog of global geospatial datasets including OSM 3D buildings, USGS earthquakes, and airports. Spin up 2D analytical or 3D digital-twin projects with one click.',
    image: whereoneSpatialHub,
    imageBadge: 'Curated Geospatial Hub',
    linkText: 'Explore',
  },
];

// Analytics & Processing Toolbox
const ANALYTICS_TOOLS = [
  {
    icon: <Eye className="tool-icon" />,
    title: '3D Line of Sight (LOS)',
    badge: 'Raycasting',
    desc: 'Real-time 3D raycasting between observer and target across terrain and structures to verify visual corridors.',
  },
  {
    icon: <Compass className="tool-icon" />,
    title: '360° Viewshed Analysis',
    badge: 'Visibility',
    desc: 'Compute visual coverage from any coordinate with customizable observer height, FOV, and obstacle masking.',
  },
  {
    icon: <Ruler className="tool-icon" />,
    title: '3D Geodetic Measurements',
    badge: 'Precision',
    desc: 'Measure geodesic distances, elevation profiles, slope angles, and volumetric cut-and-fill on 3D terrain.',
  },
  {
    icon: <Sparkles className="tool-icon" />,
    title: 'Solar & Shadow Simulation',
    badge: 'Sun Dynamics',
    desc: 'Simulate accurate solar trajectories and building shadow footprints across any day of the year.',
  },
  {
    icon: <Layers className="tool-icon" />,
    title: 'Underground & Clipping Planes',
    badge: 'Subsurface',
    desc: 'Inspect subsurface utilities, foundations, tunnels, and geology with dynamic terrain clipping planes.',
  },
  {
    icon: <Activity className="tool-icon" />,
    title: 'Camera Fly-Through & Drone Simulation',
    badge: 'Navigation',
    desc: 'Design and execute precision 3D camera paths, inspection flyovers, and simulated drone flight routes.',
  },
  {
    icon: <Database className="tool-icon" />,
    title: 'DuckDB-WASM In-Browser SQL',
    badge: 'Client Analytics',
    desc: 'Execute sub-second analytical SQL on millions of spatial records directly in browser memory.',
  },
  {
    icon: <Sliders className="tool-icon" />,
    title: 'ArcGIS Ribbon Symbology',
    badge: 'Desktop Parity',
    desc: 'Symbology workflows mirroring ArcGIS Pro: unique values, graduated colors, and classification breaks.',
  },
];

// Format categories
const FORMAT_PILLS = [
  'All Formats',
  '3D & Digital Twin',
  'BIM & CAD',
  'Vector & Tabular',
  'Enterprise Web Services',
];

const FORMAT_ITEMS = [
  { name: 'OGC 3D Tiles', cat: '3D & Digital Twin', desc: 'Hierarchical 3D streaming' },
  { name: 'Google 3D Tiles', cat: '3D & Digital Twin', desc: 'Photorealistic worldwide 3D' },
  { name: 'Cesium World Terrain', cat: '3D & Digital Twin', desc: 'Global high-res elevation' },
  { name: 'glTF / GLB', cat: '3D & Digital Twin', desc: '3D Transmission Format' },
  { name: 'OBJ / MTL', cat: '3D & Digital Twin', desc: 'Wavefront 3D geometries' },
  { name: 'IFC (.ifc)', cat: 'BIM & CAD', desc: 'Industry Foundation Classes BIM' },
  { name: 'AutoCAD DXF (.dxf)', cat: 'BIM & CAD', desc: 'Vector drawing exchange' },
  { name: 'GeoPackage (.gpkg)', cat: 'Vector & Tabular', desc: 'Standard SQLite GIS package' },
  { name: 'Shapefile (.zip)', cat: 'Vector & Tabular', desc: 'Standard Esri shapefile' },
  { name: 'GeoParquet', cat: 'Vector & Tabular', desc: 'Columnar cloud-native spatial data' },
  { name: 'Esri FeatureServer', cat: 'Enterprise Web Services', desc: 'Direct vector feature editing' },
  { name: 'Esri VectorTileServer', cat: 'Enterprise Web Services', desc: 'Vector tile streaming' },
  { name: 'Esri MapServer', cat: 'Enterprise Web Services', desc: 'Rendered map services' },
];

// FAQ items
const FAQS = [
  {
    q: 'What is WhereOne’s Dual-Engine Architecture?',
    a: 'WhereOne unites an in-browser 2D GIS workspace (MapLibre GL, DuckDB-WASM, PostGIS) for zero-latency client analytics with a dedicated 3D CesiumJS digital-twin workspace (FastAPI, MinIO) for globe-scale terrain and 3D tiles.',
  },
  {
    q: 'How does WhereOne integrate with ArcGIS Pro?',
    a: 'WhereOne directly consumes Esri FeatureServer, VectorTileServer, and MapServer endpoints via Portal OAuth2 authentication, and exchanges GeoPackage (.gpkg), Shapefile (.zip), GeoParquet, and glTF formats recognized natively by ArcGIS Pro.',
  },
  {
    q: 'How does client-side DuckDB-WASM improve GIS analysis?',
    a: 'DuckDB-WASM executes columnar analytical SQL directly inside browser WebAssembly memory, enabling instant queries, filters, and spatial joins over millions of records without round-trip network latency.',
  },
  {
    q: 'Which BIM and CAD formats are supported for georeferencing?',
    a: 'WhereOne natively supports .ifc, .gltf, .glb, .obj, and .dxf formats with 3-axis translation, rotation, and elevation snapping to align architectural models to real-world WGS84 and local projected coordinates.',
  },
];

export default function Products() {
  const [selectedFormat, setSelectedFormat] = useState('All Formats');
  const [selectedModalImage, setSelectedModalImage] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredFormats =
    selectedFormat === 'All Formats'
      ? FORMAT_ITEMS
      : FORMAT_ITEMS.filter((f) => f.cat === selectedFormat);

  return (
    <div className="eloqwnt-products-page page-wrapper">
      <div className="container">
        {/* ─── Top Header (Left-aligned, consistent with other pages) ─── */}
        <header className="eloqwnt-header reveal">
          <h1 className="eloqwnt-hero-headline">
            WhereOne <span className="text-gradient">Platform</span>
          </h1>
          <p className="eloqwnt-hero-subtext">
            A high-performance hybrid GIS pairing an in-browser 2D analytical engine with a globe-scale 3D digital twin delivering
            sub-second client-side processing, native ArcGIS Pro interoperability, and complete BIM/CAD georeferencing.
          </p>
        </header>

        {/* ─── Vertical Stack of Showcase Cards (Alternating Layout) ─ */}
        <section className="eloqwnt-showcase-stack">
          {SHOWCASE_CARDS.map((card, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <article
                key={card.id}
                id={card.id}
                className={`eloqwnt-card reveal ${isReversed ? 'is-reversed' : ''}`}
              >
                {/* Text Content Column */}
                <div className="card-info-col">
                  <h2 className="card-title">{card.titleDisplay || card.title}</h2>

                  <p className="card-desc">{card.desc}</p>

                  <div className="card-footer-row">
                    <button
                      className="explore-link-btn"
                      onClick={() =>
                        setSelectedModalImage({
                          src: card.image,
                          title: card.title,
                          titleDisplay: card.titleDisplay,
                          tag: card.tag,
                          desc: card.desc,
                          is2DCanvas: card.is2DCanvas,
                        })
                      }
                    >
                      <span>{card.linkText}</span>
                      <span className="arrow-sym">→</span>
                    </button>
                  </div>
                </div>

                {/* Visual Media Column (Fits entire uncropped image) */}
                <div className="card-visual-col">
                  {card.is2DCanvas ? (
                    /* 2D Canvas Interactive Mockup with Drop-In Placeholder */
                    <div
                      className="visual-container canvas-2d-container"
                      onClick={() =>
                        setSelectedModalImage({
                          src: null,
                          title: card.title,
                          tag: card.tag,
                          desc: card.desc,
                          is2DCanvas: true,
                        })
                      }
                    >
                      <div className="canvas-header-bar">
                        <span className="window-pill">MapLibre GL 2D Analytical Canvas</span>
                        <span className="canvas-badge">DuckDB-WASM Active</span>
                      </div>

                      <div className="mockup-ribbon-bar">
                        <span className="ribbon-btn active">Layers</span>
                        <span className="ribbon-btn">Symbology</span>
                        <span className="ribbon-btn">Spatial Query</span>
                        <span className="ribbon-btn">Geoprocessing</span>
                        <span className="ribbon-btn">Export .gpkg</span>
                      </div>

                      <div className="canvas-grid-body">
                        <div className="canvas-grid-lines" />
                        <svg viewBox="0 0 400 240" className="mockup-svg-vector">
                          <polygon points="40,50 140,30 180,90 90,120" className="poly poly-1" />
                          <polygon points="180,90 290,60 320,130 210,160" className="poly poly-2" />
                          <polygon points="90,120 210,160 170,220 50,190" className="poly poly-3" />
                          <polygon points="210,160 330,140 370,210 240,230" className="poly poly-4" />
                          <path d="M 20,40 Q 150,130 380,180" className="river-line" />
                        </svg>

                        <div className="canvas-center-callout">
                          <ImageIcon size={26} className="callout-icon" />
                          <h4>In-Browser 2D Analytical GIS</h4>
                          <p>Ready for your high-res 2D project screenshots</p>
                          <span className="callout-tag">MapLibre GL + DuckDB-WASM</span>
                        </div>
                      </div>

                      <div className="canvas-footer-bar">
                        <span>EPSG:4326 | 60 FPS | Zero Server Latency</span>
                        <span>PostGIS Parity</span>
                      </div>
                    </div>
                  ) : (
                    /* Standard High-Resolution Screenshot Window Frame */
                    <div
                      className="visual-container"
                      onClick={() =>
                        setSelectedModalImage({
                          src: card.image,
                          title: card.title,
                          titleDisplay: card.titleDisplay,
                          tag: card.tag,
                          desc: card.desc,
                        })
                      }
                    >
                      <div className="visual-browser-window">
                        <div className="browser-window-bar">
                          <div className="window-traffic-dots">
                            <span className="dot dot-red" />
                            <span className="dot dot-yellow" />
                            <span className="dot dot-green" />
                          </div>
                          <span className="window-badge-title">{card.imageBadge}</span>
                          <span className="window-expand-icon">
                            <Maximize2 size={13} />
                          </span>
                        </div>
                        <div className="browser-window-screen">
                          <img src={card.image} alt={card.title} className="visual-image" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>



        {/* ─── Native Spatial Analytics / Processing Toolbox ────────── */}
        <section className="eloqwnt-analytics-section" id="toolbox">
          <div className="eloqwnt-section-header reveal">
            <h2 className="eloqwnt-sub-headline">
              Native spatial analytics for 2D vectors and 3D terrain.
            </h2>
          </div>

          <div className="eloqwnt-analytics-grid reveal">
            {ANALYTICS_TOOLS.map((tool, idx) => (
              <div key={idx} className="eloqwnt-tool-card">
                <div className="tool-card-top">
                  <div className="tool-icon-circle">{tool.icon}</div>
                  <span className="tool-badge-pill">{tool.badge}</span>
                </div>
                <h4 className="tool-card-title">{tool.title}</h4>
                <p className="tool-card-desc">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Formats & Protocols Grid ─────────────────────────────── */}
        <section className="eloqwnt-formats-section" id="formats">
          <div className="eloqwnt-section-header reveal">
            <h2 className="eloqwnt-sub-headline">
              Broad geospatial format and enterprise protocol compatibility.
            </h2>
          </div>

          <div className="format-pills-filter reveal">
            {FORMAT_PILLS.map((pill) => (
              <button
                key={pill}
                className={`format-pill-btn ${selectedFormat === pill ? 'active' : ''}`}
                onClick={() => setSelectedFormat(pill)}
              >
                {pill}
              </button>
            ))}
          </div>

          <div className="format-cards-grid reveal">
            {filteredFormats.map((item, idx) => (
              <div key={idx} className="format-minimal-card">
                <div className="format-card-top">
                  <span className="format-cat-tag">{item.cat}</span>
                  <FileCode size={15} className="format-code-icon" />
                </div>
                <h4 className="format-card-name">{item.name}</h4>
                <p className="format-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Frequently Asked Questions ───────────────────────────── */}
        <section className="eloqwnt-faq-section" id="faq">
          <div className="eloqwnt-section-header reveal">
            <h2 className="eloqwnt-sub-headline">
              Frequently asked questions about WhereOne.
            </h2>
          </div>

          <div className="eloqwnt-faq-stack reveal">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`eloqwnt-faq-row ${expandedFaq === i ? 'is-open' : ''}`}
                onClick={() => setExpandedFaq(expandedFaq === i ? -1 : i)}
              >
                <div className="faq-question-bar">
                  <span className="faq-q-text">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`faq-chevron ${expandedFaq === i ? 'rotated' : ''}`}
                  />
                </div>
                {expandedFaq === i && <div className="faq-a-text">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ─── Eloqwnt Bottom CTA Card ──────────────────────────────── */}
        <section className="eloqwnt-cta-section reveal">
          <div className="eloqwnt-cta-card">
            <h2 className="cta-headline">
              Ready to deploy WhereOne's spatial intelligence?
            </h2>
            <p className="cta-subtext">
              Schedule a live demonstration
            </p>
            <div className="cta-btns">
              <Link to="/contact" className="eloqwnt-btn-dark">
                Book a Live Demo →
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ─── Lightbox Modal for Full View ──────────────────────────── */}
      {selectedModalImage && (
        <div
          className="eloqwnt-modal-overlay"
          onClick={() => setSelectedModalImage(null)}
        >
          <div
            className="eloqwnt-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedModalImage(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="modal-body-content">
              {selectedModalImage.src ? (
                <div className="modal-img-wrap">
                  <img
                    src={selectedModalImage.src}
                    alt={selectedModalImage.title}
                    className="modal-full-img"
                  />
                </div>
              ) : (
                <div className="modal-placeholder-wrap">
                  <ImageIcon size={40} className="modal-placeholder-icon" />
                  <h3>{selectedModalImage.title}</h3>
                  <p>In-Browser 2D Analytical Workspace • MapLibre GL &amp; DuckDB-WASM</p>
                </div>
              )}

              <div className="modal-meta-bar">
                <h3 className="modal-title">{selectedModalImage.titleDisplay || selectedModalImage.title}</h3>
                <p className="modal-desc">{selectedModalImage.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
