
import React from 'react';

interface SkeletonLoaderProps {
    className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className }) => {
    return (
        <div className={`bg-slate-100 rounded-xl animate-shimmer ${className}`} />
    );
};
