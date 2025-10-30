
import React from 'react';
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

    const hasActiveFilters = filters.searchQuery || filters.status || 
        filters.dateRange.start || filters.dateRange.end ||
        filters.companies.length > 0 || filters.reasons.length > 0;

    return (
        <div className="mb-8 p-6 bg-white rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {/* Search */}
                <div className="relative md:col-span-2 lg:col-span-4 xl:col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Icon name="magnifying-glass" className="text-slate-400 w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        name="searchQuery"
                        value={filters.searchQuery}
                        onChange={handleInputChange}
                        placeholder="Buscar por Nro, Email, Motivo..."
                        className="
                            w-full h-11 pl-10 pr-4 py-2 
                            border border-slate-200 rounded-lg 
                            bg-slate-50/50
                            text-sm text-slate-900 placeholder:text-slate-400
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white
                            transition-all duration-200
                        "
                    />
                </div>
                
                {/* Date Range */}
                <input
                    type="date"
                    name="startDate"
                    value={filters.dateRange.start || ''}
                    onChange={handleInputChange}
                    className="
                        w-full h-11 px-3.5 py-2 
                        border border-slate-200 rounded-lg 
                        bg-slate-50/50
                        text-sm text-slate-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white
                        transition-all duration-200
                    "
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.dateRange.end || ''}
                    onChange={handleInputChange}
                    className="
                        w-full h-11 px-3.5 py-2 
                        border border-slate-200 rounded-lg 
                        bg-slate-50/50
                        text-sm text-slate-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white
                        transition-all duration-200
                    "
                />

                {/* Status Select */}
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleInputChange}
                    className="
                        w-full h-11 px-3.5 py-2 
                        border border-slate-200 rounded-lg 
                        bg-slate-50/50
                        text-sm text-slate-900
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white
                        transition-all duration-200
                        cursor-pointer
                    "
                >
                    {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                
                <button
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    className={`
                        h-11 flex items-center justify-center gap-2 px-4 py-2 
                        border rounded-lg
                        text-sm font-medium
                        transition-all duration-200
                        active:scale-95
                        ${hasActiveFilters 
                            ? 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 hover:shadow-sm' 
                            : 'border-slate-100 text-slate-400 bg-slate-50/50 cursor-not-allowed opacity-60'
                        }
                    `}
                >
                    <Icon name="funnel" className="w-4 h-4" />
                    Limpiar Filtros
                </button>
            </div>
        </div>
    );
};
