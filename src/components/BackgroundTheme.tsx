import React from 'react';
import { motion } from 'motion/react';
import { StoryPhase } from '../types';
import { ThreeMountainBackdrop } from './ThreeMountainBackdrop';
import { ThreeSchoolBackdrop } from './ThreeSchoolBackdrop';

interface BackgroundThemeProps {
  phase: StoryPhase;
  subStep?: number;
}

export const BackgroundTheme: React.FC<BackgroundThemeProps> = ({ phase, subStep = 0 }) => {
  const isNaturePhase =
    phase === 'INTRO' ||
    phase === 'SCENE_2_NATURE_PEAK' ||
    phase === 'GOLDEN_HOUR_INTRO' ||
    phase === 'WALK_INTRO_22' ||
    phase === 'SCENE_FINAL_MUSIC_VIDEO';

  const isSchoolPhase =
    phase === 'SCENE_1_SCHOOL_MOODY' ||
    phase === 'SCENE_1_FATE_REVEAL' ||
    phase === 'SCENE_1_BRIGHT_SHUFFLE' ||
    phase === 'SCENE_1_CHATS_JOURNEY';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-neutral-950">
      {/* ========================================================================= */}
      {/* LAYER 1: Base Atmospheric Scene Gradients & Ambient Lighting Flares       */}
      {/* ========================================================================= */}

      {/* 1. INTRO: Emerald Dawn & Canopy Rays */}
      {phase === 'INTRO' && (
        <motion.div
          key="bg-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950 to-neutral-950"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(16,185,129,0.25),transparent)]" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />
          <div className="absolute top-10 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-400/15 blur-[100px]" />
        </motion.div>
      )}

      {/* 2. MONTAGE_8S: High Velocity Blitz Cinema Void */}
      {phase === 'MONTAGE_8S' && (
        <motion.div
          key="bg-montage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-slate-950 to-indigo-950"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2)_0,transparent_65%)]" />
        </motion.div>
      )}

      {/* 3. SIMULATION_BLACK: Cybernetic Void */}
      {phase === 'SIMULATION_BLACK' && (
        <motion.div
          key="bg-sim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-black flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
        </motion.div>
      )}

      {/* 4. GOLDEN_HOUR_INTRO & WALK_INTRO_22: Radiant Sunset */}
      {(phase === 'GOLDEN_HOUR_INTRO' || phase === 'WALK_INTRO_22') && (
        <motion.div
          key="bg-golden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-purple-950/70 via-orange-950/60 to-amber-950"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/25 via-orange-600/20 via-pink-700/15 to-transparent" />
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-t from-yellow-100 via-amber-300 to-orange-500 blur-2xl opacity-80 animate-pulse" />
        </motion.div>
      )}

      {/* 5. SCENE_1_SCHOOL_MOODY & FATE_REVEAL: Moody Indigo Campus & City */}
      {(phase === 'SCENE_1_SCHOOL_MOODY' || phase === 'SCENE_1_FATE_REVEAL') && (
        <motion.div
          key="bg-school-moody"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/90 to-neutral-950"
        >
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-amber-400/20 blur-2xl rounded-full" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </motion.div>
      )}

      {/* 6. SCENE_1_BRIGHT_SHUFFLE & SCENE_1_CHATS_JOURNEY: Joy, Pink & Gold Aura */}
      {(phase === 'SCENE_1_BRIGHT_SHUFFLE' || phase === 'SCENE_1_CHATS_JOURNEY') && (
        <motion.div
          key="bg-bright-joy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-br from-rose-950/80 via-indigo-950/90 to-slate-950"
        >
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-rose-500/25 rounded-full blur-[110px]" />
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[130px]" />
        </motion.div>
      )}

      {/* 7. SCENE_2_NATURE_PEAK: Alpine Mountain Atmosphere */}
      {phase === 'SCENE_2_NATURE_PEAK' && (
        <motion.div
          key={`bg-nature-peak-${subStep}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 transition-colors duration-1000 ${
            subStep <= 3
              ? 'bg-gradient-to-b from-sky-950/80 via-teal-950/80 to-neutral-950'
              : subStep === 4 || subStep === 5 || subStep === 7
              ? 'bg-gradient-to-b from-slate-950 via-slate-900/90 to-neutral-950'
              : 'bg-gradient-to-b from-sky-900/70 via-teal-900/75 to-neutral-950'
          }`}
        >
          {/* Alpine Sun / Mist accents */}
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-emerald-400/15 blur-[140px]" />
        </motion.div>
      )}

      {/* 8. SCENE_3_ARGUMENTS: Late Night Warm Intimate Room Vibe */}
      {phase === 'SCENE_3_ARGUMENTS' && (
        <motion.div
          key="bg-arguments"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-stone-950 via-neutral-950 to-zinc-950"
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-amber-600/20 rounded-full blur-[140px]" />
        </motion.div>
      )}

      {/* 9. SCENE_FINAL_MUSIC_VIDEO: Universe Echoes / Stardust Nebula */}
      {phase === 'SCENE_FINAL_MUSIC_VIDEO' && (
        <motion.div
          key="bg-universe-echoes"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-neutral-950"
        >
          <div className="absolute -top-24 left-1/3 w-[650px] h-[650px] bg-purple-600/25 rounded-full blur-[150px]" />
          <div className="absolute bottom-10 right-1/3 w-[550px] h-[550px] bg-cyan-500/25 rounded-full blur-[140px]" />
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* LAYER 2: 3D Procedural Three.js Canvas Backdrop (Mountains & School)      */}
      {/* ========================================================================= */}
      {isNaturePhase && (
        <div className="absolute inset-0 z-[2] opacity-90">
          <ThreeMountainBackdrop phase={phase} subStep={subStep} />
        </div>
      )}

      {isSchoolPhase && (
        <div className="absolute inset-0 z-[2] opacity-90">
          <ThreeSchoolBackdrop phase={phase} subStep={subStep} />
        </div>
      )}

      {/* Ambient Global Vignette for Text Legibility */}
      <div className="absolute inset-0 z-[5] bg-radial-gradient from-transparent via-black/15 to-black/65 pointer-events-none" />
    </div>
  );
};
