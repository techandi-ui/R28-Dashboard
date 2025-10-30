import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Claim } from '../../types';
import { CHART_COLORS } from '../../constants';

interface ClaimsTimelineChartProps {
    data: Claim[];
}

// Tooltip personalizado estilo premium
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const date = new Date(label);
        const formattedDate = date.toLocaleDateString('es-AR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        return (
            <div className="bg-slate-900/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700 shadow-xl">
                <p className="text-slate-100 font-semibold text-sm mb-1 capitalize">{formattedDate}</p>
                <p className="text-indigo-400 text-sm font-medium">
                    {payload[0].value} {payload[0].value === 1 ? 'reclamo' : 'reclamos'}
                </p>
            </div>
        );
    }
    return null;
};

export const ClaimsTimelineChart: React.FC<ClaimsTimelineChartProps> = ({ data }) => {
    const chartData = useMemo(() => {
        const counts = data.reduce((acc, claim) => {
            const date = new Date(claim.fechaReclamo).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        return Object.entries(counts)
            .map(([date, count]) => ({ date, reclamos: count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [data]);
    
    if (chartData.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-400">No hay datos para mostrar.</div>;
    }

    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={CHART_COLORS.indigo[0]} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={CHART_COLORS.indigo[1]} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
                    <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: CHART_COLORS.axis }} 
                        axisLine={{ stroke: CHART_COLORS.grid }}
                        tickFormatter={(str) => {
                            const date = new Date(str);
                            return date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' });
                        }}
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: CHART_COLORS.axis }} 
                        allowDecimals={false}
                        axisLine={{ stroke: CHART_COLORS.grid }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey="reclamos" 
                        stroke="none" 
                        fill="url(#timelineGradient)"
                        animationDuration={1000}
                        animationEasing="ease-out"
                    />
                    <Line 
                        type="monotone" 
                        dataKey="reclamos" 
                        stroke={CHART_COLORS.indigo[1]} 
                        strokeWidth={2.5} 
                        dot={false} 
                        activeDot={{ 
                            r: 6, 
                            strokeWidth: 2, 
                            fill: '#fff', 
                            stroke: CHART_COLORS.indigo[1] 
                        }}
                        animationDuration={1000}
                        animationEasing="ease-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
