import React, { useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import type { Language, SdaFormData } from './types';
import { INITIAL_SDA_FORM_DATA } from './constants';
import { useTranslations } from './hooks/useTranslations';

import SdaForm from './components/SdaForm';
import SdaPreview from './components/SdaPreview';
import LanguageSelector from './components/LanguageSelector';
import ExportControls from './components/ExportControls';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';

// A world-class senior frontend React engineer would define helper components outside the main component.
const Header: React.FC<{ language: Language; setLanguage: (lang: Language) => void; t: any }> = ({ language, setLanguage, t }) => (
    <header className="bg-white shadow-md p-4 sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <span className="text-2xl font-extrabold text-brand-dark-teal">ikasNOVA</span>
                <span className="hidden sm:block border-l border-gray-300 h-8"></span>
                <h1 className="text-lg md:text-xl font-semibold text-brand-text">{t.appTitle}</h1>
            </div>
            <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} t={t} />
        </div>
    </header>
);

export default function App() {
    const [language, setLanguage] = useState<Language | null>(null);
    const [sdaData, setSdaData] = useState<SdaFormData>(INITIAL_SDA_FORM_DATA);
    const { t } = useTranslations(language || 'es'); // Default to 'es' for initial render before selection
    const [isExporting, setIsExporting] = useState(false);

    const previewRef = useRef<HTMLDivElement>(null);

    const handleDataChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSdaData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleExport = async (format: 'pdf' | 'png' | 'csv') => {
        setIsExporting(true);

        // Ensure the preview content is rendered before capturing
        await new Promise(resolve => setTimeout(resolve, 100));

        if (format === 'csv') {
            exportToCsv();
        } else if (previewRef.current) {
            try {
                const page1 = previewRef.current.querySelector('#pdf-page-1') as HTMLElement;
                const page2 = previewRef.current.querySelector('#pdf-page-2') as HTMLElement;

                if (!page1 || !page2) {
                    console.error("Preview pages not found");
                    return;
                }

                if (format === 'png') {
                    await exportToPng(page1, page2);
                } else if (format === 'pdf') {
                    await exportToPdf(page1, page2);
                }
            } catch (error) {
                console.error("Export failed:", error);
                alert(t.exportError);
            }
        }
        setIsExporting(false);
    };

    const exportToCsv = () => {
        // FIX: The original implementation had a bug where it used all keys from translations for headers,
        // but only data values, leading to a mismatch in columns. This also fixes the TypeScript error on line 73.
        // This revised version iterates over the data keys to build both headers and values correctly.
        const dataKeys = Object.keys(sdaData) as Array<keyof SdaFormData>;

        const headers = dataKeys.map(key => {
            // Get the translated field name, fallback to the key itself.
            const header = t.fields[key] || key;
            // Escape quotes in header.
            return `"${header.replace(/"/g, '""')}"`;
        }).join(',');
        
        const values = dataKeys.map(key => {
            const value = sdaData[key] || '';
            // Escape quotes in value.
            return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',');

        const csvContent = `data:text/csv;charset=utf-8,${headers}\n${values}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "situacion_de_aprendizaje.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPng = async (page1: HTMLElement, page2: HTMLElement) => {
        const canvas1 = await html2canvas(page1, { scale: 2 });
        const link1 = document.createElement('a');
        link1.download = 'SdA_pagina_1.png';
        link1.href = canvas1.toDataURL('image/png');
        link1.click();

        await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause

        const canvas2 = await html2canvas(page2, { scale: 2 });
        const link2 = document.createElement('a');
        link2.download = 'SdA_pagina_2.png';
        link2.href = canvas2.toDataURL('image/png');
        link2.click();
    };

    const exportToPdf = async (page1: HTMLElement, page2: HTMLElement) => {
        const canvas1 = await html2canvas(page1, { scale: 2 });
        const imgData1 = canvas1.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas1.height * pdfWidth) / canvas1.width;
        
        pdf.addImage(imgData1, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        const canvas2 = await html2canvas(page2, { scale: 2 });
        const imgData2 = canvas2.toDataURL('image/png');
        const pdfHeight2 = (canvas2.height * pdfWidth) / canvas2.width;
        
        pdf.addPage();
        pdf.addImage(imgData2, 'PNG', 0, 0, pdfWidth, pdfHeight2);
        
        pdf.save('situacion_de_aprendizaje.pdf');
    };

    if (!language) {
        return <LanguageSelectionScreen onSelect={setLanguage} />;
    }

    return (
        <div className="bg-brand-light-gray min-h-screen font-sans text-brand-text">
            <Header language={language} setLanguage={setLanguage} t={t} />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark-teal mb-4">{t.formTitle}</h2>
                        <SdaForm data={sdaData} onDataChange={handleDataChange} t={t} />
                    </div>
                    <div className="hidden lg:block">
                        <h2 className="text-2xl font-bold text-brand-dark-teal mb-4">{t.previewTitle}</h2>
                        <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto max-h-[calc(100vh-200px)]">
                           <SdaPreview data={sdaData} t={t} />
                        </div>
                    </div>
                </div>
                 <ExportControls onExport={handleExport} isExporting={isExporting} t={t} />
            </main>
            {/* Hidden preview for high-quality export */}
            <div className="fixed -left-[9999px] top-0 opacity-0 -z-50" aria-hidden="true">
              <div ref={previewRef} className="bg-white">
                <SdaPreview data={sdaData} t={t} />
              </div>
            </div>
        </div>
    );
}