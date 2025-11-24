
import React from 'react';
import { Service } from '../../types/types';
import Icon from '../atoms/Icon';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  // Google Palette for rotation
  const colors = [
    { text: 'text-google-blue', bg: 'bg-google-blue', border: 'border-google-blue' },
    { text: 'text-google-red', bg: 'bg-google-red', border: 'border-google-red' },
    { text: 'text-google-yellow', bg: 'bg-google-yellow', border: 'border-google-yellow' },
    { text: 'text-google-green', bg: 'bg-google-green', border: 'border-google-green' },
  ];

  const theme = colors[index % colors.length];
  
  return (
    <div 
        className="group relative w-full h-full overflow-hidden bg-brand-white dark:bg-brand-black border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark"
    >
      
      {/* ============ HIDDEN CONTENT (Revealed on Hover - SLIDE UP) ============ */}
      <div className="absolute inset-0 w-full h-full bg-brand-white dark:bg-brand-black flex flex-col justify-center items-center p-8 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10">
            {/* Tech Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #000 25%, #000 26%, transparent 27%, transparent 74%, #000 75%, #000 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #000 25%, #000 26%, transparent 27%, transparent 74%, #000 75%, #000 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute inset-0 opacity-5 pointer-events-none dark:invert" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #fff 25%, #fff 26%, transparent 27%, transparent 74%, #fff 75%, #fff 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #fff 25%, #fff 26%, transparent 27%, transparent 74%, #fff 75%, #fff 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}></div>

            <div className={`w-10 h-10 mb-4 ${theme.text} relative z-20`}>
                <Icon name={service.icon} className="w-full h-full" />
            </div>
            
            <h3 className="text-lg font-black uppercase mb-2 text-brand-black dark:text-brand-white relative z-20 leading-tight">
                {service.title}
            </h3>

            <p className="text-brand-black/80 dark:text-brand-white/80 font-medium text-sm leading-relaxed relative z-20">
                {service.description}
            </p>
            
            <div className={`mt-6 h-1 w-12 ${theme.bg} relative z-20`}></div>
      </div>

      {/* ============ COVER CONTENT (Slides Up on Hover - FRONT) ============ */}
      <div className="absolute inset-0 w-full h-full bg-brand-white dark:bg-brand-black flex flex-col justify-center items-center p-6 z-20 group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
            
            {/* Decorative corner accent */}
            <div className={`absolute top-0 right-0 w-16 h-16 ${theme.bg} border-l-2 border-b-2 border-brand-black dark:border-brand-white transition-all duration-300 group-hover:w-full group-hover:h-2 group-hover:border-b-0`}></div>

            {/* Project Name (Big) */}
            {service.projectName && (
                <div className="mb-2 text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-black/40 dark:text-brand-white/40 block mb-1">PROYECTO</span>
                    <span className={`text-5xl font-black ${theme.text} leading-none tracking-tighter`}>
                        {service.projectName}
                    </span>
                </div>
            )}

            {/* Icon Container */}
            <div className={`w-20 h-20 my-6 border-2 border-brand-black dark:border-brand-white flex items-center justify-center bg-brand-white dark:bg-brand-black ${theme.text} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform duration-500 group-hover:scale-0`}>
                <Icon name={service.icon} className={`w-10 h-10`} />
            </div>
            
            <h3 className="text-xl font-bold text-brand-black dark:text-brand-white group-hover:opacity-0 transition-opacity duration-300 text-center max-w-[80%]">
                {service.title}
            </h3>
      </div>
      
    </div>
  );
};

export default ServiceCard;
