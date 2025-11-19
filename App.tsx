import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { FrameworkSelector } from './components/FrameworkSelector';
import { SphinxEngine } from './components/SphinxEngine';
import { HobArtifact } from './components/HobArtifact';
import { generateSphinxAnalysis } from './services/geminiService';
import { FaithFrameworkId, SphinxResponse, AppState } from './types';
import { Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { FRAMEWORKS } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('selection');
  const [selectedFramework, setSelectedFramework] = useState<FaithFrameworkId | null>(null);
  const [query, setQuery] = useState('');
  const [sphinxData, setSphinxData] = useState<SphinxResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFrameworkSelect = (id: FaithFrameworkId) => {
    setSelectedFramework(id);
    setAppState('input');
  };

  const handleStartAnalysis = async () => {
    if (!query.trim() || !selectedFramework) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateSphinxAnalysis(query, selectedFramework);
      setSphinxData(result);
      setAppState('processing');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred connecting to the S.P.H.I.N.X. engine.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProcessingComplete = () => {
    setAppState('complete');
  };

  const handleReset = () => {
    setAppState('selection');
    setSelectedFramework(null);
    setQuery('');
    setSphinxData(null);
    setError(null);
  };

  return (
    <Layout 
      onReset={handleReset} 
      currentFramework={selectedFramework}
      step={appState}
    >
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* STATE: SELECTION */}
        {appState === 'selection' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-100 mb-4 tracking-tight">
                Choose Your <span className="text-gold-400">Governance Framework</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                The S.P.H.I.N.X. protocol aligns AI reasoning with your ethical and spiritual commitments. Select a foundation to begin.
              </p>
            </div>
            <FrameworkSelector onSelect={handleFrameworkSelect} />
          </div>
        )}

        {/* STATE: INPUT */}
        {appState === 'input' && selectedFramework && (
          <div className="animate-fade-in w-full max-w-2xl mx-auto">
             <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-slate-100 mb-2">
                Initialize Protocol
              </h2>
              <p className="text-slate-400">
                Enter the query or decision requiring ethical oversight.
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <textarea
                className="w-full h-40 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-600"
                placeholder="E.g., 'Draft a response to a sensitive medical inquiry regarding end-of-life care options...'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isGenerating}
              />
              
              {/* Sample Queries Buttons */}
              <div className="mt-4">
                 <p className="text-xs text-slate-500 uppercase font-medium mb-2 flex items-center">
                   <Sparkles className="w-3 h-3 mr-1 text-gold-500" />
                   Quick Try:
                 </p>
                 <div className="grid grid-cols-1 gap-2">
                   {FRAMEWORKS[selectedFramework].sampleQueries.map((sample, idx) => (
                     <button
                       key={idx}
                       onClick={() => setQuery(sample)}
                       className="text-left text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded transition-colors truncate border border-transparent hover:border-slate-600"
                       title={sample}
                     >
                       {sample}
                     </button>
                   ))}
                 </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleStartAnalysis}
                  disabled={!query.trim() || isGenerating}
                  className={`
                    flex items-center px-8 py-3 rounded-lg font-medium transition-all
                    ${!query.trim() || isGenerating 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-gold-500 hover:bg-gold-400 text-slate-900 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    }
                  `}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Consulting Engine...
                    </>
                  ) : (
                    'Execute S.P.H.I.N.X.'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STATE: PROCESSING */}
        {appState === 'processing' && sphinxData && selectedFramework && (
          <SphinxEngine
            data={sphinxData}
            frameworkId={selectedFramework}
            onComplete={handleProcessingComplete}
          />
        )}

        {/* STATE: COMPLETE */}
        {appState === 'complete' && sphinxData && selectedFramework && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-slate-100 mb-2">
                <span className="text-green-400">✓</span> Governance Complete
              </h2>
              <p className="text-slate-400">
                The oversight block has been generated and cryptographically sealed.
              </p>
            </div>
            <HobArtifact 
              data={sphinxData} 
              frameworkId={selectedFramework} 
              query={query} 
            />
            <div className="mt-8 flex justify-center">
               <button 
                 onClick={handleReset}
                 className="px-6 py-2 text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 rounded-lg transition-colors"
               >
                 Start New Inquiry
               </button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default App;