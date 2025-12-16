import React, { useState, useEffect } from 'react';
import { 
  Dna, 
  Activity, 
  Terminal as TerminalIcon, 
  Layers, 
  Database, 
  Play, 
  Settings,
  Github,
  CheckCircle2,
  AlertCircle,
  Hexagon,
  Command
} from 'lucide-react';
import { Terminal } from './components/Terminal';
import { CodonVisualizer } from './components/CodonVisualizer';
import { simulatePipeline } from './services/acphiEngine';
import { Codon, GenomeStats, ProcessingLog } from './types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

// Mock data for charts
const PERFORMANCE_DATA = [
  { name: 'Base', val: 100 },
  { name: 'NGC', val: 65 },
  { name: 'CoD', val: 40 },
  { name: 'GKF-496', val: 18 },
];

const PHI_TIME_DATA = [
  { t: 0, v: 0.618, upper: 0.620, lower: 0.616 }, 
  { t: 1, v: 0.6181, upper: 0.621, lower: 0.615 }, 
  { t: 2, v: 0.6179, upper: 0.619, lower: 0.617 }, 
  { t: 3, v: 0.6180, upper: 0.620, lower: 0.616 }, 
  { t: 4, v: 0.6182, upper: 0.622, lower: 0.614 }, 
  { t: 5, v: 0.6180, upper: 0.620, lower: 0.616 }
];

// Golden Spiral SVG Component
const GoldenSpiralBg = () => (
  <svg className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-5 pointer-events-none z-0" viewBox="0 0 100 100">
    <path 
      d="M100,0 L0,0 L0,100 L61.8,100 L61.8,38.2 L23.6,38.2 L23.6,76.4 L47.2,76.4 L47.2,52.8 L32.6,52.8" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="0.2"
      className="text-phi-400" 
    />
    <path
      d="M100,0 A100,100 0 0 0 0,100 A61.8,61.8 0 0 0 61.8,38.2 A38.2,38.2 0 0 0 23.6,76.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-phi-500"
    />
  </svg>
);

