
import React from 'react';
import ProfileCard from '../molecules/ProfileCard';
import SectionTitle from '../molecules/SectionTitle';
import { teamMembersData } from '../../services/geminiService';

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="h-full min-h-fit md:min-h-full flex flex-col justify-center bg-brand-white dark:bg-brand-black py-8 md:py-0">
      <div className="container mx-auto px-4 md:px-6 flex flex-col h-full justify-center items-center">
        <div className="shrink-0 mb-6 md:mb-10 text-center animate-slide-up opacity-0 mt-8 md:mt-0">
            <SectionTitle>Conoce a Nuestro Equipo</SectionTitle>
            <p className="text-brand-black dark:text-brand-white font-bold mt-2 md:mt-4 opacity-60 text-sm md:text-base">
              Expertos en IA y Sostenibilidad
            </p>
        </div>
        
        {/* Mobile: Horizontal Snap | Desktop: Flex Wrap */}
        <div className="flex md:flex-wrap md:justify-center gap-6 md:gap-8 w-full items-center overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 px-2 md:px-0 no-scrollbar">
          {teamMembersData.map((member, index) => (
            <div 
                key={member.id} 
                className="animate-slide-in-right opacity-0 min-w-[85vw] md:min-w-0 md:w-auto flex justify-center snap-center"
                style={{ animationDelay: `${index * 150}ms` }}
            >
                <ProfileCard {...member} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
