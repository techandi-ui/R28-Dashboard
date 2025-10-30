
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
            return <Icon name="caret-up-down" className="text-gray-400 opacity-50" />;
        }
        return sortConfig.direction === 'asc' ? <Icon name="caret-up" /> : <Icon name="caret-down" />;
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
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
                <Icon name="table" className="mx-auto text-4xl mb-4" />
                <h3 className="text-lg font-medium">No se encontraron reclamos</h3>
                <p className="text-sm">Intenta ajustar los filtros o revisa más tarde.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map(header => (
                                <th key={header.key} scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort(header.key)}>
                                    <div className="flex items-center gap-2">
                                        {header.label} {getSortIcon(header.key)}
                                    </div>
                                </th>
                            ))}
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedClaims.map(claim => (
                            <tr key={claim.nroReclamo} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.nroReclamo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex flex-col gap-1">
                                        <Badge colorClasses={`${STATUS_COLORS[claim.estado].bg} ${STATUS_COLORS[claim.estado].text}`}>
                                            {claim.estado}
                                        </Badge>
                                        {claim.necesitaReposicion && (
                                            <Badge colorClasses={`${URGENT_COLORS.bg} ${URGENT_COLORS.text}`} icon={<Icon name="warning-circle" weight="bold" />}>
                                                Urgente
                                            </Badge>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(claim.fechaReclamo).toLocaleDateString('es-AR')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.empresa}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.motivo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onViewDetails(claim.nroReclamo)} className="text-blue-600 hover:text-blue-900">Ver Detalles</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                    <p className="text-sm text-gray-700">
                        Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Anterior</button>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Siguiente</button>
                    </div>
                </div>
            )}
        </div>
    );
};
