import { Status } from './types';

export const STATUS_OPTIONS = [
    { value: '', label: 'Todos los Estados' },
    { value: Status.EnCola, label: 'En Cola' },
    { value: Status.EnProceso, label: 'En Proceso' },
    { value: Status.Finalizado, label: 'Finalizado' },
];

// Paleta de colores premium estilo shadcn/moderne
export const STATUS_COLORS: { [key in Status]: { bg: string; text: string; border: string } } = {
    [Status.EnCola]: {
        bg: 'bg-amber-50',
        text: 'text-amber-950',
        border: 'border-amber-200'
    },
    [Status.EnProceso]: {
        bg: 'bg-blue-50',
        text: 'text-blue-950',
        border: 'border-blue-200'
    },
    [Status.Finalizado]: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-950',
        border: 'border-emerald-200'
    },
};

export const URGENT_COLORS = {
    bg: 'bg-rose-50',
    text: 'text-rose-950',
    border: 'border-rose-200'
};

// Colores más sofisticados y menos saturados para gráficos
export const CHART_COLORS = {
    blue: ['#60a5fa', '#3b82f6', '#2563eb'],
    green: ['#34d399', '#10b981', '#059669'],
    indigo: ['#818cf8', '#6366f1', '#4f46e5'],
    purple: ['#a78bfa', '#8b5cf6', '#7c3aed'],
    // Paleta para gráfico de pie - colores más sutiles y elegantes
    pie: ['#f59e0b', '#3b82f6', '#10b981'], 
    // Colores para gráficos de barras - gradientes suaves
    bar: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'],
    // Color para ejes y texto de gráficos
    axis: '#64748b', // slate-500
    grid: '#e2e8f0', // slate-200
    // Fondo de tooltips
    tooltip: {
        bg: 'rgba(15, 23, 42, 0.95)', // slate-900 con opacidad
        text: '#f1f5f9', // slate-100
        border: '#475569' // slate-600
    }
};
