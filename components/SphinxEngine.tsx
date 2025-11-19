
import React, { useState, useEffect } from 'react';
import { FaithFrameworkId, SphinxResponse } from '../types';
import { FRAMEWORKS, SPHINX_LETTERS } from '../constants';
import { CheckCircle, Eye, Fingerprint, Scale, Cpu, Network, ArrowRight } from 'lucide-react';

interface SphinxEngineProps {
  data: SphinxResponse;
  frameworkId: FaithFrameworkId;
  onComplete: () => void;
}

const STEP_DURATION = 3500; // Increased duration to show "Handoff" state
const CONSENT_STEP_INDEX = 3; // Index for 'Investigate'

export const SphinxEngine: React.FC<SphinxEngineProps> = ({ data, frameworkId, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isHandoff, setIsHandoff] = useState(false); // State for "Routing..." animation
  const [isPausedForConsent, setIsPausedForConsent] = useState(false);
  const [consentGranted, setConsentGranted] = useState(false);
  
  const framework = FRAMEWORKS[frameworkId];

  // Map data keys to index
  const dataKeys: (keyof SphinxResponse)[] = ['scrutinize', 'probe', 'hypothesize', 'investigate', 'narrow', 'execute'];
  
  useEffect(() => {
    if (isPausedForConsent) return;

    if (currentStepIndex >= 6) {
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }

    if (currentStepIndex === CONSENT_STEP_INDEX && !consentGranted) {
      setIsPausedForConsent(true);
      return;
    }

    // Start Handoff Animation
    setIsHandoff(true);
    const handoffTimer = setTimeout(() => {
        setIsHandoff(false);
    }, 1200); // 1.2s handoff animation

    const stepTimer = setTimeout(() => {
      setCurrentStepIndex(prev => prev + 1);
    }, STEP_DURATION);

    return () => {
        clearTimeout(handoffTimer);
        clearTimeout(stepTimer);
    };
  }, [currentStepIndex, isPausedForConsent, consentGranted, onComplete]);

  const handleGrantConsent = () => {
    setConsentGranted(true);
    setIsPausedForConsent(false);
    // Next step triggers handoff automatically
  };

  const renderStepContent = (index: number) => {
    if (index > currentStepIndex) return null;
    
    const key = dataKeys[index];
    const content = data?.[key];
    if (!content) return <p className="text-slate-500 italic">Initializing analysis...</p>;

    const renderDetails = () => {
      if (key === 'scrutinize') {
        const issues = (content as any).flagged_issues || [];
        return (
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              {issues.length > 0 ? issues.map((issue: string, i: number) => (
                  <li key={i} className="text-red-300">{issue}</li>
              )) : (
                  <li className="text-green-400">No critical flags found.</li>
              )}
          </ul>
        );
      }
      if (key === 'investigate') return (
        <p className="text-sm text-gold-300 italic">"{(content as any).ethical_alignment || 'Pending alignment check...'}"</p>
      );
      if (key === 'execute') return (
        <div className="bg-slate-800/50 p-2 rounded border border-slate-700 mt-2">
             <p className="text-xs text-slate-400 uppercase">Attestation</p>
             <p className="text-sm text-green-400">{(content as any).final_attestation || 'Approved'}</p>
        </div>
      );
      if (key === 'narrow') {
         const steps = (content as any).actionable_steps || [];
         return (
             <ul className="list-decimal list-inside text-sm text-slate-300 space-y-1">
                {steps.slice(0,3).map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                ))}
             </ul>
         )
      }
      
      const displayValues = Object.values(content).filter(v => typeof v === 'string' && v !== (content as any).agent?.name);
      if (displayValues.length > 0) {
          return <p className="text-sm text-slate-300">{displayValues[0] as string}</p>;
      }
      return <p className="text-sm text-slate-400 line-clamp-3">{JSON.stringify(content).slice(0, 100)}...</p>
    };

    return (
      <div className="mt-2 animate-fade-in-up">
        {renderDetails()}
      </div>
    );
  };

  // Get current agent for display
  const activeKey = dataKeys[currentStepIndex] || 'execute';
  const activeAgent = data?.[activeKey]?.agent;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 h-[600px]">
      
      {/* Left: Steps List */}
      <div className="w-full md:w-1/3 flex flex-col justify-between py-4">
        {SPHINX_LETTERS.map((letter, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const termKey = Object.keys(framework.terms)[index] as keyof typeof framework.terms;
          const term = framework.terms[termKey];
          const agent = data?.[dataKeys[index]]?.agent;

          return (
            <div 
              key={letter} 
              className={`
                relative flex items-center p-3 rounded-xl border transition-all duration-500
                ${isActive 
                  ? 'bg-slate-800/80 border-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] translate-x-2' 
                  : isCompleted 
                    ? 'bg-slate-900/50 border-slate-800 opacity-60' 
                    : 'bg-transparent border-transparent opacity-30'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mr-3 shrink-0
                ${isActive || isCompleted ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 text-slate-500'}
              `}>
                {letter}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center">
                    <h4 className={`text-sm font-bold truncate ${isActive ? 'text-gold-400' : 'text-slate-200'}`}>
                    {term}
                    </h4>
                    {/* Small agent badge on completed/active steps */}
                    {(isActive || isCompleted) && agent && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 ${agent.color} ml-2 truncate max-w-[80px]`}>
                            {agent.provider}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                     <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                        Phase {index + 1}
                     </span>
                </div>
              </div>
              {isCompleted && <CheckCircle className="absolute right-3 w-4 h-4 text-green-500" />}
              {isActive && <ActivityIcon />}
            </div>
          );
        })}
      </div>

      {/* Right: Active Visualizer */}
      <div className="w-full md:w-2/3 relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
        
        {/* Handoff Overlay */}
        {isHandoff && activeAgent && (
            <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                <Network className="w-12 h-12 text-blue-500 animate-pulse mb-4" />
                <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Initiating Handoff Protocol</p>
                <div className="flex items-center space-x-3 text-xl text-slate-200">
                    <span>Routing to</span>
                    <span className={`font-bold ${activeAgent.color}`}>{activeAgent.name}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">{activeAgent.role}</p>
            </div>
        )}

        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center z-10">
            <div className="flex items-center">
                <Eye className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-slate-300 font-mono text-sm">ISNĀD_CHAIN_MONITOR</span>
            </div>
            <div className="flex items-center space-x-4">
                {activeAgent && (
                    <div className="flex items-center px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
                        <Cpu className={`w-3 h-3 mr-2 ${activeAgent.color}`} />
                        <span className="text-xs text-slate-300">
                            Active: <span className={activeAgent.color}>{activeAgent.name}</span>
                        </span>
                    </div>
                )}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-8 relative overflow-y-auto scrollbar-hide">
             {/* Background lines */}
             <div className="absolute inset-0 pointer-events-none opacity-10">
                 <div className="absolute top-10 left-10 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                 <div className="absolute bottom-10 left-10 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
             </div>

             {/* Consent Modal */}
             {isPausedForConsent ? (
               <div className="absolute inset-0 z-30 bg-slate-950/95 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-gold-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                    <Scale className="w-10 h-10 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-slate-100 mb-2">
                    {framework.consentTitle}
                  </h2>
                  
                  {/* Agent Attribution for Consent */}
                  <div className="flex items-center justify-center space-x-2 mb-6 bg-slate-900 px-4 py-1 rounded-full border border-slate-800">
                     <span className="text-xs text-slate-500">Analysis provided by:</span>
                     <span className="text-xs font-bold text-purple-400">Claude 3 Opus</span>
                  </div>

                  <p className="text-slate-300 max-w-lg mb-8 text-lg leading-relaxed">
                    {framework.consentDescription}
                  </p>
                  
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 mb-8 w-full max-w-md">
                    <p className="text-xs text-slate-500 uppercase mb-1">Ethical Findings</p>
                    <p className="text-slate-200 italic">"{data?.investigate?.ethical_alignment || '...'}"</p>
                  </div>

                  <button
                    onClick={handleGrantConsent}
                    className="group relative px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg text-slate-900 font-bold text-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all active:scale-95"
                  >
                    <span className="flex items-center">
                      <Fingerprint className="w-6 h-6 mr-2 opacity-75" />
                      Authorize & Proceed
                    </span>
                  </button>
               </div>
             ) : (
               /* Steps Visualization */
               <div className="space-y-6 pb-12">
                  {dataKeys.map((key, i) => {
                      if (i > currentStepIndex) return null;
                      const stepAgent = data?.[key]?.agent;
                      const isActive = i === currentStepIndex;
                      
                      return (
                          <div key={key} className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                              <div className="flex items-center mb-2 space-x-2">
                                <h3 className="text-gold-500 font-mono text-xs uppercase tracking-widest">
                                    {SPHINX_LETTERS[i]} • {framework.terms[key as keyof typeof framework.terms]}
                                </h3>
                                <div className="h-px flex-grow bg-slate-800"></div>
                                {stepAgent && (
                                    <span className={`text-[10px] ${stepAgent.color}`}>
                                        via {stepAgent.name}
                                    </span>
                                )}
                              </div>
                              
                              <div className={`
                                text-slate-100 p-4 rounded-lg border font-mono text-sm relative overflow-hidden
                                ${isActive ? 'bg-slate-800/50 border-gold-500/30' : 'bg-slate-900 border-slate-800'}
                              `}>
                                  {/* Subtle background agent logo/text watermark */}
                                  {stepAgent && (
                                      <div className="absolute top-2 right-2 opacity-10 pointer-events-none font-black text-2xl select-none">
                                          {stepAgent.provider}
                                      </div>
                                  )}
                                  {renderStepContent(i)}
                              </div>
                              
                              {/* Connector Line */}
                              {i < currentStepIndex && (
                                  <div className="flex justify-center my-2">
                                      <ArrowRight className="w-4 h-4 text-slate-700 rotate-90" />
                                  </div>
                              )}
                          </div>
                      )
                  })}
               </div>
             )}
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = () => (
  <div className="absolute right-3 top-3 flex space-x-1">
    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
  </div>
);
