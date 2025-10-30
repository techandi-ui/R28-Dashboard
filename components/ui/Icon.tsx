
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

export const Icon: React.FC<IconProps> = ({ name, className = '', weight = 'regular' }) => {
    return <i className={`ph ph-${name} ${className}`} />;
};
