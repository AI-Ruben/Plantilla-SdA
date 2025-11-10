import React, { useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import type { Language, SdaFormData, Activity } from './types';
import { INITIAL_SDA_FORM_DATA } from './constants';
import { useTranslations } from './hooks/useTranslations';

import SdaForm from './components/SdaForm';
import SdaPreview from './components/SdaPreview';
import LanguageSelector from './components/LanguageSelector';
import ExportControls from './components/ExportControls';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';

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
    const { t } = useTranslations(language || 'es'); 
    const [isExporting, setIsExporting] = useState(false);

    const previewRef = useRef<HTMLDivElement>(null);

    const generateId = () => `activity-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const handleDataChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSdaData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleDynamicFieldChange = useCallback((field: keyof SdaFormData, index: number, value: string) => {
        setSdaData(prev => {
            const currentValues = prev[field];
            if (!Array.isArray(currentValues)) return prev;

            const newValues = [...currentValues];
            newValues[index] = value;
            return { ...prev, [field]: newValues };
        });
    }, []);

    const handleAddDynamicField = useCallback((field: keyof SdaFormData) => {
        setSdaData(prev => {
            const currentValues = prev[field];
            if (!Array.isArray(currentValues)) return prev;

            return { ...prev, [field]: [...currentValues, ''] };
        });
    }, []);

    const handleRemoveDynamicField = useCallback((field: keyof SdaFormData, index: number) => {
        setSdaData(prev => {
            const currentValues = prev[field];
            if (!Array.isArray(currentValues) || currentValues.length <= 1) return prev;

            return { ...prev, [field]: currentValues.filter((_, i) => i !== index) };
        });
    }, []);
    
    const handleActivityChange = useCallback((index: number, field: keyof Omit<Activity, 'id'>, value: string) => {
        setSdaData(prev => {
            const newActivities = [...prev.activities];
            newActivities[index] = { ...newActivities[index], [field]: value };
            return { ...prev, activities: newActivities };
        });
    }, []);

    const handleAddActivity = useCallback(() => {
        setSdaData(prev => ({
            ...prev,
            activities: [
                ...prev.activities,
                { id: generateId(), description: '', sessions: '', resources: '', products: '', instruments: '' }
            ]
        }));
    }, []);

    const handleRemoveActivity = useCallback((index: number) => {
        if (sdaData.activities.length <= 1) return; // Prevent deleting the last activity
        setSdaData(prev => ({
            ...prev,
            activities: prev.activities.filter((_, i) => i !== index)
        }));
    }, [sdaData.activities.length]);


    const handleExport = async (format: 'pdf' | 'png' | 'csv') => {
        setIsExporting(true);
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
                if (format === 'png') await exportToPng(page1, page2);
                else if (format === 'pdf') await exportToPdf(page1, page2);
            } catch (error) {
                console.error("Export failed:", error);
                alert(t.exportError);
            }
        }
        setIsExporting(false);
    };

    const exportToCsv = () => {
        const staticDataKeys = Object.keys(INITIAL_SDA_FORM_DATA).filter(key => key !== 'activities') as Array<Exclude<keyof SdaFormData, 'activities'>>;
        
        let headers: string[] = staticDataKeys.map(key => t.fields[key] || key);
        let values: (string | number)[] = staticDataKeys.map(key => {
            // FIX: Removed incorrect type assertion `as keyof SdaFormData` which was widening the type of `key`.
            const value = sdaData[key];
            // FIX: The value could be an array of activities due to type widening from other handlers.
            // Add a type guard to ensure we only process strings before calling `.trim()`.
            if (Array.isArray(value)) {
                return value.filter(v => typeof v === 'string' && v.trim() !== '').join('\n');
            }
            return value || '';
        });

        sdaData.activities.forEach((activity, index) => {
            const activityNumber = index + 1;
            headers.push(`${t.fields.activity} ${activityNumber}: ${t.fields.Campo18}`);
            headers.push(`${t.fields.activity} ${activityNumber}: ${t.fields.Campo19}`);
            headers.push(`${t.fields.activity} ${activityNumber}: ${t.fields.Campo20}`);
            headers.push(`${t.fields.activity} ${activityNumber}: ${t.fields.Campo21}`);
            headers.push(`${t.fields.activity} ${activityNumber}: ${t.fields.Campo22}`);
            
            values.push(activity.description);
            values.push(activity.sessions);
            values.push(activity.resources);
            values.push(activity.products);
            values.push(activity.instruments);
        });

        const csvContent = [
            headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
            values.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
        ].join('\n');
        
        const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
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

        await new Promise(resolve => setTimeout(resolve, 500)); 

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
                        <SdaForm 
                          data={sdaData} 
                          onDataChange={handleDataChange} 
                          onActivityChange={handleActivityChange}
                          onAddActivity={handleAddActivity}
                          onRemoveActivity={handleRemoveActivity}
                          onDynamicFieldChange={handleDynamicFieldChange}
                          onAddDynamicField={handleAddDynamicField}
                          onRemoveDynamicField={handleRemoveDynamicField}
                          t={t} 
                        />
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
            <div className="fixed -left-[9999px] top-0 opacity-0 -z-50" aria-hidden="true">
              <div ref={previewRef} className="bg-white">
                <SdaPreview data={sdaData} t={t} />
              </div>
            </div>
        </div>
    );
}