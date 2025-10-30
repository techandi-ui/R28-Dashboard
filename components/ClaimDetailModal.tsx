
import React from 'react';
import { Claim } from '../types';
import { Modal } from './ui/Modal';
import { Badge } from './ui/Badge';
import { STATUS_COLORS, URGENT_COLORS } from '../constants';
import { Icon } from './ui/Icon';

interface ClaimDetailModalProps {
    claim: Claim | null;
    onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{value || '-'}</dd>
    </div>
);

export const ClaimDetailModal: React.FC<ClaimDetailModalProps> = ({ claim, onClose }) => {
    if (!claim) return null;

    return (
        <Modal isOpen={!!claim} onClose={onClose} title={`Detalle del Reclamo #${claim.nroReclamo}`}>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold">Reclamo #{claim.nroReclamo}</h3>
                        <p className="text-sm text-gray-500">Registrado el {new Date(claim.fechaReclamo).toLocaleString('es-AR')}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                         <Badge colorClasses={`${STATUS_COLORS[claim.estado].bg} ${STATUS_COLORS[claim.estado].text}`}>
                            {claim.estado}
                        </Badge>
                        {claim.necesitaReposicion && (
                            <Badge colorClasses={`${URGENT_COLORS.bg} ${URGENT_COLORS.text}`} icon={<Icon name="warning-circle" weight="bold" />}>
                                Requiere Reposición
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <DetailItem label="Email del Cliente" value={claim.email} />
                        <DetailItem label="Número de CC" value={claim.numeroCC} />
                        <DetailItem label="Empresa" value={claim.empresa} />
                        <DetailItem label="Servicio" value={claim.servicio} />
                        <DetailItem label="Origen del Reclamo" value={claim.origenReclamo} />
                         <DetailItem label="Motivo" value={claim.motivo} />
                        <DetailItem label="Proveedor de Entrega" value={claim.nombreProveedor} />
                        <DetailItem label="Depósito" value={claim.deposito} />
                         <DetailItem label="Fecha de Entrega Estimada" value={claim.fechaEntrega ? new Date(claim.fechaEntrega).toLocaleDateString('es-AR') : 'N/A'} />
                        <div className="md:col-span-2">
                            <DetailItem label="Descripción del Reclamo" value={
                                <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-md border">{claim.descripcionReclamo}</p>
                            } />
                        </div>
                    </dl>
                </div>
                 <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cambiar Estado
                    </button>
                </div>
            </div>
        </Modal>
    );
};
