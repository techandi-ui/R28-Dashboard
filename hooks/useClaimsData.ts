
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Claim, FiltersState } from '../types';
import { fetchClaimsData } from '../services/googleSheetsService';

export const useClaimsData = () => {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FiltersState>({
        dateRange: { start: null, end: null },
        status: '',
        companies: [],
        reasons: [],
        searchQuery: ''
    });

    const loadClaims = useCallback(async () => {
        // setLoading(true); // only set loading on initial load
        setError(null);
        try {
            const data = await fetchClaimsData();
            setClaims(data);
        } catch (err) {
            setError('No se pudieron cargar los datos de los reclamos. Intente de nuevo más tarde.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadClaims();
        const intervalId = setInterval(loadClaims, 30000); // Auto-refresh every 30 seconds
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const companies = useMemo(() => {
        const companySet = new Set(claims.map(claim => claim.empresa));
        return Array.from(companySet).sort();
    }, [claims]);

    const reasons = useMemo(() => {
        const reasonSet = new Set(claims.map(claim => claim.motivo));
        return Array.from(reasonSet).sort();
    }, [claims]);

    return { claims, loading, error, filters, setFilters, companies, reasons };
};
