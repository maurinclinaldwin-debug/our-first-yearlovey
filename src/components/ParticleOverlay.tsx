import React, { useEffect, useRef } from 'react';
import { StoryPhase } from '../types';

interface ParticleOverlayProps {
  phase: StoryPhase;
  subStep?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  life: number;
  maxLife: number;
  type: 'ember' | 'dust' | 'petal' | 'rain' | 'star' | 'mist' | 'heart';
  rotation: number;
  rotSpeed: number;
  phaseOffset: number;
}

export const ParticleOverlay: React.FC<ParticleOverlayProps> = ({ phase, subStep = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Determine particle configuration based on story phase and sub-step
    const isSunset = phase === 'GOLDEN_HOUR_INTRO' || phase === 'WALK_INTRO_22';
    const isNatureIntro = phase === 'INTRO';
    const isNaturePeak = phase === 'SCENE_2_NATURE_PEAK';
    const isMoodySchool = phase === 'SCENE_1_SCHOOL_MOODY' || phase === 'SCENE_1_FATE_REVEAL';
    const isJoyfulChats = phase === 'SCENE_1_BRIGHT_SHUFFLE' || phase === 'SCENE_1_CHATS_JOURNEY';
    const isArguments = phase === 'SCENE_3_ARGUMENTS';
    const isMusicVideo = phase === 'SCENE_FINAL_MUSIC_VIDEO';
    const isFloodScene = isNaturePeak && (subStep === 7 || subStep === 8 || subStep === 9);
    const isBreakupScene = isNaturePeak && (subStep === 4 || subStep === 5);

    // Particle count scale adapted for device width
    const particleCount = width < 768 ? 35 : 65;
    const particles: Particle[] = [];

    const sunsetColors = ['#f59e0b', '#fbbf24', '#f97316', '#ef4444', '#fde047', '#fed7aa'];
    const natureColors = ['#a7f3d0', '#6ee7b7', '#34d399', '#fef08a', '#d1fae5', '#38bdf8'];
    const moodyColors = ['#93c5fd', '#60a5fa', '#a5b4fc', '#818cf8', '#c7d2fe'];
    const cherryColors = ['#f472b6', '#fda4af', '#fecdd3', '#fbcfe8', '#fb7185', '#fef08a'];
    const cosmicColors = ['#38bdf8', '#c084fc', '#e879f9', '#f472b6', '#fef08a', '#ffffff'];
    const warmEmbers = ['#f97316', '#fb923c', '#fdba74', '#fbbf24', '#ea580c'];

    const createParticle = (initialRandomY = true): Particle => {
      let type: Particle['type'] = 'dust';
      let colors = natureColors;
      let vx = (Math.random() - 0.5) * 0.4;
      let vy = -0.3 - Math.random() * 0.5;
      let size = 1.5 + Math.random() * 3;
      let baseAlpha = 0.3 + Math.random() * 0.5;

      if (isSunset) {
        type = Math.random() > 0.3 ? 'ember' : 'dust';
        colors = sunsetColors;
        vx = (Math.random() - 0.5) * 0.6 + 0.2; // gentle rightward sunset breeze
        vy = -0.4 - Math.random() * 0.8; // rising warm embers
        size = 2 + Math.random() * 4;
        baseAlpha = 0.4 + Math.random() * 0.5;
      } else if (isFloodScene || isBreakupScene) {
        type = Math.random() > 0.4 ? 'rain' : 'mist';
        colors = ['#bae6fd', '#7dd3fc', '#38bdf8', '#e0f2fe'];
        vx = (Math.random() - 0.5) * 0.4 - 0.4; // diagonal wind
        vy = 2.5 + Math.random() * 3.5; // falling rain / mist
        size = 1 + Math.random() * 2.5;
        baseAlpha = 0.3 + Math.random() * 0.4;
      } else if (isNaturePeak || isNatureIntro) {
        type = Math.random() > 0.5 ? 'mist' : 'dust';
        colors = natureColors;
        vx = (Math.random() - 0.5) * 0.5;
        vy = -0.2 - Math.random() * 0.4;
        size = 2 + Math.random() * 3.5;
      } else if (isJoyfulChats) {
        type = Math.random() > 0.4 ? 'petal' : 'heart';
        colors = cherryColors;
        vx = (Math.random() - 0.5) * 0.8 + 0.3;
        vy = 0.4 + Math.random() * 0.7; // drifting downward petals
        size = 3 + Math.random() * 4;
        baseAlpha = 0.4 + Math.random() * 0.45;
      } else if (isMoodySchool) {
        type = 'dust';
        colors = moodyColors;
        vx = (Math.random() - 0.5) * 0.3;
        vy = -0.15 - Math.random() * 0.3;
        size = 1.5 + Math.random() * 3;
      } else if (isArguments) {
        type = 'ember';
        colors = warmEmbers;
        vx = (Math.random() - 0.5) * 0.4;
        vy = -0.2 - Math.random() * 0.5;
        size = 1.8 + Math.random() * 3;
      } else if (isMusicVideo) {
        type = Math.random() > 0.3 ? 'star' : 'dust';
        colors = cosmicColors;
        vx = (Math.random() - 0.5) * 0.4;
        vy = (Math.random() - 0.5) * 0.4;
        size = 1.5 + Math.random() * 3.5;
        baseAlpha = 0.5 + Math.random() * 0.5;
      }

      const color = colors[Math.floor(Math.random() * colors.length)];
      const maxLife = 120 + Math.random() * 180;

      return {
        x: Math.random() * width,
        y: initialRandomY ? Math.random() * height : vy < 0 ? height + 20 : -20,
        vx,
        vy,
        size,
        baseSize: size,
        color,
        alpha: 0,
        baseAlpha,
        life: initialRandomY ? Math.random() * maxLife : 0,
        maxLife,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        phaseOffset: Math.random() * Math.PI * 2,
      };
    };

    // Initialize particle pool
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Render each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += 1;

        if (p.life >= p.maxLife || p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
          particles[i] = createParticle(false);
          continue;
        }

        // Smooth fade-in and fade-out alpha lifecycle
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.baseAlpha;
        } else if (progress > 0.8) {
          p.alpha = ((1 - progress) / 0.2) * p.baseAlpha;
        } else {
          p.alpha = p.baseAlpha;
        }

        // Natural wavy movement
        p.x += p.vx + Math.sin(time * 1.5 + p.phaseOffset) * 0.3;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === 'rain') {
          // Drawing elongated rain drop streak
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 4, p.y + p.vy * 4);
          ctx.stroke();
        } else if (p.type === 'petal') {
          // Drawing cherry blossom petal
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.8, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'heart') {
          // Drawing subtle floating mini heart
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          const s = p.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.6, 0, s * 1.4);
          ctx.bezierCurveTo(s * 1.2, s * 0.6, s, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        } else if (p.type === 'star') {
          // Drawing 4-pointed diamond star
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          const s = p.size * (1 + Math.sin(time * 3 + p.phaseOffset) * 0.3);
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.8);
          ctx.lineTo(s * 0.4, -s * 0.4);
          ctx.lineTo(s * 1.8, 0);
          ctx.lineTo(s * 0.4, s * 0.4);
          ctx.lineTo(0, s * 1.8);
          ctx.lineTo(-s * 0.4, s * 0.4);
          ctx.lineTo(-s * 1.8, 0);
          ctx.lineTo(-s * 0.4, -s * 0.4);
          ctx.closePath();
          ctx.fill();
        } else {
          // Ember or glowing soft dust orb
          const glow = p.size * 2.5;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
          grad.addColorStop(0, p.color);
          grad.addColorStop(0.5, p.color);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase, subStep]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};
