import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryItem } from '../types';
import { Calendar, Image as ImageIcon, Play, Film, Sparkles, StickyNote } from 'lucide-react';
import { preloadImage } from '../utils/imageLoader';

interface MemoryCardProps {
  memory: MemoryItem;
  variant?: 'polaroid' | 'cinematic' | 'chat-screenshot' | 'compact';
  customImageUrl?: string;
  delay?: number;
  className?: string;
  autoplayVideo?: boolean;
  onClick?: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  variant = 'polaroid',
  customImageUrl,
  delay = 0,
  className = '',
  autoplayVideo = false,
  onClick,
}) => {
  const primarySrc = customImageUrl || memory.driveUrl || memory.localPath || memory.fallbackUrl;
  const [imgSrc, setImgSrc] = useState<string>(primarySrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const target = customImageUrl || memory.driveUrl || memory.localPath || memory.fallbackUrl;
    setImgSrc(target);
    setIsLoaded(false);

    // Eagerly preload target in background
    if (target) {
      preloadImage(target).then((success) => {
        if (success) {
          setIsLoaded(true);
        }
      });
    }
  }, [customImageUrl, memory.driveUrl, memory.localPath, memory.fallbackUrl]);

  const handleImageError = () => {
    // If primary drive/local path fails, fall back to fallbackUrl
    if (imgSrc !== memory.fallbackUrl && memory.fallbackUrl) {
      setImgSrc(memory.fallbackUrl);
    }
  };

  const videoSrc = memory.videoPreviewUrl || 'https://drive.google.com/file/d/1FttW1UtcHqF0H0fbrCly3fBRDZVD4F5t/preview';
  const autoplayUrl = `${videoSrc}${videoSrc.includes('?') ? '&' : '?'}autoplay=1`;

  // Handwritten Tooltip Component
  const renderHandwrittenTooltip = () => {
    if (!memory.notes) return null;

    return (
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -1.5 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[260px] sm:max-w-[290px] pointer-events-none drop-shadow-2xl"
          >
            {/* Handwritten Note Body */}
            <div className="relative bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-100 text-amber-950 p-2.5 sm:p-3 rounded-xl border border-amber-300/90 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              {/* Tape Accent */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-amber-200/80 backdrop-blur-xs border-t border-b border-amber-300/60 rotate-1 shadow-xs rounded-xs"></div>
              
              {/* Header */}
              <div className="flex items-center space-x-1 mb-0.5 text-amber-800/80">
                <StickyNote className="w-3 h-3 text-amber-700" />
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">Handwritten Note</span>
              </div>

              {/* Note Content */}
              <p className="font-script text-base sm:text-[17px] leading-snug text-neutral-900 font-medium tracking-wide">
                "{memory.notes}"
              </p>

              {/* Triangle Tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-amber-200/95"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  if (variant === 'chat-screenshot') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative rounded-2xl overflow-visible bg-neutral-900/90 border border-neutral-700/60 shadow-xl backdrop-blur-md transition-all hover:border-cyan-400/50 hover:shadow-cyan-500/10 cursor-pointer ${className}`}
      >
        {/* Handwritten Note Hover Tooltip */}
        {renderHandwrittenTooltip()}

        <div className="rounded-2xl overflow-hidden">
          {/* iOS-like Chat Header Banner */}
          <div className="px-3.5 py-2 bg-neutral-800/80 border-b border-neutral-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="text-xs font-medium text-neutral-200 truncate">
                {memory.title}
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              {memory.notes && (
                <span className="flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[9px] font-sans border border-amber-400/30">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Note</span>
                </span>
              )}
              {memory.date && (
                <span className="text-[10px] font-mono text-cyan-300/80">
                  {memory.date}
                </span>
              )}
            </div>
          </div>

          {/* Screenshot Image Frame */}
          <div className="relative aspect-[4/3] bg-neutral-950 flex items-center justify-center overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 bg-neutral-800/50 animate-pulse flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-neutral-600 animate-spin" />
              </div>
            )}
            <img
              src={imgSrc}
              alt={memory.title}
              onError={handleImageError}
              onLoad={() => setIsLoaded(true)}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Subtitle / Caption */}
          {memory.caption && (
            <div className="p-3 bg-neutral-900/90 text-left">
              <p className="text-xs text-neutral-300 italic">
                "{memory.caption}"
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Polaroid / Cinematic Variant
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-neutral-900/90 p-2.5 md:p-3 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-rose-400/40 hover:shadow-rose-500/20 cursor-pointer overflow-visible ${className}`}
    >
      {/* Handwritten Note Hover Tooltip */}
      {renderHandwrittenTooltip()}

      {/* Image / Video Container with Inner Shadow */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-950 shadow-inner">
        {/* Autoplay on Hover or when Autoplay Video is Enabled */}
        {memory.isVideo && (autoplayVideo || isHovered) ? (
          <div className="w-full h-full relative bg-black flex items-center justify-center">
            <iframe
              src={autoplayUrl}
              title={memory.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full border-0 block pointer-events-none"
            />
            {/* Ambient hover play banner */}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cyan-200 pointer-events-none flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Playing Preview &bull; Click to Expand</span>
            </div>
          </div>
        ) : (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-neutral-500 animate-spin" />
              </div>
            )}
            <img
              src={imgSrc}
              alt={memory.title}
              onError={handleImageError}
              onLoad={() => setIsLoaded(true)}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-[center_20%] sm:object-[center_22%] transition-transform duration-700 group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Video Overlay Indicator */}
            {memory.isVideo && (
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-rose-500/90 text-white shadow-[0_0_20px_rgba(244,63,94,0.6)] flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-115 pl-0.5">
                  <Play className="w-5 h-5 fill-white text-white" />
                </div>
                <span className="mt-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-rose-200 border border-rose-400/30 tracking-wide">
                  Hover to Preview &bull; Tap to Play
                </span>
              </div>
            )}
          </>
        )}

        {/* Tag Pill / Video Pill */}
        {memory.isVideo ? (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-rose-950/80 backdrop-blur-md border border-rose-500/40 text-[10px] font-mono text-rose-200 flex items-center space-x-1 z-10 pointer-events-none">
            <Film className="w-3 h-3 text-rose-400" />
            <span>Video Memory</span>
          </div>
        ) : memory.tag ? (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-200 z-10 pointer-events-none">
            {memory.tag}
          </div>
        ) : null}

        {/* Handwritten Note Indicator Badge */}
        {memory.notes && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-400/90 text-amber-950 shadow-md backdrop-blur-md border border-amber-300 text-[10px] font-sans font-semibold flex items-center space-x-1 z-10 pointer-events-none">
            <Sparkles className="w-2.5 h-2.5 text-amber-900" />
            <span>Note</span>
          </div>
        )}

        {/* Date Pill */}
        {memory.date && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300 flex items-center space-x-1 z-10 pointer-events-none">
            <Calendar className="w-2.5 h-2.5" />
            <span>{memory.date}</span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="pt-2.5 px-1 text-left">
        <h4 className="text-sm md:text-base font-semibold text-neutral-100 group-hover:text-rose-300 transition-colors truncate">
          {memory.title}
        </h4>
        {memory.subtitle && (
          <p className="text-xs text-neutral-400 font-normal line-clamp-1 mt-0.5">
            {memory.subtitle}
          </p>
        )}
        {memory.caption && (
          <p className="text-[11px] text-rose-200/80 italic mt-1 font-script text-base leading-none">
            {memory.caption}
          </p>
        )}
      </div>
    </motion.div>
  );
};

