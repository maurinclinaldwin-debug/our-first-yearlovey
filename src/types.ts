export type StoryPhase =
  | 'INTRO'                 // "Our First Year - Together...", nature bright positive theme, "Look Back" button
  | 'MONTAGE_8S'            // ~10 images rapid succession in 8s with dynamic kinetic layouts
  | 'SIMULATION_BLACK'      // Cinematic fade to black, typing matrix "Simulating world...", "Simulated world Success..."
  | 'GOLDEN_HOUR_INTRO'     // Golden Hour + sky blue sky, "Walk with me" button
  | 'WALK_INTRO_22'         // 22 Character arrives spinning, Palagi song starts, "I am 22..."
  | 'SCENE_1_SCHOOL_MOODY'  // School & cities (dark & mysterious vibe), "So dito pala...", 2 group photos + 3s lines
  | 'SCENE_1_FATE_REVEAL'   // 4s pause -> "YET, FATE? HAS DIFFERENT PURPOSE..."
  | 'STATIC_GLITCH'         // 3s static glitch CRT transition
  | 'SCENE_1_BRIGHT_SHUFFLE'// Bright, Joy & Wonder vibe! 15 photos shuffle in 4s
  | 'SCENE_1_CHATS_JOURNEY' // Conversation start, lakbay ng sanaysay, Sep 21/22, lovey nicknames, singing/guitar, park
  | 'SCENE_2_NATURE_PEAK'   // Transition to Mountains/Nature, Cuanus falls, Gullas Drive, May 30 breakup, Pangilatan reconciliation, Flood trial
  | 'SCENE_3_ARGUMENTS'     // First real argument screenshots, playful love
  | 'SCENE_FINAL_MUSIC_VIDEO'; // Dedicated GDrive music video embed + Universe Echoes Portal Door

export interface MemoryItem {
  id: string;
  category: 'montage' | 'school' | 'shuffle' | 'chat' | 'special' | 'nature' | 'flood' | 'argument';
  title: string;
  subtitle?: string;
  date?: string;
  driveId?: string;
  driveUrl?: string;
  isVideo?: boolean;
  videoPreviewUrl?: string;
  localPath?: string;
  fallbackUrl: string;
  caption?: string;
  notes?: string; // Handwritten-style sweet secret memory notes on hover
  orientation?: 'landscape' | 'portrait' | 'square';
  tag?: string;
}

export type CharacterEmotion =
  | 'idle'
  | 'happy'
  | 'gentle'
  | 'thinking'
  | 'emotional'
  | 'excited'
  | 'winking'
  | 'serious'
  | 'cry'
  | 'laugh'
  | 'inlove'
  | 'heart-eyes'
  | 'sad'
  | 'angry'
  | 'surprised';

export interface CharacterDialogue {
  id: string;
  text: string;
  subtext?: string;
  emotion?: CharacterEmotion;
  duration?: number; // milliseconds before next line
  customAction?: string;
}

export interface StoryChapter {
  id: StoryPhase;
  name: string;
  iconName: string;
  description: string;
  timestampHint: string;
}
