
import React, { useState, useEffect } from 'react';
import Logo from '../atoms/Logo';
import { InformationCircleIcon, ChartBarIcon, UsersIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const navItems = [
  { id: 'about', icon: InformationCircleIcon, label: 'Nosotros' },
  { id: 'services', icon: ChartBarIcon, label: 'Nuestros proyectos' },
  { id: 'team', icon: UsersIcon, label: 'Equipo' },
  { id: 'contact', icon: EnvelopeIcon, label: 'Contacto' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Lógica para el fondo desenfocado
      setIsScrolled(window.scrollY > 10);

      // Lógica para resaltar la sección activa
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollOffset = 150;
      const scrollPosition = window.scrollY + scrollOffset;

      let currentActiveSection = '';

      // Special check to activate 'contact' when scrolled to the bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 5; // 5px buffer

      if (isAtBottom) {
        currentActiveSection = 'contact';
      } else {
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && scrollPosition >= section.offsetTop) {
                currentActiveSection = navItems[i].id;
                break;
            }
        }
      }
      
      setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Establecer estado inicial
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-white/80 backdrop-blur-sm shadow-md dark:bg-brand-black/80' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-label={item.label}
                title={item.label}
              >
                <IconComponent className={`
                  w-7 h-7 transition-all duration-300 transform hover:scale-110
                  ${isActive ? 'text-dark-orange' : 'text-soft-purple hover:text-dark-orange'}
                `} />
              </a>
            );
          })}
        </nav>
        <button className="md:hidden text-soft-purple">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
