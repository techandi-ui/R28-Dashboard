
import React, { useState } from 'react';
import { Icon } from './ui/Icon';

export const Header: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const handleRefresh = () => {
        setIsRefreshing(true);
        window.location.reload();
    };

    return (
        <header className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 z-50 shadow-sm">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2.5 rounded-xl border border-blue-100/50 shadow-sm">
                           <Icon name="table" className="text-blue-600 w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
                                Dashboard de Reclamos
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">R28</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                          className={`
                            p-2.5 rounded-xl text-slate-600 
                            hover:bg-slate-100 hover:text-slate-900 
                            active:scale-95
                            transition-all duration-200
                            border border-transparent hover:border-slate-200
                            ${isRefreshing ? 'animate-spin' : ''}
                          `}
                          onClick={handleRefresh}
                          title="Actualizar datos"
                          disabled={isRefreshing}
                        >
                            <Icon name="clock-counter-clockwise" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
