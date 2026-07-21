import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './ChromaGrid.css';

const ChromaGrid = ({ items, radius = 300, damping = 0.45, fadeOut = 0.6, ease = "power3.out" }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.style.setProperty('--r', `${radius}px`);

    const handleMouseMove = (e) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(grid, {
        '--x': `${x}px`,
        '--y': `${y}px`,
        duration: damping,
        ease: ease,
      });

      const cards = grid.querySelectorAll('.chroma-card');
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        card.style.setProperty('--mouse-x', `${cardX}px`);
        card.style.setProperty('--mouse-y', `${cardY}px`);
      });
    };

    grid.addEventListener('mousemove', handleMouseMove);

    return () => {
      grid.removeEventListener('mousemove', handleMouseMove);
    };
  }, [radius, damping, ease]);

  return (
    <div className="chroma-grid" ref={gridRef}>
      <div className="chroma-overlay"></div>
      <div className="chroma-fade"></div>
      {items.map((item, index) => (
        <a 
          href={item.url} 
          key={index} 
          className="chroma-card"
          style={{
            '--card-border': item.borderColor,
            '--card-gradient': item.gradient,
          }}
        >
          <div className="chroma-img-wrapper">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="chroma-info">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="title" style={{ fontWeight: 'bold' }}>{item.title}</span>
              <span className="subtitle" style={{ fontSize: '0.9em', color: '#aaa' }}>{item.subtitle}</span>
            </div>
            <span className="handle" style={{ alignSelf: 'center', fontSize: '0.85em', color: '#888' }}>{item.handle}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ChromaGrid;
