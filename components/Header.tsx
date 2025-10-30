
import React from 'react';
import { Icon } from './ui/Icon';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-10">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                           <Icon name="table" className="text-gray-600" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            Dashboard de Reclamos <span className="text-gray-400 font-medium">R28</span>
                        </h1>
                    </div>
                    <div className="flex items-center">
                        <button 
                          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                          onClick={() => window.location.reload()}
                          title="Actualizar datos"
                        >
                            <Icon name="clock-counter-clockwise" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
