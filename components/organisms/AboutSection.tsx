
import React from 'react';
import { aboutUsText } from '../../services/geminiService';
import SectionTitle from '../molecules/SectionTitle';

const AboutSection: React.FC = () => {
  
  const renderContent = (text: string) => {
    const paragraphs = text.split('\n\n');
    const regex = /(Denoise|Deep Learning|ruido|económica|ecológica|ciencia de datos|industria|decisiones|clientes|incertidumbre|estrategias claras|acuicultura|minera)/gi;

    return paragraphs.map((paragraph, pIndex) => (
      <p 
        key={pIndex} 
        className={`text-base sm:text-xl md:text-3xl text-brand-black dark:text-brand-white leading-relaxed font-medium text-left md:text-justify tracking-tight mb-4 md:mb-8 last:mb-0 opacity-0 ${pIndex % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
        style={{ animationDelay: `${(pIndex + 1) * 200}ms` }}
      >
        {paragraph.split(regex).map((part, index) => {
           if (part.match(regex)) {
             return (
                <span key={index} className="font-black inline-block leading-tight">
                    {part}
                </span>
             );
           }
           return part;
        })}
      </p>
    ));
  };

  return (
    <section id="about" className="h-full min-h-[100dvh] flex flex-col justify-center bg-brand-white dark:bg-brand-black relative py-8 md:py-0">
      <div className="container mx-auto px-6 md:px-6 flex flex-col items-center justify-center h-full">
        <div className="mb-6 md:mb-12 animate-slide-up opacity-0 mt-8 md:mt-0">
             <SectionTitle>Quienes Somos</SectionTitle>
        </div>
        
        <div className="max-w-5xl mx-auto w-full pb-10 md:pb-0">
            {renderContent(aboutUsText)}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
