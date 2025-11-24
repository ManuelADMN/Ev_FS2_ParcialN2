
import React, { useState, useEffect, useRef } from 'react';
import LandingPageTemplate from '../components/templates/LandingPageTemplate';
import Hero from '../components/organisms/Hero';
import DiscoverSection from '../components/organisms/DiscoverSection';
import AboutSection from '../components/organisms/AboutSection';
import ServicesSection from '../components/organisms/ServicesSection';
import TeamSection from '../components/organisms/TeamSection';
import OddieSection from '../components/organisms/OddieSection';
import Footer from '../components/organisms/Footer';
import FloatingNav from '../components/organisms/FloatingNav';
import SectionTransition from '../components/atoms/SectionTransition';

const HomePage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('down');
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch state
  const touchStartY = useRef<number | null>(null);
  const minSwipeDistance = 40; // Reduced for better sensitivity

  // Sections Array
  const sections = [
    <Hero />,
    <DiscoverSection />,
    <AboutSection />,
    <ServicesSection />,
    <OddieSection />,
    <TeamSection />,
    <Footer />
  ];

  const goNext = () => {
    if (currentSection < sections.length - 1) {
        isAnimating.current = true;
        setDirection('down');
        setCurrentSection(prev => prev + 1);
        setTimeout(() => { isAnimating.current = false; }, 1000);
    }
  };

  const goPrev = () => {
    if (currentSection > 0) {
        isAnimating.current = true;
        setDirection('up');
        setCurrentSection(prev => prev - 1);
        setTimeout(() => { isAnimating.current = false; }, 800);
    }
  };

  const getScrollStatus = () => {
      const container = containerRef.current;
      if (!container) return { isAtTop: true, isAtBottom: true };
      
      const isAtTop = container.scrollTop <= 2;
      // Buffer slightly larger for mobile browsers
      const isAtBottom = Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight - 5;
      
      return { isAtTop, isAtBottom };
  };

  // --- DESKTOP: WHEEL HANDLER ---
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;
      const { isAtTop, isAtBottom } = getScrollStatus();

      if (e.deltaY > 0) { // DOWN
        if (isAtBottom) goNext();
      } else { // UP
        if (isAtTop) goPrev();
      }
    };
    
    const currentContainer = containerRef.current;
    if(currentContainer) {
        window.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
        if (currentContainer) window.removeEventListener('wheel', handleWheel);
    }
  }, [currentSection, sections.length]);


  // --- MOBILE: TOUCH HANDLERS ---
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartY.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const distance = touchStartY.current - touchEndY;
    const isSwipeUp = distance > minSwipeDistance;
    const isSwipeDown = distance < -minSwipeDistance;

    const { isAtTop, isAtBottom } = getScrollStatus();

    if (isAnimating.current) return;

    if (isSwipeUp && isAtBottom) {
        goNext();
    } else if (isSwipeDown && isAtTop) {
        goPrev();
    }
    
    touchStartY.current = null;
  };

  const navigateToSection = (index: number) => {
    if (index === currentSection) return;
    if (isAnimating.current) return;
    isAnimating.current = true;
    setDirection(index > currentSection ? 'down' : 'up');
    setCurrentSection(index);
    setTimeout(() => { isAnimating.current = false; }, 1000);
  };

  return (
    <LandingPageTemplate footer={null} hideBrandTag={currentSection === 0}>
      <FloatingNav activeSectionIndex={currentSection} onNavigate={navigateToSection} />
      
      <div 
        className="w-full h-[100dvh] overflow-hidden bg-brand-white dark:bg-brand-black touch-none md:touch-auto"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <SectionTransition ref={containerRef} key={currentSection} direction={direction}>
            {sections[currentSection]}
        </SectionTransition>
      </div>
      
    </LandingPageTemplate>
  );
};

export default HomePage;
