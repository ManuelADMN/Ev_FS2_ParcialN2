import React from 'react';
import * as Heroicons from '@heroicons/react/24/outline';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const Icons = Heroicons as { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> };
  let IconComponent = Icons['QuestionMarkCircleIcon'];

  // Validate that the icon name is a valid key and its value is a renderable component.
  if (name && Object.prototype.hasOwnProperty.call(Icons, name)) {
    const potentialComponent = Icons[name];
    if (typeof potentialComponent === 'function' || typeof potentialComponent === 'object') {
        IconComponent = potentialComponent;
    }
  }
    
  return <IconComponent className={className} />;
};

export default Icon;