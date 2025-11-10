import React from 'react';
import type { SdaFormData } from '../types';

interface SdaPreviewProps {
    data: SdaFormData;
    t: any;
}

const PreviewCell: React.FC<{ label: string; children: React.ReactNode; colSpan?: number; isHeader?: boolean }> = ({ label, children, colSpan = 1, isHeader = false }) => (
    <>
        <td className={`p-2 border border-gray-300 ${isHeader ? 'font-bold bg-gray-100' : 'font-semibold'} w-1/3 align-middle`}>{label}:</td>
        <td className={`p-2 border border-gray-300 col-span-${colSpan} whitespace-pre-wrap break-words align-middle`}>{children}</td>
    </>
);

const PreviewRow: React.FC<{ label: string; children: React.ReactNode; colSpan?: number }> = ({ label, children, colSpan }) => (
    <tr>
        <PreviewCell label={label} colSpan={colSpan}>{children || ' '}</PreviewCell>
    </tr>
);

const PreviewHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <tr className="bg-brand-teal text-white">
        <td colSpan={2} className="p-2 font-bold border border-gray-400">{children}</td>
    </tr>
);

const ActivityPreview: React.FC<{ title: string; desc: string; sesiones: string; recursos: string; productos: string; instrumentos: string }> = ({ title, desc, sesiones, recursos, productos, instrumentos }) => (
    <>
        <tr className="bg-gray-100">
            <td className="p-2 border border-gray-300 font-bold" colSpan={2}>{title}</td>
        </tr>
        <tr>
            <td className="p-2 border border-gray-300 w-1/3 font-semibold align-top">{desc || ' '}</td>
            <td className="p-2 border border-gray-300">
                <table className="w-full border-collapse">
                    <tbody>
                        <tr><td className="font-semibold p-1 w-1/3 align-middle">Sesiones:</td><td className="p-1 whitespace-pre-wrap break-words align-middle">{sesiones || ' '}</td></tr>
                        <tr><td className="font-semibold p-1 w-1/3 align-middle">Recursos:</td><td className="p-1 whitespace-pre-wrap break-words align-middle">{recursos || ' '}</td></tr>
                        <tr><td className="font-semibold p-1 w-1/3 align-middle">Productos evaluables:</td><td className="p-1 whitespace-pre-wrap break-words align-middle">{productos || ' '}</td></tr>
                        <tr><td className="font-semibold p-1 w-1/3 align-middle">Instrumentos y técnicas de evaluación:</td><td className="p-1 whitespace-pre-wrap break-words align-middle">{instrumentos || ' '}</td></tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </>
);


