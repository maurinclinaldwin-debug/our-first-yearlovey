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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-all duration-1000 ease-in-out select-none">
      {/* 3D Realistic Procedural Three.js Mountain Backdrop for Scenic Phases */}
      {isNaturePhase && (
        <ThreeMountainBackdrop phase={phase} subStep={subStep} />
      )}

      {/* 3D Realistic Procedural Three.js School & Campus Backdrop */}
      {isSchoolPhase && (
        <ThreeSchoolBackdrop phase={phase} subStep={subStep} />
      )}

      {/* ========================================================================= */}
      {/* 1. INTRO: Vibrant, Sunlit Positive Emerald Forest & Golden God-Rays      */}
      {/* ========================================================================= */}
      {phase === 'INTRO' && (
        <motion.div
          key="bg-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 bg-gradient-to-b from-emerald-800/80 via-teal-900/85 to-neutral-950"
        >
          {/* Radiant Sunlit Sky Blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-600/20 to-lime-300/15"></div>

          {/* Bright Volumetric Sunbeam God-Rays */}
          <div className="absolute -top-32 left-[10%] w-[700px] h-[950px] bg-gradient-to-b from-amber-100/30 via-emerald-300/20 to-transparent rotate-[16deg] blur-2xl transform-gpu"></div>
          <div className="absolute -top-20 right-[15%] w-[600px] h-[850px] bg-gradient-to-b from-yellow-200/25 via-teal-200/15 to-transparent -rotate-[14deg] blur-2xl transform-gpu"></div>

          {/* Glowing Sun Canopy Aura */}
          <div className="absolute top-10 left-1/3 w-[550px] h-[550px] rounded-full bg-emerald-400/25 blur-[120px]"></div>
          <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-300/20 blur-[100px]"></div>

          {/* Sun Dappled Tree Canopy Base Mist */}
          <div className="absolute bottom-0 w-full h-44 bg-gradient-to-t from-emerald-950 via-teal-900/40 to-transparent blur-md"></div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 2. MONTAGE_8S: High Velocity Blitz Cinema Void                            */}
      {/* ========================================================================= */}
      {phase === 'MONTAGE_8S' && (
        <motion.div
          key="bg-montage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-slate-950 to-indigo-950"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18)_0,transparent_65%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cyan-500/10 blur-xl animate-pulse"></div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 3. SIMULATION_BLACK: Deep Cybernetic Void                                 */}
      {/* ========================================================================= */}
      {phase === 'SIMULATION_BLACK' && (
        <motion.div
          key="bg-sim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-black flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"></div>
          <div className="w-96 h-96 rounded-full bg-cyan-900/10 blur-[100px]"></div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 4. GOLDEN_HOUR_INTRO & WALK_INTRO_22: Cinematic Sunset Vibes              */}
      {/* ========================================================================= */}
      {(phase === 'GOLDEN_HOUR_INTRO' || phase === 'WALK_INTRO_22') && (
        <motion.div
          key="bg-golden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950/85 via-orange-950/75 to-amber-950"
        >
          {/* Sunset Horizon Sky Blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-orange-600/30 via-pink-700/20 to-transparent"></div>

          {/* Anamorphic Sunset Horizon Flare Beam */}
          <div className="absolute bottom-28 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent blur-sm transform-gpu"></div>
          <div className="absolute bottom-28 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent blur-md transform-gpu"></div>

          {/* Radiant Sinking Sun Orb */}
          <div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-t from-yellow-100 via-amber-300 to-orange-500 blur-2xl opacity-90 animate-pulse"
            style={{ animationDuration: '6s' }}
          ></div>
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-white blur-xl opacity-80"></div>

          {/* Sunbeam Light Shafts radiating upwards */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_bottom,#fef08a_0%,#f97316_30%,transparent_70%)] opacity-35 blur-xl pointer-events-none"></div>

          {/* Warm Sunset Clouds Overhead with Rose & Gold Glow */}
          <div className="absolute top-12 left-1/4 w-[450px] h-28 bg-gradient-to-r from-rose-400/15 via-amber-300/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-24 right-1/4 w-[550px] h-36 bg-gradient-to-l from-orange-400/20 via-pink-400/15 to-transparent rounded-full blur-3xl"></div>

          {/* Warm Dark Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950/60"></div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 5. SCENE_1_SCHOOL_MOODY & FATE_REVEAL: Moody Indigo Campus & City          */}
      {/* ========================================================================= */}
      {(phase === 'SCENE_1_SCHOOL_MOODY' || phase === 'SCENE_1_FATE_REVEAL') && (
        <motion.div
          key="bg-school-moody"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-neutral-950"
        >
          {/* City / Building Skyline Silhouette */}
          <svg className="absolute bottom-0 w-full h-72 opacity-35" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <rect x="50" y="160" width="90" height="240" fill="#1e1b4b" />
            <rect x="180" y="90" width="120" height="310" fill="#0f172a" />
            <rect x="340" y="140" width="80" height="260" fill="#1e293b" />
            <rect x="460" y="60" width="140" height="340" fill="#09090b" />
            <rect x="640" y="180" width="100" height="220" fill="#1e1b4b" />
            <rect x="780" y="110" width="130" height="290" fill="#0f172a" />
            <rect x="950" y="150" width="90" height="250" fill="#1e293b" />
            <rect x="1070" y="80" width="110" height="320" fill="#09090b" />
          </svg>

          {/* Warm Streetlight & Classroom Windows Glow */}
          <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-amber-400/15 blur-2xl rounded-full"></div>
          <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-indigo-400/15 blur-2xl rounded-full"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 6. SCENE_1_BRIGHT_SHUFFLE & SCENE_1_CHATS_JOURNEY: Joy, Pink & Gold Aura  */}
      {/* ========================================================================= */}
      {(phase === 'SCENE_1_BRIGHT_SHUFFLE' || phase === 'SCENE_1_CHATS_JOURNEY') && (
        <motion.div
          key="bg-bright-joy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-br from-rose-950/70 via-indigo-950 to-slate-950"
        >
          {/* Warm Pink & Gold Ambient Flares */}
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-rose-500/25 rounded-full blur-[110px] pointer-events-none"></div>
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[130px] pointer-events-none"></div>

          {/* Floating Cherry Blossom Petals Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#fda4af_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 7. SCENE_2_NATURE_PEAK: Dynamic Bright / Emotional Mountain Backdrop      */}
      {/* ========================================================================= */}
      {phase === 'SCENE_2_NATURE_PEAK' && (
        <motion.div
          key={`bg-nature-peak-${subStep}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 transition-colors duration-1000 ${
            // Step 0-3: Positive, Vibrant Sunlit Alpine Daylight
            subStep <= 3
              ? 'bg-gradient-to-b from-sky-800/80 via-teal-900/85 to-neutral-950'
              : // Step 4-5 & 7: Emotional Deep Blue & Rain
              subStep === 4 || subStep === 5 || subStep === 7
              ? 'bg-gradient-to-b from-slate-950 via-slate-900/90 to-neutral-950'
              : // Step 6, 8, 9: Radiant Sunrise Breakthrough Hope
                'bg-gradient-to-b from-sky-700/80 via-teal-800/75 to-neutral-950'
          }`}
        >
          {/* Positive Bright Sun / Sky Overlay for Steps 0-3 & 6-9 */}
          {subStep <= 3 && (
            <>
              {/* Sun God Rays in Alpine Morning */}
              <div className="absolute -top-10 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-300/20 blur-[130px]"></div>
              <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-cyan-300/25 blur-[120px]"></div>
            </>
          )}

          {/* Storm / Flood Mist for Step 7 */}
          {subStep === 7 && (
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/60 via-slate-900/50 to-transparent blur-lg animate-pulse"></div>
          )}

          {/* Hope / Breakthrough Gold Glow for Step 6, 8, 9 */}
          {(subStep === 6 || subStep >= 8) && (
            <div className="absolute -top-10 left-1/3 w-[650px] h-[650px] rounded-full bg-amber-400/25 blur-[140px]"></div>
          )}

          {/* Mountain Valley Fog Accent */}
          <div className="absolute bottom-0 w-full h-44 bg-gradient-to-t from-neutral-950 via-teal-950/40 to-transparent blur-md"></div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 8. SCENE_3_ARGUMENTS: Late Night Warm Intimate Room Vibe                  */}
      {/* ========================================================================= */}
      {phase === 'SCENE_3_ARGUMENTS' && (
        <motion.div
          key="bg-arguments"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-stone-950 via-neutral-950 to-zinc-950"
        >
          {/* Warm Cozy Hearth Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-amber-600/15 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-rose-700/10 rounded-full blur-[100px]"></div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 9. SCENE_FINAL_MUSIC_VIDEO: Universe Echoes / Stardust Nebula             */}
      {/* ========================================================================= */}
      {phase === 'SCENE_FINAL_MUSIC_VIDEO' && (
        <motion.div
          key="bg-universe-echoes"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-neutral-950"
        >
          {/* Cosmic Nebula Swirls */}
          <div className="absolute -top-24 left-1/3 w-[650px] h-[650px] bg-purple-600/25 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-10 right-1/3 w-[550px] h-[550px] bg-cyan-500/25 rounded-full blur-[140px]"></div>
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[120px]"></div>

          {/* Stardust Grid Sparkles */}
          <div className="absolute inset-0 bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:28px_28px] opacity-40"></div>
        </motion.div>
      )}
    </div>
  );
};
