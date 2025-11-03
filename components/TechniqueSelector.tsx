import React, { useState } from 'react';
import type { BreathingTechnique } from '../types';

interface TechniqueSelectorProps {
  techniques: BreathingTechnique[];
  onStartSession: (technique: BreathingTechnique, duration: number) => void;
}

const TechniqueCard: React.FC<{
  technique: BreathingTechnique;
  onSelect: (duration: number) => void;
}> = ({ technique, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const durations = [
    { label: '2 min', value: 120 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
  ];

  const [howItWorksText, keyEvidenceText] = technique.whyItWorks.split('Key Evidence:');

  const renderEvidenceLinks = (evidenceString?: string) => {
    if (!evidenceString) return null;

    const studies = evidenceString.trim().replace(/\.$/, '').split(';').map(s => s.trim());

    return (
      <ul className="list-none text-[#d7ceff] text-sm space-y-2">
        {studies.map((study, index) => {
          if (!study) return null;
          const parts = study.split(/(\(PMC\d+\)|\(PubMed\s?\d+\))/g);
          
          return (
            <li key={index}>
              {parts.map((part, partIndex) => {
                const pmcMatch = part.match(/\(PMC(\d+)\)/);
                if (pmcMatch) {
                  const pmcId = pmcMatch[1];
                  return (
                    <a
                      key={partIndex}
                      href={`https://www.ncbi.nlm.nih.gov/pmc/articles/PMC${pmcId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#61f2f2] hover:underline"
                    >
                      {part}
                    </a>
                  );
                }

                const pubmedMatch = part.match(/\(PubMed\s?(\d+)\)/);
                if (pubmedMatch) {
                  const pubmedId = pubmedMatch[1];
                  return (
                    <a
                      key={partIndex}
                      href={`https://pubmed.ncbi.nlm.nih.gov/${pubmedId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#61f2f2] hover:underline"
                    >
                      {part}
                    </a>
                  );
                }

                return <span key={partIndex}>{part}</span>;
              })}
            </li>
          );
        })}
      </ul>
    );
  };


  return (
    <div className="bg-[#65738f]/10 backdrop-blur-sm border border-[#65738f]/30 rounded-xl p-6 transition-all duration-300 hover:border-[#61f2f2] hover:bg-[#65738f]/20 shadow-lg">
      <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <h3 className="text-xl font-bold text-[#61f2f2]">{technique.tagline}</h3>
        <p className="text-[#d7ceff] mt-1">{technique.name}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {technique.bestFor.map((item) => (
            <span key={item} className="text-xs bg-[#ff5da2]/20 text-[#ff5da2] px-2 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-[#65738f]/30">
          <p className="text-sm font-semibold text-white mb-2">How it works:</p>
          <p className="text-[#d7ceff] text-sm mb-4">{howItWorksText.trim()}</p>
          
          <p className="text-sm font-semibold text-white mb-2">How to do it:</p>
          <ul className="list-disc list-inside text-[#d7ceff] text-sm space-y-1 mb-4">
            {technique.instructions.map((inst, index) => (
              <li key={index}>{inst}</li>
            ))}
          </ul>

          {keyEvidenceText && (
             <div className="mb-4">
                <p className="text-sm font-semibold text-white mb-2">Key Evidence:</p>
                {renderEvidenceLinks(keyEvidenceText)}
             </div>
          )}

          <div className="flex items-center justify-center gap-3">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => onSelect(d.value)}
                className="w-full bg-[#ff5da2] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#ffad9e] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff5da2] focus:ring-offset-2 focus:ring-offset-[#0d1b4c]"
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TechniqueSelector: React.FC<TechniqueSelectorProps> = ({ techniques, onStartSession }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-8">
      <header className="text-center">
        <img
          src="https://www.breathsciencelab.com/content/images/2025/11/BreathScience-Lab---3.png"
          alt="Breath Science Lab Logo"
          className="mx-auto w-40 h-40 mb-4"
        />
        <p className="text-lg text-[#d7ceff]">
          Choose your goal, and get the gentle, science-backed breath to match.
        </p>
      </header>
      <div className="space-y-4">
        {techniques.map((tech) => (
          <TechniqueCard
            key={tech.id}
            technique={tech}
            onSelect={(duration) => onStartSession(tech, duration)}
          />
        ))}
      </div>
      <footer className="text-center text-[#65738f] text-xs p-4 bg-[#65738f]/10 rounded-lg">
        <p className="font-bold mb-1">Safety First</p>
        <p>This is non-medical guidance. Stop if you feel dizzy, breathless, or panicky. Avoid long breath holds if you have cardiovascular, respiratory, or pregnancy-related concerns.</p>
      </footer>
    </div>
  );
};