
export enum Status {
    EnCola = 'EN COLA',
    EnProceso = 'EN PROCESO',
    Finalizado = 'FINALIZADO',
}

export interface Claim {
    nroReclamo: number;
    estado: Status;
    marcaTemporal: string;
    email: string;
    fechaReclamo: string;
    numeroCC: string;
    servicio: string;
    empresa: string;
    necesitaReposicion: boolean;
    fechaEntrega: string | null;
    origenReclamo: string;
    nombreProveedor: string;
    deposito: string;
    descripcionReclamo: string;
    motivo: string;
}

export interface FiltersState {
    dateRange: {
        start: string | null;
        end: string | null;
    };
    status: Status | '';
    companies: string[];
    reasons: string[];
    searchQuery: string;
}
