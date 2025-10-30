import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Claim } from '../../types';
import { CHART_COLORS } from '../../constants';

interface ClaimsByReasonBarChartProps {
    data: Claim[];
}

// Tooltip personalizado estilo premium
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700 shadow-xl">
                <p className="text-slate-100 font-semibold text-sm mb-1">{label}</p>
                <p className="text-emerald-400 text-sm font-medium">
                    {payload[0].value} {payload[0].value === 1 ? 'reclamo' : 'reclamos'}
                </p>
            </div>
        );
    }
    return null;
};

export const ClaimsByReasonBarChart: React.FC<ClaimsByReasonBarChartProps> = ({ data }) => {
    const chartData = useMemo(() => {
        const counts = data.reduce<Record<string, number>>((acc, claim) => {
            acc[claim.motivo] = (acc[claim.motivo] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts)
            .map(([name, value]) => ({ name, reclamos: value }))
            .sort((a, b) => b.reclamos - a.reclamos)
            .slice(0, 10);
    }, [data]);

    if (chartData.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-400">No hay datos para mostrar.</div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="reasonGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={CHART_COLORS.green[0]} stopOpacity={0.9}/>
                            <stop offset="95%" stopColor={CHART_COLORS.green[1]} stopOpacity={1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
                    <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
                        axisLine={{ stroke: CHART_COLORS.grid }}
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: CHART_COLORS.axis }} 
                        allowDecimals={false}
                        axisLine={{ stroke: CHART_COLORS.grid }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgb(248 250 252 / 0.5)' }} />
                    <Bar 
                        dataKey="reclamos" 
                        fill="url(#reasonGradient)" 
                        radius={[6, 6, 0, 0]}
                        animationDuration={800}
                        animationEasing="ease-out"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
