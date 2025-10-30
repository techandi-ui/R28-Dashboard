
import React, { useState, useMemo } from 'react';
import { Claim, Status } from '../types';
import { Badge } from './ui/Badge';
import { STATUS_COLORS, URGENT_COLORS } from '../constants';
import { Icon } from './ui/Icon';

interface ClaimsTableProps {
    claims: Claim[];
    onViewDetails: (claimId: number) => void;
}

const ROWS_PER_PAGE = 15;

export const ClaimsTable: React.FC<ClaimsTableProps> = ({ claims, onViewDetails }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Claim; direction: 'asc' | 'desc' } | null>({ key: 'fechaReclamo', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);

    const sortedClaims = useMemo(() => {
        let sortableItems = [...claims];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [claims, sortConfig]);
    
    const paginatedClaims = useMemo(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        return sortedClaims.slice(startIndex, startIndex + ROWS_PER_PAGE);
    }, [sortedClaims, currentPage]);
    
    const totalPages = Math.ceil(sortedClaims.length / ROWS_PER_PAGE);

    const requestSort = (key: keyof Claim) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof Claim) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <Icon name="caret-up-down" className="text-slate-400 opacity-50 w-4 h-4" />;
        }
        return sortConfig.direction === 'asc' 
            ? <Icon name="caret-up" className="text-slate-700 w-4 h-4" /> 
            : <Icon name="caret-down" className="text-slate-700 w-4 h-4" />;
    };
    
    const headers: { key: keyof Claim; label: string }[] = [
        { key: 'nroReclamo', label: 'Nro. Reclamo' },
        { key: 'estado', label: 'Estado' },
        { key: 'fechaReclamo', label: 'Fecha' },
        { key: 'empresa', label: 'Empresa' },
        { key: 'motivo', label: 'Motivo' },
        { key: 'email', label: 'Email' },
    ];

    if (claims.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200/60 p-12 text-center text-slate-500">
                <Icon name="table" className="mx-auto text-5xl mb-4 text-slate-300" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No se encontraron reclamos</h3>
                <p className="text-sm text-slate-500">Intenta ajustar los filtros o revisa más tarde.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50/50">
                        <tr>
                            {headers.map(header => (
                                <th 
                                    key={header.key} 
                                    scope="col" 
                                    className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100/50 transition-colors select-none" 
                                    onClick={() => requestSort(header.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {header.label} {getSortIcon(header.key)}
                                    </div>
                                </th>
                            ))}
                            <th scope="col" className="relative px-6 py-4">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {paginatedClaims.map(claim => (
                            <tr key={claim.nroReclamo} className="hover:bg-slate-50/50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{claim.nroReclamo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex flex-col gap-1.5">
                                        <Badge colorClasses={`${STATUS_COLORS[claim.estado].bg} ${STATUS_COLORS[claim.estado].text} border ${STATUS_COLORS[claim.estado].border}`}>
                                            {claim.estado}
                                        </Badge>
                                        {claim.necesitaReposicion && (
                                            <Badge colorClasses={`${URGENT_COLORS.bg} ${URGENT_COLORS.text} border ${URGENT_COLORS.border}`} icon={<Icon name="warning-circle" weight="bold" />}>
                                                Urgente
                                            </Badge>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(claim.fechaReclamo).toLocaleDateString('es-AR')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{claim.empresa}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{claim.motivo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{claim.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => onViewDetails(claim.nroReclamo)} 
                                        className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-all duration-150 active:scale-95"
                                    >
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 bg-slate-50/30">
                    <p className="text-sm text-slate-600">
                        Página <span className="font-semibold text-slate-900">{currentPage}</span> de <span className="font-semibold text-slate-900">{totalPages}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                            disabled={currentPage === 1} 
                            className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-95"
                        >
                            Anterior
                        </button>
                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                            disabled={currentPage === totalPages} 
                            className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-95"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
