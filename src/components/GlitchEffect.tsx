import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { audioEngine } from '../audio/audioEngine';

interface GlitchEffectProps {
  onComplete: () => void;
  durationMs?: number;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  onComplete,
  durationMs = 3000,
}) => {
  useEffect(() => {
    audioEngine.playStaticGlitch();

    const timer = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-black/80 flex items-center justify-center"
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 scanline-overlay opacity-90"></div>

      {/* Chromatic RGB Split Bars */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-75">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, (i % 2 === 0 ? 1 : -1) * (20 + (i * 7) % 30), 0],
              opacity: [0.3, 0.9, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.15 + (i % 4) * 0.05,
              ease: 'easeInOut',
            }}
            className="w-full h-3 bg-gradient-to-r from-red-500/40 via-cyan-400/40 to-yellow-300/40 blur-[1px]"
          />
        ))}
      </div>

      {/* Center Static Glitch Text */}
      <div className="relative z-10 text-center font-mono">
        <motion.div
          animate={{
            skewX: [0, -15, 15, -5, 0],
            filter: [
              'drop-shadow(3px 0px 0px rgba(255,0,0,0.8)) drop-shadow(-3px 0px 0px rgba(0,255,255,0.8))',
              'drop-shadow(-4px 0px 0px rgba(255,0,0,0.8)) drop-shadow(4px 0px 0px rgba(0,255,255,0.8))',
              'drop-shadow(0px 0px 0px rgba(255,255,255,0))',
            ],
          }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="text-3xl md:text-5xl font-bold tracking-widest text-neutral-100"
        >
          TIMELINE SYNCHRONIZING...
        </motion.div>
        <p className="mt-3 text-cyan-300 text-sm tracking-widest uppercase">
          [ REALITY SHIFT // SEED: 2025.09.22 ]
        </p>
      </div>

      {/* Static Noise Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px] opacity-20 mix-blend-screen animate-pulse"></div>
    </motion.div>
  );
};
