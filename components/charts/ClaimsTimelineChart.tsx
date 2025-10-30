import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Claim } from '../../types';
import { CHART_COLORS } from '../../constants';

interface ClaimsTimelineChartProps {
    data: Claim[];
}

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
        return <div className="flex items-center justify-center h-full text-gray-500">No hay datos para mostrar.</div>;
    }

    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={CHART_COLORS.indigo[0]} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={CHART_COLORS.indigo[1]} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: CHART_COLORS.axis }} 
                        tickFormatter={(str) => {
                            const date = new Date(str);
                            return date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' });
                        }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: CHART_COLORS.axis }} allowDecimals={false} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #E5E7EB',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}
                        labelFormatter={(label) => new Date(label).toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    />
                    <Area type="monotone" dataKey="reclamos" stroke="none" fill="url(#timelineGradient)" />
                    <Line 
                        type="monotone" 
                        dataKey="reclamos" 
                        stroke={CHART_COLORS.indigo[1]} 
                        strokeWidth={2} 
                        dot={false} 
                        activeDot={{ r: 6, strokeWidth: 2, fill: '#fff', stroke: CHART_COLORS.indigo[1] }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
