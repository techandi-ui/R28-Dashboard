
import React from 'react';

interface SkeletonLoaderProps {
    className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className }) => {
    return (
        <div className={`bg-gray-200 rounded-md animate-pulse ${className}`} />
    );
};
