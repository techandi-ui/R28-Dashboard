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
        <div className="min-h-screen bg-[#FAFAFA] text-[#1F2937]">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
                <Filters 
                    filters={filters} 
                    setFilters={setFilters}
                    availableCompanies={companies}
                    availableReasons={reasons}
                />
                
                {loading && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => <SkeletonLoader key={i} className="h-32 rounded-lg" />)}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <SkeletonLoader className="h-72 rounded-lg" />
                            <SkeletonLoader className="h-72 rounded-lg" />
                            <SkeletonLoader className="h-72 rounded-lg" />
                        </div>
                        <SkeletonLoader className="h-96 rounded-lg" />
                    </div>
                )}
                
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>}

                {!loading && !error && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <KPICard title="Total de Reclamos" value={kpiData.total} icon="ph-list-checks" />
                            <KPICard title="En Cola" value={kpiData.enCola.count} percentage={kpiData.enCola.percentage} icon="ph-clock-clockwise" theme="yellow" />
                            <KPICard title="En Proceso" value={kpiData.enProceso.count} percentage={kpiData.enProceso.percentage} icon="ph-spinner" theme="blue" />
                            <KPICard title="Finalizado" value={kpiData.finalizado.count} percentage={kpiData.finalizado.percentage} icon="ph-check-circle" theme="green" />
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1 bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-150">
                                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Distribución por Estado</h3>
                                <StatusPieChart data={chartStatusData} />
                            </div>
                            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-150">
                               <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Evolución de Reclamos</h3>
                                <ClaimsTimelineChart data={filteredClaims} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-150">
                                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Reclamos por Empresa</h3>
                                <ClaimsByCompanyBarChart data={filteredClaims} />
                            </div>
                             <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-150">
                                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Reclamos por Motivo</h3>
                                <ClaimsByReasonBarChart data={filteredClaims} />
                            </div>
                        </div>
                        
                        <div>
                           <h2 className="text-xl font-semibold mb-4">Reclamos Pendientes</h2>
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