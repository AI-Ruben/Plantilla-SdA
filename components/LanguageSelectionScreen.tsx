import React from 'react';
import type { Language } from '../types';

interface LanguageSelectionScreenProps {
    onSelect: (language: Language) => void;
}

const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({ onSelect }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light-gray p-4 text-brand-text">
            <div className="text-center bg-white p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
                <h1 className="text-5xl font-extrabold text-brand-dark-teal mb-4">ikasNOVA</h1>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-2">Bienvenido / Ongi Etorri</h2>
                <p className="mb-8">
                    Selecciona el idioma para completar la Situación de Aprendizaje.
                    <br />
                    Aukeratu hizkuntza Ikaskuntza Egoera osatzeko.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => onSelect('es')}
                        className="flex-1 bg-brand-dark-teal hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
                        aria-label="Seleccionar idioma Castellano"
                    >
                        Castellano
                    </button>
                    <button
                        onClick={() => onSelect('eu')}
                        className="flex-1 bg-brand-dark-teal hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
                        aria-label="Seleccionar idioma Euskera"
                    >
                        Euskera
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LanguageSelectionScreen;