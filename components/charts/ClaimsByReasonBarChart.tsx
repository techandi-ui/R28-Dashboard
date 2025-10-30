import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Claim } from '../../types';
import { CHART_COLORS } from '../../constants';

interface ClaimsByReasonBarChartProps {
    data: Claim[];
}

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
        return <div className="flex items-center justify-center h-full text-gray-500">No hay datos para mostrar.</div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="reasonGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={CHART_COLORS.green[0]} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={CHART_COLORS.green[1]} stopOpacity={1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: CHART_COLORS.axis }} />
                    <YAxis tick={{ fontSize: 12, fill: CHART_COLORS.axis }} allowDecimals={false} />
                    <Tooltip
                        cursor={{ fill: '#F9FAFB' }}
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #E5E7EB',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}
                    />
                    <Bar dataKey="reclamos" fill="url(#reasonGradient)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
