/**
 * Audio Engine for Anniversary Experience
 * - Supports custom MP3 file (e.g. local /music/palagi.mp3 or uploaded file)
 * - Has built-in Web Audio API acoustic synthesizer that procedurally plays the warm "Palagi" chord progression
 * - Provides cinematic SFX (glitch CRT, whooshes, typing blips, 22 magic chimes, portal drone)
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isSynthesizerRunning = false;
  private synthInterval: number | null = null;
  private isMuted = false;
  private volume = 0.8;
  private customMusicUrl: string | null = '/music/palagi.mp3';

  constructor() {
    // Hardcoded to local /music/palagi.mp3 asset
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCustomMusic(url: string) {
    this.customMusicUrl = url;
    if (this.customAudio) {
      this.customAudio.src = url;
      if (this.isSynthesizerRunning) {
        this.customAudio.play().catch(() => {});
      }
    }
  }

  public getCustomMusicUrl(): string | null {
    return this.customMusicUrl;
  }

  public playMusic() {
    this.initContext();
    this.isSynthesizerRunning = true;

    // If a custom audio file is provided (e.g. /music/palagi.mp3 or blob)
    if (this.customMusicUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(this.customMusicUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
      this.customAudio.play().catch(() => {
        // Fallback to procedural synth if audio file loading fails
        this.startProceduralPalagiSynth();
      });
      return;
    }

    // Default to our procedural acoustic Palagi synthesizer
    this.startProceduralPalagiSynth();
  }

  public pauseMusic() {
    this.isSynthesizerRunning = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
    }
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
    }
  }

  // --- Procedural Acoustic Guitar & Warm Pad Synth (TJ Monterde "Palagi" C - Em - F - G) ---
  private startProceduralPalagiSynth() {
    if (this.synthInterval) clearInterval(this.synthInterval);

    // Chords: Cmaj9, Em7, Fmaj7, Gsus4
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj9
      [164.81, 246.94, 329.63, 392.00, 493.88], // Em7
      [174.61, 261.63, 329.63, 392.00, 523.25], // Fmaj7
      [196.00, 261.63, 293.66, 392.00, 587.33], // Gsus4
    ];

    let chordIdx = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isSynthesizerRunning || this.isMuted || !this.ctx) return;

      const currentChord = chordProgressions[chordIdx];
      // Arpeggiate notes
      const noteFreq = currentChord[step % currentChord.length];
      
      // Warm acoustic plucked note
      this.playAcousticPluck(noteFreq, 1.4);

      // On beat 0, play gentle sub root + warm pad shimmer
      if (step === 0) {
        this.playWarmPad(currentChord[0] / 2, 3.2);
        if (Math.random() > 0.4) {
          this.playBellChime(currentChord[3] * 2, 2.0);
        }
      }

      step++;
      if (step >= 8) {
        step = 0;
        chordIdx = (chordIdx + 1) % chordProgressions.length;
      }
    };

    // 400ms per 8th note ~ 75 BPM romantic ballad
    playStep();
    this.synthInterval = window.setInterval(playStep, 380);
  }

  private playAcousticPluck(freq: number, duration: number) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.09 * this.volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration);
    oscHarmonic.stop(now + duration);
  }

  private playWarmPad(freq: number, duration: number) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04 * this.volume, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  private playBellChime(freq: number, duration: number) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.03 * this.volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // --- Sound Effects ---

  public playWhoosh() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.9);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2 * this.volume, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  public playTypeBlip() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650 + Math.random() * 200, now);

    gain.gain.setValueAtTime(0.03 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  public playSuccessChime() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.07 * this.volume, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.8);
      }, i * 110);
    });
  }

  public playCharacterSpawn() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    arpeggio.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08 * this.volume, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
      }, idx * 75);
    });
  }

  public playStaticGlitch() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const duration = 2.8;

    // Buffer of white noise
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12 * this.volume, now + 0.1);
    gain.gain.setValueAtTime(0.09 * this.volume, now + 2.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + duration);
  }

  public playCardSlide() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

    gain.gain.setValueAtTime(0.04 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }
}

export const audioEngine = new AudioEngine();