const SdaPreview: React.FC<SdaPreviewProps> = ({ data, t }) => {
    const footerText = [data.Campo47, data.Campo48].filter(Boolean).join(', ');

    return (
        <div className="text-sm bg-white" style={{ fontFamily: 'Calibri, sans-serif', color: '#000' }}>
            {/* Page 1 */}
            <div id="pdf-page-1" className="p-8 border-2 border-gray-400 mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
                <header className="flex justify-end items-center mb-4">
                    <h2 className="text-2xl font-extrabold" style={{ color: '#008080' }}>ikasNOVA</h2>
                </header>

                <table className="w-full border-collapse border border-gray-400">
                    <tbody>
                        <tr className="bg-brand-teal text-white">
                            <td className="p-2 font-bold border border-gray-400">{t.fields.Campo1} {data.Campo1 || ''}</td>
                        </tr>
                        <tr className="bg-brand-teal text-white">
                            <td className="p-2 font-bold border border-gray-400">{t.fields.Campo2} {data.Campo2 || ''}</td>
                        </tr>

                        <PreviewHeader>{t.fields.section1}</PreviewHeader>
                        <PreviewRow label={t.fields.Campo3}>{data.Campo3 || ' '}</PreviewRow>
                        <PreviewRow label={t.fields.Campo4}>{data.Campo4 || ' '}</PreviewRow>
                        <PreviewRow label={t.fields.Campo5}>{data.Campo5 || ' '}</PreviewRow>
                        <PreviewRow label={t.fields.Campo6}>{data.Campo6 || ' '}</PreviewRow>
                        <PreviewRow label={t.fields.Campo7}>{data.Campo7 || ' '}</PreviewRow>
                        <PreviewRow label={t.fields.Campo8}>{data.Campo8 || ' '}</PreviewRow>

                        <PreviewHeader>{t.fields.section2}</PreviewHeader>
                        <PreviewRow label={t.fields.Campo9}>{data.Campo9 || ' '}</PreviewRow>
                        <PreviewRow label={t.fields.Campo10}>{data.Campo10 || ' '}</PreviewRow>
                        
                        <tr className="bg-gray-100">
                            <td className="p-2 border border-gray-300 font-bold text-center">{t.fields.competenciasEspecificas}</td>
                            <td className="p-2 border border-gray-300 font-bold text-center">{t.fields.criteriosEvaluacion}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-300 align-top whitespace-pre-wrap break-words">{data.Campo11 || ' '}</td>
                            <td className="p-2 border border-gray-300 align-top whitespace-pre-wrap break-words">{data.Campo12 || ' '}</td>
                        </tr>
                        <PreviewRow label={t.fields.Campo13}>{data.Campo13 || ' '}</PreviewRow>

                        <PreviewHeader>{t.fields.section3}</PreviewHeader>
                        <tr className="bg-gray-100">
                            <td className="p-2 border border-gray-300" colSpan={2}>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <span><strong>{t.fields.Campo14}:</strong> {data.Campo14 || ' '}</span>
                                    <span><strong>{t.fields.Campo15}:</strong> {data.Campo15 || ' '}</span>
                                    <span><strong>{t.fields.Campo16}:</strong> {data.Campo16 || ' '}</span>
                                    <span><strong>{t.fields.Campo17}:</strong> {data.Campo17 || ' '}</span>
                                </div>
                            </td>
                        </tr>

                        <PreviewHeader>{t.fields.section4}</PreviewHeader>
                        <ActivityPreview title={t.fields.actividad1} desc={data.Campo18} sesiones={data.Campo19} recursos={data.Campo20} productos={data.Campo21} instrumentos={data.Campo22} />
                        <ActivityPreview title={t.fields.actividad2} desc={data.Campo23} sesiones={data.Campo24} recursos={data.Campo25} productos={data.Campo26} instrumentos={data.Campo27} />
                    </tbody>
                </table>
                 <footer className="flex justify-between items-center mt-4">
                    <span>{footerText}</span>
                    <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png" alt="CC BY-NC-SA" className="h-8" />
                </footer>
            </div>

            {/* Page 2 */}
            <div id="pdf-page-2" className="p-8 border-2 border-gray-400 mx-auto mt-4" style={{ width: '210mm', minHeight: '297mm' }}>
                <header className="flex justify-end items-center mb-4">
                     <h2 className="text-2xl font-extrabold" style={{ color: '#008080' }}>ikasNOVA</h2>
                </header>
                <table className="w-full border-collapse border border-gray-400">
                    <tbody>
                        <ActivityPreview title={t.fields.actividad3} desc={data.Campo28} sesiones={data.Campo29} recursos={data.Campo30} productos={data.Campo31} instrumentos={data.Campo32} />
                        <ActivityPreview title={t.fields.actividad4} desc={data.Campo33} sesiones={data.Campo34} recursos={data.Campo35} productos={data.Campo36} instrumentos={data.Campo37} />
                        <ActivityPreview title={t.fields.actividad5} desc={data.Campo38} sesiones={data.Campo39} recursos={data.Campo40} productos={data.Campo41} instrumentos={data.Campo42} />

                        <PreviewHeader>{t.fields.section5}</PreviewHeader>
                        <PreviewRow label={t.fields.Campo43}>{data.Campo43 || ' '}</PreviewRow>
                        <PreviewRow label={t.fields.Campo44}>{data.Campo44 || ' '}</PreviewRow>
                        <PreviewRow label={t.fields.Campo45}>{data.Campo45 || ' '}</PreviewRow>
                        
                        <PreviewHeader>{t.fields.section6}</PreviewHeader>
                        <PreviewRow label={t.fields.Campo46} colSpan={2}>{data.Campo46 || ' '}</PreviewRow>
                    </tbody>
                </table>
                 <footer className="flex justify-between items-center mt-auto pt-4">
                    <span>{footerText}</span>
                    <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png" alt="CC BY-NC-SA" className="h-8" />
                </footer>
            </div>
        </div>
    );
};

export default SdaPreview;