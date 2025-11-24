
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  href?: string; // For external links or anchors
  to?: string;   // For internal routing
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ href, to, children, className = '', onClick }) => {
  // Estilo High Contrast / Neobrutalist
  // Día: Fondo negro, Texto blanco, Borde negro
  // Noche: Fondo blanco, Texto negro
  // Tactile Feel: active:translate-y-[2px] active:shadow-none
  const baseClasses = "inline-block font-bold py-3 px-8 rounded-lg text-lg border-2 border-brand-black dark:border-brand-white transition-all duration-200 shadow-hard dark:shadow-hard-dark hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none bg-brand-black text-brand-white hover:bg-brand-white hover:text-brand-black dark:bg-brand-white dark:text-brand-black dark:hover:bg-brand-black dark:hover:text-brand-white cursor-pointer select-none";
  
  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </a>
  );
};

export const ContactButton: React.FC<{href: string}> = ({href}) => {
    // Botón secundario
    const classes = "border-2 border-brand-black dark:border-brand-white bg-brand-white text-brand-black dark:bg-brand-black dark:text-brand-white px-4 py-2 rounded-md hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black font-semibold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-none";
    return <a href={href} className={classes}>Contacto</a>
}


export default Button;
