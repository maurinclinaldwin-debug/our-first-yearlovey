import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Crown, Heart } from 'lucide-react';
import { audioEngine } from '../audio/audioEngine';
import { ThreeSoulCanvas } from './ThreeSoulCanvas';
import { StoryPhase } from '../types';

export type CharacterEmotion =
  | 'idle'
  | 'happy'
  | 'inlove'
  | 'heart-eyes'
  | 'thinking'
  | 'sad'
  | 'cry'
  | 'angry'
  | 'surprised'
  | 'winking'
  | 'emotional'
  | 'gentle'
  | 'laugh'
  | 'excited'
  | 'serious';

export type CharacterPosition =
  | 'spinning-intro'
  | 'center'
  | 'top-right'
  | 'bottom-right'
  | 'top-left'
  | 'hidden';

interface SoulCharacter22Props {
  dialogue?: string;
  subtext?: string;
  emotion?: CharacterEmotion;
  position?: CharacterPosition;
  isClickable?: boolean;
  size?: 'normal' | 'compact' | 'large';
  currentPhase?: StoryPhase;
  subStep?: number;
}

interface FloatingHeartItem {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
  rotate: number;
  color: string;
}

export const SoulCharacter22: React.FC<SoulCharacter22Props> = ({
  dialogue,
  subtext,
  emotion = 'idle',
  position = 'center',
  isClickable = true,
  size = 'normal',
}) => {
  const [showHalo, setShowHalo] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [interactionTrigger, setInteractionTrigger] = useState(0);
  const [isBarbaSpawning, setIsBarbaSpawning] = useState(false);
  const [localHearts, setLocalHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeartItem[]>([]);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  const [displayedDialogue, setDisplayedDialogue] = useState(dialogue || '');
  const [isTyping, setIsTyping] = useState(false);

  const prevPositionRef = useRef(position);

  const isInLoveMode = emotion === 'inlove' || emotion === 'heart-eyes';

  // 1. Typewriter animation effect whenever dialogue updates
  useEffect(() => {
    if (!dialogue) {
      setDisplayedDialogue('');
      setIsTyping(false);
      return;
    }

    setDisplayedDialogue('');
    setIsTyping(true);

    let charIndex = 0;
    const targetText = dialogue;
    const totalChars = targetText.length;
    // Responsive typing cadence: fast and lively (~18-26ms/char)
    const charSpeed = Math.max(16, Math.min(26, Math.floor(1000 / Math.max(1, totalChars))));

    const interval = setInterval(() => {
      charIndex++;
      if (charIndex <= totalChars) {
        setDisplayedDialogue(targetText.slice(0, charIndex));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, charSpeed);

    return () => clearInterval(interval);
  }, [dialogue]);

  // 2. Mobile Screen Width Listener for Responsive Positioning
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Natural blinking interval loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4200 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // 4. Trigger celestial aura burst upon spawning
  useEffect(() => {
    if (prevPositionRef.current === 'hidden' && position !== 'hidden') {
      setIsBarbaSpawning(true);
      const timer = setTimeout(() => setIsBarbaSpawning(false), 1600);
      return () => clearTimeout(timer);
    }
    prevPositionRef.current = position;
  }, [position]);

  // 5. Continuous floating hearts spawning when emotion is inlove or heart-eyes
  useEffect(() => {
    if (!isInLoveMode || position === 'hidden') {
      setFloatingHearts([]);
      return;
    }

    const interval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 45;
      const newHeart: FloatingHeartItem = {
        id: Date.now() + Math.random(),
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.75 + 10,
        size: 14 + Math.random() * 16,
        driftX: (Math.random() - 0.5) * 50,
        driftY: -70 - Math.random() * 55,
        rotate: (Math.random() - 0.5) * 50,
        color: Math.random() > 0.5 ? '#fb7185' : '#f43f5e',
      };

      setFloatingHearts((prev) => [...prev.slice(-14), newHeart]);
    }, 320);

    return () => clearInterval(interval);
  }, [isInLoveMode, position]);

  // 6. Click Reaction
  const handleClick = (e: React.MouseEvent) => {
    if (!isClickable || position === 'hidden') return;
    audioEngine.playCharacterSpawn();
    setInteractionTrigger((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left - 12,
      y: e.clientY - rect.top - 12,
    };
    setLocalHearts((prev) => [...prev.slice(-4), newHeart]);
  };

  // Base scale calculation
  const sizeMultiplier = size === 'large' ? 1.15 : size === 'compact' ? 0.82 : 1.0;

  // Unified coordinate variants adjusted safely for mobile screens to avoid edge-clipping
  const positionVariants = {
    'spinning-intro': {
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: (isMobile ? 1.1 : 1.25) * sizeMultiplier,
      rotate: 0,
      opacity: 1,
    },
    'center': {
      top: '48%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: (isMobile ? 0.92 : 1.0) * sizeMultiplier,
      rotate: 0,
      opacity: 1,
    },
    'top-right': {
      top: isMobile ? '24%' : '30%',
      left: isMobile ? '68%' : '80%',
      x: '-50%',
      y: '-50%',
      scale: (isMobile ? 0.75 : 0.82) * sizeMultiplier,
      rotate: 2,
      opacity: 1,
    },
    'bottom-right': {
      top: isMobile ? '68%' : '72%',
      left: isMobile ? '68%' : '80%',
      x: '-50%',
      y: '-50%',
      scale: (isMobile ? 0.75 : 0.82) * sizeMultiplier,
      rotate: -2,
      opacity: 1,
    },
    'top-left': {
      top: isMobile ? '24%' : '30%',
      left: isMobile ? '32%' : '20%',
      x: '-50%',
      y: '-50%',
      scale: (isMobile ? 0.75 : 0.82) * sizeMultiplier,
      rotate: -2,
      opacity: 1,
    },
    'hidden': {
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: 0.001,
      rotate: 45,
      opacity: 0,
    },
  };

  // Orientation logic
  const isRightSide = position === 'top-right' || position === 'bottom-right';
  const isLeftSide = position === 'top-left';

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Barba.js Portal Stardust Aura Burst */}
      <AnimatePresence>
        {isBarbaSpawning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.4, 2.2, 3.2], rotate: 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-400/30 via-rose-500/20 to-amber-300/30 blur-3xl pointer-events-none z-30"
          />
        )}
      </AnimatePresence>

      {/* Main Gliding Character Node */}
      <motion.div
        variants={positionVariants}
        initial={position === 'hidden' ? 'hidden' : 'spinning-intro'}
        animate={position}
        transition={{
          type: 'spring',
          stiffness: 45,
          damping: 14,
          mass: 1.1,
          restDelta: 0.001,
        }}
        className="absolute flex flex-col items-center select-none"
      >
        <div className="flex flex-col items-center relative">
          {/* Dynamic Floating Celestial Thought Cloud */}
          <AnimatePresence mode="wait">
            {dialogue && position !== 'hidden' && (
              <motion.div
                key={dialogue}
                initial={{
                  opacity: 0,
                  y: isRightSide ? 0 : 8,
                  x: isRightSide ? 10 : isLeftSide ? -10 : 0,
                  scale: 0.92,
                }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-auto z-20 transition-all ${
                  isRightSide
                    ? 'sm:absolute sm:right-full sm:mr-4 sm:top-1/2 sm:-translate-y-1/2 sm:mb-0 mb-3 -translate-x-8 sm:translate-x-0 w-[82vw] max-w-[290px] sm:w-80 md:w-96 text-left'
                    : isLeftSide
                    ? 'sm:absolute sm:left-full sm:ml-4 sm:top-1/2 sm:-translate-y-1/2 sm:mb-0 mb-3 translate-x-8 sm:translate-x-0 w-[82vw] max-w-[290px] sm:w-80 md:w-96 text-left'
                    : 'mb-3 w-[84vw] max-w-[310px] sm:w-84 md:w-96 text-center'
                }`}
              >
                <div className="relative group">
                  {/* Outer Celestial Glow Aura */}
                  <div className="absolute -inset-1 rounded-[24px] sm:rounded-[34px] bg-gradient-to-r from-cyan-500/30 via-pink-500/20 to-sky-400/30 blur-md sm:blur-lg opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                  {/* Core Thought Cloud Container with responsive padding */}
                  <div
                    onClick={() => {
                      if (dialogue) {
                        setDisplayedDialogue(dialogue);
                        setIsTyping(false);
                      }
                    }}
                    className="relative w-full px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-[22px] sm:rounded-[30px] backdrop-blur-2xl bg-neutral-950/90 border border-cyan-300/45 shadow-[0_12px_40px_rgba(34,211,238,0.22)] text-neutral-100 cursor-pointer"
                  >
                    {/* Header: Thought Indicator Badge */}
                    <div
                      className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-[9px] sm:text-[11px] font-sans tracking-wide text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.35)] w-fit mb-1.5 ${
                        !isRightSide && !isLeftSide ? 'mx-auto' : ''
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs">
                        {isInLoveMode ? '💖' : '💭'}
                      </span>
                      <span className="font-semibold text-cyan-300">
                        {emotion === 'laugh'
                          ? "22's Giggles"
                          : emotion === 'inlove' || emotion === 'heart-eyes'
                          ? "22's Heartbeat"
                          : emotion === 'cry' || emotion === 'emotional'
                          ? "22's Deep Feelings"
                          : emotion === 'angry'
                          ? "22's Pout"
                          : emotion === 'sad'
                          ? "22's Longing"
                          : emotion === 'excited'
                          ? "22's Wonder"
                          : "22's Thoughts"}
                      </span>
                    </div>

                    {/* Instant Glanceable Typewriter Text Display */}
                    <p className="text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed text-white tracking-wide font-sans break-words drop-shadow-sm">
                      "{displayedDialogue}"
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
                          className="inline-block w-1.5 h-3.5 sm:h-4 ml-1 align-middle bg-cyan-400 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                        />
                      )}
                    </p>

                    {subtext && (
                      <p className="mt-1 text-[10px] sm:text-xs text-cyan-200/90 font-mono break-words">
                        {subtext}
                      </p>
                    )}
                  </div>

                  {/* Connected Thought Bubble Connector Orbs (Trailing Dots) */}
                  {isRightSide ? (
                    <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 flex-row items-center space-x-1 pointer-events-none">
                      <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border border-cyan-400/60 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></div>
                    </div>
                  ) : isLeftSide ? (
                    <div className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 flex-row-reverse items-center space-x-1 space-x-reverse pointer-events-none">
                      <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border border-cyan-400/60 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></div>
                    </div>
                  ) : (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-0.5 pointer-events-none">
                      <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border border-cyan-400/60 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></div>
                    </div>
                  )}

                  {/* Mobile thought trailing dots fallback for positioned avatar */}
                  {(isRightSide || isLeftSide) && (
                    <div className="sm:hidden absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-0.5 pointer-events-none">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-cyan-400/60"></div>
                      <div className="w-2 h-2 rounded-full bg-neutral-950 border border-cyan-400/50"></div>
                      <div className="w-1 h-1 rounded-full bg-cyan-300"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Three.js Character Canvas */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            className="relative flex flex-col items-center justify-center cursor-pointer group pointer-events-auto select-none"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-400/25 via-pink-400/20 to-amber-200/20 blur-3xl pointer-events-none animate-pulse"></div>

            {/* Interactive Click Floating Hearts Burst */}
            {localHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                animate={{ opacity: 0, scale: 1.6, y: -80 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute pointer-events-none text-rose-400 z-50 drop-shadow-[0_0_10px_rgba(244,63,94,0.9)]"
                style={{ left: h.x, top: h.y }}
              >
                <Heart className="w-6 h-6 fill-rose-400" />
              </motion.div>
            ))}

            {/* Continuous Ambient Floating Hearts for inlove & heart-eyes emotions */}
            {floatingHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  x: h.x,
                  y: h.y,
                  rotate: h.rotate,
                }}
                animate={{
                  opacity: [0, 0.95, 0.85, 0],
                  scale: [0.3, 1.15, 1.25, 0.6],
                  x: h.x + h.driftX,
                  y: h.y + h.driftY,
                  rotate: h.rotate + (h.driftX > 0 ? 25 : -25),
                }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="absolute pointer-events-none z-40 drop-shadow-[0_0_12px_rgba(244,63,94,0.85)]"
                style={{ color: h.color }}
              >
                <Heart
                  style={{ width: `${h.size}px`, height: `${h.size}px` }}
                  className="fill-current"
                />
              </motion.div>
            ))}

            {/* Core Three.js WebGL Character with 3D Face Mapping */}
            <ThreeSoulCanvas
              emotion={emotion}
              isHovered={isHovered}
              showHalo={showHalo}
              isBlinking={isBlinking}
              interactionTrigger={interactionTrigger}
            />

            {/* Identity Pill & Quick-Toggle Bar */}
            <div className="relative -mt-4 flex items-center space-x-1.5 z-30">
              <div className="px-2.5 py-0.5 rounded-full bg-neutral-900/90 border border-cyan-400/50 text-[9.5px] sm:text-[10px] font-mono tracking-widest text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center space-x-1.5">
                <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="font-bold">22</span>
              </div>

              {/* Star Halo Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHalo(!showHalo);
                  audioEngine.playTypeBlip();
                }}
                className={`p-1.5 rounded-full border text-[10px] font-mono transition-all cursor-pointer backdrop-blur-md ${
                  showHalo
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                    : 'bg-neutral-900/70 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                }`}
                title="Toggle Celestial Star Halo"
              >
                <Crown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
