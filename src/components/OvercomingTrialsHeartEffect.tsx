import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flame, Waves } from 'lucide-react';
import { audioEngine } from '../audio/audioEngine';

interface FloatingParticle {
  id: number;
  x: number; // offset from center in px
  startY: number;
  driftX: number;
  scale: number;
  rotation: number;
  duration: number;
  delay: number;
  color: string;
  size: number;
}

export const OvercomingTrialsHeartEffect: React.FC = () => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    // Play celebratory success chime when overcoming trial animation triggers
    audioEngine.playSuccessChime();

    // Generate stream of floating hearts and light embers rising from center
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#38bdf8'];
    const initialParticles: FloatingParticle[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 320,
      startY: 40 + Math.random() * 80,
      driftX: (Math.random() - 0.5) * 160,
      scale: 0.6 + Math.random() * 0.8,
      rotation: (Math.random() - 0.5) * 60,
      duration: 3.5 + Math.random() * 3,
      delay: Math.random() * 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 14 + Math.floor(Math.random() * 22),
    }));

    setParticles(initialParticles);

    // Periodic new particles spawn for a continuous gentle upward stream
    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticle: FloatingParticle = {
          id: Date.now() + Math.random(),
          x: (Math.random() - 0.5) * 260,
          startY: 60 + Math.random() * 40,
          driftX: (Math.random() - 0.5) * 180,
          scale: 0.6 + Math.random() * 0.8,
          rotation: (Math.random() - 0.5) * 60,
          duration: 4 + Math.random() * 2.5,
          delay: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 16 + Math.floor(Math.random() * 20),
        };
        return [...prev.slice(-30), newParticle];
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden flex items-center justify-center select-none">
      {/* 1. Central Overcoming Trials Radiant Heart Symbol */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Soft Radial Ambient Energy Bloom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.85, 0.65],
            scale: [0.5, 1.3, 1.15],
          }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-rose-500/25 via-amber-400/20 to-cyan-400/20 blur-3xl pointer-events-none"
        />

        {/* Expanding Golden & Rose Wave Ring Ripples */}
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.3, 2.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.2,
            ease: 'easeOut',
          }}
          className="absolute w-44 h-44 rounded-full border border-rose-400/50 shadow-[0_0_25px_rgba(244,63,94,0.4)] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.3, 3.0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.2,
            delay: 1.2,
            ease: 'easeOut',
          }}
          className="absolute w-44 h-44 rounded-full border border-amber-300/40 shadow-[0_0_20px_rgba(251,191,36,0.3)] pointer-events-none"
        />

        {/* Primary Majestic Rising & Hovering Heart Emblem */}
        <motion.div
          initial={{ opacity: 0, y: 70, scale: 0.4 }}
          animate={{
            opacity: 1,
            y: [-10, -28, -10],
            scale: [1, 1.06, 1],
          }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeOut' },
            y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' },
          }}
          className="relative flex flex-col items-center"
        >
          {/* Heart Container with Glassmorphism & Sacred Glow */}
          <div className="relative p-4 sm:p-5 rounded-full bg-neutral-950/70 backdrop-blur-xl border border-rose-400/60 shadow-[0_0_40px_rgba(244,63,94,0.55),inset_0_0_20px_rgba(244,63,94,0.3)] flex items-center justify-center">
            {/* Pulsing Core Heart */}
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-rose-500 fill-rose-500 drop-shadow-[0_0_18px_rgba(244,63,94,0.9)] animate-pulse" />

            {/* Orbiting Sparkles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="absolute -top-1 right-1 w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
              <Sparkles className="absolute -bottom-1 left-1 w-3.5 h-3.5 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            </motion.div>
          </div>

          {/* Overcoming Trials Inscription Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
            className="mt-3.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-950/90 via-slate-900/90 to-amber-950/90 border border-rose-400/40 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center space-x-2 text-center"
          >
            <Waves className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-rose-200 uppercase drop-shadow-sm font-sans">
              Trial Overcome • Magkasama Lagi
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </motion.div>
        </motion.div>
      </div>

      {/* 2. Ascending Stream of Floating Hearts & Stardust Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0,
              y: p.startY,
              x: p.x,
              scale: p.scale * 0.4,
              rotate: p.rotation,
            }}
            animate={{
              opacity: [0, 0.95, 0.9, 0],
              y: -window.innerHeight * 0.7 - Math.random() * 100,
              x: p.x + p.driftX,
              scale: [p.scale * 0.4, p.scale, p.scale * 1.15, p.scale * 0.5],
              rotate: p.rotation + (p.driftX > 0 ? 35 : -35),
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute z-20 pointer-events-none drop-shadow-[0_0_12px_currentColor]"
            style={{ color: p.color }}
          >
            <Heart
              style={{ width: `${p.size}px`, height: `${p.size}px` }}
              className="fill-current"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
