import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Sparkles, ExternalLink, Maximize2, X } from 'lucide-react';

interface VideoPlayerSectionProps {
  initialVideoUrl?: string;
  driveViewUrl?: string;
}

export const VideoPlayerSection: React.FC<VideoPlayerSectionProps> = ({
  initialVideoUrl = 'https://drive.google.com/file/d/1QwXfgW2mGHUNJteFJ0mCLbaCYxd48cyo/preview',
  driveViewUrl = 'https://drive.google.com/file/d/1QwXfgW2mGHUNJteFJ0mCLbaCYxd48cyo/view?usp=sharing',
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoUrl = initialVideoUrl;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-start text-center px-1 sm:px-3">
      {/* Cinema Container with Ambient Glow and Viewport-Optimized Fit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative rounded-2xl md:rounded-3xl p-1 md:p-1.5 bg-gradient-to-tr from-purple-500/40 via-rose-500/30 to-amber-400/40 shadow-[0_15px_50px_rgba(168,85,247,0.25)] backdrop-blur-2xl border border-white/15 mx-auto flex flex-col items-center"
      >
        {/* Header Bar - Compact & Sleek */}
        <div className="w-full flex items-center justify-between gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-neutral-900/95 rounded-t-xl md:rounded-t-2xl border-b border-white/10 text-neutral-200">
          <div className="flex items-center space-x-2.5 text-left">
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide font-cinzel text-neutral-100 block">
                Our 1st Anniversary Dedicated Music Video
              </span>
              <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-mono">
                <Sparkles className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                Special Cinema Edition &bull; Palagi
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => setIsFullScreen(true)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-medium transition-all hover:scale-105 border border-rose-500/30 shadow-sm cursor-pointer"
              title="Fullscreen Cinema Mode"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline">Cinema</span>
            </button>
            <a
              href={driveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all hover:scale-105 border border-white/10 shadow-sm"
              title="Open full video in Google Drive"
            >
              <span>Drive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Video Viewport Container: Centered & Balanced Frame */}
        <div className="relative w-full h-[250px] sm:h-[360px] md:h-[440px] lg:h-[480px] bg-black rounded-b-xl md:rounded-b-2xl overflow-hidden shadow-inner flex items-center justify-center mx-auto">
          {videoUrl ? (
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
              <iframe
                src={videoUrl}
                title="Anniversary Music Video - Palagi"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute -top-[44px] sm:-top-[50px] left-0 w-full h-[calc(100%+48px)] sm:h-[calc(100%+54px)] border-0 block"
              />
            </div>
          ) : (
            <div className="text-center p-8 space-y-3 text-neutral-400">
              <Film className="w-12 h-12 mx-auto text-purple-400 opacity-60 animate-pulse" />
              <p className="text-sm font-medium">Playing Anniversary Special Video...</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Subtle bottom note */}
      <p className="mt-2 text-xs text-neutral-400 font-mono flex items-center justify-center gap-1.5 text-center">
        <Sparkles className="w-3 h-3 text-rose-400 shrink-0" />
        <span>Tap Cinema or full-screen for the ultimate theater experience</span>
      </p>

      {/* Cinema Fullscreen Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullScreen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-2 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-neutral-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-white/10 text-white">
                <div className="flex items-center space-x-2">
                  <Film className="w-4 h-4 text-rose-400" />
                  <span className="font-cinzel text-sm sm:text-base font-semibold">
                    Our 1st Anniversary Dedicated Music Video
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={driveViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white"
                  >
                    <span>Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setIsFullScreen(false)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Video Area */}
              <div className="relative w-full aspect-video min-h-[300px] sm:min-h-[500px] bg-black">
                <iframe
                  src={videoUrl}
                  title="Anniversary Music Video - Palagi"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full border-0 block"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

