
import React from 'react';
import { CubeTransparentIcon, CpuChipIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const OddieSection: React.FC = () => {
  const features = [
    {
      title: "Orquestación",
      description: "Oddie unifica el flujo de datos entre DenoQ, DenoM y DenoR, sincronizando información crítica en tiempo real.",
      icon: CubeTransparentIcon,
      colorClass: "text-google-blue",
      bgClass: "bg-google-blue"
    },
    {
      title: "Procesamiento",
      description: "Utilizando redes neuronales convolucionales, Oddie filtra el ruido para detectar patrones invisibles.",
      icon: CpuChipIcon,
      colorClass: "text-google-red",
      bgClass: "bg-google-red"
    },
    {
      title: "Evolución",
      description: "El agente aprende de cada decisión. Sus modelos predictivos se refinan automáticamente.",
      icon: ArrowTrendingUpIcon,
      colorClass: "text-google-green",
      bgClass: "bg-google-green"
    }
  ];

  return (
    <section id="oddie" className="h-full min-h-fit md:min-h-full flex flex-col justify-center bg-brand-white dark:bg-brand-black relative py-8 md:py-0">
       <div className="container mx-auto px-4 md:px-6 max-w-6xl h-full flex flex-col justify-center">
          
          {/* Header Section */}
          <div className="mb-6 md:mb-12 text-center md:text-left animate-blur-in opacity-0 [animation-delay:100ms] mt-8 md:mt-0">
             <h1 className="text-6xl sm:text-6xl md:text-9xl font-black text-brand-black dark:text-brand-white tracking-tighter mb-2 md:mb-4 leading-none">
                ODDIE
             </h1>
             <p className="text-sm md:text-xl text-brand-black/70 dark:text-brand-white/70 font-medium max-w-4xl leading-relaxed mx-auto md:mx-0 px-2">
                El cerebro detrás de Denoise. Orquestador de inteligencia capaz de gestionar ecosistemas de datos complejos.
             </p>
          </div>

          {/* Mobile: Horizontal Snap | Desktop: Grid */}
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 px-2 md:px-0 no-scrollbar">
             {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div 
                        key={index} 
                        className="group relative min-w-[85vw] md:min-w-0 w-full h-[18rem] md:h-[22rem] animate-blur-in opacity-0 overflow-hidden border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark bg-brand-white dark:bg-brand-black snap-center"
                        style={{ animationDelay: `${(index + 2) * 150}ms` }}
                    >
                        {/* Hidden Content */}
                        <div className="absolute inset-0 w-full h-full bg-brand-white dark:bg-brand-black flex flex-col justify-center items-center p-6 md:p-8 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10">
                             <div className={`w-10 h-10 mb-4 ${feature.colorClass} relative z-20`}>
                                  <Icon className="w-full h-full" />
                             </div>
                             <p className="text-brand-black dark:text-brand-white font-bold text-sm md:text-base leading-relaxed relative z-20">
                                  {feature.description}
                             </p>
                             <div className={`mt-6 h-1 w-12 ${feature.bgClass} relative z-20`}></div>
                        </div>

                        {/* Cover Content */}
                        <div className="absolute inset-0 w-full h-full bg-brand-white dark:bg-brand-black flex flex-col justify-center items-center p-6 z-20 group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
                               <div className={`absolute top-0 right-0 w-16 h-16 ${feature.bgClass} border-l-2 border-b-2 border-brand-black dark:border-brand-white transition-all duration-300 group-hover:w-full group-hover:h-2 group-hover:border-b-0`}></div>
                               <div className={`w-20 h-20 md:w-24 md:h-24 mb-6 ${feature.colorClass} transition-transform duration-500 group-hover:scale-0`}>
                                  <Icon className="w-full h-full stroke-[1.5]" />
                                </div>
                               <h3 className="text-3xl md:text-2xl font-black text-brand-black dark:text-brand-white uppercase tracking-tighter text-center leading-none group-hover:opacity-0 transition-opacity duration-300">
                                  {feature.title}
                               </h3>
                        </div>
                    </div>
                );
             })}
          </div>

          {/* Visual Footer */}
          <div className="mt-auto md:mt-10 border-t-2 border-brand-black dark:border-brand-white pt-4 flex justify-between items-end opacity-60 animate-blur-in opacity-0 [animation-delay:800ms] px-2 md:px-0">
             <div className="font-mono text-[10px]">
                SYS.STATUS: <span className="font-bold text-google-green">NOMINAL</span>
             </div>
             <div className="font-black text-xl md:text-3xl text-brand-black/20 dark:text-brand-white/20">
                v2.5.0
             </div>
          </div>
       </div>
    </section>
  );
};

export default OddieSection;
