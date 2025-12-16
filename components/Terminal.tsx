import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "ACΦ-496 Genome Engine [Version 1.0.4]",
    "(c) 2024 Phi Labs. All rights reserved.",
    "",
    "user@acphi:~$ lichen init"
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, `user@acphi:~$ ${input}`];
      
      if (input.trim() === 'help') {
        newHistory.push(
          "Available commands:",
          "  lichen extract <file>   - Convert corpus to GKF-496",
          "  lichen verify <file>    - Check Φ-Integrity",
          "  lichen deploy           - Push to CRAID nodes",
          "  clear                   - Clear terminal"
        );
      } else if (input.trim() === 'clear') {
        setHistory([]);
        setInput("");
        return;
      } else if (input.startsWith('lichen extract')) {
        newHistory.push("🧬 Initiating Helicase...", "██████░░░░ 60%", "Chunking complete.");
      } else {
        newHistory.push(`Command not found: ${input}`);
      }
      
      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <div className="w-full h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col font-mono text-sm shadow-2xl">
      <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
        <TerminalIcon size={14} className="text-slate-400" />
        <span className="text-slate-400">lichen-cli — zsh</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto text-phi-400">
        {history.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-neon-purple">user@acphi:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none text-phi-50 flex-1 focus:ring-0"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};