
import React, { forwardRef } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  direction: 'up' | 'down' | 'none';
}

const SectionTransition = forwardRef<HTMLDivElement, SectionTransitionProps>(({ children }, ref) => {
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-brand-white dark:bg-brand-black">
      
      {/* Visual Curtain Removed as requested */}

      {/* Content Container with Scroll Logic */}
      <div ref={ref} className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth">
        {children}
      </div>
    </div>
  );
});

SectionTransition.displayName = 'SectionTransition';

export default SectionTransition;
