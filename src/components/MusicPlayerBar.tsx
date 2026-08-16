import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, Disc3, Sparkles } from 'lucide-react';
import { audioEngine } from '../audio/audioEngine';

interface MusicPlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  trackTitle?: string;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  isPlaying,
  onTogglePlay,
  trackTitle = 'Palagi - TJ Monterde',
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const handleMuteToggle = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
    if (isMuted && val > 0) {
      audioEngine.toggleMute();
      setIsMuted(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg"
    >
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-neutral-950/85 backdrop-blur-2xl border border-rose-500/30 shadow-[0_12px_40px_rgba(244,63,94,0.25)] text-neutral-100">
        {/* Left: Disc Spinning & Track Title */}
        <div className="flex items-center space-x-3 min-w-0 pr-2">
          <div className="relative flex-shrink-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-lg flex items-center justify-center"
            >
              <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center relative overflow-hidden">
                <Disc3 className="w-5 h-5 text-rose-300" />
                {/* Vinyl grooved inner ring */}
                <div className="absolute inset-1.5 rounded-full border border-white/10"></div>
              </div>
            </motion.div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-neutral-950 animate-pulse"></span>
            )}
          </div>

          <div className="min-w-0 text-left">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 font-semibold flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                <span>Original Soundtrack</span>
              </span>
              {/* Animated Equalizer Waveform Bars */}
              {isPlaying && !isMuted && (
                <div className="flex items-end space-x-0.5 h-3">
                  <motion.div animate={{ height: ['20%', '100%', '30%'] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-rose-400 rounded-full" />
                  <motion.div animate={{ height: ['60%', '20%', '90%'] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-amber-400 rounded-full" />
                  <motion.div animate={{ height: ['30%', '80%', '40%'] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-pink-400 rounded-full" />
                  <motion.div animate={{ height: ['80%', '30%', '70%'] }} transition={{ repeat: Infinity, duration: 0.45 }} className="w-0.5 bg-rose-300 rounded-full" />
                </div>
              )}
            </div>
            <p className="text-xs md:text-sm font-semibold truncate text-neutral-100 font-display">
              {trackTitle}
            </p>
          </div>
        </div>

        {/* Right: Audio Playback Controls & Volume */}
        <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
          {/* Play / Pause Toggle Button */}
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 text-white flex items-center justify-center shadow-[0_4px_15px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {/* Mute Button */}
          <button
            onClick={handleMuteToggle}
            className="p-2 rounded-xl hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="hidden sm:block w-16 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-rose-400"
            title="Volume"
          />
        </div>
      </div>
    </motion.div>
  );
};
