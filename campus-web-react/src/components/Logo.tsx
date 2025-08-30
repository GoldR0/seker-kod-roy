import React from 'react';
import { onoLogo } from '../assets';

interface LogoProps {
  className?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', alt = 'קמפוס לוגו' }) => {
  return (
    <img 
      src={onoLogo} 
      alt={alt} 
      className={className}
    />
  );
};

export default Logo;
