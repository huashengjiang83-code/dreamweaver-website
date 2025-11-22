
import React, { useRef, useState, useEffect } from 'react';
import { Brain, ScrollText, Quote, BookOpen } from 'lucide-react';
import { DreamReport } from '../types';

interface ReportSectionProps {
  report: DreamReport;
}

// Helper component for scroll-triggered animations
const FadeInSection: React.FC<{ children: React.ReactNode; delay?: string; className?: string }> = ({ 
  children, 
  delay = '0ms', 
  className = '' 
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Trigger when even a small part is visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can stop observing to prevent re-triggering (optional)
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

export const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 px-4">
      
      {/* Intro Section - Philosophical Summary */}
      <FadeInSection delay="100ms">
        <div className="relative bg-gradient-to-b from-[#334155] to-[#1e293b] border border-[#475569] rounded-xl p-10 text-center shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-shadow duration-500">
           {/* Decorative Elements */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#9F1212]/50 to-transparent"></div>
           
           <Quote className="w-10 h-10 text-[#9F1212] mx-auto mb-6 opacity-80" />
          <h3 className="text-2xl md:text-3xl font-serif text-[#F8FAFC] mb-6 leading-relaxed tracking-wide italic">
            “{report.introduction}”
          </h3>
          <div className="w-24 h-[2px] bg-[#9F1212]/50 mx-auto mt-8"></div>
        </div>
      </FadeInSection>

      {/* Dual Core Analysis - 50/50 Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* Science (Left) */}
        <FadeInSection delay="300ms" className="h-full">
          <div className="bg-[#334155]/70 backdrop-blur-md border border-[#475569] rounded-xl p-8 relative group hover:border-[#38BDF8]/40 transition-all duration-500 shadow-lg hover:translate-y-[-5px] h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4 mb-8 border-b border-[#475569] pb-4">
              <div className="p-3 bg-[#38BDF8]/10 rounded-lg border border-[#38BDF8]/20 group-hover:bg-[#38BDF8]/20 transition-colors">
                <Brain className="w-6 h-6 text-[#38BDF8]" />
              </div>
              <div>
                <h4 className="text-2xl font-classic text-[#F1F5F9] tracking-widest">心理解码</h4>
                <span className="text-xs text-[#94A3B8] uppercase tracking-widest font-sans">Scientific Psychology</span>
              </div>
            </div>
            
            <div className="space-y-6 flex-grow">
              <p className="text-[#E2E8F0] leading-loose text-justify font-light text-lg">
                {report.psychological_decode.content}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-8 mt-auto">
                {report.psychological_decode.key_concepts.map((tag, i) => (
                  <span key={i} className="px-4 py-1.5 text-xs font-serif bg-[#1e293b] text-[#38BDF8] border border-[#475569] rounded-full shadow-sm hover:bg-[#38BDF8]/10 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
          </div>
        </FadeInSection>

        {/* Tradition (Right) */}
        <FadeInSection delay="500ms" className="h-full">
          <div className="bg-[#334155]/70 backdrop-blur-md border border-[#475569] rounded-xl p-8 relative group hover:border-[#F59E0B]/40 transition-all duration-500 shadow-lg hover:translate-y-[-5px] h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4 mb-8 border-b border-[#475569] pb-4">
               <div className="p-3 bg-[#F59E0B]/10 rounded-lg border border-[#F59E0B]/20 group-hover:bg-[#F59E0B]/20 transition-colors">
                <ScrollText className="w-6 h-6 text-[#F59E0B]" />
              </div>
               <div>
                <h4 className="text-2xl font-classic text-[#F1F5F9] tracking-widest">传统解爻</h4>
                <span className="text-xs text-[#94A3B8] uppercase tracking-widest font-sans">Eastern Wisdom</span>
              </div>
            </div>
            
            <div className="space-y-6 flex-grow">
              <p className="text-[#E2E8F0] leading-loose text-justify font-light text-lg">
                {report.traditional_divination.content}
              </p>
               <div className="mt-8 p-6 bg-[#292524]/30 border border-[#78350F]/20 rounded-lg relative overflow-hidden group-hover:bg-[#292524]/50 transition-colors">
                   <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#F59E0B] rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <span className="text-xs text-[#D97706] uppercase tracking-widest font-bold block mb-3 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> 文化典故
                  </span>
                  <p className="text-[#D6D3D1] italic font-serif leading-relaxed">
                    “{report.traditional_divination.cultural_context}”
                  </p>
              </div>
            </div>
          </div>
        </FadeInSection>

      </div>

      {/* Tai Xu Source Tracing */}
      <FadeInSection delay="200ms">
        <div className="mt-16 pt-8 border-t border-[#475569]/50">
          <div className="flex items-center justify-center mb-8">
            <div className="h-[1px] w-16 bg-[#475569]"></div>
            <h5 className="mx-6 text-sm font-classic text-[#94A3B8] tracking-[0.3em]">
              【太虚溯源】
            </h5>
             <div className="h-[1px] w-16 bg-[#475569]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-4">
            {report.sources.map((source, idx) => (
              <div key={idx} className="flex items-baseline gap-3 text-[#94A3B8] text-sm font-serif border-b border-[#475569]/30 pb-2 hover:text-[#E2E8F0] transition-colors group cursor-default">
                <span className="text-[#9F1212] font-mono text-xs opacity-70 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                <span className="italic group-hover:translate-x-1 transition-transform duration-300">{source.text}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
};
