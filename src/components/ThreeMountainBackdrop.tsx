import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { StoryPhase } from '../types';

interface ThreeMountainBackdropProps {
  phase: StoryPhase;
  subStep?: number;
}

export const ThreeMountainBackdrop: React.FC<ThreeMountainBackdropProps> = ({
  phase,
  subStep = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef(phase);
  const subStepRef = useRef(subStep);

  useEffect(() => {
    phaseRef.current = phase;
    subStepRef.current = subStep;
  }, [phase, subStep]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Three.js Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 45, 160);
    camera.lookAt(0, 25, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    sunLight.position.set(80, 120, 60);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.9);
    rimLight.position.set(-80, 60, -40);
    scene.add(rimLight);

    // Dynamic Fog
    scene.fog = new THREE.FogExp2(0x022c22, 0.0035);

    // 3. Procedural Mountain Height Function
    const noise2D = (x: number, y: number) => {
      return (
        Math.sin(x * 0.02) * Math.cos(y * 0.02) * 22 +
        Math.sin(x * 0.05 + 1.2) * Math.cos(y * 0.04 + 0.8) * 12 +
        Math.sin(x * 0.1 - 0.5) * Math.cos(y * 0.09) * 5 +
        Math.sin(x * 0.2) * Math.sin(y * 0.2) * 2.5
      );
    };

    // 4. Generate Mountain Mesh 1: Far Alpine Peaks
    const farWidth = 480;
    const farDepth = 320;
    const farSegments = width < 768 ? 64 : 96;
    const farGeo = new THREE.PlaneGeometry(farWidth, farDepth, farSegments, farSegments);
    farGeo.rotateX(-Math.PI / 2);

    const farPos = farGeo.attributes.position;
    const farColors: number[] = [];

    for (let i = 0; i < farPos.count; i++) {
      const vx = farPos.getX(i);
      const vz = farPos.getZ(i);

      // Edge falloff mask so mountains rise in the center/back and slope down
      const distFromCenter = Math.hypot(vx, vz + 40);
      const edgeFactor = Math.max(0, 1 - distFromCenter / 240);

      // Mountain ridge shaping
      const rawElevation = Math.pow(Math.abs(noise2D(vx, vz)), 1.35) * 2.2;
      const peakBoost = Math.max(0, Math.sin(vx * 0.015) * 35);
      const finalY = (rawElevation + peakBoost) * edgeFactor;

      farPos.setY(i, finalY);

      // Color based on elevation (Lush valley -> Forest Ridge -> Rocky Peak -> Snow Cap)
      if (finalY > 48) {
        // Crisp snow / sunlit summit
        farColors.push(0.96, 0.98, 1.0);
      } else if (finalY > 32) {
        // Slate alpine rock
        farColors.push(0.45, 0.55, 0.62);
      } else if (finalY > 16) {
        // Vibrant evergreen pine slope
        farColors.push(0.12, 0.48, 0.32);
      } else {
        // Lush vibrant valley
        farColors.push(0.08, 0.36, 0.22);
      }
    }

    farGeo.setAttribute('color', new THREE.Float32BufferAttribute(farColors, 3));
    farGeo.computeVertexNormals();

    const farMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true,
    });

    const farMountain = new THREE.Mesh(farGeo, farMat);
    farMountain.position.set(0, -10, -120);
    scene.add(farMountain);

    // 5. Generate Mountain Mesh 2: Midground Rolling Ridge
    const midGeo = new THREE.PlaneGeometry(380, 200, 50, 40);
    midGeo.rotateX(-Math.PI / 2);
    const midPos = midGeo.attributes.position;
    const midColors: number[] = [];

    for (let i = 0; i < midPos.count; i++) {
      const vx = midPos.getX(i);
      const vz = midPos.getZ(i);
      const dist = Math.hypot(vx, vz);
      const falloff = Math.max(0, 1 - dist / 180);
      const elevation = Math.abs(noise2D(vx + 45, vz - 30)) * 1.6 * falloff;
      midPos.setY(i, elevation);

      if (elevation > 24) {
        midColors.push(0.2, 0.58, 0.38);
      } else {
        midColors.push(0.06, 0.32, 0.2);
      }
    }
    midGeo.setAttribute('color', new THREE.Float32BufferAttribute(midColors, 3));
    midGeo.computeVertexNormals();

    const midMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });
    const midMountain = new THREE.Mesh(midGeo, midMat);
    midMountain.position.set(0, -16, -20);
    scene.add(midMountain);

    // 6. Floating Cloud Wisps / Valley Mist Layer
    const cloudsGroup = new THREE.Group();
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });

    for (let c = 0; c < 8; c++) {
      const cloudGeo = new THREE.DodecahedronGeometry(12 + Math.random() * 14, 1);
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      cloudMesh.scale.set(2.8 + Math.random() * 1.5, 0.5, 1.4);
      cloudMesh.position.set(
        (Math.random() - 0.5) * 280,
        14 + Math.random() * 18,
        -40 - Math.random() * 120
      );
      cloudsGroup.add(cloudMesh);
    }
    scene.add(cloudsGroup);

    // 7. Mouse / Parallax Interactivity
    let targetCamX = 0;
    let targetCamY = 45;
    let currentCamX = 0;
    let currentCamY = 45;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetCamX = normX * 18;
      targetCamY = 45 - normY * 8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation & Dynamic Atmospheric Palette Sync
    const startTime = performance.now();

    const animate = () => {
      const time = (performance.now() - startTime) * 0.001;

      // Slow cinematic camera float + mouse parallax
      currentCamX += (targetCamX - currentCamX) * 0.04;
      currentCamY += (targetCamY - currentCamY) * 0.04;
      camera.position.x = currentCamX + Math.sin(time * 0.2) * 4;
      camera.position.y = currentCamY + Math.cos(time * 0.25) * 1.5;
      camera.lookAt(0, 22, -40);

      // Clouds gently drifting across mountain canyons
      cloudsGroup.children.forEach((cloud, i) => {
        cloud.position.x += 0.06 * (i % 2 === 0 ? 1 : 0.7);
        if (cloud.position.x > 180) cloud.position.x = -180;
      });

      // Synchronize Environment Colors to Phase
      const currentPhase = phaseRef.current;
      const currentSubStep = subStepRef.current;
      const isSunset = currentPhase === 'GOLDEN_HOUR_INTRO' || currentPhase === 'WALK_INTRO_22';
      const isBrightNature = currentPhase === 'INTRO' || (currentPhase === 'SCENE_2_NATURE_PEAK' && currentSubStep <= 3);
      const isStormyNature = currentPhase === 'SCENE_2_NATURE_PEAK' && (currentSubStep === 4 || currentSubStep === 5 || currentSubStep === 7);
      const isReconcile = currentPhase === 'SCENE_2_NATURE_PEAK' && (currentSubStep === 6 || currentSubStep === 8 || currentSubStep === 9);
      const isCosmic = currentPhase === 'SCENE_FINAL_MUSIC_VIDEO';

      if (isSunset) {
        // Glowing Sunset Vibes: Amber / Rose Horizon
        sunLight.color.setHex(0xfbbf24);
        sunLight.intensity = 2.2;
        sunLight.position.set(100, 30, 40);
        ambientLight.color.setHex(0x7c2d12);
        ambientLight.intensity = 0.85;
        rimLight.color.setHex(0xf43f5e);
        if (scene.fog) {
          scene.fog.color.setHex(0x2d0612);
          (scene.fog as THREE.FogExp2).density = 0.004;
        }
        cloudMat.color.setHex(0xfdba74);
        cloudMat.opacity = 0.35;
      } else if (isBrightNature) {
        // Positive, Radiant, Sunlit Nature: Crisp Sky & Lush Forest
        sunLight.color.setHex(0xfef08a);
        sunLight.intensity = 2.4;
        sunLight.position.set(90, 140, 70);
        ambientLight.color.setHex(0x38bdf8);
        ambientLight.intensity = 0.95;
        rimLight.color.setHex(0x34d399);
        if (scene.fog) {
          scene.fog.color.setHex(0x064e3b);
          (scene.fog as THREE.FogExp2).density = 0.0028;
        }
        cloudMat.color.setHex(0xffffff);
        cloudMat.opacity = 0.28;
      } else if (isStormyNature) {
        // Dramatic Storm / Rainy Fog
        sunLight.color.setHex(0x60a5fa);
        sunLight.intensity = 1.0;
        ambientLight.color.setHex(0x1e293b);
        ambientLight.intensity = 0.6;
        rimLight.color.setHex(0x38bdf8);
        if (scene.fog) {
          scene.fog.color.setHex(0x0f172a);
          (scene.fog as THREE.FogExp2).density = 0.0055;
        }
        cloudMat.color.setHex(0x94a3b8);
        cloudMat.opacity = 0.45;
      } else if (isReconcile) {
        // Sunrise Breakthrough Hope
        sunLight.color.setHex(0xfef08a);
        sunLight.intensity = 2.6;
        ambientLight.color.setHex(0x0284c7);
        ambientLight.intensity = 0.9;
        rimLight.color.setHex(0xf472b6);
        if (scene.fog) {
          scene.fog.color.setHex(0x0369a1);
          (scene.fog as THREE.FogExp2).density = 0.003;
        }
        cloudMat.color.setHex(0xfde047);
        cloudMat.opacity = 0.35;
      } else if (isCosmic) {
        // Celestial Nebula Peaks
        sunLight.color.setHex(0xc084fc);
        sunLight.intensity = 2.0;
        ambientLight.color.setHex(0x1e1b4b);
        ambientLight.intensity = 0.8;
        rimLight.color.setHex(0x38bdf8);
        if (scene.fog) {
          scene.fog.color.setHex(0x09090b);
          (scene.fog as THREE.FogExp2).density = 0.0035;
        }
        cloudMat.color.setHex(0xe879f9);
        cloudMat.opacity = 0.3;
      } else {
        // Default Soft Ambient
        sunLight.intensity = 1.6;
        ambientLight.intensity = 0.7;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      renderer.forceContextLoss();
      farGeo.dispose();
      farMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      cloudMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
