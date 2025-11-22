
import React, { useState } from 'react';
import { Sparkles, Feather } from 'lucide-react';
import { Button } from './Button';
import { DEMO_DREAM } from '../constants';

interface DreamInputProps {
  onSubmit: (dream: string) => void;
  isLoading: boolean;
}

export const DreamInput: React.FC<DreamInputProps> = ({ onSubmit, isLoading }) => {
  const [dream, setDream] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim()) {
      onSubmit(dream);
    }
  };

  const handleDemo = () => {
    setDream(DEMO_DREAM);
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative z-10 px-4 group">
      {/* Decorative framing - Glowing Aura */}
      <div className="absolute -inset-1 bg-gradient-to-b from-[#CBD5E1]/20 to-transparent rounded-2xl blur-xl -z-10 transition-opacity duration-1000 opacity-60 group-hover:opacity-90"></div>
      
      {/* Main Card - Frosted Ink Glass - Lighter */}
      <div className="bg-[#334155]/60 backdrop-blur-xl border border-[#475569]/50 p-8 rounded-2xl shadow-2xl relative overflow-hidden transition-colors duration-500 hover:bg-[#334155]/70">
        
        {/* Abstract Watermark */}
        <div className="absolute top-[-10%] right-[-5%] text-[#1e293b] font-calligraphy text-[12rem] opacity-30 pointer-events-none select-none leading-none">
          梦
        </div>

        <div className="text-center mb-10 relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#475569] to-[#1e293b] mb-4 border border-[#64748B] shadow-lg">
            <Feather className="w-6 h-6 text-[#CBD5E1]" />
          </div>
          <h2 className="text-3xl text-[#F8FAFC] font-classic tracking-[0.2em] mb-2">
            笔录梦境
          </h2>
          <p className="text-sm text-[#94A3B8] font-serif tracking-wider">
            Record the unseen, reveal the unknown.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative">
          <div className="relative">
             {/* Corner Accents */}
             <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[#64748B]/50"></div>
             <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-[#64748B]/50"></div>
             <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-[#64748B]/50"></div>
             <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[#64748B]/50"></div>

            <textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="昨夜梦见了什么？请详述梦境中的意象、情绪与细节..."
              className="relative w-full h-52 bg-[#1e293b]/50 border border-[#475569] rounded-lg p-6 text-[#F1F5F9] placeholder-[#64748B] focus:ring-1 focus:ring-[#9F1212]/40 focus:border-[#9F1212]/40 transition-all resize-none outline-none font-serif leading-loose text-lg tracking-wide shadow-inner"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-center pt-2">
            <button
              type="button"
              onClick={handleDemo}
              disabled={isLoading}
              className="text-sm text-[#94A3B8] hover:text-[#9F1212] transition-colors border-b border-dashed border-[#94A3B8]/50 hover:border-[#9F1212] pb-0.5 font-classic tracking-wider"
            >
              [ 试用演示梦境 ]
            </button>

            <Button type="submit" isLoading={isLoading} disabled={!dream.trim()}>
              <Sparkles className="w-4 h-4" />
              <span>太虚解爻</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
