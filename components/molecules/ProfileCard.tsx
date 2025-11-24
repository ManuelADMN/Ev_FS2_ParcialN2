
import React from 'react';
import { CheckBadgeIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  id: string;
  imageUrl: string;
  name: string;
  title: string;
  followers: number;
  posts: number;
  index?: number;
  bio?: string;
  skills?: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ id, imageUrl, name, title, followers, posts, index = 0, bio, skills }) => {
  const navigate = useNavigate();
  // Base dimensions for consistency
  const cardDimensions = "w-full md:w-72 h-[26rem]"; // Fixed height for flip effect

  const handleClick = () => {
    navigate(`/team/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={`group relative ${cardDimensions} perspective-1000 animate-slide-up opacity-0 cursor-pointer`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Inner Container - The element that rotates on HOVER */}
      {/* Added specific group-hover class that matches our manual CSS in index.html */}
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 shadow-hard dark:shadow-hard-dark border-2 border-brand-black dark:border-brand-white bg-brand-white dark:bg-brand-black">
        
        {/* ================= FRONT FACE (Full Image) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col overflow-hidden z-20">
            
            {/* Full Height Image */}
            <img
            src={imageUrl}
            alt={`Profile of ${name}`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 grayscale-0"
            />
            
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent"></div>

            {/* Text Overlay Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-brand-white">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-none shadow-black drop-shadow-md">
                        {name}
                    </h3>
                    <CheckBadgeIcon className="w-5 h-5 text-google-blue" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-4">
                    {title}
                </p>

                {/* Stats Row Front */}
                <div className="flex gap-4 text-xs border-t border-brand-white/30 pt-3 opacity-80">
                    <div className="flex items-center gap-1">
                        <span className="font-black">{followers}</span>
                        <span className="font-medium text-[10px]">SEG.</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-black">{posts}</span>
                        <span className="font-medium text-[10px]">PROY.</span>
                    </div>
                </div>
            </div>
        </div>

        {/* ================= BACK FACE (Details) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white flex flex-col p-6 justify-between overflow-hidden z-10">
            
            {/* Back Content */}
            <div className="flex flex-col h-full">
                {/* Header Mini */}
                <div className="flex items-center gap-4 mb-6 border-b-2 border-brand-black/10 dark:border-brand-white/10 pb-4">
                    <div className="w-12 h-12 border-2 border-brand-black dark:border-brand-white overflow-hidden shrink-0">
                        <img src={imageUrl} alt="mini" className="w-full h-full object-cover grayscale-0" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-tighter leading-none">
                            {name}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                            {title}
                        </p>
                    </div>
                </div>
                
                {/* Bio */}
                <div className="flex-grow">
                    <p className="text-sm font-medium leading-relaxed mb-6 opacity-90 text-justify line-clamp-6">
                        {bio || "Bio no disponible."}
                    </p>
                </div>

                {/* View Profile Action */}
                <div className="mt-auto">
                    <div className="w-full py-2 bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-80 transition-opacity">
                        Ver Perfil Completo <ArrowRightIcon className="w-3 h-3" />
                    </div>
                </div>
            </div>
            
            <div className="text-center pt-2 mt-2 border-t border-brand-black/10 dark:border-brand-white/10">
                <span className="text-[10px] font-mono uppercase opacity-40">Denoise Team ID: #{index + 100}</span>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
