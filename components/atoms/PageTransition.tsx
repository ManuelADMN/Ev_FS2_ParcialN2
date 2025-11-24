
import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen bg-brand-white dark:bg-brand-black overflow-x-hidden">
      {/* Visual Curtain Removed as requested */}
      
      {/* Content with subtle fade-in */}
      <div className="relative z-10 animate-fade-in h-full">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
