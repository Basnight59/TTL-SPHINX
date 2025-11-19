import React from 'react';
import { ShieldCheck, Activity, Lock, RefreshCw } from 'lucide-react';
import { FaithFrameworkId, AppState } from '../types';
import { FRAMEWORKS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onReset: () => void;
  currentFramework: FaithFrameworkId | null;
  step: AppState;
}

export const Layout: React.FC<LayoutProps> = ({ children, onReset, currentFramework, step }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
            <div className="bg-gradient-to-br from-gold-400 to-gold-600 p-2 rounded-lg shadow-lg shadow-gold-500/20">
              <ShieldCheck className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-slate-100 tracking-wide">
                TTL<span className="text-gold-500">-</span>SPHINX
              </h1>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Governance Layer</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {currentFramework && (
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                <span className="text-sm text-slate-300 font-medium">
                  {FRAMEWORKS[currentFramework].name} Active
                </span>
              </div>
            )}
            
            <div className="flex items-center text-xs text-slate-500 space-x-4">
              <div className="flex items-center">
                <Lock className="w-3 h-3 mr-1" />
                <span>Secure</span>
              </div>
              <div className="flex items-center">
                <Activity className="w-3 h-3 mr-1" />
                <span>v1.0.4</span>
              </div>
              {step !== 'selection' && (
                  <button 
                    onClick={onReset}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                    title="Reset"
                  >
                      <RefreshCw className="w-4 h-4" />
                  </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col relative">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex-grow flex flex-col">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-sm">
            © 2024 TTL-SPHINX Demo. Transcendental Technologies of Liberation.
          </p>
        </div>
      </footer>
    </div>
  );
};
