
import React, { useEffect, useRef } from 'react';
import { AuditLogEntry } from '../types';
import { Terminal, User, Cpu, Shield, Activity, Hash } from 'lucide-react';

interface AuditLogProps {
  logs: AuditLogEntry[];
}

export const AuditLog: React.FC<AuditLogProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to newest log
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getIcon = (actor: AuditLogEntry['actor']) => {
    switch (actor) {
      case 'User': return <User className="w-3 h-3 text-blue-400" />;
      case 'AI_Agent': return <Cpu className="w-3 h-3 text-gold-500" />;
      case 'System': return <Shield className="w-3 h-3 text-purple-400" />;
      default: return <Activity className="w-3 h-3 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 border-t border-slate-800 pt-8 animate-fade-in">
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-80">
        {/* Header */}
        <div className="bg-slate-900/80 backdrop-blur px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-slate-800 rounded-md border border-slate-700">
               <Terminal className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">Immutable Audit Ledger</h3>
              <p className="text-[10px] text-slate-500 font-mono">SHA-256 CHAIN VERIFIED</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <span className="text-[10px] text-green-500 font-mono">LIVE</span>
          </div>
        </div>

        {/* Logs Container */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-4 space-y-1 font-mono text-xs scroll-smooth custom-scrollbar bg-[#0a0e17]"
        >
          {logs.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-700">
               <p>Waiting for protocol initialization...</p>
            </div>
          )}
          
          {logs.map((log) => (
            <div 
              key={log.id} 
              className="group flex items-start space-x-3 p-2 hover:bg-slate-900/50 rounded transition-colors border border-transparent hover:border-slate-800/50"
            >
              {/* Timestamp */}
              <span className="text-slate-600 shrink-0 select-none">
                {new Date(log.timestamp).toLocaleTimeString('en-US', { hour12: false })}
              </span>

              {/* Actor Icon */}
              <div className="pt-0.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                {getIcon(log.actor)}
              </div>

              {/* Content */}
              <div className="flex-grow break-words">
                <span className={`font-bold mr-2 ${
                  log.actor === 'User' ? 'text-blue-400' : 
                  log.actor === 'AI_Agent' ? 'text-gold-400' : 'text-purple-400'
                }`}>
                  {log.actor === 'AI_Agent' ? 'SPHINX_AGENT' : log.actor.toUpperCase()}:
                </span>
                <span className="text-slate-300">{log.action}</span>
                {log.details && (
                  <p className="text-slate-500 mt-0.5 pl-2 border-l-2 border-slate-800">
                    {log.details}
                  </p>
                )}
              </div>

              {/* Hash */}
              <div className="shrink-0 flex items-center text-[10px] text-slate-700 font-mono select-none group-hover:text-slate-600 transition-colors">
                <Hash className="w-3 h-3 mr-1 opacity-50" />
                {log.hash?.substring(0, 8)}...
              </div>
            </div>
          ))}
          
          {/* Terminal Cursor */}
          <div className="flex items-center space-x-2 p-2 opacity-50">
             <span className="text-green-500">➜</span>
             <span className="w-2 h-4 bg-green-500/50 animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
