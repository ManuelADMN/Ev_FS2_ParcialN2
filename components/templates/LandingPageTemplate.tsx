
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';

interface LandingPageTemplateProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  hideBrandTag?: boolean;
}

const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({ children, footer, hideBrandTag = false }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Fixed Top Border Tag (Left) - Always visible on mobile, conditionally hidden on desktop (lg) */}
      <Link 
        to="/login"
        className={`fixed top-0 left-4 md:left-8 z-50 bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black px-4 py-2 md:px-6 md:py-3 rounded-b-lg font-black tracking-widest border-x-2 border-b-2 border-brand-white dark:border-brand-black shadow-hard dark:shadow-hard-dark hover:translate-y-1 hover:shadow-none transition-all cursor-pointer active:scale-95 ${hideBrandTag ? 'lg:hidden' : ''}`}
      >
        DENOISE
      </Link>

      {/* Mobile Back to Home Button (Right) - Visible ONLY on internal pages and ONLY on mobile/tablet */}
      {!isHomePage && (
        <Link
          to="/"
          className="fixed top-3 right-4 z-50 lg:hidden w-10 h-10 flex items-center justify-center bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark rounded-full active:scale-90 transition-transform"
          aria-label="Volver al Inicio"
        >
          <HomeIcon className="w-5 h-5" />
        </Link>
      )}

      <main className="flex-grow">
        {children}
      </main>
      {footer}
    </>
  );
};

export default LandingPageTemplate;
