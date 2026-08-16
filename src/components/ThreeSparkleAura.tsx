import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSparkleAuraProps {
  emotion?: string;
  isHovered?: boolean;
}

export const ThreeSparkleAura: React.FC<ThreeSparkleAuraProps> = ({
  emotion = 'happy',
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 220;
    const height = container.clientHeight || 220;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Create Floating 3D Sparkle Diamond Stars (like the reference anime art)
    const starCount = 18;
    const starMeshes: THREE.Mesh[] = [];

    // Create a 4-point diamond star geometry
    const starShape = new THREE.Shape();
    const outerRadius = 0.22;
    const innerRadius = 0.07;
    const points = 4;
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starGeo = new THREE.ShapeGeometry(starShape);

    // Warm golden, pastel pink, and cyan star materials
    const colors = [0xfacc15, 0xf472b6, 0x38bdf8, 0xfef08a, 0xfb923c];

    for (let i = 0; i < starCount; i++) {
      const col = colors[i % colors.length];
      const starMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.75 + Math.random() * 0.25,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(starGeo, starMat);
      // Position around character perimeter
      const radius = 1.4 + Math.random() * 1.2;
      const theta = (i / starCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      mesh.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius * 0.9,
        (Math.random() - 0.5) * 1.5
      );

      const s = 0.4 + Math.random() * 0.6;
      mesh.scale.set(s, s, s);

      mesh.userData = {
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        floatSpeed: 0.0015 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2,
        baseScale: s,
      };

      scene.add(mesh);
      starMeshes.push(mesh);
    }

    // 3. Stardust Particle Cloud
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 1.8;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = Math.sin(angle) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      particleScales[i] = Math.random();
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Rotate particle cloud gently
      particles.rotation.z = elapsedTime * 0.05;
      particles.rotation.y = elapsedTime * 0.03;

      // Animate Star Diamonds
      starMeshes.forEach((mesh) => {
        const u = mesh.userData;
        mesh.rotation.z += u.rotSpeed;

        // Floating bounce
        const hoverMultiplier = isHovered ? 1.5 : 1.0;
        mesh.position.y = u.baseY + Math.sin(elapsedTime * 2 + u.phase) * 0.15 * hoverMultiplier;
        mesh.position.x = u.baseX + Math.cos(elapsedTime * 1.5 + u.phase) * 0.08;

        // Twinkle scale
        const pulse = 1 + Math.sin(elapsedTime * 3 + u.phase) * 0.25;
        mesh.scale.set(u.baseScale * pulse, u.baseScale * pulse, u.baseScale * pulse);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 220;
      const h = container.clientHeight || 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isHovered, emotion]);

  return (
    <div
      ref={containerRef}
      className="absolute -inset-10 md:-inset-14 pointer-events-none z-0 flex items-center justify-center"
      aria-hidden="true"
    />
  );
};
