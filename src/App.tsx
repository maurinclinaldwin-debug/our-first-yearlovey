import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryPhase, MemoryItem, CharacterEmotion } from './types';
import { INITIAL_MEMORIES } from './data/memories';
import { audioEngine } from './audio/audioEngine';
import { SoulCharacter22 } from './components/SoulCharacter22';
import { BackgroundTheme } from './components/BackgroundTheme';
import { ParticleOverlay } from './components/ParticleOverlay';
import { GlitchEffect } from './components/GlitchEffect';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { MemoryCard } from './components/MemoryCard';
import { AutoScrollPhotoGrid } from './components/AutoScrollPhotoGrid';
import { VideoPlayerSection } from './components/VideoPlayerModal';
import { PortalDoor } from './components/PortalDoor';
import { ChapterNav } from './components/ChapterNav';
import { BarbaTransitionCurtain } from './components/BarbaTransitionCurtain';
import { OvercomingTrialsHeartEffect } from './components/OvercomingTrialsHeartEffect';
import { preloadImage, preloadImages } from './utils/imageLoader';
import { useLenis } from './utils/useLenis';
import { 
  Sparkles, Heart, Compass, Volume2, 
  ArrowRight, Play, RefreshCw, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Initialize Lenis smooth scroll engine
  useLenis();

  // Story state machine
  const [phase, setPhase] = useState<StoryPhase>('INTRO');
  const [isChapterNavOpen, setIsChapterNavOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Dynamic 22 Character Dialogue & Subtext
  const [characterDialogue, setCharacterDialogue] = useState<string | null>(null);
  const [characterSubtext, setCharacterSubtext] = useState<string | null>(null);
  const [characterEmotion, setCharacterEmotion] = useState<CharacterEmotion>('happy');
  const [characterPosition, setCharacterPosition] = useState<'center' | 'top-right' | 'bottom-right' | 'top-left' | 'spinning-intro' | 'hidden'>('hidden');

  // Sub-step index for sequence scenes
  const [subStep, setSubStep] = useState(0);

  // Helper to pick 10 random shuffle memories for the montage
  const getRandomShuffleMemories = (count = 10): MemoryItem[] => {
    const shuffleMems = INITIAL_MEMORIES.filter((m) => m.category === 'shuffle');
    if (shuffleMems.length === 0) {
      return INITIAL_MEMORIES.filter((m) => m.category === 'montage').slice(0, count);
    }
    const shuffled = [...shuffleMems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Montage state (8s rapid blitz of 10 random shuffle images)
  const [montageMemories, setMontageMemories] = useState<MemoryItem[]>(() => getRandomShuffleMemories(10));
  const [montageIndex, setMontageIndex] = useState(0);

  // Eagerly preload all memory image assets into browser cache immediately
  useEffect(() => {
    const allUrls = INITIAL_MEMORIES.map((m) => m.driveUrl || m.localPath || m.fallbackUrl).filter(Boolean) as string[];
    preloadImages(allUrls);
  }, []);

  // Preload currently selected montage images
  useEffect(() => {
    const urls = montageMemories.map((m) => m.driveUrl || m.localPath || m.fallbackUrl).filter(Boolean) as string[];
    preloadImages(urls);
  }, [montageMemories]);

  // Terminal Typing simulation state
  const [simLines, setSimLines] = useState<string[]>([]);
  const [isSimFinished, setIsSimFinished] = useState(false);

  // Palagi Music Player Bar UI visibility (hidden initially, shown after clicking "Look Back")
  const [showPalagiMusicUi, setShowPalagiMusicUi] = useState(false);

  // Fast image resolution (prefers Google Drive CDN URL, then local path, then fallback)
  const getImage = (id: string, fallback: string) => {
    const mem = INITIAL_MEMORIES.find((m) => m.id === id);
    return mem?.driveUrl || mem?.localPath || fallback;
  };

  // --- Phase Handlers ---

  // 1. Start "Look Back" Montage (picks a fresh random 10 from shuffle, reveals Palagi UI)
  const handleStartLookBack = () => {
    audioEngine.playWhoosh();
    setShowPalagiMusicUi(true);
    audioEngine.playMusic();
    setIsPlayingMusic(true);
    setMontageMemories(getRandomShuffleMemories(10));
    setPhase('MONTAGE_8S');
    setMontageIndex(0);
  };

  // 2. 8s Montage Interval Timer
  useEffect(() => {
    if (phase !== 'MONTAGE_8S') return;

    const maxIdx = Math.max(0, montageMemories.length - 1);

    // Montage has 10 images across 8 seconds (~800ms per image)
    const interval = setInterval(() => {
      setMontageIndex((prev) => {
        if (prev >= maxIdx) {
          clearInterval(interval);
          // Transition to Cinematic Black Simulation
          setTimeout(() => {
            setPhase('SIMULATION_BLACK');
          }, 400);
          return maxIdx;
        }
        audioEngine.playCardSlide();
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [phase, montageMemories.length]);

  // 3. Simulation Terminal Typing Sequence
  useEffect(() => {
    if (phase !== 'SIMULATION_BLACK') return;

    setSimLines([]);
    setIsSimFinished(false);

    const simulationScript = [
      '>> INITIALIZING NEURAL MEMORY TIMELINE...',
      '>> ALLOCATING COORDINATES: CEBU // 2025.05 - 2026.08',
      '>> RETRIEVING EMOTIONAL RESONANCE VECTORS...',
      '>> SYNTHESIZING LAUGHTER, LATE NIGHT CALLS & STORMS...',
      '>> [ SIMULATED WORLD SUCCESS ]',
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < simulationScript.length) {
        setSimLines((prev) => [...prev, simulationScript[currentIdx]]);
        audioEngine.playTypeBlip();
        currentIdx++;
      } else {
        clearInterval(interval);
        audioEngine.playSuccessChime();
        setIsSimFinished(true);
        setTimeout(() => {
          setPhase('GOLDEN_HOUR_INTRO');
        }, 1800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [phase]);

  // 4. "Walk With Me" Trigger (Spawns 22, plays Palagi song, starts School section)
  const handleWalkWithMe = () => {
    audioEngine.playMusic();
    setIsPlayingMusic(true);
    setPhase('WALK_INTRO_22');
    setCharacterPosition('spinning-intro');
    setCharacterEmotion('excited');
    audioEngine.playCharacterSpawn();

    // 22 Character sequence
    setTimeout(() => {
      setCharacterPosition('center');
      setCharacterDialogue('I am 22');
      setCharacterSubtext('Your guide & heart representative ✨');
      setCharacterEmotion('happy');
    }, 2200);

    setTimeout(() => {
      setCharacterDialogue('Gagabayin kita sa iyung pag lalakbay');
      setCharacterEmotion('gentle');
    }, 4500);

    setTimeout(() => {
      setCharacterDialogue('Dont worry, andito lang ako');
      setCharacterEmotion('winking');
    }, 6800);

    // Transition to Section 1: School & Cities (Moody)
    setTimeout(() => {
      setPhase('SCENE_1_SCHOOL_MOODY');
      setSubStep(0);
    }, 9200);
  };

  // 5. Scene 1: School & Cities (Moody) Flow
  useEffect(() => {
    if (phase !== 'SCENE_1_SCHOOL_MOODY') return;

    setCharacterPosition('center');
    setCharacterDialogue('So dito pala nag simula ang lahat');
    setCharacterEmotion('thinking');

    const t1 = setTimeout(() => {
      setCharacterDialogue('Ganda no hahahah');
      setCharacterEmotion('happy');
    }, 3000);

    const t2 = setTimeout(() => {
      setCharacterPosition('top-right');
      setCharacterDialogue('Tignan nga natin');
      setCharacterEmotion('gentle');
      setSubStep(1); // Show 2 school group photos
    }, 6000);

    // Narrative lines with 3s intervals and deeply responsive emotional expressions
    const storyLines: { line: string; emotion: CharacterEmotion }[] = [
      { line: 'A moment where everything is silent....', emotion: 'thinking' },
      { line: 'Amidst in the crowds ', emotion: 'gentle' },
      { line: 'Amidst in Academics ', emotion: 'serious' },
      { line: "There's an Admiration ", emotion: 'inlove' },
      { line: 'A Silent Admiration', emotion: 'inlove' },
      { line: 'Nothing Special', emotion: 'gentle' },
      { line: 'Nothing Fancy', emotion: 'gentle' },
      { line: 'Just 2 people silently living there own worlds ', emotion: 'sad' },
      { line: "Knowing that, there's no chance", emotion: 'sad' },
      { line: 'No chance of saying it out loud ', emotion: 'cry' },
      { line: 'No chance of confession and expression', emotion: 'cry' },
    ];

    const timeouts: NodeJS.Timeout[] = [t1, t2];

    storyLines.forEach((item, index) => {
      const t = setTimeout(() => {
        setCharacterDialogue(item.line);
        setCharacterEmotion(item.emotion);
        audioEngine.playCardSlide();
      }, 9000 + index * 3000);
      timeouts.push(t);
    });

    // After last line, hide photos and pause 4 seconds
    const totalStoryDuration = 9000 + storyLines.length * 3000;
    const tEnd = setTimeout(() => {
      setSubStep(2); // Hide photos
      setCharacterDialogue(null);
      // After 4 seconds pause, transition to Fate Reveal
      setTimeout(() => {
        setPhase('SCENE_1_FATE_REVEAL');
      }, 4000);
    }, totalStoryDuration);
    timeouts.push(tEnd);

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [phase]);

  // 6. Scene 1: Fate Reveal & Glitch Transition
  useEffect(() => {
    if (phase !== 'SCENE_1_FATE_REVEAL') return;

    setCharacterPosition('center');
    setCharacterDialogue('YET, FATE? HAS DIFFERENT PURPOSE');
    setCharacterEmotion('serious');

    const t1 = setTimeout(() => {
      setCharacterDialogue('FATE? HAS ITS OWN PLAN');
      setCharacterEmotion('serious');
    }, 3200);

    const t2 = setTimeout(() => {
      setCharacterDialogue('Not cinematic, or dramatic');
      setCharacterEmotion('gentle');
    }, 6400);

    const t3 = setTimeout(() => {
      setCharacterDialogue('Isang tadhana lamang, na tayu ay pinagtagpo');
      setCharacterEmotion('inlove');
    }, 9600);

    // Trigger Static Glitch
    const tGlitch = setTimeout(() => {
      setPhase('STATIC_GLITCH');
    }, 13000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tGlitch);
    };
  }, [phase]);

  // 7. Bright Shuffle (15 images fast reel across 4 seconds)
  const [shuffleIndex, setShuffleIndex] = useState(0);
  useEffect(() => {
    if (phase !== 'SCENE_1_BRIGHT_SHUFFLE') return;

    setCharacterPosition('top-right');
    setCharacterDialogue('Look at all these sparks! ✨');
    setCharacterEmotion('laugh');
    setShuffleIndex(0);

    const interval = setInterval(() => {
      setShuffleIndex((prev) => {
        if (prev >= 14) {
          clearInterval(interval);
          // 4 seconds pause, then transition to Chat Journey
          setTimeout(() => {
            setPhase('SCENE_1_CHATS_JOURNEY');
            setSubStep(0);
          }, 4000);
          return 14;
        }
        audioEngine.playCardSlide();
        return prev + 1;
      });
    }, 260);

    return () => clearInterval(interval);
  }, [phase]);

  // 8. Scene 1: Chats & Early Journey Storytelling
  useEffect(() => {
    if (phase !== 'SCENE_1_CHATS_JOURNEY') return;

    setCharacterPosition('top-right');

    const chatScript = [
      {
        step: 0,
        dialogue: 'Dito pala nag simula conversation natin hahahha',
        emotion: 'laugh' as const,
        duration: 3500,
      },
      {
        step: 1,
        dialogue: 'As the days go on... Fast forward na ata hahhaha',
        emotion: 'laugh' as const,
        duration: 3500,
      },
      {
        step: 2,
        dialogue: 'Yung lakbay ng sanaysay ang dahilan haha',
        emotion: 'laugh' as const,
        duration: 3500,
      },
      {
        step: 3,
        dialogue: 'Cute nito, dito talaga nag start journey natin haha',
        emotion: 'inlove' as const,
        duration: 3200,
      },
      {
        step: 3,
        dialogue: 'Jamaica? Maica? love? Lovey? 💕 hahahah',
        emotion: 'inlove' as const,
        duration: 3200,
      },
      {
        step: 4,
        dialogue: 'I love you lovey heheh ❤️',
        emotion: 'inlove' as const,
        duration: 3000,
      },
      {
        step: 5,
        dialogue: 'Fast forward tayo nang konti hahah',
        emotion: 'happy' as const,
        duration: 2800,
      },
      {
        step: 6,
        dialogue: 'Cute mo dito hahah, reed haha',
        emotion: 'winking' as const,
        duration: 3000,
      },
      {
        step: 7,
        dialogue: 'Hahahahha ang saya balikan!',
        emotion: 'laugh' as const,
        duration: 2800,
      },
      {
        step: 8,
        dialogue: 'Ang ganda mo talaga dito heheh ✨',
        emotion: 'inlove' as const,
        duration: 3200,
      },
      {
        step: 9,
        dialogue: 'Ito pa hahahha',
        emotion: 'laugh' as const,
        duration: 2800,
      },
      {
        step: 10,
        dialogue: 'Yun na yun, nung school starting days natin!',
        emotion: 'happy' as const,
        duration: 3200,
      },
      {
        step: 11,
        dialogue: 'Change theme muna tayo sa nature at bundok... 🏔️',
        emotion: 'gentle' as const,
        duration: 3200,
      },
      {
        step: 11,
        dialogue: 'Mga peak experiences natin hahah, ready ka na ba? 🌿',
        emotion: 'gentle' as const,
        duration: 999999, // Waits for user click "Change experience"
      },
    ];

    let currentTimeout: NodeJS.Timeout;
    const runStep = (idx: number) => {
      if (idx >= chatScript.length) return;
      const current = chatScript[idx];
      setSubStep(current.step);
      setCharacterDialogue(current.dialogue);
      setCharacterEmotion(current.emotion);
      audioEngine.playCardSlide();

      if (idx < chatScript.length - 1) {
        currentTimeout = setTimeout(() => {
          runStep(idx + 1);
        }, current.duration);
      }
    };

    runStep(0);
    return () => clearTimeout(currentTimeout);
  }, [phase]);

  // 9. Scene 2: Nature, Mountains, Peak Experiences Flow
  useEffect(() => {
    if (phase !== 'SCENE_2_NATURE_PEAK') return;

    setCharacterPosition('top-right');

    const natureScript = [
      {
        step: 0,
        dialogue: 'Explore naman tayo sa kabundukan heheh 🏔️',
        emotion: 'excited' as const,
        duration: 3000,
      },
      {
        step: 0,
        dialogue: 'Dito yung mga peak experiences natin!',
        emotion: 'excited' as const,
        duration: 3200,
      },
      {
        step: 1, // Drop 2 photos from Cuanus Falls
        dialogue: 'First date sa Cuanus Falls hehe... Babalikan natin to',
        emotion: 'inlove' as const,
        duration: 4500,
      },
      {
        step: 1,
        dialogue: 'Sobrang sarap ng hangin at tubig dito... napaka-peaceful ✨',
        emotion: 'heart-eyes' as const,
        duration: 4800,
      },
      {
        step: 2, // Drop 5 photos from Gullas Mountain Hangout
        dialogue: 'Mga pics sa Gullas Drive pauwi galing school haha',
        emotion: 'happy' as const,
        duration: 4800,
      },
      {
        step: 2,
        dialogue: 'Yung overlooking view at kulitan natin sa daan... the best! 🏍️🏔️',
        emotion: 'heart-eyes' as const,
        duration: 5200,
      },
      {
        step: 3, // Fast forward graduation
        dialogue: 'Fast forward sa Graduation natin 🎓',
        emotion: 'thinking' as const,
        duration: 2800,
      },
      {
        step: 3,
        dialogue: 'Sayang walang pic, pero super proud pa rin!',
        emotion: 'happy' as const,
        duration: 3200,
      },
      {
        step: 4, // Break up message reflection
        dialogue: 'May 30, 2025...',
        emotion: 'sad' as const,
        duration: 2500,
      },
      {
        step: 4,
        dialogue: 'Ito ata yung pinakamabigat na araw sa lahat.',
        emotion: 'sad' as const,
        duration: 3200,
      },
      {
        step: 5,
        dialogue: 'Naiintindihan ko naman lovey hehhhehe...',
        emotion: 'cry' as const,
        duration: 3000,
      },
      {
        step: 5,
        dialogue: 'Hindi lang makaget-over nung gabing yun... Pero...',
        emotion: 'cry' as const,
        duration: 3400,
      },
      {
        step: 6, // Pangilatan reconciliation
        dialogue: 'I’m so glad nag-yes ka na magkita tayo...',
        emotion: 'inlove' as const,
        duration: 3200,
      },
      {
        step: 6,
        dialogue: 'Thankful ako lovey na lumaban ka...',
        emotion: 'inlove' as const,
        duration: 3000,
      },
      {
        step: 6,
        dialogue: 'Wala kang binigay na suko. Thank you. ❤️',
        emotion: 'inlove' as const,
        duration: 3500,
      },
      {
        step: 7, // Flood scene reflection
        dialogue: 'Grabe ito talaga... Pinaka-kaba at di malilimutan 🌧️',
        emotion: 'thinking' as const,
        duration: 3500,
      },
      {
        step: 7,
        dialogue: 'First time nag-intervene ang bagyo at baha hahah!',
        emotion: 'thinking' as const,
        duration: 3500,
      },
      {
        step: 8,
        dialogue: 'Ang baha, parang mga pagsubok sa buhay...',
        emotion: 'gentle' as const,
        duration: 3200,
      },
      {
        step: 8,
        dialogue: 'Nasa atin kung paano lalampasan at haharapin.',
        emotion: 'gentle' as const,
        duration: 3200,
      },
      {
        step: 8,
        dialogue: 'Walang sisihan, kalmado lang tayong dalawa...',
        emotion: 'gentle' as const,
        duration: 3000,
      },
      {
        step: 8,
        dialogue: 'Overcoming it together hand in hand 🌊',
        emotion: 'inlove' as const,
        duration: 3400,
      },
      {
        step: 9,
        dialogue: 'Unexpected trials...',
        emotion: 'inlove' as const,
        duration: 2500,
      },
      {
        step: 9,
        dialogue: 'Hindi natin kailangan mag-isa sa bawat bagyo.',
        emotion: 'inlove' as const,
        duration: 3000,
      },
      {
        step: 9,
        dialogue: 'We have each other lovey, always and forever ❤️',
        emotion: 'inlove' as const,
        duration: 999999, // User continues
      },
    ];

    let currentTimeout: NodeJS.Timeout;
    const runStep = (idx: number) => {
      if (idx >= natureScript.length) return;
      const current = natureScript[idx];
      setSubStep(current.step);
      setCharacterDialogue(current.dialogue);
      setCharacterEmotion(current.emotion);
      audioEngine.playCardSlide();

      if (idx < natureScript.length - 1) {
        currentTimeout = setTimeout(() => {
          runStep(idx + 1);
        }, current.duration);
      }
    };

    runStep(0);
    return () => clearTimeout(currentTimeout);
  }, [phase]);

  // 10. Scene 3: Arguments
  useEffect(() => {
    if (phase !== 'SCENE_3_ARGUMENTS') return;

    setCharacterPosition('top-right');
    setCharacterDialogue('Cute nito hahahha, first real argument natin!');
    setCharacterEmotion('angry');

    const t1 = setTimeout(() => {
      setCharacterDialogue("Hahaha tampuhan lang pala, di rin matitiis isa't isa");
      setCharacterEmotion('laugh');
    }, 3200);

    const t2 = setTimeout(() => {
      setCharacterDialogue('Love you talaga lovey ❤️');
      setCharacterEmotion('inlove');
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  // 11. Final Scene: Music Video
  useEffect(() => {
    if (phase !== 'SCENE_FINAL_MUSIC_VIDEO') return;

    const isMobile = window.innerWidth < 640;
    setCharacterPosition(isMobile ? 'hidden' : 'bottom-right');
    setCharacterDialogue('Ito na yung pinakahihintay mo heheheh ✨');
    setCharacterEmotion('excited');

    // Pause background BGM so the video audio is loud & clear
    if (isPlayingMusic) {
      audioEngine.pauseMusic();
      setIsPlayingMusic(false);
    }

    const t1 = setTimeout(() => {
      setCharacterDialogue('Lahat ng saya, luha, at pagmamahal... Palagi ❤️');
      setCharacterEmotion('inlove');
    }, 3800);

    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#ec4899', '#facc15', '#a855f7'],
      });
    } catch {}

    return () => clearTimeout(t1);
  }, [phase]);

  // Toggle BGM
  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      audioEngine.pauseMusic();
      setIsPlayingMusic(false);
    } else {
      audioEngine.playMusic();
      setIsPlayingMusic(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-neutral-100 flex flex-col justify-between selection:bg-rose-500/30 selection:text-rose-200">
      {/* Background Scenic Backdrop for each phase */}
      <BackgroundTheme phase={phase} subStep={subStep} />

      {/* Subtle Cinematic Particle System Overlay (Sunset Embers, Forest Mist, Rain, Stardust) */}
      <ParticleOverlay phase={phase} subStep={subStep} />

      {/* Barba.js Liquid Portal Scene Transition */}
      <BarbaTransitionCurtain phase={phase} />

      {/* Persistent 3D Soul Companion HUD (Smooth continuous glide across coordinates) */}
      <SoulCharacter22
        dialogue={characterDialogue}
        subtext={characterSubtext}
        emotion={characterEmotion}
        position={characterPosition}
        size={phase === 'WALK_INTRO_22' ? 'large' : 'normal'}
      />

      {/* Floating Heart Symbol of Overcoming Trials Animation */}
      <AnimatePresence>
        {phase === 'SCENE_2_NATURE_PEAK' && subStep === 9 && (
          <OvercomingTrialsHeartEffect key="overcoming-trials-hearts" />
        )}
      </AnimatePresence>

      {/* Static CRT Glitch Transition */}
      <AnimatePresence>
        {phase === 'STATIC_GLITCH' && (
          <GlitchEffect
            onComplete={() => {
              setPhase('SCENE_1_BRIGHT_SHUFFLE');
            }}
          />
        )}
      </AnimatePresence>

      {/* Top Header Utilities */}
      <header className="relative z-40 w-full px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Left: Chapter Timeline Navigator */}
        <ChapterNav
          currentPhase={phase}
          onSelectPhase={(p) => {
            if (p === 'MONTAGE_8S') {
              setMontageMemories(getRandomShuffleMemories(10));
              setMontageIndex(0);
            }
            setPhase(p);
            setSubStep(0);
            if (p !== 'INTRO') {
              setShowPalagiMusicUi(true);
              if (!isPlayingMusic) {
                audioEngine.playMusic();
                setIsPlayingMusic(true);
              }
            }
          }}
          isOpen={isChapterNavOpen}
          onToggleOpen={() => setIsChapterNavOpen(!isChapterNavOpen)}
        />

        {/* Right Action Tools: Music Toggle */}
        <div className="flex items-center space-x-2.5">
          {/* Quick Sound Toggle */}
          {showPalagiMusicUi && (
            <button
              onClick={handleToggleMusic}
              className={`p-2 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                isPlayingMusic
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Music status"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main Interactive Stage Container */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-3 sm:px-6 md:px-8 max-w-6xl mx-auto w-full text-center py-4 md:py-6">
        {/* ============================================================ */}
        {/* PHASE 0: INTRO - "Our First Year - Together..."              */}
        {/* ============================================================ */}
        {phase === 'INTRO' && (
          <motion.div
            key="phase-intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center justify-center space-y-8 my-auto max-w-2xl px-6 py-10 rounded-3xl bg-neutral-950/40 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Top Pill Emblem */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-xs font-mono tracking-widest uppercase shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Anniversary 2026 • Dedicated Experience</span>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-neutral-100 drop-shadow-2xl">
                Our First Year
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                  Together...
                </span>
              </h1>
              <p className="text-base sm:text-lg text-emerald-100/90 font-light max-w-lg mx-auto leading-relaxed">
                A personal chronicle of quiet glances, unsaid feelings, laughter, mountain rides, unexpected trials, and an unbreakable love.
              </p>
            </div>

            {/* Dedicated Beautiful Center Button: "Look Back" */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(52, 211, 153, 0.6)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleStartLookBack}
              className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-neutral-950 font-bold text-lg md:text-xl shadow-[0_10px_35px_rgba(16,185,129,0.45)] flex items-center space-x-3 transition-all duration-300 cursor-pointer"
            >
              <span className="relative z-10 font-display tracking-wide text-neutral-950">
                Look Back
              </span>
              <Heart className="w-5 h-5 text-neutral-950 fill-neutral-950 group-hover:scale-125 transition-transform" />

              {/* Glowing Pulse Ring */}
              <span className="absolute -inset-1 rounded-full bg-emerald-400/40 blur-md group-hover:blur-lg transition-all animate-pulse"></span>
            </motion.button>

            {/* Romantic Date Subtext */}
            <div className="flex items-center space-x-3 text-xs font-mono text-emerald-300/80 tracking-widest uppercase">
              <span>[ 22.09.2025 ]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>ATING UNIVERSE ECHOES</span>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* PHASE 1: MONTAGE 8 SECONDS (10 Images Flash)                 */}
        {/* ============================================================ */}
        {phase === 'MONTAGE_8S' && (
          <motion.div
            key="phase-montage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full max-w-3xl flex flex-col items-center justify-center space-y-6"
          >
            {/* Countdown / Progress Bar (8s Total) */}
            <div className="w-full max-w-md h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 8, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400"
              />
            </div>

            {/* Dynamic Kinetic Image Carousel */}
            <div className="relative w-full aspect-[16/10] max-h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-950 flex items-center justify-center">
              {/* Invisible preloader buffer for all 10 montage items */}
              <div className="hidden" aria-hidden="true">
                {montageMemories.map((item) => (
                  <img
                    key={`buf-${item.id}`}
                    src={item.driveUrl || item.localPath || item.fallbackUrl}
                    loading="eager"
                    fetchPriority="high"
                    alt=""
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {montageMemories.map((item, idx) => {
                  if (idx !== montageIndex) return null;
                  const currentSrc = getImage(item.id, item.fallbackUrl);

                  return (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      initial={{ opacity: 0, scale: 1.15, rotate: (idx % 2 === 0 ? 1 : -1) * 2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, ease: 'easeInOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={currentSrc}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onError={(e) => {
                          if (e.currentTarget.src !== item.fallbackUrl && item.fallbackUrl) {
                            e.currentTarget.src = item.fallbackUrl;
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Vignette & Title Tag */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6 text-left">
                        <span className="self-end px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-cyan-300 border border-white/15">
                          Memory {idx + 1} / {montageMemories.length}
                        </span>

                        <div>
                          <span className="text-xs font-mono text-rose-300 uppercase tracking-widest">
                            {item.tag || `Echo ${idx + 1}`}
                          </span>
                          <h3 className="text-xl md:text-3xl font-bold font-display text-white drop-shadow-md">
                            {item.title}
                          </h3>
                          {item.subtitle && <p className="text-xs md:text-sm text-neutral-300">{item.subtitle}</p>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* PHASE 2: SIMULATION BLACK TERMINAL                            */}
        {/* ============================================================ */}
        {phase === 'SIMULATION_BLACK' && (
          <motion.div
            key="phase-sim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl font-mono text-left space-y-3 p-6 rounded-2xl bg-neutral-950/90 border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center space-x-2 pb-3 border-b border-neutral-800 text-xs text-neutral-500">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="ml-2 font-mono text-neutral-400">universe_simulation_core.exe</span>
            </div>

            <div className="space-y-2 py-4 text-xs md:text-sm">
              {simLines.map((line, idx) => {
                const isSuccess = Boolean(line && typeof line === 'string' && line.includes('SUCCESS'));
                return (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      isSuccess
                        ? 'text-emerald-400 font-bold text-base md:text-lg tracking-wider pt-2'
                        : 'text-cyan-300/90'
                    }
                  >
                    {line}
                  </motion.p>
                );
              })}
              {!isSimFinished && (
                <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse"></span>
              )}
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* PHASE 3: GOLDEN HOUR INTRO ("Walk with me")                   */}
        {/* ============================================================ */}
        {phase === 'GOLDEN_HOUR_INTRO' && (
          <motion.div
            key="phase-golden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="relative flex flex-col items-center justify-center space-y-6 max-w-xl my-auto text-center px-8 py-10 rounded-3xl bg-neutral-950/40 backdrop-blur-xl border border-amber-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-300/40 text-amber-200 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.25)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulation Complete • Sunset Horizon</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold font-display text-white drop-shadow-2xl">
              A World Made For Us
            </h2>
            <p className="text-sm md:text-base text-amber-100/90 max-w-md font-light leading-relaxed">
              Step into the echoes of our memories, bathed in the golden sunset, guided by a little star that holds our special date.
            </p>

            {/* Dedicated Button: "Walk with me" */}
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(251, 191, 36, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWalkWithMe}
              className="relative px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 text-neutral-950 font-bold text-lg md:text-xl shadow-[0_10px_35px_rgba(245,158,11,0.5)] flex items-center space-x-3 transition-all duration-300 group cursor-pointer"
            >
              <span className="font-display tracking-wide text-neutral-950">
                Walk with me
              </span>
              <Compass className="w-5 h-5 text-neutral-950 group-hover:rotate-90 transition-transform duration-500" />

              {/* Glowing Pulse Ring */}
              <span className="absolute -inset-1 rounded-full bg-amber-400/40 blur-md group-hover:blur-lg transition-all animate-pulse"></span>
            </motion.button>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* PHASE 5: SCENE 1 - SCHOOL & CITIES (MOODY)                   */}
        {/* ============================================================ */}
        {phase === 'SCENE_1_SCHOOL_MOODY' && (
          <div className="w-full max-w-4xl my-auto flex flex-col items-center">
            {subStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full mt-4"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.category === 'school')}
                  getImageUrl={getImage}
                />
              </motion.div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PHASE 7: SCENE 1 - BRIGHT SHUFFLE (15 Images Blitz Reel)      */}
        {/* ============================================================ */}
        {phase === 'SCENE_1_BRIGHT_SHUFFLE' && (
          <div className="relative w-full max-w-2xl flex flex-col items-center justify-center my-auto">
            <div className="text-center mb-4">
              <span className="text-xs font-mono text-rose-300 uppercase tracking-widest">
                Reel Shuffling • 15 Memories in 4s
              </span>
            </div>

            <div className="relative w-full aspect-[4/3] max-w-md rounded-3xl overflow-hidden shadow-2xl border border-rose-400/40 bg-neutral-950">
              {/* Invisible preloader buffer for all 15 shuffle memories */}
              <div className="hidden" aria-hidden="true">
                {INITIAL_MEMORIES.filter((m) => m.category === 'shuffle').map((item) => (
                  <img
                    key={`buf-shuf-${item.id}`}
                    src={item.driveUrl || item.localPath || item.fallbackUrl}
                    loading="eager"
                    fetchPriority="high"
                    alt=""
                  />
                ))}
              </div>

              {INITIAL_MEMORIES.filter((m) => m.category === 'shuffle').map((item, idx) => {
                if (idx !== shuffleIndex) return null;
                const currentSrc = getImage(item.id, item.fallbackUrl);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: (idx % 2 === 0 ? 3 : -3) }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={currentSrc}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      onError={(e) => {
                        if (e.currentTarget.src !== item.fallbackUrl && item.fallbackUrl) {
                          e.currentTarget.src = item.fallbackUrl;
                        }
                      }}
                      className="w-full h-full object-cover object-[center_22%]"
                    />
                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-cyan-300">
                      Photo {idx + 1} / 15
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PHASE 8: SCENE 1 - CHATS & EARLY JOURNEY STORYTELLING         */}
        {/* ============================================================ */}
        {phase === 'SCENE_1_CHATS_JOURNEY' && (
          <div className="w-full max-w-5xl my-auto py-6 flex flex-col items-center">
            {/* Step 0: Start of Conversation (3 screenshots) */}
            {subStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('chat-start'))}
                  variant="chat-screenshot"
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 1: Fast forward chats (3 screenshots) */}
            {subStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('chat-ff'))}
                  variant="chat-screenshot"
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 2-4: Lakbay ng Sanaysay & Official 21/22 Start */}
            {(subStep === 2 || subStep === 3 || subStep === 4) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('chat-sanaysay'))}
                  variant="chat-screenshot"
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 5-6: Her solo cute photo ("reed") */}
            {(subStep === 5 || subStep === 6) && (() => {
              const mem = INITIAL_MEMORIES.find((m) => m.id === 'special-her-1');
              if (!mem) return null;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md w-full mx-auto"
                >
                  <AutoScrollPhotoGrid
                    memories={[mem]}
                    getImageUrl={getImage}
                  />
                </motion.div>
              );
            })()}

            {/* Step 7: Laughter Photo */}
            {subStep === 7 && (() => {
              const mem = INITIAL_MEMORIES.find((m) => m.id === 'special-her-2');
              if (!mem) return null;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md w-full mx-auto"
                >
                  <AutoScrollPhotoGrid
                    memories={[mem]}
                    getImageUrl={getImage}
                  />
                </motion.div>
              );
            })()}

            {/* Step 8-9: Singing & Guitar Together (2 Photos) */}
            {(subStep === 8 || subStep === 9) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-3xl"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('special-music'))}
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 10: Park Hangouts (3 Photos) */}
            {subStep === 10 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('special-park'))}
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 11: Change Experience to Nature Section Button */}
            {subStep === 11 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex flex-col items-center space-y-4"
              >
                <button
                  onClick={() => {
                    setPhase('SCENE_2_NATURE_PEAK');
                    setSubStep(0);
                  }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 text-neutral-950 font-bold text-base md:text-lg shadow-[0_10px_35px_rgba(45,212,191,0.5)] flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Change experience</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PHASE 9: SCENE 2 - NATURE, MOUNTAINS, PEAKS & RESILIENCE     */}
        {/* ============================================================ */}
        {phase === 'SCENE_2_NATURE_PEAK' && (
          <div className="w-full max-w-5xl my-auto py-6 flex flex-col items-center">
            {/* Step 1: Cuanus Falls (2 photos) */}
            {subStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-3xl"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('nature-cuanus'))}
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 2: Gullas Mountain Drive (5 photos) */}
            {subStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('nature-gullas'))}
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 4-5: Breakup May 30 Reflection (2 photos) */}
            {(subStep === 4 || subStep === 5) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-2xl"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('nature-breakup'))}
                  variant="chat-screenshot"
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 6: Pangilatan Reconciliation (3 photos) */}
            {subStep === 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <AutoScrollPhotoGrid
                  memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('nature-pangilatan'))}
                  getImageUrl={getImage}
                />
              </motion.div>
            )}

            {/* Step 7-9: Flood Scene & Reflection (3 photos / video) */}
            {(subStep === 7 || subStep === 8 || subStep === 9) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center space-y-6 w-full"
              >
                <div className="w-full">
                  <AutoScrollPhotoGrid
                    memories={INITIAL_MEMORIES.filter((m) => m.id.startsWith('nature-flood'))}
                    getImageUrl={getImage}
                  />
                </div>

                {/* Continue to Real Arguments Button */}
                {subStep === 9 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setPhase('SCENE_3_ARGUMENTS')}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 text-neutral-950 font-bold text-base shadow-xl flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continue Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PHASE 10: SCENE 3 - FIRST REAL ARGUMENTS                      */}
        {/* ============================================================ */}
        {phase === 'SCENE_3_ARGUMENTS' && (
          <div className="w-full max-w-5xl my-auto py-6 flex flex-col items-center space-y-8">
            <div className="w-full">
              <AutoScrollPhotoGrid
                memories={INITIAL_MEMORIES.filter((m) => m.category === 'argument')}
                variant="chat-screenshot"
                getImageUrl={getImage}
              />
            </div>

            {/* Transition to Music Video Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase('SCENE_FINAL_MUSIC_VIDEO')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-bold text-base md:text-lg shadow-[0_10px_35px_rgba(236,72,153,0.4)] flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Watch Our Dedicated Music Video</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* ============================================================ */}
        {/* PHASE 11: FINAL SCENE - DEDICATED MUSIC VIDEO & PORTAL DOOR   */}
        {/* ============================================================ */}
        {phase === 'SCENE_FINAL_MUSIC_VIDEO' && (
          <div className="w-full max-w-4xl mx-auto pt-1 sm:pt-3 pb-8 flex flex-col items-center justify-start space-y-4 md:space-y-6 text-center">
            {/* Music Video Cinema Frame */}
            <VideoPlayerSection />

            {/* Portal Door dedicated to Return to Universe Echoes / Ating Universe */}
            <PortalDoor
              onReturnToUniverse={() => {
                setCharacterDialogue('Welcome back to Ating Universe ✨');
                setCharacterEmotion('heart-eyes');
              }}
              onRestartStory={() => {
                setPhase('INTRO');
                setSubStep(0);
                setShowPalagiMusicUi(false);
                setIsPlayingMusic(false);
                audioEngine.pauseMusic();
              }}
            />
          </div>
        )}
      </main>

      {/* Floating Bottom Music Bar ("Now playing: Palagi - TJ Monterde") */}
      <AnimatePresence>
        {showPalagiMusicUi && (
          <MusicPlayerBar
            isPlaying={isPlayingMusic}
            onTogglePlay={handleToggleMusic}
            trackTitle="Palagi - TJ Monterde"
          />
        )}
      </AnimatePresence>

    </div>
  );
}
