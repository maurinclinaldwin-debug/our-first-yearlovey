import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryPhase } from '../types';

interface BarbaTransitionCurtainProps {
  phase: StoryPhase;
}

/**
 * Barba.js-inspired Liquid Portal Curtain & Scene Transition
 * Smoothly morphs the viewport atmosphere between narrative chapters
 */
export const BarbaTransitionCurtain: React.FC<BarbaTransitionCurtainProps> = ({ phase }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`barba-curtain-${phase}`}
        initial={{ opacity: 0.6, scaleY: 1.05 }}
        animate={{ opacity: 0, scaleY: 1 }}
        exit={{ opacity: 0.5, scaleY: 1.05 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      >
        {/* Soft liquid light sweep */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-rose-500/5 to-transparent blur-2xl" />
        
        {/* Cinematic Vignette edge sweep */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </motion.div>
    </AnimatePresence>
  );
};
