import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { KPICard } from './components/KPICard';
import { Filters } from './components/Filters';
import { ClaimsTable } from './components/ClaimsTable';
import { ClaimDetailModal } from './components/ClaimDetailModal';
import { StatusPieChart } from './components/charts/StatusPieChart';
import { ClaimsByCompanyBarChart } from './components/charts/ClaimsByCompanyBarChart';
import { ClaimsByReasonBarChart } from './components/charts/ClaimsByReasonBarChart';
import { ClaimsTimelineChart } from './components/charts/ClaimsTimelineChart';
import { useClaimsData } from './hooks/useClaimsData';
import { Claim, Status } from './types';
import { SkeletonLoader } from './components/ui/SkeletonLoader';
import { Icon } from './components/ui/Icon';

const App: React.FC = () => {
    const { 
        claims, 
        loading, 
        error, 
        filters, 
        setFilters,
        companies,
        reasons
    } = useClaimsData();

    const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

    const filteredClaims = useMemo(() => {
        return claims.filter(claim => {
            const claimDate = new Date(claim.fechaReclamo);
            const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
            const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

            if (startDate && claimDate < startDate) return false;
            if (endDate && claimDate > endDate) return false;
            if (filters.status && claim.estado !== filters.status) return false;
            if (filters.companies.length > 0 && !filters.companies.includes(claim.empresa)) return false;
            if (filters.reasons.length > 0 && !filters.reasons.includes(claim.motivo)) return false;
            if (filters.searchQuery && 
                !Object.values(claim).some(val => 
                    String(val).toLowerCase().includes(filters.searchQuery.toLowerCase())
                )
            ) return false;
            
            return true;
        });
    }, [claims, filters]);

    const kpiData = useMemo(() => {
        const total = claims.length;
        const enCola = claims.filter(c => c.estado === Status.EnCola).length;
        const enProceso = claims.filter(c => c.estado === Status.EnProceso).length;
        const finalizado = claims.filter(c => c.estado === Status.Finalizado).length;
        return {
            total,
            enCola: { count: enCola, percentage: total > 0 ? (enCola / total) * 100 : 0 },
            enProceso: { count: enProceso, percentage: total > 0 ? (enProceso / total) * 100 : 0 },
            finalizado: { count: finalizado, percentage: total > 0 ? (finalizado / total) * 100 : 0 }
        };
    }, [claims]);

    const chartStatusData = useMemo(() => [
        { name: 'En Cola', value: kpiData.enCola.count },
        { name: 'En Proceso', value: kpiData.enProceso.count },
        { name: 'Finalizado', value: kpiData.finalizado.count },
    ], [kpiData]);

    const handleViewDetails = (claimId: number) => {
        const claim = claims.find(c => c.nroReclamo === claimId);
        if (claim) setSelectedClaim(claim);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Header />
            <main className="p-6 sm:p-8 lg:p-10 max-w-[1600px] mx-auto">
                <Filters 
                    filters={filters} 
                    setFilters={setFilters}
                    availableCompanies={companies}
                    availableReasons={reasons}
                />
                
                {loading && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => <SkeletonLoader key={i} className="h-36" />)}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <SkeletonLoader className="h-80" />
                            <SkeletonLoader className="h-80 lg:col-span-2" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SkeletonLoader className="h-80" />
                            <SkeletonLoader className="h-80" />
                        </div>
                        <SkeletonLoader className="h-96" />
                    </div>
                )}
                
                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-900 px-6 py-4 rounded-xl shadow-sm" role="alert">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                <Icon name="warning-circle" className="w-5 h-5 text-rose-600" />
                            </div>
                            <div>
                                <strong className="font-semibold">Error al cargar datos</strong>
                                <p className="mt-1 text-sm text-rose-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <div className="space-y-8">
                        {/* KPI Cards con stagger animation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <KPICard title="Total de Reclamos" value={kpiData.total} icon="ph-list-checks" />
                            <KPICard title="En Cola" value={kpiData.enCola.count} percentage={kpiData.enCola.percentage} icon="ph-clock-clockwise" theme="yellow" />
                            <KPICard title="En Proceso" value={kpiData.enProceso.count} percentage={kpiData.enProceso.percentage} icon="ph-spinner" theme="blue" />
                            <KPICard title="Finalizado" value={kpiData.finalizado.count} percentage={kpiData.finalizado.percentage} icon="ph-check-circle" theme="green" />
                        </div>
                        
                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="text-base font-semibold text-slate-900 mb-5 tracking-tight">Distribución por Estado</h3>
                                <StatusPieChart data={chartStatusData} />
                            </div>
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                               <h3 className="text-base font-semibold text-slate-900 mb-5 tracking-tight">Evolución de Reclamos</h3>
                                <ClaimsTimelineChart data={filteredClaims} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="text-base font-semibold text-slate-900 mb-5 tracking-tight">Reclamos por Empresa</h3>
                                <ClaimsByCompanyBarChart data={filteredClaims} />
                            </div>
                             <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="text-base font-semibold text-slate-900 mb-5 tracking-tight">Reclamos por Motivo</h3>
                                <ClaimsByReasonBarChart data={filteredClaims} />
                            </div>
                        </div>
                        
                        <div>
                           <h2 className="text-xl font-semibold text-slate-900 mb-5 tracking-tight">Reclamos Pendientes</h2>
                           <ClaimsTable claims={filteredClaims.filter(c => c.estado !== Status.Finalizado)} onViewDetails={handleViewDetails} />
                        </div>
                    </div>
                )}
            </main>
            {selectedClaim && <ClaimDetailModal claim={selectedClaim} onClose={() => setSelectedClaim(null)} />}
        </div>
    );
};

export default App;