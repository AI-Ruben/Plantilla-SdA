import React from 'react';

interface ExportControlsProps {
    onExport: (format: 'pdf' | 'png' | 'csv') => void;
    isExporting: boolean;
    t: any;
}

const ExportButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-full sm:w-auto flex-1 bg-brand-dark-teal hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
    >
        {children}
    </button>
);

const ExportControls: React.FC<ExportControlsProps> = ({ onExport, isExporting, t }) => {
    return (
        <div className="bg-white p-4 mt-8 rounded-lg shadow-lg sticky bottom-4 z-10">
            <h3 className="text-xl font-bold text-brand-dark-teal mb-4 text-center">{t.exportTitle}</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ExportButton onClick={() => onExport('csv')} disabled={isExporting}>
                     {isExporting ? t.exporting : t.exportCsv}
                </ExportButton>
                <ExportButton onClick={() => onExport('pdf')} disabled={isExporting}>
                    {isExporting ? t.exporting : t.exportPdf}
                </ExportButton>
                <ExportButton onClick={() => onExport('png')} disabled={isExporting}>
                    {isExporting ? t.exporting : t.exportPng}
                </ExportButton>
            </div>
        </div>
    );
};

export default ExportControls;
