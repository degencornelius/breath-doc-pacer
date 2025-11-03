export interface BreathingPhase {
  name: 'Inhale' | 'Exhale' | 'Sip Inhale' | 'Hum' | 'Inhale Pause';
  instruction: string;
  duration: number; // in seconds
}

export interface BreathingTechnique {
  id: string;
  name: string;
  tagline: string;
  bestFor: string[];
  instructions: string[];
  phases: BreathingPhase[];
  whyItWorks: string;
}
