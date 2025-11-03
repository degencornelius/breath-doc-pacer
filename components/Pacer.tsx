import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { BreathingTechnique } from '../types';

interface PacerProps {
  technique: BreathingTechnique;
  duration: number; // in seconds
  onEndSession: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const Pacer: React.FC<PacerProps> = ({ technique, duration, onEndSession }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(technique.phases[0].duration);
  const [volume, setVolume] = useState(0.5); // Volume state from 0 to 1
  const [isReady, setIsReady] = useState(false); // State to handle initial animation
  const isInitialPlayRef = useRef(true); // Tracks if it's the first play to cue audio correctly

  const currentPhase = technique.phases[phaseIndex];
  const totalCycleTime = useMemo(
    () => technique.phases.reduce((sum, phase) => sum + phase.duration, 0),
    [technique.phases]
  );

  const inhaleAudio = useMemo(() => new Audio('https://www.breathsciencelab.com/content/media/2025/11/inhale-1.mp3'), []);
  const exhaleAudio = useMemo(() => new Audio('https://www.breathsciencelab.com/content/media/2025/11/exhale-1.mp3'), []);

  useEffect(() => {
    inhaleAudio.volume = volume;
    exhaleAudio.volume = volume;
  }, [volume, inhaleAudio, exhaleAudio]);

  useEffect(() => {
    const readyTimer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onEndSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isReady, onEndSession]);

  // Unified effect for phase transitions and all audio cues.
  useEffect(() => {
    if (!isReady) return;

    // This is true on the initial play.
    const isStarting = isInitialPlayRef.current;

    if (isStarting) {
      const currentPhaseName = currentPhase.name;
      if (currentPhaseName === 'Inhale' || currentPhaseName === 'Sip Inhale') {
        inhaleAudio.currentTime = 0;
        inhaleAudio.play().catch(e => console.error("Audio play failed:", e));
      } else if (currentPhaseName === 'Exhale' || currentPhaseName === 'Hum') {
        exhaleAudio.currentTime = 0;
        exhaleAudio.play().catch(e => console.error("Audio play failed:", e));
      }
      // We've handled the start audio, so set the ref to false for subsequent phase changes.
      isInitialPlayRef.current = false;
    }

    const phaseStartTime = Date.now();
    const countdownInterval = setInterval(() => {
      const elapsedSeconds = (Date.now() - phaseStartTime) / 1000;
      setPhaseTimeLeft(Math.max(0, currentPhase.duration - elapsedSeconds));
    }, 100);

    const phaseTimeout = setTimeout(() => {
      const nextPhaseIndex = (phaseIndex + 1) % technique.phases.length;
      const nextPhase = technique.phases[nextPhaseIndex];
      const nextPhaseName = nextPhase.name;

      // Play audio for the *upcoming* transitional phase.
      if (nextPhaseName === 'Inhale' || nextPhaseName === 'Sip Inhale') {
        inhaleAudio.currentTime = 0;
        inhaleAudio.play().catch(e => console.error("Audio play failed:", e));
      } else if (nextPhaseName === 'Exhale' || nextPhaseName === 'Hum') {
        exhaleAudio.currentTime = 0;
        exhaleAudio.play().catch(e => console.error("Audio play failed:", e));
      }

      setPhaseIndex(nextPhaseIndex);
    }, currentPhase.duration * 1000);

    return () => {
      clearTimeout(phaseTimeout);
      clearInterval(countdownInterval);
    };
  }, [phaseIndex, isReady, technique.phases, inhaleAudio, exhaleAudio, currentPhase]);


  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  const getOrbColor = (): string => {
    const phaseName = currentPhase.name;
    const inhaleColor = '#2D6B7A'; // Dark Teal
    const exhaleColor = '#4C3B7A'; // Dark Purple

    if (technique.id === 'cyclic-sighing') {
        if (phaseName === 'Inhale') return inhaleColor;
        if (phaseName === 'Sip Inhale') return '#99345D'; // Dark Pink
        if (phaseName === 'Exhale') return exhaleColor;
        return inhaleColor; // Color during pause
    }
    if (phaseName.includes('Inhale')) return inhaleColor;
    if (phaseName.includes('Exhale') || phaseName.includes('Hum')) return exhaleColor;
    return inhaleColor;
  };

  const getScale = (): number => {
    if (!isReady) {
      return 0.6; // Start contracted
    }

    if (technique.id === 'cyclic-sighing') {
      if (currentPhase.name === 'Inhale') return 0.8;
      if (currentPhase.name === 'Inhale Pause') return 0.8;
      if (currentPhase.name === 'Sip Inhale') return 1.0;
      return 0.6; // Exhale
    }

    // Default logic for other techniques
    if (currentPhase.name.toLowerCase().includes('inhale')) {
      return 1.0;
    }
    
    // Exhale or Hum
    return 0.6;
  };
  
  const scale = getScale();
  const orbColor = getOrbColor();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-6">
      <header className="w-full max-w-2xl flex justify-between items-center mb-6">
         <button onClick={onEndSession} className="text-[#d7ceff] hover:text-white transition-colors duration-200 text-sm">
           &larr; Back to menu
         </button>
         <div className="text-lg tracking-widest text-white">
           {formatTime(timeLeft)}
         </div>
       </header>

      <div className="w-full max-w-2xl flex-grow flex flex-col items-center p-6 border-2 border-[#61f2f2]/30 rounded-2xl shadow-[0_0_25px_rgba(97,242,242,0.2)] bg-black/20 backdrop-blur-sm">
        <main className="flex-grow flex flex-col items-center justify-center text-center">
            <div
                className="w-48 h-48 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center transition-all ease-linear"
                style={{
                    transform: `scale(${scale})`,
                    transitionDuration: `${currentPhase.duration}s`,
                    backgroundColor: orbColor,
                }}
            >
                {currentPhase.name !== 'Inhale Pause' && (
                    <>
                        <p className="text-3xl md:text-4xl font-semibold text-white">
                            {currentPhase.instruction}
                        </p>
                        <p className="text-5xl md:text-7xl font-bold text-white mt-2">
                            {Math.ceil(phaseTimeLeft)}
                        </p>
                    </>
                )}
            </div>
            
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-[#61f2f2]">{technique.name}</h2>
                <p className="text-[#d7ceff] mt-2">{totalCycleTime > 0 ? `${Math.floor((duration - timeLeft) / totalCycleTime) + 1}/${Math.ceil(duration / totalCycleTime)} cycles` : 'Starting...'}</p>
            </div>
        </main>
        
        <footer className="flex flex-col items-center gap-4 w-full max-w-xs">
            <div className="flex items-center gap-2 w-full" aria-label="Volume control">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d7ceff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-[#65738f] rounded-lg appearance-none cursor-pointer accent-[#ff5da2]"
                />
            </div>
            <button 
              onClick={onEndSession} 
              className="bg-[#2d3748] hover:bg-[#1a202c] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
            >
              End Session
            </button>
        </footer>
      </div>
    </div>
  );
};