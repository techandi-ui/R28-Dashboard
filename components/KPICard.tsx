import React, { useState, useEffect } from 'react';
import { Icon } from './ui/Icon';

// Hook mejorado de count-up con easing suave
const useCountUp = (end: number, duration: number = 1000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let start = 0;
        const startTimestamp = Date.now();
        
        // Función de easing para animación más suave (ease-out-cubic)
        const easeOutCubic = (t: number): number => {
            return 1 - Math.pow(1 - t, 3);
        };
        
        const step = () => {
            const now = Date.now();
            const progress = Math.min((now - startTimestamp) / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentCount = Math.floor(easedProgress * (end - start) + start);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(end);
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

// Temas premium con gradientes sutiles y colores refinados
const themeClasses = {
    yellow: { 
        bg: 'bg-gradient-to-br from-amber-50 to-orange-50/50', 
        border: 'border-amber-200/60', 
        text: 'text-amber-950', 
        icon: 'text-amber-600',
        iconBg: 'bg-amber-100/70',
        valueText: 'text-slate-900'
    },
    blue: { 
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-50/50', 
        border: 'border-blue-200/60', 
        text: 'text-blue-950', 
        icon: 'text-blue-600',
        iconBg: 'bg-blue-100/70',
        valueText: 'text-slate-900'
    },
    green: { 
        bg: 'bg-gradient-to-br from-emerald-50 to-teal-50/50', 
        border: 'border-emerald-200/60', 
        text: 'text-emerald-950', 
        icon: 'text-emerald-600',
        iconBg: 'bg-emerald-100/70',
        valueText: 'text-slate-900'
    },
    default: { 
        bg: 'bg-white', 
        border: 'border-slate-200/60', 
        text: 'text-slate-700', 
        icon: 'text-slate-600',
        iconBg: 'bg-slate-100/70',
        valueText: 'text-slate-900'
    },
};

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, percentage, theme = 'default' }) => {
    const animatedValue = useCountUp(value, 1200);
    const currentTheme = themeClasses[theme];
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`
                group relative p-6 rounded-xl border backdrop-blur-sm
                transition-all duration-300 ease-out
                hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1
                ${currentTheme.bg} ${currentTheme.border}
                animate-[fadeInUp_0.5s_ease-out_forwards]
                opacity-0
            `}
            style={{ 
                animationDelay: '0ms',
                boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Efecto de brillo sutil en hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative">
                <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-sm font-medium tracking-tight ${currentTheme.text}`}>
                        {title}
                    </h3>
                    <div className={`
                        p-2 rounded-lg transition-all duration-300 
                        ${currentTheme.iconBg}
                        ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
                    `}>
                        <Icon name={icon} className={`w-5 h-5 ${currentTheme.icon}`} />
                    </div>
                </div>
                <div className="space-y-1">
                    <p className={`text-4xl font-semibold tracking-tight ${currentTheme.valueText}`}>
                        {animatedValue.toLocaleString('es-AR')}
                    </p>
                    {percentage !== undefined && (
                        <p className="text-sm text-slate-500 font-medium">
                            {percentage.toFixed(1)}% del total
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
