
import React, { useState, useEffect } from 'react';
import { ChartBarIcon, InformationCircleIcon, UsersIcon, EnvelopeIcon, SunIcon, MoonIcon, HomeIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom';

interface FloatingNavProps {
  activeSectionIndex?: number;
  onNavigate?: (index: number) => void;
}

const DogIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 9.5c-1.5 0-2.8.8-3.5 2-.5-.2-1.2-.2-2 .2l-2 1c-.5.3-1 .3-1.5.2-.8-.2-1.5-.8-2-1.5L8 10.5c-1.5-1.5-3.5-2-5.5-1.5v10h12c2.5 0 4.5-1.5 5-4 .3-1.5 0-3-1-4 .5-.5 1-1 1-1.5s-.5-1-1-1zM6 11.5c.5-.2 1 .2 1.2.7.2.5-.2 1-.7 1.2-.5.2-1-.2-1.2-.7-.2-.5.2-1 .7-1.2z" />
  </svg>
);

const navItems = [
  { id: 'hero', icon: HomeIcon, label: 'Inicio' },
  { id: 'discover', icon: LightBulbIcon, label: 'Cómo funciona' },
  { id: 'about', icon: InformationCircleIcon, label: 'Nosotros' },
  { id: 'services', icon: ChartBarIcon, label: 'Nuestros proyectos' },
  { id: 'oddie', icon: DogIcon, label: 'Oddie AI' },
  { id: 'team', icon: UsersIcon, label: 'Equipo' },
  { id: 'contact', icon: EnvelopeIcon, label: 'Contacto' },
];

const FloatingNav: React.FC<FloatingNavProps> = ({ activeSectionIndex, onNavigate }) => {
    const [internalActiveSection, setInternalActiveSection] = useState<string>('hero');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const [theme, setTheme] = useState<string>(() => {
      if (typeof window === 'undefined') return 'light';
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme || (systemPrefersDark ? 'dark' : 'light');
    });

    useEffect(() => {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
      if (typeof activeSectionIndex === 'number') {
        setInternalActiveSection(navItems[activeSectionIndex]?.id || 'hero');
        setIsVisible(true);
      } else if (!isHomePage) {
         if (location.pathname === '/contact') setInternalActiveSection('contact');
         else setInternalActiveSection('');
      }
    }, [activeSectionIndex, isHomePage, location.pathname]);

    useEffect(() => {
        if (typeof activeSectionIndex === 'number') return; 
        const handleScroll = () => {
             setIsVisible(true);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSectionIndex]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number, item: typeof navItems[0]) => {
        e.preventDefault();
        
        if ((item as any).isPage) {
            navigate(`/${item.id}`);
            return;
        }

        if (isHomePage && onNavigate) {
            onNavigate(index);
        } else {
            navigate('/', { state: { targetId: item.id } });
        }
    };

    return (
        <nav 
            className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'} hidden lg:block`}
            aria-hidden={!isVisible}
        >
             <div className="bg-brand-white dark:bg-brand-black border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark rounded-full px-2 py-4 md:px-3 md:py-6 scale-90 md:scale-100 origin-right">
                <ul className="flex flex-col items-center space-y-3 md:space-y-4">
                    {navItems.map((item, index) => {
                        const IconComponent = item.icon;
                        const isActive = internalActiveSection === item.id;
                        return (
                            <li key={item.id}>
                                <a
                                    href={`/#${item.id}`}
                                    onClick={(e) => handleLinkClick(e, index, item)}
                                    aria-label={item.label}
                                    title={item.label}
                                    className={`
                                        group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all duration-300 border-2 
                                        ${isActive 
                                            ? 'bg-brand-black border-brand-black dark:bg-brand-white dark:border-brand-white' 
                                            : 'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-gray-900'}
                                    `}
                                >
                                    <IconComponent className={`
                                        w-4 h-4 md:w-5 md:h-5 transition-colors duration-300
                                        ${isActive 
                                            ? 'text-brand-white dark:text-brand-black' 
                                            : 'text-brand-black dark:text-brand-white group-hover:text-brand-black/70 dark:group-hover:text-brand-white/70'}
                                    `} />
                                </a>
                            </li>
                        );
                    })}
                     <li className="w-6 h-px bg-brand-black dark:bg-brand-white my-1 md:my-2"></li>
                    <li>
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-900 border-2 border-transparent"
                        >
                            {theme === 'light' ? (
                                <MoonIcon className="w-4 h-4 md:w-5 md:h-5 text-brand-black group-hover:text-brand-black/70" />
                            ) : (
                                <SunIcon className="w-4 h-4 md:w-5 md:h-5 text-brand-white group-hover:text-brand-white/70" />
                            )}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default FloatingNav;
