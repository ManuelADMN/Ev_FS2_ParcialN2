
import React from 'react';
import LandingPageTemplate from '../components/templates/LandingPageTemplate';
import FloatingNav from '../components/organisms/FloatingNav';
import PageTransition from '../components/atoms/PageTransition';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';

const ContactPage: React.FC = () => {
  const inputClasses = "w-full px-4 py-3 rounded-none border-2 border-brand-black dark:border-brand-white bg-transparent focus:ring-0 outline-none transition-all duration-200 text-brand-black dark:text-brand-white placeholder-gray-400 font-bold focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] focus:bg-brand-white dark:focus:bg-brand-black";
  const labelClasses = "block text-xs font-black text-brand-black dark:text-brand-white mb-1 uppercase tracking-widest";

  return (
    <LandingPageTemplate footer={null}>
      <FloatingNav />
      <PageTransition>
        <div className="min-h-screen flex flex-col bg-brand-white dark:bg-brand-black px-4 md:p-6 pt-24 md:pt-24 overflow-x-hidden">
          <div className="container mx-auto px-0 md:px-6 max-w-6xl flex-grow flex flex-col justify-start md:justify-center mb-8 md:mb-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              
              {/* Contact Info */}
              <div className="space-y-6 md:space-y-8 animate-slide-in-left opacity-0 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-brand-black dark:text-brand-white leading-none tracking-tighter">
                  TRABAJEMOS<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-black to-brand-black/50 dark:from-brand-white dark:to-brand-white/50">JUNTOS</span>
                </h1>
                
                <div className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-4 group">
                    <div className="bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black p-3 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <EnvelopeIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-brand-black dark:text-brand-white text-sm md:text-lg">denoiseteam@gmail.com</h3>
                      <p className="text-[10px] md:text-xs opacity-60 font-mono">Respuesta en &lt; 24h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black p-3 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <MapPinIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-brand-black dark:text-brand-white text-sm md:text-lg">Egaña 651</h3>
                      <p className="text-[10px] md:text-xs opacity-60 font-mono">Puerto Montt</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-brand-white dark:bg-brand-black p-5 md:p-8 border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark animate-slide-in-right opacity-0 [animation-delay:200ms] mb-8 lg:mb-0">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Nombre</label>
                      <input type="text" className={inputClasses} placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className={labelClasses}>Apellido</label>
                      <input type="text" className={inputClasses} placeholder="Tu apellido" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Email Corporativo</label>
                    <input type="email" className={inputClasses} placeholder="nombre@empresa.com" />
                  </div>
                  <div>
                    <label className={labelClasses}>Mensaje</label>
                    <textarea rows={4} className={inputClasses} placeholder="Cuéntanos brevemente porque estas aqui..."></textarea>
                  </div>
                  <button type="button" className="w-full bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black font-black py-4 border-2 border-transparent hover:border-brand-black dark:hover:border-brand-white hover:bg-brand-white hover:text-brand-black dark:hover:bg-brand-black dark:hover:text-brand-white transition-all shadow-hard dark:shadow-hard-dark hover:shadow-none hover:translate-y-1 active:translate-y-[2px] active:shadow-none uppercase tracking-wider mt-2">
                    Iniciar Conversación
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </LandingPageTemplate>
  );
};

export default ContactPage;
