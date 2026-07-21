import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float time;
uniform vec2 uvScale;
uniform vec2 uvOffset;
varying vec2 vUv;
varying vec2 vUvTexture;
void main() {
  vUv = uv;
  vUvTexture = uv * uvScale + uvOffset;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec2 vUvTexture;
void main() {
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, vUvTexture - 0.02 * offset.rg);
}`;

const GridDistortion = ({ 
  grid = 18, 
  mouse = 0.12, 
  strength = 0.18, 
  relaxation = 0.92, 
  imageSrc, 
  className = '' 
}) => {
  const containerRef = useRef(null);
  const dataTextureRef = useRef(null);
  const animationIdRef = useRef(null);
  const mouseStateRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 });

  useEffect(() => {
    if (!containerRef.current || !imageSrc) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null },
      uvScale: { value: new THREE.Vector2(1, 1) },
      uvOffset: { value: new THREE.Vector2(0, 0) }
    };

    let loadedTexture = null;

    // Load image texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      uniforms.uTexture.value = texture;
      loadedTexture = texture;
      handleResize();
    });

    // Create data texture for distortion
    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
    }

    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;
    dataTextureRef.current = dataTexture;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height);
      const aspect = width / height;
      plane.scale.set(aspect, 1, 1);

      camera.left = -aspect / 2;
      camera.right = aspect / 2;
      camera.top = 0.5;
      camera.bottom = -0.5;
      camera.updateProjectionMatrix();

      uniforms.resolution.value.set(width, height, 1, 1);

      // object-fit: cover behavior for texture in shader
      if (loadedTexture && loadedTexture.image) {
        const imageAspect = loadedTexture.image.width / loadedTexture.image.height;
        let scaleX = 1;
        let scaleY = 1;
        let offsetX = 0;
        let offsetY = 0;

        if (aspect > imageAspect) {
          scaleX = 1;
          scaleY = imageAspect / aspect;
          offsetY = (1 - scaleY) / 2;
        } else {
          scaleX = aspect / imageAspect;
          scaleY = 1;
          offsetX = (1 - scaleX) / 2;
        }
        
        uniforms.uvScale.value.set(scaleX, scaleY);
        uniforms.uvOffset.value.set(offsetX, offsetY);
      }
    };

    // Mouse handlers
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;

      const state = mouseStateRef.current;
      state.vX = x - state.prevX;
      state.vY = y - state.prevY;
      state.prevX = state.x;
      state.prevY = state.y;
      state.x = x;
      state.y = y;
    };

    const handleMouseLeave = () => {
      mouseStateRef.current = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      uniforms.time.value += 0.05;

      const dataTex = dataTextureRef.current;
      if (!dataTex) return;

      const data = dataTex.image.data;
      const size = grid;
      const state = mouseStateRef.current;

      // Relax distortion
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= relaxation;
        data[i * 4 + 1] *= relaxation;
      }

      // Apply mouse force
      const gridMouseX = size * state.x;
      const gridMouseY = size * state.y;
      const maxDist = size * mouse;

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distSq = (gridMouseX - i) ** 2 + (gridMouseY - j) ** 2;
          if (distSq < maxDist * maxDist && distSq > 0) {
            const index = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);
            data[index] += strength * 100 * state.vX * power;
            data[index + 1] -= strength * 100 * state.vY * power;
          }
        }
      }

      dataTex.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [grid, mouse, strength, relaxation, imageSrc]);

  return (
    <div
      ref={containerRef}
      className={`distortion-container ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GridDistortion;
