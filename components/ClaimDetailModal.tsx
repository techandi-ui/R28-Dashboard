
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
    <div className="group">
        <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</dt>
        <dd className="text-sm text-slate-900 font-medium">{value || <span className="text-slate-400">-</span>}</dd>
    </div>
);

export const ClaimDetailModal: React.FC<ClaimDetailModalProps> = ({ claim, onClose }) => {
    if (!claim) return null;

    return (
        <Modal isOpen={!!claim} onClose={onClose} title={`Detalle del Reclamo #${claim.nroReclamo}`}>
            <div className="space-y-6">
                <div className="flex justify-between items-start p-5 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/60">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Reclamo #{claim.nroReclamo}</h3>
                        <p className="text-sm text-slate-600 mt-1">
                            Registrado el {new Date(claim.fechaReclamo).toLocaleString('es-AR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                         <Badge colorClasses={`${STATUS_COLORS[claim.estado].bg} ${STATUS_COLORS[claim.estado].text} border ${STATUS_COLORS[claim.estado].border}`}>
                            {claim.estado}
                        </Badge>
                        {claim.necesitaReposicion && (
                            <Badge colorClasses={`${URGENT_COLORS.bg} ${URGENT_COLORS.text} border ${URGENT_COLORS.border}`} icon={<Icon name="warning-circle" weight="bold" />}>
                                Requiere Reposición
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
                                <p className="text-sm text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-200/60 leading-relaxed">{claim.descripcionReclamo}</p>
                            } />
                        </div>
                    </dl>
                </div>
                 <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                    <button
                        type="button"
                        className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 active:scale-95"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 active:scale-95"
                    >
                        Cambiar Estado
                    </button>
                </div>
            </div>
        </Modal>
    );
};