function App() {
  const [view, setView] = useState<'dashboard' | 'pipeline' | 'genome' | 'cli'>('dashboard');
  const [corpus, setCorpus] = useState(`L'ACΦ-496 est l'ADN des IA du futur. Il combine GKF-496 (496 bits/codon), extraction neuro-symbolique (NGC), et Φ-éthique (H-Scale=0.618) pour créer des systèmes alignés.`);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<ProcessingLog[]>([]);
  const [codons, setCodons] = useState<Codon[]>([]);
  
  const [stats, setStats] = useState<GenomeStats>({
    totalBits: 0,
    codonsCount: 0,
    compressionRatio: 0,
    phiScore: 0.618,
    integrity: 100
  });

  const addLog = (stage: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      stage: stage as any,
      message,
      status: 'active'
    }]);
  };

  const runPipeline = async () => {
    setIsProcessing(true);
    setLogs([]);
    setCodons([]);
    
    try {
      const result = await simulatePipeline(corpus, addLog);
      setCodons(result);
      setStats({
        totalBits: result.length * 496,
        codonsCount: result.length,
        compressionRatio: 4.8,
        phiScore: 0.618,
        integrity: 99.99
      });
      addLog('COMPLETE', 'Genome successfully compiled and deployed.');
    } catch (e) {
      addLog('ERROR', 'Pipeline failure.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden fractal-bg">
      <GoldenSpiralBg />
      
      {/* Sidebar Navigation - Fixed width, approx Phi relation to small content */}
      <aside className="w-72 bg-slate-950/80 backdrop-blur-md border-r border-phi-900/30 flex flex-col z-20 relative">
        <div className="p-8 flex items-center gap-4 border-b border-phi-900/30">
          <div className="relative">
             <div className="absolute inset-0 bg-phi-500 blur-lg opacity-20 animate-pulse"></div>
             <Hexagon size={32} className="text-phi-400 relative z-10" />
             <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-phi-950 z-20">Φ</div>
          </div>
          <div>
            <h1 className="font-serif font-bold text-phi-100 tracking-widest text-lg">ACΦ-496</h1>
            <p className="text-[9px] text-phi-500 font-mono tracking-[0.2em] uppercase">Genome Engine</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-4">
          <SidebarItem icon={<Activity />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
          <SidebarItem icon={<Layers />} label="Pipeline" active={view === 'pipeline'} onClick={() => setView('pipeline')} />
          <SidebarItem icon={<Database />} label="Genome Viewer" active={view === 'genome'} onClick={() => setView('genome')} />
          <SidebarItem icon={<TerminalIcon />} label="Lichen CLI" active={view === 'cli'} onClick={() => setView('cli')} />
        </nav>

        <div className="p-6 border-t border-phi-900/30">
          <div className="flex items-center gap-2 text-xs text-phi-400/60 mb-2 font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>H-Scale: 0.618</span>
          </div>
          <div className="text-[10px] text-slate-600 font-mono opacity-50">v.1.0.4-phi</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden z-10">
        <div className="animate-scanline" />

        {/* Top Bar */}
        <header className="h-20 border-b border-phi-900/20 bg-slate-950/40 backdrop-blur flex items-center justify-between px-10 z-20">
          <div className="font-mono text-sm text-phi-400/80 flex items-center gap-2">
             <span className="opacity-50">//</span> {view.toUpperCase()} 
             <span className="bg-phi-900/30 px-2 py-0.5 rounded text-[10px] text-phi-300 border border-phi-500/20">
               ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
             </span>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Network Status</span>
                <span className="text-xs text-emerald-400 font-mono">CONNECTED • Φ-ALIGNED</span>
             </div>
             <div className="h-8 w-[1px] bg-phi-900/50"></div>
             <button className="p-2 hover:bg-phi-900/20 rounded-lg text-slate-400 hover:text-phi-300 transition-colors">
               <Settings size={20} />
             </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-10 relative z-10 scrollbar-hide">
          
          {view === 'dashboard' && (
            <div className="space-y-8 max-w-[1600px] mx-auto">
              {/* Hero Stats - Golden Ratio Sizing */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Total Bits" value={stats.totalBits.toLocaleString()} icon={<Database size={20} />} color="text-phi-400" />
                <StatCard label="Compression" value={`${stats.compressionRatio}x`} icon={<Layers size={20} />} color="text-neon-purple" />
                <StatCard label="Φ-Alignment" value={stats.phiScore.toFixed(3)} icon={<Dna size={20} />} color="text-amber-400" />
                <StatCard label="Resilience" value={`${stats.integrity}%`} icon={<CheckCircle2 size={20} />} color="text-emerald-400" />
              </div>

              {/* Golden Ratio Grid Layout for Charts: ~62% vs ~38% */}
              <div className="grid grid-cols-1 xl:grid-cols-[1.618fr_1fr] gap-8">
                <div className="phi-glass rounded-2xl p-8 min-h-[400px]">
                  <h3 className="text-sm font-bold text-phi-100 mb-8 flex items-center gap-3 uppercase tracking-wider">
                    <Activity size={18} className="text-phi-500"/> Compression Efficiency
                  </h3>
                  <div className="h-[300px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#134e4a" opacity={0.3} vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#134e4a', color: '#f1f5f9', borderRadius: '8px' }}
                          cursor={{ fill: '#134e4a', opacity: 0.2 }}
                        />
                        <Bar dataKey="val" fill="url(#colorBar)" radius={[4, 4, 0, 0]} barSize={60} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="phi-glass rounded-2xl p-8 min-h-[400px]">
                  <h3 className="text-sm font-bold text-phi-100 mb-8 flex items-center gap-3 uppercase tracking-wider">
                    <Dna size={18} className="text-neon-purple"/> H-Scale Stability (Φ)
                  </h3>
                  <div className="h-[300px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={PHI_TIME_DATA}>
                        <defs>
                          <linearGradient id="colorPhi" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#134e4a" opacity={0.3} vertical={false} />
                        <XAxis dataKey="t" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis domain={[0.610, 0.625]} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#134e4a', borderRadius: '8px' }}
                        />
                        <Area type="monotone" dataKey="v" stroke="#d946ef" strokeWidth={3} fillOpacity={1} fill="url(#colorPhi)" />
                        <Line type="monotone" dataKey="upper" stroke="#d946ef" strokeWidth={1} strokeDasharray="4 4" opacity={0.5} dot={false} />
                        <Line type="monotone" dataKey="lower" stroke="#d946ef" strokeWidth={1} strokeDasharray="4 4" opacity={0.5} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'pipeline' && (
            <div className="grid grid-cols-1 xl:grid-cols-[1.618fr_1fr] gap-8 h-full">
              <div className="flex flex-col gap-8">
                <div className="phi-glass rounded-2xl p-8 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-phi-300 mb-4 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-2 h-2 bg-phi-500 rounded-full"></span> Input Corpus
                  </h3>
                  <div className="relative flex-1 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-phi-500 to-neon-purple rounded-lg opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <textarea
                      className="relative w-full h-full bg-slate-950/90 border border-phi-900/50 rounded-lg p-6 font-mono text-sm text-slate-300 focus:border-phi-500/50 focus:ring-0 outline-none resize-none transition-all"
                      value={corpus}
                      onChange={(e) => setCorpus(e.target.value)}
                      placeholder="Enter text payload for genome sequencing..."
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={runPipeline}
                      disabled={isProcessing}
                      className={`relative overflow-hidden group flex items-center gap-3 px-8 py-3 rounded-lg font-bold text-sm tracking-wider transition-all ${isProcessing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-phi-600 hover:bg-phi-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]'}`}
                    >
                      {isProcessing ? <Activity className="animate-spin" size={18}/> : <Play size={18} fill="currentColor" />}
                      {isProcessing ? 'SEQUENCING...' : 'INITIATE PIPELINE'}
                      {!isProcessing && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />}
                    </button>
                  </div>
                </div>
                
                {/* Visual Pipeline Stages - Fractal Cards */}
                <div className="grid grid-cols-3 gap-6">
                   <StageCard active={isProcessing} label="Helicase" sub="Segmentation" step="I" />
                   <StageCard active={isProcessing} label="Polymerase" sub="CoD Extraction" step="II" />
                   <StageCard active={isProcessing} label="Codonizer" sub="GKF-496 Encoding" step="III" />
                </div>
              </div>

              <div className="phi-glass rounded-2xl p-0 overflow-hidden flex flex-col h-[600px] xl:h-auto">
                <div className="p-6 border-b border-phi-900/30 bg-slate-950/50">
                   <h3 className="text-xs font-bold text-phi-400 uppercase tracking-widest flex items-center gap-2">
                     <TerminalIcon size={14} /> System Logs
                   </h3>
                </div>
                <div className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-4 custom-scrollbar">
                  {logs.length === 0 && <div className="text-slate-600 italic opacity-50">Waiting for corpus injection...</div>}
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 animate-fadeIn border-l-2 border-slate-800 pl-4 py-1 hover:border-phi-500 transition-colors">
                       <span className="text-slate-600">{log.timestamp}</span>
                       <span className={`font-bold tracking-wider ${
                         log.stage === 'ERROR' ? 'text-red-500' :
                         log.stage === 'COMPLETE' ? 'text-emerald-400' : 'text-neon-cyan'
                       }`}>[{log.stage}]</span>
                       <span className="text-slate-300">{log.message}</span>
                    </div>
                  ))}
                  {isProcessing && <div className="text-phi-500 animate-pulse pl-4">_</div>}
                </div>
              </div>
            </div>
          )}

          {view === 'genome' && (
             <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-phi-900/30 pb-6">
                  <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                    <Database className="text-phi-500" /> Genome Explorer
                  </h2>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-500 bg-slate-900/50 px-4 py-2 rounded-full border border-phi-900/30">
                     <span>SEQUENCE_LENGTH: <span className="text-phi-400 font-bold">{codons.length * 248} bp</span></span>
                     <span className="text-slate-700">|</span>
                     <span>CODONS: <span className="text-neon-purple font-bold">{codons.length}</span></span>
                  </div>
                </div>
                
                {codons.length === 0 ? (
                  <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <AlertCircle className="text-slate-600" size={32} />
                    </div>
                    <p className="text-slate-500 font-serif tracking-wide">No genome sequenced. Run the Pipeline first.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {codons.map((codon, idx) => (
                      <CodonVisualizer key={codon.id} codon={codon} index={idx} />
                    ))}
                  </div>
                )}
             </div>
          )}

          {view === 'cli' && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-8 h-full pb-8">
              <div className="h-full min-h-[500px]">
                <Terminal />
              </div>
              
              <div className="phi-glass rounded-2xl p-8 h-full overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 mb-6 border-b border-phi-900/30 pb-4">
                  <div className="p-2 bg-phi-500/10 rounded-lg">
                    <Command size={20} className="text-phi-400" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-phi-100 text-lg">Command Matrix</h3>
                    <p className="text-[10px] text-phi-500 uppercase tracking-widest">v.1.0.4 Reference</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-neon-purple font-bold bg-purple-900/20 px-2 py-1 rounded text-xs border border-purple-500/30 group-hover:border-purple-500/60 transition-colors">lichen extract &lt;file&gt;</code>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Initiates the Helicase process to segment the corpus into semantic nucleotides. Essential first step for genome sequencing.
                    </p>
                  </div>

                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-phi-400 font-bold bg-phi-900/20 px-2 py-1 rounded text-xs border border-phi-500/30 group-hover:border-phi-500/60 transition-colors">lichen verify &lt;file&gt;</code>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Performs a cryptographic Φ-Integrity check (CRC32-φ) on the generated genome file to ensure alignment.
                    </p>
                  </div>

                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-amber-400 font-bold bg-amber-900/20 px-2 py-1 rounded text-xs border border-amber-500/30 group-hover:border-amber-500/60 transition-colors">lichen deploy</code>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Push the sequenced genome to the CRAID nodes for redundant storage and activation.
                    </p>
                  </div>

                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-slate-300 font-bold bg-slate-800 px-2 py-1 rounded text-xs border border-slate-600 group-hover:border-slate-400 transition-colors">clear</code>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Resets the terminal buffer.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-phi-900/20">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Keyboard Shortcuts</div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-400"><span>History Up</span> <span className="text-slate-600">↑</span></div>
                      <div className="flex justify-between text-slate-400"><span>History Down</span> <span className="text-slate-600">↓</span></div>
                      <div className="flex justify-between text-slate-400"><span>Execute</span> <span className="text-slate-600">Enter</span></div>
                      <div className="flex justify-between text-slate-400"><span>AutoComplete</span> <span className="text-slate-600">Tab</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// Sub-components
const SidebarItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`group w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${active ? 'bg-phi-500/10 text-phi-300 border border-phi-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <span className="tracking-wide">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-phi-400 shadow-[0_0_8px_currentColor]" />}
  </button>
);

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="phi-glass p-6 rounded-2xl flex items-center justify-between hover:translate-y-[-2px] transition-transform duration-300">
    <div>
      <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{label}</p>
      <p className={`text-3xl font-mono font-light tracking-tighter ${color}`}>{value}</p>
    </div>
    <div className={`p-4 rounded-xl bg-slate-950 border border-slate-800/50 ${color} shadow-lg`}>
      {icon}
    </div>
  </div>
);

const StageCard = ({ active, label, sub, step }: any) => (
  <div className={`relative overflow-hidden p-6 rounded-2xl border transition-all duration-700 ${active ? 'bg-slate-900/90 border-phi-500/40 shadow-[0_0_30px_rgba(20,184,166,0.15)] scale-[1.02]' : 'bg-slate-900/40 border-slate-800/50 opacity-60'}`}>
    {active && <div className="absolute inset-0 bg-gradient-to-br from-phi-500/10 via-transparent to-transparent animate-pulse" />}
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-serif font-bold border ${active ? 'bg-phi-900/50 text-phi-300 border-phi-500/50' : 'bg-slate-950 text-slate-600 border-slate-800'}`}>
        {step}
      </div>
      {active && <Activity size={16} className="text-phi-400 animate-spin-slow" />}
    </div>
    <div className="font-bold text-slate-200 tracking-wide relative z-10">{label}</div>
    <div className="text-xs text-slate-500 font-mono mt-1 relative z-10">{sub}</div>
  </div>
);

export default App;