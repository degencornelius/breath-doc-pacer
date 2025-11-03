import React, { useState, useCallback } from 'react';
import { TechniqueSelector } from './components/TechniqueSelector';
import { Pacer } from './components/Pacer';
import type { BreathingTechnique } from './types';
import { BREATHING_TECHNIQUES } from './constants';

const App: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [sessionDuration, setSessionDuration] = useState<number>(0);

  const handleStartSession = useCallback((technique: BreathingTechnique, duration: number) => {
    setSelectedTechnique(technique);
    setSessionDuration(duration);
  }, []);

  const handleEndSession = useCallback(() => {
    setSelectedTechnique(null);
    setSessionDuration(0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1b4c] to-[#000000] text-[#d7ceff] flex flex-col items-center justify-center p-4 transition-all duration-500">
      {selectedTechnique && sessionDuration > 0 ? (
        <Pacer
          technique={selectedTechnique}
          duration={sessionDuration}
          onEndSession={handleEndSession}
        />
      ) : (
        <TechniqueSelector
          techniques={BREATHING_TECHNIQUES}
          onStartSession={handleStartSession}
        />
      )}
    </div>
  );
};

export default App;