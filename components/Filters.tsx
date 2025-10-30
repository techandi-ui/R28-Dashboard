
import React, { useState } from 'react';
import { FiltersState } from '../types';
import { STATUS_OPTIONS } from '../constants';
import { Icon } from './ui/Icon';

interface FiltersProps {
    filters: FiltersState;
    setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
    availableCompanies: string[];
    availableReasons: string[];
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, availableCompanies, availableReasons }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, start: value } }));
        } else if (name === 'endDate') {
            setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, end: value } }));
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleMultiSelectChange = (field: 'companies' | 'reasons', value: string) => {
        setFilters(prev => {
            const currentValues = prev[field];
            if (currentValues.includes(value)) {
                return { ...prev, [field]: currentValues.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...currentValues, value] };
            }
        });
    };
    
    const clearFilters = () => {
        setFilters({
            dateRange: { start: null, end: null },
            status: '',
            companies: [],
            reasons: [],
            searchQuery: ''
        });
    };

    return (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {/* Search */}
                <div className="relative md:col-span-2 lg:col-span-4 xl:col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="magnifying-glass" className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="searchQuery"
                        value={filters.searchQuery}
                        onChange={handleInputChange}
                        placeholder="Buscar por Nro, Email, Motivo..."
                        className="w-full h-10 pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>
                
                {/* Date Range */}
                <input
                    type="date"
                    name="startDate"
                    value={filters.dateRange.start || ''}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-500"
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.dateRange.end || ''}
                    onChange={handleInputChange}
                     className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-500"
                />

                {/* Status Select */}
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                    {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                
                <button
                    onClick={clearFilters}
                    className="h-10 flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                    <Icon name="funnel" />
                    Limpiar Filtros
                </button>
            </div>
        </div>
    );
};
