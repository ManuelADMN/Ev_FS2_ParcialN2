
import React from 'react';
import { CpuChipIcon, GlobeAmericasIcon, PresentationChartLineIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import SectionTitle from '../molecules/SectionTitle';

const steps = [
  {
    title: "Recolección",
    description: "Integramos sensores IoT, imágenes satelitales y registros históricos en un flujo unificado. Capturamos la realidad física y la convertimos en datos crudos listos para el análisis.",
    icon: GlobeAmericasIcon,
    color: "text-google-blue",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Procesamiento",
    description: "Nuestros algoritmos de Deep Learning eliminan el ruido y las anomalías. Identificamos patrones complejos invisibles al ojo humano mediante redes neuronales convolucionales.",
    icon: CpuChipIcon,
    color: "text-google-red",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Acción",
    description: "Transformamos la incertidumbre en alertas predictivas claras. Entregamos tableros de decisión que permiten optimizar recursos y prevenir riesgos ambientales antes de que ocurran.",
    icon: PresentationChartLineIcon,
    color: "text-google-green",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  }
];

const DiscoverCard: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
    return (
        <div 
            className="group perspective-1000 w-full h-[22rem] md:h-[25rem] animate-slide-up opacity-0"
            style={{ animationDelay: `${index * 150}ms` }}
        >
            {/* Inner Container */}
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 shadow-hard dark:shadow-hard-dark border-2 border-brand-black dark:border-brand-white bg-brand-white dark:bg-brand-black">
                
                {/* FRONT FACE */}
                <div className="absolute inset-0 w-full h-full backface-hidden z-20">
                    <img 
                        src={step.imageUrl} 
                        alt={step.title} 
                        className="w-full h-full object-cover grayscale-0 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-2 h-6 md:h-8 ${step.color.replace('text-', 'bg-')}`}></div>
                            <span className="text-3xl md:text-4xl font-black text-brand-white tracking-tighter uppercase shadow-black drop-shadow-lg">
                                {index + 1}.
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-brand-white uppercase tracking-tight leading-none mb-2">
                            {step.title}
                        </h2>
                        <div className="flex items-center text-brand-white/80 text-xs font-bold uppercase tracking-widest mt-2">
                            Ver detalle <ArrowRightIcon className="w-3 h-3 ml-2 animate-bounce" />
                        </div>
                    </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-brand-white dark:bg-brand-black p-6 flex flex-col justify-center items-center text-center z-10 border-2 border-brand-black dark:border-brand-white">
                    <div className={`w-10 h-10 md:w-14 md:h-14 mb-4 ${step.color}`}>
                        <step.icon className="w-full h-full" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-black text-brand-black dark:text-brand-white uppercase tracking-tighter mb-4">
                        {step.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-brand-black/80 dark:text-brand-white/80 font-medium leading-relaxed text-justify line-clamp-5 md:line-clamp-none">
                        {step.description}
                    </p>

                    <div className="mt-auto pt-4 border-t-2 border-brand-black/10 dark:border-brand-white/10 w-full">
                         <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Denoise Process Node</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DiscoverSection: React.FC = () => {
  return (
    <section id="discover" className="h-full min-h-fit md:min-h-full flex flex-col justify-center items-center bg-brand-white dark:bg-brand-black py-16 md:py-10">
      <div className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center">
        
        <div className="text-center mb-8 md:mb-12 animate-slide-up opacity-0 max-w-4xl">
           <div className="inline-block border-2 border-brand-black dark:border-brand-white px-3 py-1 mb-4 font-black uppercase tracking-widest text-[10px] bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black">
                Metodología
             </div>
          <SectionTitle>Cómo funciona...</SectionTitle>
          <p className="text-sm md:text-lg text-brand-black/60 dark:text-brand-white/60 font-medium max-w-2xl mx-auto block mt-2">
              Un proceso cíclico de mejora continua.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll Snap | Desktop: Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 w-full max-w-6xl overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 px-2 md:px-0 no-scrollbar">
            {steps.map((step, index) => (
                <div key={index} className="min-w-[85vw] md:min-w-0 md:w-full snap-center flex justify-center">
                    <DiscoverCard step={step} index={index} />
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default DiscoverSection;
