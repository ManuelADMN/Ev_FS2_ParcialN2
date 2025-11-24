
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LandingPageTemplate from '../components/templates/LandingPageTemplate';
import FloatingNav from '../components/organisms/FloatingNav';
import PageTransition from '../components/atoms/PageTransition';
import { teamMembersData } from '../services/geminiService';
import { TeamMember } from '../types/types';
import { ArrowLeftIcon, CheckBadgeIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

const TeamMemberPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const foundMember = teamMembersData.find(m => m.id === id);
    if (foundMember) {
      setMember(foundMember);
    } else {
      navigate('/'); // Redirect if not found
    }
  }, [id, navigate]);

  if (!member) return null;

  return (
    <LandingPageTemplate footer={null}>
      <FloatingNav />
      <PageTransition>
        <div className="min-h-screen bg-brand-white dark:bg-brand-black flex flex-col pt-20 pb-10 px-6">
          
          <div className="container mx-auto max-w-6xl h-full flex-grow flex flex-col justify-center">
            
            {/* Back Button */}
            <button 
                onClick={() => navigate('/')} 
                className="mb-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-black dark:text-brand-white opacity-60 hover:opacity-100 transition-opacity w-fit"
            >
                <ArrowLeftIcon className="w-4 h-4" /> Volver al equipo
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start h-full">
                
                {/* LEFT COLUMN: PHOTO & STATUS */}
                <div className="lg:col-span-5 h-full animate-slide-in-left opacity-0">
                    <div className="relative w-full aspect-[3/4] lg:h-[80vh] border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark bg-brand-black">
                        <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale-0" 
                        />
                        {/* Status Overlay */}
                        <div className="absolute top-4 left-4 bg-brand-white dark:bg-brand-black px-3 py-1 border-2 border-brand-black dark:border-brand-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-google-green rounded-full animate-pulse"></span>
                            Active Agent
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: DOSSIER DATA */}
                <div className="lg:col-span-7 flex flex-col justify-center h-full py-8 space-y-8 animate-slide-in-right opacity-0 [animation-delay:200ms]">
                    
                    {/* Header */}
                    <div className="border-b-4 border-brand-black dark:border-brand-white pb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-5xl md:text-7xl font-black text-brand-black dark:text-brand-white uppercase tracking-tighter leading-none">
                                {member.name}
                            </h1>
                            <CheckBadgeIcon className="w-8 h-8 md:w-12 md:h-12 text-google-blue" />
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-brand-black/60 dark:text-brand-white/60 uppercase tracking-tight">
                            {member.title}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 border-b-2 border-brand-black/10 dark:border-brand-white/10 pb-8">
                        <div>
                            <span className="block text-4xl font-black text-brand-black dark:text-brand-white">{member.followers}</span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50">Seguidores</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-black text-brand-black dark:text-brand-white">{member.posts}</span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50">Proyectos</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-black text-brand-black dark:text-brand-white">99%</span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50">Eficiencia</span>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <BriefcaseIcon className="w-4 h-4" /> Perfil Profesional
                        </h3>
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-brand-black dark:text-brand-white text-justify">
                            {member.bio}
                        </p>
                    </div>

                    {/* Skills */}
                    <div>
                         <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <AcademicCapIcon className="w-4 h-4" /> Especialidades Técnicas
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {member.skills.map((skill, idx) => (
                                <span 
                                    key={idx} 
                                    className="px-4 py-2 border-2 border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white font-bold uppercase text-sm hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black transition-colors cursor-default shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

          </div>
        </div>
      </PageTransition>
    </LandingPageTemplate>
  );
};

export default TeamMemberPage;
