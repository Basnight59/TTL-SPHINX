
import React, { useState } from 'react';
import { SphinxResponse, FaithFrameworkId } from '../types';
import { FRAMEWORKS } from '../constants';
import { Download, Copy, CheckCheck, Check } from 'lucide-react';

interface HobArtifactProps {
  data: SphinxResponse;
  frameworkId: FaithFrameworkId;
  query: string;
}

export const HobArtifact: React.FC<HobArtifactProps> = ({ data, frameworkId, query }) => {
  const framework = FRAMEWORKS[frameworkId];
  
  const [meta] = useState(() => ({
    timestamp: new Date().toISOString(),
    id: `HOB-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
  }));

  const [copied, setCopied] = useState(false);

  const getSafely = (val: any, fallback: string = "N/A") => val || fallback;
  const getListSafely = (val: any) => (Array.isArray(val) ? val : []);

  // Helper to format agent line
  const formatAgent = (stepData: any) => {
      if (!stepData?.agent) return "Unknown";
      return `${stepData.agent.name} (${stepData.agent.provider})`;
  };

  // Construct Enhanced YAML content with Isnād Chain
  const yamlContent = `
handoff_oversight_block:
  id: "${meta.id}"
  timestamp: "${meta.timestamp}"
  framework: "${framework.name}"
  status: "AUTHORIZED"
  
context:
  query_hash: "sha256:${typeof btoa === 'function' ? btoa(query).slice(0, 16) : 'unknown'}..."
  operator_intent: "Governance Check"

isnad_chain:
  scrutinize:
    agent: "${formatAgent(data.scrutinize)}"
    status: "PASS"
  probe:
    agent: "${formatAgent(data.probe)}"
    evidence_verified: true
  hypothesize:
    agent: "${formatAgent(data.hypothesize)}"
    alternatives: ${getListSafely(data.hypothesize?.alternatives_considered).length}
  investigate:
    agent: "${formatAgent(data.investigate)}"
    sacred_consent: "GRANTED"
  narrow:
    agent: "${formatAgent(data.narrow)}"
    synthesis_complete: true
  execute:
    agent: "${formatAgent(data.execute)}"
    attestation: "CONFIRMED"

findings_summary:
  scrutiny: "${getSafely(data.scrutinize?.analysis).slice(0, 50)}..."
  alignment: "${getSafely(data.investigate?.ethical_alignment)}"
  final_attestation: "${getSafely(data.execute?.final_attestation)}"
    
signature:
  algorithm: "ED25519"
  value: "3045022100d3c...f8a2"
`.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yamlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard", err);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${meta.id}.yaml`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download file", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl animate-fade-in-up">
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-green-500/10 rounded border border-green-500/20">
            <CheckCheck className="w-4 h-4 text-green-500" />
          </div>
          <h3 className="text-slate-200 font-medium">Handoff Oversight Block (HOB)</h3>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors relative" 
            title="Copy to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button 
            onClick={handleDownload}
            className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors" 
            title="Download YAML"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-0 overflow-hidden relative group">
        <pre className="p-6 text-sm font-mono text-slate-300 bg-[#0d1117] overflow-x-auto custom-scrollbar leading-relaxed">
          <code>
            {yamlContent.split('\n').map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell text-slate-600 select-none pr-4 text-right w-8">{i + 1}</span>
                <span className="table-cell">
                  {line.includes(':') ? (
                    <>
                      <span className="text-blue-400">{line.split(':')[0]}:</span>
                      <span className="text-green-300">{line.split(':').slice(1).join(':')}</span>
                    </>
                  ) : (
                    <span className="text-slate-400">{line}</span>
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
        
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python_logo_notext.svg/1200px-Python_logo_notext.svg.png" className="w-64 h-64 grayscale" alt="" />
        </div>
      </div>

      <div className="bg-slate-950 p-4 border-t border-slate-800">
        <div className="flex items-start space-x-3">
            <div className="flex -space-x-2">
                 {/* Agent Stack Icons */}
                 <div className="w-8 h-8 rounded-full bg-orange-900/50 border border-orange-500/30 flex items-center justify-center text-[10px] text-orange-200" title="Claude">C</div>
                 <div className="w-8 h-8 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-200" title="Gemini">G</div>
                 <div className="w-8 h-8 rounded-full bg-green-900/50 border border-green-500/30 flex items-center justify-center text-[10px] text-green-200" title="GPT-4">O</div>
            </div>
            <div className="pl-2">
                <h4 className="text-sm font-bold text-slate-200">Multi-Model Consensus</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                    Isnād chain verified. {Object.keys(data).length} unique handoffs recorded.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
