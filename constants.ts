import type { BreathingTechnique } from './types';

export const BREATHING_TECHNIQUES: BreathingTechnique[] = [
  {
    id: '4-8',
    name: '4-8 Extended Exhale',
    tagline: 'Deep calm & sleep prep',
    bestFor: ['Sleep prep', 'Anxiety downshift', 'Post-stress calm'],
    instructions: [
      'Posture neutral; shoulders soft.',
      'Inhale for 4s through the nose.',
      'Exhale for 8s through pursed lips (steady, quiet).',
      'No breath holds. Keep volume low and effortless.',
    ],
    phases: [
      { name: 'Inhale', instruction: 'Breathe In...', duration: 4 },
      { name: 'Exhale', instruction: 'Breathe Out...', duration: 8 },
    ],
    whyItWorks: 'Longer exhale increases parasympathetic (rest-and-digest) drive. Pursed lips gently raise airway pressure, slowing breath flow and promoting relaxation. Key Evidence: Komori et al., 2018 (PMC6037091); Meehan & Shaffer, 2024 (PMC11310264); Bae et al., 2021 (PubMed 34289128).',
  },
  {
    id: '5-5',
    name: '5-5 Coherent Breathing',
    tagline: 'Steady focus & balance',
    bestFor: ['BP support', 'HRV training', 'Steady focus'],
    instructions: [
      'Sit or lie; jaw and throat relaxed.',
      'Inhale for 5s through the nose.',
      'Exhale for 5s through the nose.',
      'Maintain a smooth, light, continuous rhythm.',
    ],
    phases: [
      { name: 'Inhale', instruction: 'Breathe In...', duration: 5 },
      { name: 'Exhale', instruction: 'Breathe Out...', duration: 5 },
    ],
    whyItWorks: "Breathing at a rhythm of ~6 breaths/min couples with the body's baroreflex rhythm, improving heart rate variability (HRV) and promoting balanced alertness. Key Evidence: Chaitanya et al., 2022 (PMC8924557); Steffen et al., 2017 (PMC5575449); Garg et al., 2023 (PMC10765252).",
  },
  {
    id: 'cyclic-sighing',
    name: 'Cyclic Sighing',
    tagline: 'Fast reset for anxiety',
    bestFor: ['Acute anxiety relief', 'Quick reset', 'Emotional release'],
    instructions: [
      'Inhale through the nose, filling about 2/3 of your lungs.',
      'Take a short, second sip of air to fully inflate the lungs.',
      'Let go with a long, unforced exhale through the mouth.',
    ],
    phases: [
      { name: 'Inhale', instruction: 'Breathe In...', duration: 3 },
      { name: 'Inhale Pause', instruction: '', duration: 0.5 },
      { name: 'Sip Inhale', instruction: 'Sip more air...', duration: 2 },
      { name: 'Exhale', instruction: 'Long sigh out...', duration: 6 },
    ],
    whyItWorks: 'The double inhale helps to reinflate tiny air sacs (alveoli) in the lungs. The long exhale then triggers a strong parasympathetic response, leading to a quick drop in arousal and stress. Key Evidence: Balban et al., 2023 (PMC9873947).',
  },
  {
    id: 'humming-breath',
    name: 'Humming Breath',
    tagline: 'Gentle calm & mood lift',
    bestFor: ['Mood lift', 'Vagal tone', 'Sinus/sleep support'],
    instructions: [
      'Inhale gently through the nose.',
      'Exhale with a soft, continuous "mmm" hum.',
      'Keep your mouth closed and jaw relaxed.',
      'Avoid straining your throat or ears.',
    ],
    phases: [
      { name: 'Inhale', instruction: 'Breathe In...', duration: 4 },
      { name: 'Hum', instruction: 'Hum Out...', duration: 6 },
    ],
    whyItWorks: 'Humming boosts nasal nitric oxide, a molecule that helps with circulation and respiration. The vibration also provides gentle stimulation to the vagus nerve, promoting a calm, clear state. Key Evidence: Weitzberg & Lundberg, 2002 (PubMed 12119224); Upadhyay et al., 2023 (PMC10388195).',
  },
];