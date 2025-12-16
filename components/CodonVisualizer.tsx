import React from 'react';
import { Codon } from '../types';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  codon: Codon;
  index: number;
}

export const CodonVisualizer: React.FC<Props> = ({ codon, index }) => {
  // We visualize the bits in a more organic "matrix" style
  // Breaking string into varying chunks to simulate complexity
  const bitChunks = codon.bits.match(/.{1,16}/g) || [];

  return (
    <div className="relative bg-slate-950/40 border border-phi-900/30 rounded-2xl p-5 hover:border-phi-500/40 hover:bg-slate-900/60 transition-all duration-500 group overflow-hidden">
      {/* Decorative fractal corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-phi-500/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-phi-400 font-serif font-bold border border-phi-800/50 shadow-inner">
            {index + 1}
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Codon Identity</div>
            <div className="font-mono text-xs text-phi-300/80 tracking-wider">{codon.id}</div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-slate-900/80 text-[10px] text-slate-400 font-mono border border-slate-800 group-hover:border-phi-500/30 transition-colors">
             {codon.type}
        </div>
      </div>

      {/* Fractal Bit Grid Visualization */}
      {/* Using a flex layout with small blocks to look like data rain or DNA sequence */}
      <div className="flex flex-wrap gap-0.5 mb-5 p-3 rounded-xl bg-slate-950 border border-black/50 shadow-inner min-h-[100px] opacity-70 group-hover:opacity-100 transition-opacity">
        {bitChunks.map((chunk, i) => (
          <div key={i} className="flex">
            {chunk.split('').map((bit, j) => (
               <div 
                 key={`${i}-${j}`}
                 className={`w-[3px] h-[3px] rounded-full m-[1px] transition-colors duration-300 ${
                   bit === '1' 
                     ? 'bg-phi-400 shadow-[0_0_2px_rgba(45,212,191,0.5)]' 
                     : 'bg-slate-800/50'
                 }`}
               />
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 relative z-10">
        <div className="flex flex-col items-center p-2 bg-slate-900/50 rounded-lg border border-slate-800/50 group-hover:border-phi-900/30 transition-colors">
          <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">H-Scale</span>
          <div className="flex items-center gap-1.5 text-phi-300 text-xs font-mono font-bold">
            <Zap size={10} />
            0.618
          </div>
        </div>
        <div className="flex flex-col items-center p-2 bg-slate-900/50 rounded-lg border border-slate-800/50 group-hover:border-neon-purple/20 transition-colors">
          <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Payload</span>
          <div className="flex items-center gap-1.5 text-neon-purple text-xs font-mono font-bold">
            <Cpu size={10} />
            400b
          </div>
        </div>
        <div className="flex flex-col items-center p-2 bg-slate-900/50 rounded-lg border border-slate-800/50 group-hover:border-emerald-500/20 transition-colors">
          <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Integrity</span>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold">
            <ShieldCheck size={10} />
            100%
          </div>
        </div>
      </div>
    </div>
  );
};