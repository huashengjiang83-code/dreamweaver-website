import React, { useState, useEffect, useRef } from 'react';
import { DreamInput } from './components/DreamInput';
import { ReportSection } from './components/ReportSection';
import { APP_NAME, APP_SUBTITLE, POETRY_QUOTES } from './constants';
import { analyzeDreamWithGemini, chatWithTaiXu } from './services/geminiService';
import { AnalysisState, DreamReport, ChatMessage } from './types';
import { Cloud, Sparkles, Send, RefreshCw, Wind } from 'lucide-react';
import { Button } from './components/Button';

const LOADING_PHASES = [
  "连接太虚幻境...", // Connecting to Tai Xu...
  "寻访周公解梦...", // Consulting Zhou Gong...
  "分析潜意识意象...", // Analyzing subconscious symbols...
  "推演易经卦象...", // Deducing I Ching hexagrams...
  "融合东西方智慧...", // Fusing East and West wisdom...
  "撰写梦境批注..."  // Writing dream annotation...
];

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisState>(AnalysisState.IDLE);
  const [report, setReport] = useState<DreamReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [poetry, setPoetry] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [loadingPhaseIndex, setLoadingPhaseIndex] = useState(0);
  
  // Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Set random poetry on mount or status change
  useEffect(() => {
    const randomPoetry = POETRY_QUOTES[Math.floor(Math.random() * POETRY_QUOTES.length)];
    setPoetry(randomPoetry);
  }, [status]);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cycle loading text
  useEffect(() => {
    let interval: any;
    if (status === AnalysisState.ANALYZING) {
      setLoadingPhaseIndex(0);
      interval = setInterval(() => {
        setLoadingPhaseIndex(prev => (prev + 1) % LOADING_PHASES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleDreamSubmit = async (dreamText: string) => {
    setStatus(AnalysisState.ANALYZING);
    setErrorMsg('');
    setReport(null);
    setChatHistory([]); // Reset chat

    try {
      const result = await analyzeDreamWithGemini(dreamText);
      setReport(result);
      setStatus(AnalysisState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "太虚静默无言，请稍后再试。");
      setStatus(AnalysisState.ERROR);
    }
  };

  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const responseText = await chatWithTaiXu(userMsg.text);
      setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'model', text: "太虚迷雾重重，请稍后再试...", isError: true }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const reset = () => {
    setStatus(AnalysisState.IDLE);
    setReport(null);
    setChatHistory([]);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, status]);

  return (
    <div className="min-h-screen bg-[#334155] text-[#E2E8F0] font-serif selection:bg-[#9F1212]/30 selection:text-white flex flex-col overflow-x-hidden relative">
      
      {/* BACKGROUND ART - Enhanced Ink & Light System */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. Base Layer - Deep Slate Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#475569] via-[#334155] to-[#1e293b]"></div>
        
        {/* 2. Drifting Mist/Fog Layers - Large gentle movement */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen">
            {/* Mist 1 - Moving Left */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-400/10 via-transparent to-transparent animate-flow-slow"></div>
            {/* Mist 2 - Moving Right */}
            <div className="absolute bottom-[-50%] right-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-300/10 via-transparent to-transparent animate-flow-reverse"></div>
        </div>

        {/* 3. Deep Ink Wash Blobs - Simulating heavy ink settling */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#0f172a] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#020617] rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-blob animation-delay-2000"></div>
        
        {/* 4. Caustic Light Beams - Rotating rays of light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] animate-beam opacity-30 mix-blend-color-dodge pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#114B42]/30 to-transparent transform rotate-45"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38BDF8]/20 to-transparent transform -rotate-12"></div>
        </div>

        {/* 5. Cyan/Teal Mystical Accents - "Spirit Light" */}
        <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-[#114B42] rounded-full mix-blend-color-dodge filter blur-[130px] opacity-20 animate-blob"></div>
        
        {/* 6. Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-40 animate-float shadow-[0_0_10px_white]"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-cyan-200 rounded-full opacity-50 animate-float animation-delay-4000"></div>

        {/* 7. Texture Overlay - Rice Paper Noise */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
             }}>
        </div>
      </div>

      {/* "Peanut Butter Made" Signature Watermark - STRICTLY OPAQUE & VISIBLE */}
      <div className="fixed bottom-8 right-8 z-50 pointer-events-none hidden md:block">
        <div className="flex flex-col items-center gap-2 transform rotate-[-3deg] hover:scale-110 transition-transform duration-500 origin-bottom-right">
            <div className="writing-vertical font-calligraphy text-5xl text-[#9F1212] tracking-widest border-[3px] border-[#9F1212] p-4 rounded-lg shadow-2xl bg-[#E2E8F0] opacity-90 backdrop-blur-sm">
                花生酱作
            </div>
        </div>
      </div>
      
      {/* Mobile version of signature */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none md:hidden">
         <span className="text-xl font-calligraphy text-[#9F1212] border-[2px] border-[#9F1212] px-3 py-1 rounded bg-[#E2E8F0] opacity-90 shadow-lg">花生酱作</span>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-20 pb-12 text-center px-4 transition-transform duration-500" style={{ transform: `translateY(${scrollY * -0.2}px)` }}>
        <div className="inline-flex items-center justify-center gap-4 mb-6 animate-fade-in-up group cursor-default">
          <div className="relative">
             <Cloud className="w-12 h-12 text-[#E2E8F0] opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="absolute inset-0 bg-white blur-xl opacity-20 animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-calligraphy tracking-[0.1em] text-[#F8FAFC] drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            {APP_NAME}
          </h1>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
           <div className="flex items-center gap-4 opacity-80">
             <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent"></div>
             <p className="text-[#CBD5E1] font-classic text-lg tracking-[0.3em]">
              {APP_SUBTITLE}
            </p>
             <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent"></div>
           </div>
           
           {/* Random Poetry Line */}
           <p className="mt-6 text-[#94A3B8] font-calligraphy text-2xl md:text-3xl opacity-90 drop-shadow-sm min-h-[3rem] px-4">
             “{poetry}”
           </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10 px-4 pb-32 flex flex-col items-center max-w-5xl mx-auto w-full">
        
        {/* Input State */}
        {status === AnalysisState.IDLE && (
          <div className="w-full flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
             <DreamInput onSubmit={handleDreamSubmit} isLoading={false} />
          </div>
        )}

        {/* Dynamic Loading State */}
        {status === AnalysisState.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-24 space-y-12 animate-fade-in w-full">
            <div className="relative">
              {/* Tai Chi Abstract Spinner - Enhanced */}
              <div className="absolute inset-0 bg-[#9F1212] blur-[60px] opacity-20 rounded-full animate-breathe"></div>
              
              {/* Outer Ring - Fixed Animation Keyframe 'spin' */}
              <div className="w-40 h-40 border border-[#94A3B8]/30 rounded-full flex items-center justify-center relative animate-[spin_12s_linear_infinite]">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#CBD5E1] rounded-full shadow-[0_0_10px_rgba(203,213,225,0.8)]"></div>
              </div>

              {/* Inner Ring - Counter Spin - Fixed Animation Keyframe 'spin' */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-[#9F1212]/40 rounded-full flex items-center justify-center animate-[spin_8s_linear_infinite_reverse]">
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#9F1212] rounded-full shadow-[0_0_10px_rgba(159,18,18,0.8)]"></div>
              </div>

              {/* Center Symbol */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="font-calligraphy text-5xl text-[#F1F5F9] opacity-90 animate-pulse">悟</span>
              </div>
            </div>

            <div className="text-center space-y-3 h-16">
               <p className="text-[#F1F5F9] font-classic text-2xl tracking-widest transition-all duration-500">
                 {LOADING_PHASES[loadingPhaseIndex]}
               </p>
               <div className="flex justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                  <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
               </div>
            </div>
          </div>
        )}

        {/* Result State */}
        {status === AnalysisState.COMPLETE && report && (
          <div className="w-full flex flex-col items-center">
            <ReportSection report={report} />
            
            {/* Chat / Follow-up Section - Animated separately */}
            <div 
              className="w-full max-w-4xl mt-12 pt-10 border-t border-[#94A3B8]/30 relative opacity-0 animate-fade-in-up"
              style={{ animationDelay: '800ms' }}
            >
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#334155] px-4 rounded-full border border-[#94A3B8]/20 z-10">
                  <h4 className="font-classic text-[#F1F5F9] text-xl tracking-[0.2em] flex items-center gap-2 py-1">
                    <Wind className="w-4 h-4 text-[#9F1212]" />
                    与太虚问道
                  </h4>
               </div>

               <div className="bg-[#1e293b]/60 backdrop-blur-md border border-[#475569]/50 rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:border-[#64748B]">
                  <div className="p-6 space-y-6 min-h-[200px] max-h-[500px] overflow-y-auto custom-scrollbar">
                    {chatHistory.length === 0 && (
                      <div className="text-center py-12 opacity-70">
                        <p className="text-[#CBD5E1] font-classic text-lg mb-2">"道可道，非常道"</p>
                        <p className="text-sm text-[#94A3B8] font-serif">如有未解之惑，请继续追问太虚...</p>
                      </div>
                    )}
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                        <div className={`max-w-[85%] rounded-2xl px-6 py-4 leading-loose text-justify shadow-md ${
                          msg.role === 'user' 
                            ? 'bg-[#475569] text-[#F8FAFC] rounded-tr-sm border border-[#64748B]' 
                            : 'bg-[#334155] border border-[#475569] text-[#E2E8F0] rounded-tl-sm font-serif'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start animate-fade-in">
                         <div className="bg-[#334155] border border-[#475569] text-[#94A3B8] rounded-2xl rounded-tl-sm px-6 py-4 flex gap-2 items-center">
                            <span className="text-sm font-classic">推演中</span>
                            <span className="w-1 h-1 bg-[#94A3B8] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                            <span className="w-1 h-1 bg-[#94A3B8] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                            <span className="w-1 h-1 bg-[#94A3B8] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                         </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  
                  {/* Chat Input */}
                  <form onSubmit={handleChatSubmit} className="p-4 bg-[#1e293b]/80 flex gap-3 backdrop-blur-sm border-t border-[#475569]/50">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="在此追问... (例如：此梦主吉还是主凶？)"
                      className="flex-grow bg-[#334155]/50 border border-[#475569] rounded-lg px-4 py-3 text-[#F1F5F9] placeholder-[#94A3B8] focus:outline-none focus:border-[#9F1212]/50 transition-colors font-serif shadow-inner"
                      disabled={isChatLoading}
                    />
                    <Button type="submit" variant="icon" disabled={!chatInput.trim() || isChatLoading} className="bg-[#9F1212] hover:bg-[#B91C1C] text-white w-12 h-12 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
               </div>
            </div>

            <div className="mt-16 text-center pb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              <button 
                onClick={reset}
                className="group inline-flex items-center gap-3 text-[#94A3B8] hover:text-[#F1F5F9] transition-all duration-500 font-classic text-sm tracking-[0.2em] py-2 px-6 border border-transparent hover:border-[#64748B] rounded-full"
              >
                <RefreshCw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-700 ease-in-out" />
                再解一梦
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === AnalysisState.ERROR && (
           <div className="bg-[#2A0A0A]/80 backdrop-blur border border-[#9F1212]/30 text-[#E2E8F0] p-8 rounded-xl max-w-md text-center mt-12 shadow-2xl animate-fade-in-up">
             <h3 className="font-classic text-xl text-[#9F1212] mb-3">推演中断</h3>
             <p className="mb-8 text-[#CBD5E1] leading-relaxed">{errorMsg}</p>
             <Button onClick={reset} variant="secondary">
               重试
             </Button>
           </div>
        )}

      </main>

    </div>
  );
};

export default App;