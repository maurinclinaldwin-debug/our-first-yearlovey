import React, { useRef, useEffect, useState } from 'react';
import { MemoryItem } from '../types';
import { MemoryCard } from './MemoryCard';
import { ChevronLeft, ChevronRight, Sparkles, Eye, X, Film, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AutoScrollPhotoGridProps {
  memories: MemoryItem[];
  getImageUrl: (id: string, fallback: string) => string;
  variant?: 'polaroid' | 'chat-screenshot' | 'cinematic';
  autoScrollInterval?: number; // ms, default 3500ms
  className?: string;
}

export const AutoScrollPhotoGrid: React.FC<AutoScrollPhotoGridProps> = ({
  memories,
  getImageUrl,
  variant = 'polaroid',
  autoScrollInterval = 3200,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  const totalCount = memories.length;
  const isMultiPhoto = totalCount > 2;

  // Auto-scroll loop on mobile when items exceed 2
  useEffect(() => {
    if (!isMultiPhoto || isPaused) return;

    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      
      // Calculate next item offset
      const maxScroll = container.scrollWidth - container.clientWidth;
      const scrollStep = container.clientWidth * 0.52; // Scroll 1 card forward

      if (container.scrollLeft >= maxScroll - 10) {
        // Smooth loop back to start
        container.scrollTo({ left: 0, behavior: 'smooth' });
        setCurrentIndex(0);
      } else {
        container.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [isMultiPhoto, isPaused, autoScrollInterval, totalCount]);

  // Track scroll position for indicators
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const itemWidth = container.clientWidth * 0.5;
    const newIdx = Math.round(container.scrollLeft / itemWidth);
    setCurrentIndex(Math.min(newIdx, totalCount - 1));
  };

  const scrollToIdx = (idx: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const itemWidth = (container.clientWidth - 12) / 2 + 12; // includes gap
    container.scrollTo({ left: idx * itemWidth, behavior: 'smooth' });
    setCurrentIndex(idx);
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollStep = (container.clientWidth - 12) / 2 + 12;
    container.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollStep = (container.clientWidth - 12) / 2 + 12;
    container.scrollBy({ left: scrollStep, behavior: 'smooth' });
  };

  if (!isMultiPhoto) {
    // 1 or 2 photos: standard high-contrast centered grid
    return (
      <div className={`grid grid-cols-1 ${totalCount === 2 ? 'sm:grid-cols-2 max-w-2xl' : 'max-w-md'} gap-4 sm:gap-6 w-full mx-auto justify-center ${className}`}>
        {memories.map((m, idx) => (
          <MemoryCard
            key={m.id}
            memory={m}
            variant={variant}
            customImageUrl={getImageUrl(m.id, m.fallbackUrl)}
            delay={idx * 0.15}
            onClick={() => setSelectedPhoto(m)}
          />
        ))}

        {/* Lightbox Modal */}
        <PhotoLightboxModal
          selectedPhoto={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          getImageUrl={getImageUrl}
        />
      </div>
    );
  }

  // > 2 photos: Mobile shows exactly 2 with auto-scroll; Desktop shows responsive grid
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Mobile Auto-scroll Carousel (< 640px) */}
      <div
        className="w-full block sm:hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Horizontal scroll track: exactly 2 items visible side-by-side */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-2.5 px-1 pb-2 scrollbar-none no-scrollbar scroll-smooth w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {memories.map((m, idx) => (
            <div
              key={m.id}
              className="w-[calc(50%-5px)] min-w-[calc(50%-5px)] max-w-[calc(50%-5px)] shrink-0 snap-start flex flex-col"
            >
              <MemoryCard
                memory={m}
                variant={variant}
                customImageUrl={getImageUrl(m.id, m.fallbackUrl)}
                delay={idx * 0.08}
                onClick={() => setSelectedPhoto(m)}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {/* Mobile controls & indicator pills */}
        <div className="flex items-center justify-between mt-2.5 px-2 text-xs text-neutral-400">
          <button
            onClick={handlePrev}
            aria-label="Previous photos"
            className="p-1 rounded-full bg-neutral-800/80 border border-white/10 hover:bg-neutral-700 text-white transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center space-x-1.5">
            {memories.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex || i === currentIndex + 1
                    ? 'w-4 bg-rose-400'
                    : 'w-1.5 bg-neutral-700'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
            <span className="text-[10px] font-mono text-neutral-400 ml-1.5">
              {currentIndex + 1}-{Math.min(currentIndex + 2, totalCount)} of {totalCount}
            </span>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next photos"
            className="p-1 rounded-full bg-neutral-800/80 border border-white/10 hover:bg-neutral-700 text-white transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hint text */}
        <p className="text-[10px] text-neutral-500 font-mono text-center mt-1 flex items-center justify-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-rose-400" />
          <span>Auto-scrolling • Swipe or tap to explore</span>
        </p>
      </div>

      {/* Desktop Grid (sm and up) */}
      <div className={`hidden sm:grid ${totalCount <= 3 ? 'grid-cols-3 max-w-4xl' : totalCount === 4 ? 'grid-cols-2 md:grid-cols-4 max-w-5xl' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-6xl'} gap-4 md:gap-5 w-full mx-auto justify-center`}>
        {memories.map((m, idx) => (
          <MemoryCard
            key={m.id}
            memory={m}
            variant={variant}
            customImageUrl={getImageUrl(m.id, m.fallbackUrl)}
            delay={idx * 0.1}
            onClick={() => setSelectedPhoto(m)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <PhotoLightboxModal
        selectedPhoto={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        getImageUrl={getImageUrl}
      />
    </div>
  );
};

// Fullscreen Photo Lightbox Modal
interface PhotoLightboxModalProps {
  selectedPhoto: MemoryItem | null;
  onClose: () => void;
  getImageUrl: (id: string, fallback: string) => string;
}

const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  selectedPhoto,
  onClose,
  getImageUrl,
}) => {
  if (!selectedPhoto) return null;

  const imgSrc = getImageUrl(selectedPhoto.id, selectedPhoto.fallbackUrl);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative ${selectedPhoto.isVideo ? 'max-w-4xl' : 'max-w-3xl'} w-full bg-neutral-900/95 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 border-b border-white/10 bg-neutral-950/85 text-white">
            <div className="flex items-center space-x-2.5">
              {selectedPhoto.isVideo && (
                <div className="p-1 rounded-lg bg-rose-500/20 text-rose-300">
                  <Film className="w-4 h-4" />
                </div>
              )}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white font-cinzel">
                  {selectedPhoto.title}
                </h3>
                {selectedPhoto.subtitle && (
                  <p className="text-xs text-neutral-400">{selectedPhoto.subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {selectedPhoto.isVideo && (
                <a
                  href={`https://drive.google.com/file/d/${selectedPhoto.driveId || '1BtPQK_OIhMflJk2pTYIgUEZDJckqH9gF'}/view?usp=sharing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white text-xs font-mono transition-colors"
                >
                  <span>Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Full Media Display */}
          <div className={`relative w-full flex-1 ${selectedPhoto.isVideo ? 'aspect-video min-h-[220px] sm:min-h-[380px] max-h-[70vh]' : 'min-h-[300px] max-h-[65vh]'} bg-black flex items-center justify-center overflow-hidden`}>
            {selectedPhoto.isVideo && selectedPhoto.videoPreviewUrl ? (
              <iframe
                src={selectedPhoto.videoPreviewUrl}
                title={selectedPhoto.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full border-0 block"
              />
            ) : (
              <img
                src={imgSrc}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[65vh]"
              />
            )}
          </div>

          {/* Caption footer */}
          {selectedPhoto.caption && (
            <div className="p-3 sm:p-4 bg-neutral-950/95 border-t border-white/10 text-center">
              <p className="text-xs sm:text-sm text-rose-200/90 font-serif italic">
                "{selectedPhoto.caption}"
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
