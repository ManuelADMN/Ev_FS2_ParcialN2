
import React from 'react';
import Button from '../atoms/Button';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="h-full min-h-[100dvh] flex flex-col justify-center items-center bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white border-t-2 border-brand-black dark:border-brand-white">
      <div className="container mx-auto px-6 text-center flex flex-col justify-center h-full py-8 md:py-0">
        <div className="flex-grow flex flex-col justify-center items-center animate-slide-up">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight break-words max-w-4xl mb-8 md:mb-12">
              ¿LISTO PARA DECIDIR?
            </h2>
            <div className="mt-4 md:mt-0">
              <Button to="/contact">
                CONTÁCTANOS
              </Button>
            </div>
        </div>
        <div className="mt-12 pb-8 md:pb-8 text-xs md:text-sm font-bold opacity-60">
          <p>&copy; {new Date().getFullYear()} Denoise. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
