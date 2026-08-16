import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORY_CHAPTERS } from '../data/memories';
import { StoryPhase } from '../types';
import { 
  Sparkles, Zap, Terminal, Sun, Smile, 
  GraduationCap, Heart, Tv, MessageCircle, 
  Mountain, Coffee, Film, ChevronRight, CheckCircle2
} from 'lucide-react';

interface ChapterNavProps {
  currentPhase: StoryPhase;
  onSelectPhase: (phase: StoryPhase) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const ChapterNav: React.FC<ChapterNavProps> = ({
  currentPhase,
  onSelectPhase,
  isOpen,
  onToggleOpen,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Terminal': return <Terminal className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      case 'Smile': return <Smile className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Tv': return <Tv className="w-4 h-4" />;
      case 'MessageCircle': return <MessageCircle className="w-4 h-4" />;
      case 'Mountain': return <Mountain className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Film': return <Film className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const currentChapterIndex = STORY_CHAPTERS.findIndex((c) => c.id === currentPhase);
  const activeIndex = currentChapterIndex >= 0 ? currentChapterIndex : 0;
  const progressPercent = Math.round(((activeIndex + 1) / STORY_CHAPTERS.length) * 100);

  return (
    <div className="fixed top-4 left-4 z-40">
      {/* Chapter Toggle Pill Button */}
      <button
        onClick={onToggleOpen}
        className="group relative flex items-center space-x-2.5 px-3.5 py-2 rounded-2xl bg-neutral-950/80 backdrop-blur-xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-neutral-200 hover:text-white hover:border-cyan-400/50 transition-all text-xs font-medium cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="absolute w-4 h-4 rounded-full bg-cyan-400/20 animate-ping"></span>
        </div>
        <span className="font-semibold text-neutral-100">
          Ch. {activeIndex + 1}:
        </span>
        <span className="text-neutral-300 max-w-[120px] sm:max-w-[160px] truncate font-normal">
          {STORY_CHAPTERS[activeIndex]?.name || 'Intro'}
        </span>
        <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          {progressPercent}%
        </span>
        <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-300 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Chapter Dropdown / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-84 sm:w-92 max-h-[78vh] overflow-y-auto rounded-3xl bg-neutral-950/95 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-3 space-y-2 text-left custom-scrollbar"
          >
            {/* Header with Timeline Progress Bar */}
            <div className="px-2 py-2 border-b border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Storyline Timeline</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {activeIndex + 1} of {STORY_CHAPTERS.length} Chapters
                </span>
              </div>

              {/* Progress Bar Line */}
              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400 rounded-full"
                />
              </div>
            </div>

            {/* Chapters List */}
            <div className="py-1 space-y-1">
              {STORY_CHAPTERS.map((chap, idx) => {
                const isActive = chap.id === currentPhase;
                const isPassed = idx < activeIndex;

                return (
                  <button
                    key={chap.id}
                    onClick={() => {
                      onSelectPhase(chap.id as StoryPhase);
                      onToggleOpen();
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/25 to-purple-500/20 border border-cyan-400/60 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                        : 'hover:bg-white/5 text-neutral-300 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 ${
                      isActive 
                        ? 'bg-gradient-to-tr from-cyan-400 to-teal-300 text-neutral-950 font-bold shadow-md' 
                        : isPassed 
                          ? 'bg-neutral-800 text-emerald-400' 
                          : 'bg-neutral-900 text-neutral-500'
                    }`}>
                      {getIcon(chap.iconName)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-semibold truncate ${isActive ? 'text-cyan-200' : 'text-neutral-200'}`}>
                          {idx + 1}. {chap.name}
                        </p>
                        <span className="text-[10px] font-mono text-neutral-500 flex-shrink-0 ml-1">
                          {chap.timestampHint}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                        {chap.description}
                      </p>
                    </div>

                    {isPassed && !isActive && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
