
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-brand-white dark:bg-brand-black h-full min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden py-12 md:py-0">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10 flex flex-col justify-center h-full max-w-full">
        <h1 className="text-[3.5rem] sm:text-7xl md:text-[10rem] font-black text-brand-black dark:text-brand-white leading-[0.9] mb-4 md:mb-2 tracking-tighter animate-zoom-out opacity-0 [animation-delay:100ms] break-words">
          DENOISE
        </h1>

        <div className="text-lg sm:text-2xl md:text-4xl font-bold text-brand-black dark:text-brand-white mb-6 md:mb-8 uppercase tracking-tight flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 flex-wrap animate-zoom-out opacity-0 [animation-delay:300ms]">
          <span>IA para un mundo moderno y</span>
          <span>sostenible</span>
        </div>
        
        <p className="text-sm sm:text-lg md:text-2xl text-brand-black/80 dark:text-brand-white/80 max-w-2xl mx-auto mb-8 md:mb-12 font-semibold animate-zoom-out opacity-0 [animation-delay:500ms] px-4">
          Transformamos datos complejos en decisiones claras.
        </p>
        
      </div>
    </section>
  );
};

export default Hero;
