import React from 'react';
import { FRAMEWORKS } from '../constants';
import { FaithFramework, FaithFrameworkId } from '../types';
import { Moon, Star, Cross, Globe } from 'lucide-react';

interface FrameworkSelectorProps {
  onSelect: (id: FaithFrameworkId) => void;
}

const IconMap: Record<string, React.ElementType> = {
  Moon, Star, Cross, Globe
};

export const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {(Object.values(FRAMEWORKS) as FaithFramework[]).map((fw) => {
        const Icon = IconMap[fw.icon];
        return (
          <button
            key={fw.id}
            onClick={() => onSelect(fw.id)}
            className="group relative overflow-hidden bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-gold-500/50 rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icon className="w-32 h-32 text-gold-500" />
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold-500/20 group-hover:text-gold-400 transition-colors text-slate-400">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-100 mb-2">
                {fw.name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {fw.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-500">
                  {fw.terms.scrutinize}
                </span>
                <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-500">
                  {fw.terms.investigate}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};