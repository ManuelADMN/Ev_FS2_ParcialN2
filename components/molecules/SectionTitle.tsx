
import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-black text-brand-black dark:text-brand-white uppercase tracking-tight">{children}</h2>
    </div>
  );
};

export default SectionTitle;
