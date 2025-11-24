
import React from 'react';
import { servicesData } from '../../services/geminiService';
import SectionTitle from '../molecules/SectionTitle';
import ServiceCard from '../molecules/ServiceCard';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="h-full min-h-fit md:min-h-full flex flex-col justify-center py-8 md:py-20 bg-brand-white dark:bg-brand-black">
      <div className="container mx-auto px-4 md:px-6 flex flex-col h-full justify-center">
        <div className="shrink-0 animate-slide-up opacity-0 mb-6 md:mb-8 text-center mt-8 md:mt-0">
            <SectionTitle>Nuestros Proyectos</SectionTitle>
        </div>
        
        <div className="flex-grow flex items-center justify-center w-full">
            {/* Mobile: Horizontal Scroll Snap | Desktop: Grid */}
            <div className="w-full flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 px-2 md:px-0 no-scrollbar">
                {servicesData.map((service, index) => (
                   <div 
                     key={index} 
                     className="min-w-[85vw] md:min-w-0 md:w-full h-[20rem] md:h-[22rem] animate-flip-in-x opacity-0 snap-center"
                     style={{ animationDelay: `${index * 150}ms` }}
                   >
                        <ServiceCard service={service} index={index} />
                   </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
