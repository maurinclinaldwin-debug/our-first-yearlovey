import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MemoryItem } from '../types';
import { Calendar, Image as ImageIcon, Play, Film } from 'lucide-react';
import { preloadImage } from '../utils/imageLoader';

interface MemoryCardProps {
  memory: MemoryItem;
  variant?: 'polaroid' | 'cinematic' | 'chat-screenshot' | 'compact';
  customImageUrl?: string;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  variant = 'polaroid',
  customImageUrl,
  delay = 0,
  className = '',
  onClick,
}) => {
  const primarySrc = customImageUrl || memory.driveUrl || memory.localPath || memory.fallbackUrl;
  const [imgSrc, setImgSrc] = useState<string>(primarySrc);
  const [isLoaded, setIsLoaded] = useState(false);

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

  if (variant === 'chat-screenshot') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
        className={`group relative rounded-2xl overflow-hidden bg-neutral-900/90 border border-neutral-700/60 shadow-xl backdrop-blur-md transition-all hover:border-cyan-400/50 hover:shadow-cyan-500/10 cursor-pointer ${className}`}
      >
        {/* iOS-like Chat Header Banner */}
        <div className="px-3.5 py-2 bg-neutral-800/80 border-b border-neutral-700/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            <span className="text-xs font-medium text-neutral-200 truncate">
              {memory.title}
            </span>
          </div>
          {memory.date && (
            <span className="text-[10px] font-mono text-cyan-300/80">
              {memory.date}
            </span>
          )}
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
      className={`group relative bg-neutral-900/90 p-2.5 md:p-3 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-rose-400/40 hover:shadow-rose-500/20 cursor-pointer ${className}`}
    >
      {/* Image / Video Container with Inner Shadow */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-950 shadow-inner">
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
              Tap to Play Video
            </span>
          </div>
        )}

        {/* Tag Pill / Video Pill */}
        {memory.isVideo ? (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-rose-950/80 backdrop-blur-md border border-rose-500/40 text-[10px] font-mono text-rose-200 flex items-center space-x-1">
            <Film className="w-3 h-3 text-rose-400" />
            <span>Video Memory</span>
          </div>
        ) : memory.tag ? (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-200">
            {memory.tag}
          </div>
        ) : null}

        {/* Date Pill */}
        {memory.date && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300 flex items-center space-x-1">
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
