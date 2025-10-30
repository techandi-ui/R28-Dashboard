import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector } from 'recharts';
import { CHART_COLORS } from '../../constants';

interface ChartData {
    name: string;
    value: number;
    [key: string]: any;
}

interface StatusPieChartProps {
    data: ChartData[];
}

const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy - 5} dy={8} textAnchor="middle" fill={fill} className="text-base font-semibold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#475569" className="text-sm font-medium">
          {`${value} (${(percent * 100).toFixed(0)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="#fff"
          strokeWidth={3}
        />
      </g>
    );
};

export const StatusPieChart: React.FC<StatusPieChartProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (data.every(d => d.value === 0)) {
        return <div className="flex items-center justify-center h-full text-slate-400">No hay datos para mostrar.</div>;
    }

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const PatchedPie = Pie as any;

    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <PatchedPie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                        nameKey="name"
                        onMouseEnter={onPieEnter}
                        animationDuration={800}
                        animationEasing="ease-out"
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={CHART_COLORS.pie[index % CHART_COLORS.pie.length]}
                            />
                        ))}
                    </PatchedPie>
                    <Legend 
                      iconType="circle" 
                      iconSize={8} 
                      wrapperStyle={{ 
                          fontSize: '13px', 
                          paddingTop: '15px',
                          color: '#64748b'
                      }} 
                      verticalAlign="bottom"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
