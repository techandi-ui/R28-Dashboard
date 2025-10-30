import React, { useState, useEffect } from 'react';
import { Icon } from './ui/Icon';

// A simple count-up hook
const useCountUp = (end: number, duration: number = 800) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let start = 0;
        const startTimestamp = Date.now();
        
        const step = () => {
            const now = Date.now();
            const progress = Math.min((now - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(end); // Ensure it ends on the exact number
            }
        };
        
        requestAnimationFrame(step);
    }, [end, duration]);

    return count;
};

interface KPICardProps {
    title: string;
    value: number;
    icon: string;
    percentage?: number;
    theme?: 'yellow' | 'blue' | 'green' | 'default';
}

const themeClasses = {
    yellow: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', icon: 'text-amber-600' },
    blue: { bg: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-900', icon: 'text-blue-600' },
    green: { bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-900', icon: 'text-green-600' },
    default: { bg: 'bg-white', border: 'border-gray-200', text: 'text-gray-900', icon: 'text-gray-600' },
};

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, percentage, theme = 'default' }) => {
    const animatedValue = useCountUp(value);
    const currentTheme = themeClasses[theme];

    return (
        <div className={`p-6 rounded-lg border shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-150 ease-in-out transform hover:-translate-y-1 ${currentTheme.bg} ${currentTheme.border}`}>
            <div className="flex justify-between items-start">
                <h3 className={`text-sm font-medium ${currentTheme.text}`}>{title}</h3>
                <Icon name={icon} className={`w-6 h-6 ${currentTheme.icon}`} />
            </div>
            <div className="mt-2">
                <p className="text-3xl font-semibold text-gray-800">{animatedValue.toLocaleString('es-AR')}</p>
                {percentage !== undefined && (
                    <p className="text-sm text-gray-500 mt-1">
                        {percentage.toFixed(1)}% del total
                    </p>
                )}
            </div>
        </div>
    );
};
