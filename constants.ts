import { Status } from './types';

export const STATUS_OPTIONS = [
    { value: '', label: 'Todos los Estados' },
    { value: Status.EnCola, label: 'En Cola' },
    { value: Status.EnProceso, label: 'En Proceso' },
    { value: Status.Finalizado, label: 'Finalizado' },
];

export const STATUS_COLORS: { [key in Status]: { bg: string; text: string; border: string } } = {
    [Status.EnCola]: {
        bg: 'bg-amber-100',
        text: 'text-amber-900',
        border: 'border-amber-300'
    },
    [Status.EnProceso]: {
        bg: 'bg-blue-200',
        text: 'text-blue-900',
        border: 'border-blue-400'
    },
    [Status.Finalizado]: {
        bg: 'bg-green-200',
        text: 'text-green-900',
        border: 'border-green-400'
    },
};

export const URGENT_COLORS = {
    bg: 'bg-red-200',
    text: 'text-red-900',
    border: 'border-red-400'
};

export const CHART_COLORS = {
    blue: ['#60A5FA', '#3B82F6'],
    green: ['#4ADE80', '#22C55E'],
    indigo: ['#818CF8', '#6366F1'],
    pie: ['#FBBF24', '#60A5FA', '#4ADE80'], // Amber, Blue, Green for Pie Chart
    axis: '#4B5563', // Tailwind's gray-600 for better text legibility
};
