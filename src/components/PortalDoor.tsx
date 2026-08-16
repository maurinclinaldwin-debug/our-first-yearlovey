import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Heart, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../audio/audioEngine';

interface PortalDoorProps {
  onReturnToUniverse?: () => void;
  onRestartStory: () => void;
}

export const PortalDoor: React.FC<PortalDoorProps> = ({
  onReturnToUniverse,
  onRestartStory,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  const universeUrl = 'https://ating-universe.vercel.app';

  const navigateToUniverse = () => {
    try {
      // If embedded in iframe or container, redirect the top/parent window to replace the site
      if (window.top && window.top !== window) {
        window.top.location.href = universeUrl;
        return;
      }
    } catch {
      // In case cross-origin security prevents accessing window.top, proceed with parent/self replace
    }

    try {
      if (window.parent && window.parent !== window) {
        window.parent.location.href = universeUrl;
        return;
      }
    } catch {
      // Fallback
    }

    try {
      window.location.replace(universeUrl);
    } catch {
      window.location.href = universeUrl;
    }
  };

  const handleDoorClick = () => {
    setIsWarping(true);
    audioEngine.playCharacterSpawn();

    // Trigger celebration stardust confetti
    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.75 },
        colors: ['#a855f7', '#ec4899', '#38bdf8', '#fbbf24', '#f43f5e'],
      });
    } catch {
      // ignore if confetti canvas unavailable
    }

    setTimeout(() => {
      if (onReturnToUniverse) {
        onReturnToUniverse();
      }
      navigateToUniverse();
    }, 1200);
  };

  return (
    <div className="relative py-12 flex flex-col items-center justify-center text-center">
      {/* Portal Ambient Aura Halo */}
      <div className="absolute w-80 h-96 rounded-full bg-gradient-to-t from-purple-600/30 via-cyan-400/20 to-transparent blur-3xl pointer-events-none"></div>

      {/* Main Celestial Portal Arch */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleDoorClick}
        animate={{
          scale: isWarping ? [1, 1.25, 0] : isHovered ? 1.05 : 1,
          rotate: isWarping ? [0, 15, -15, 0] : 0,
        }}
        transition={{ duration: isWarping ? 1.2 : 0.4 }}
        className="relative group cursor-pointer"
      >
        {/* Door Frame SVG / Arch */}
        <div className="w-60 h-84 md:w-68 md:h-96 rounded-t-full p-2.5 bg-gradient-to-t from-purple-900/90 via-cyan-800/85 to-amber-300/90 border-2 border-cyan-300/70 shadow-[0_0_55px_rgba(56,189,248,0.55)] backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden">
          {/* Inner Vortex Shimmer */}
          <div className="absolute inset-2 rounded-t-full bg-gradient-to-b from-neutral-950 via-indigo-950 to-purple-950 flex flex-col items-center justify-center overflow-hidden">
            {/* Spinning Stardust Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
              className="absolute w-72 h-72 rounded-full border border-dashed border-cyan-400/30 opacity-70"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              className="absolute w-48 h-48 rounded-full border border-dotted border-purple-400/40 opacity-80"
            />

            {/* Glowing Core / Heart Emblem */}
            <div className="relative z-10 flex flex-col items-center space-y-3 p-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.8)]"
              >
                <Heart className="w-7 h-7 text-white fill-white" />
              </motion.div>

              <div className="text-center space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                  Gate of Destiny
                </span>
                <h3 className="text-lg md:text-xl font-bold font-display text-neutral-100 group-hover:text-amber-200 transition-colors">
                  Return to Echoes Universe
                </h3>
                <p className="text-[11px] text-pink-300 font-mono tracking-wide">
                  ating-universe.vercel.app
                </p>
              </div>

              {/* Enter Button Pill */}
              <div className="mt-2 px-4 py-1.5 rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-300/50 text-xs font-semibold text-cyan-100 flex items-center space-x-1.5 group-hover:scale-105 transition-all">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Step Through Door</span>
              </div>
            </div>
          </div>
        </div>

        {/* Door Glow Pillar */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-4 bg-cyan-400/40 rounded-full blur-md group-hover:w-64 transition-all"></div>
      </motion.div>

      {/* Action Buttons Below */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {/* Direct Link to ating-universe.vercel.app */}
        <button
          onClick={() => {
            audioEngine.playCardSlide();
            navigateToUniverse();
          }}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 border border-pink-400/40 text-sm font-semibold text-white backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>Switch Dimension to ating-universe.vercel.app</span>
        </button>

        <button
          onClick={onRestartStory}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-sm font-medium text-neutral-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>Replay Journey From Start</span>
        </button>
      </div>
    </div>
  );
};
