
import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    colorClasses: string;
    icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, colorClasses, icon }) => {
    return (
        <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium ${colorClasses}`}>
            {icon}
            {children}
        </span>
    );
};
