import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { StoryPhase } from '../types';

interface ThreeSchoolBackdropProps {
  phase: StoryPhase;
  subStep?: number;
}

export const ThreeSchoolBackdrop: React.FC<ThreeSchoolBackdropProps> = ({
  phase,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.set(0, 18, 52);
    camera.lookAt(0, 10, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Atmospheric Lighting
    const isBrightVibe =
      phase === 'SCENE_1_BRIGHT_SHUFFLE' || phase === 'SCENE_1_CHATS_JOURNEY';

    const ambientLight = new THREE.AmbientLight(
      isBrightVibe ? 0x93c5fd : 0x1e1b4b,
      isBrightVibe ? 0.9 : 0.65
    );
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(
      isBrightVibe ? 0xfde047 : 0x38bdf8,
      isBrightVibe ? 1.4 : 1.1
    );
    moonLight.position.set(40, 60, 30);
    scene.add(moonLight);

    const warmCityGlow = new THREE.PointLight(0xf59e0b, 1.8, 120);
    warmCityGlow.position.set(0, 8, 15);
    scene.add(warmCityGlow);

    // Atmospheric Fog
    scene.fog = new THREE.FogExp2(
      isBrightVibe ? 0x0f172a : 0x050814,
      0.012
    );

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 3. Ground / Campus Courtyard Plane
    const groundGeo = new THREE.PlaneGeometry(160, 140, 32, 32);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isBrightVibe ? 0x1e293b : 0x0f172a,
      roughness: 0.85,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = 0;
    rootGroup.add(ground);

    // Central Cobblestone / Tiled Walkway
    const walkwayGeo = new THREE.PlaneGeometry(18, 100);
    walkwayGeo.rotateX(-Math.PI / 2);
    const walkwayMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6,
      metalness: 0.2,
    });
    const walkway = new THREE.Mesh(walkwayGeo, walkwayMat);
    walkway.position.set(0, 0.05, 10);
    rootGroup.add(walkway);

    // Grass Lawns on Left & Right
    const lawnGeo = new THREE.PlaneGeometry(45, 90);
    lawnGeo.rotateX(-Math.PI / 2);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: isBrightVibe ? 0x064e3b : 0x022c22,
      roughness: 0.9,
    });
    const leftLawn = new THREE.Mesh(lawnGeo, lawnMat);
    leftLawn.position.set(-34, 0.04, 10);
    rootGroup.add(leftLawn);

    const rightLawn = new THREE.Mesh(lawnGeo, lawnMat);
    rightLawn.position.set(34, 0.04, 10);
    rootGroup.add(rightLawn);

    // 4. Procedural Classroom Buildings & Architecture
    const buildingsGroup = new THREE.Group();
    rootGroup.add(buildingsGroup);

    const windowMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xfef08a }), // warm golden classroom light
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), // cyan dusk screen light
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 }), // amber study lamp
      new THREE.MeshBasicMaterial({ color: 0x1e293b }), // dark/unlit window
    ];

    const createBuilding = (
      x: number,
      z: number,
      w: number,
      h: number,
      d: number,
      wallColor = 0x1e293b
    ) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(x, h / 2, z);

      // Main Wall Structure
      const wallGeo = new THREE.BoxGeometry(w, h, d);
      const wallMat = new THREE.MeshStandardMaterial({
        color: wallColor,
        roughness: 0.75,
        metalness: 0.15,
      });
      const wall = new THREE.Mesh(wallGeo, wallMat);
      bGroup.add(wall);

      // Roof Overhang / Trim
      const roofGeo = new THREE.BoxGeometry(w + 1.2, 0.8, d + 1.2);
      const roofMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.5,
      });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = h / 2 + 0.4;
      bGroup.add(roof);

      // Window Grids on Front Facade
      const rows = Math.floor(h / 3.8);
      const cols = Math.floor(w / 3.4);
      const winW = 1.6;
      const winH = 2.0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const winGeo = new THREE.PlaneGeometry(winW, winH);
          // Pick window light variant
          const isLit = Math.random() > 0.35;
          const mat = isLit
            ? windowMaterials[Math.floor(Math.random() * 3)]
            : windowMaterials[3];
          const winMesh = new THREE.Mesh(winGeo, mat);
          winMesh.position.set(
            (c - (cols - 1) / 2) * (winW + 1.2),
            (r - (rows - 1) / 2) * (winH + 1.2),
            d / 2 + 0.05
          );
          bGroup.add(winMesh);
        }
      }

      return bGroup;
    };

    // Central High-School Main Academic Wing
    const mainBuilding = createBuilding(0, -25, 48, 22, 20, 0x1e2238);
    buildingsGroup.add(mainBuilding);

    // Clock Tower Centerpiece
    const towerGeo = new THREE.BoxGeometry(10, 32, 10);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x172033 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(0, 16, -22);
    buildingsGroup.add(tower);

    // Clock Face (Glowing Disc)
    const clockGeo = new THREE.CircleGeometry(2.4, 24);
    const clockMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const clock = new THREE.Mesh(clockGeo, clockMat);
    clock.position.set(0, 26, -16.9);
    buildingsGroup.add(clock);

    // Clock Hands
    const clockHandGeo = new THREE.BoxGeometry(0.2, 1.4, 0.05);
    const clockHandMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const clockHand = new THREE.Mesh(clockHandGeo, clockHandMat);
    clockHand.position.set(0, 26.5, -16.8);
    clockHand.rotation.z = -0.6;
    buildingsGroup.add(clockHand);

    // West Academic Building Wing
    const leftBuilding = createBuilding(-38, -12, 24, 18, 32, 0x182030);
    leftBuilding.rotation.y = Math.PI / 10;
    buildingsGroup.add(leftBuilding);

    // East Science/Arts Wing
    const rightBuilding = createBuilding(38, -12, 24, 18, 32, 0x182030);
    rightBuilding.rotation.y = -Math.PI / 10;
    buildingsGroup.add(rightBuilding);

    // Far Distant City Skyline Silhouettes (Backdrop)
    const skylineGroup = new THREE.Group();
    rootGroup.add(skylineGroup);

    for (let i = 0; i < 28; i++) {
      const bh = 18 + Math.random() * 38;
      const bw = 8 + Math.random() * 10;
      const bGeo = new THREE.BoxGeometry(bw, bh, 8);
      const bMat = new THREE.MeshBasicMaterial({
        color: 0x070b18,
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(
        (i - 14) * 8.5 + (Math.random() - 0.5) * 4,
        bh / 2 - 2,
        -65 - Math.random() * 20
      );
      skylineGroup.add(bMesh);

      // Tiny city window dots
      if (Math.random() > 0.3) {
        const dotGeo = new THREE.PlaneGeometry(0.6, 0.8);
        const dotMat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0xfef08a : 0x38bdf8,
        });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(bMesh.position.x, bh * 0.7, -60.8);
        skylineGroup.add(dot);
      }
    }

    // 5. Campus Courtyard Trees (Evergreens & Cherry Blossoms)
    const treesGroup = new THREE.Group();
    rootGroup.add(treesGroup);

    const treePositions = [
      { x: -14, z: 2, scale: 1.1, color: isBrightVibe ? 0xf472b6 : 0x065f46 },
      { x: 14, z: 2, scale: 1.1, color: isBrightVibe ? 0xf472b6 : 0x065f46 },
      { x: -18, z: 18, scale: 0.95, color: 0x047857 },
      { x: 18, z: 18, scale: 0.95, color: 0x047857 },
      { x: -28, z: -4, scale: 1.3, color: 0x064e3b },
      { x: 28, z: -4, scale: 1.3, color: 0x064e3b },
      { x: -32, z: 24, scale: 1.0, color: 0x065f46 },
      { x: 32, z: 24, scale: 1.0, color: 0x065f46 },
    ];

    const treeFoliageMeshes: THREE.Mesh[] = [];

    treePositions.forEach((tp) => {
      const tGroup = new THREE.Group();
      tGroup.position.set(tp.x, 0, tp.z);
      tGroup.scale.set(tp.scale, tp.scale, tp.scale);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 4.5, 8);
      const trunkMat = new THREE.MeshStandardMaterial({
        color: 0x271911,
        roughness: 0.9,
      });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 2.25;
      tGroup.add(trunk);

      // Multi-layer foliage spheres
      const folMat = new THREE.MeshStandardMaterial({
        color: tp.color,
        roughness: 0.8,
      });

      const fol1 = new THREE.Mesh(new THREE.DodecahedronGeometry(2.4, 1), folMat);
      fol1.position.y = 5.2;
      tGroup.add(fol1);
      treeFoliageMeshes.push(fol1);

      const fol2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.8, 1), folMat);
      fol2.position.set(0.6, 6.6, 0.4);
      tGroup.add(fol2);
      treeFoliageMeshes.push(fol2);

      treesGroup.add(tGroup);
    });

    // 6. Courtyard Lampposts with Glowing Orbs and Conical Volumetric Light
    const lampsGroup = new THREE.Group();
    rootGroup.add(lampsGroup);

    const lampPositions = [
      { x: -10, z: 28 },
      { x: 10, z: 28 },
      { x: -10, z: 8 },
      { x: 10, z: 8 },
      { x: -10, z: -12 },
      { x: 10, z: -12 },
    ];

    lampPositions.forEach((lp) => {
      const lGroup = new THREE.Group();
      lGroup.position.set(lp.x, 0, lp.z);

      // Post
      const postGeo = new THREE.CylinderGeometry(0.12, 0.18, 6.5, 8);
      const postMat = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        metalness: 0.8,
        roughness: 0.3,
      });
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.y = 3.25;
      lGroup.add(post);

      // Lamp Head
      const headGeo = new THREE.SphereGeometry(0.6, 16, 16);
      const headMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 6.6;
      lGroup.add(head);

      // Soft Light Source
      const pLight = new THREE.PointLight(0xfef08a, 0.9, 16);
      pLight.position.y = 6.6;
      lGroup.add(pLight);

      // Volumetric Light Cone
      const coneGeo = new THREE.ConeGeometry(3.5, 6.2, 16, 1, true);
      coneGeo.rotateX(Math.PI);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.y = 3.4;
      lGroup.add(cone);

      lampsGroup.add(lGroup);
    });

    // 7. Drifting Stardust & Night Atmosphere Particles
    const starCount = 180;
    const starGeo = new THREE.BufferGeometry();
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starCoords[i * 3] = (Math.random() - 0.5) * 160;
      starCoords[i * 3 + 1] = 12 + Math.random() * 55;
      starCoords[i * 3 + 2] = -40 - Math.random() * 80;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: isBrightVibe ? 0xfbcfe8 : 0xbae6fd,
      size: 1.4,
      transparent: true,
      opacity: 0.85,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 8. Mouse Parallax Reaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 9. Animation Render Loop
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth camera parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.035;
      currentMouseY += (targetMouseY - currentMouseY) * 0.035;

      camera.position.x = currentMouseX * 12;
      camera.position.y = 18 - currentMouseY * 4;
      camera.lookAt(0, 10 + currentMouseY * 2, 0);

      // Subtle tree sway
      treeFoliageMeshes.forEach((fol, idx) => {
        fol.rotation.z = Math.sin(elapsed * 1.5 + idx) * 0.04;
        fol.rotation.x = Math.cos(elapsed * 1.2 + idx) * 0.03;
      });

      // Drifting stars/sparks
      starPoints.rotation.y = elapsed * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-hidden"
    />
  );
};
