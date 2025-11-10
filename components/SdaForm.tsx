import React from 'react';
import type { SdaFormData } from '../types';

interface SdaFormProps {
  data: SdaFormData;
  onDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  t: any;
}

const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-lg font-bold bg-brand-dark-teal text-white -m-6 mb-6 p-3 rounded-t-lg">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </section>
);

const FormInput: React.FC<{ name: keyof SdaFormData, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, isTextarea?: boolean, placeholder?: string }> = ({ name, label, value, onChange, isTextarea = false, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {isTextarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-dark-teal focus:border-brand-dark-teal"
        placeholder={placeholder || label}
      />
    ) : (
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-dark-teal focus:border-brand-dark-teal"
        placeholder={placeholder || label}
      />
    )}
  </div>
);

const ActivitySection: React.FC<{ title: string, descKey: keyof SdaFormData, sesKey: keyof SdaFormData, recKey: keyof SdaFormData, prodKey: keyof SdaFormData, instKey: keyof SdaFormData, data: SdaFormData, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, t: any }> = ({ title, descKey, sesKey, recKey, prodKey, instKey, data, onChange, t }) => (
    <div className="border border-brand-gray p-4 rounded-md mt-4">
        <h4 className="font-semibold mb-2">{title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <FormInput name={descKey} label={t.fields[descKey]} value={data[descKey]} onChange={onChange} isTextarea />
            </div>
            <FormInput name={sesKey} label={t.fields[sesKey]} value={data[sesKey]} onChange={onChange} />
            <FormInput name={recKey} label={t.fields[recKey]} value={data[recKey]} onChange={onChange} />
            <FormInput name={prodKey} label={t.fields[prodKey]} value={data[prodKey]} onChange={onChange} />
            <FormInput name={instKey} label={t.fields[instKey]} value={data[instKey]} onChange={onChange} />
        </div>
    </div>
);


const SdaForm: React.FC<SdaFormProps> = ({ data, onDataChange, t }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput name="Campo1" label={t.fields.Campo1} value={data.Campo1} onChange={onDataChange} />
        <FormInput name="Campo2" label={t.fields.Campo2} value={data.Campo2} onChange={onDataChange} />
      </div>

      <FormSection title={t.fields.section1}>
        <FormInput name="Campo3" label={t.fields.Campo3} value={data.Campo3} onChange={onDataChange} />
        <FormInput name="Campo4" label={t.fields.Campo4} value={data.Campo4} onChange={onDataChange} />
        <FormInput name="Campo5" label={t.fields.Campo5} value={data.Campo5} onChange={onDataChange} />
        <FormInput name="Campo6" label={t.fields.Campo6} value={data.Campo6} onChange={onDataChange} isTextarea/>
        <FormInput name="Campo7" label={t.fields.Campo7} value={data.Campo7} onChange={onDataChange} isTextarea/>
        <FormInput name="Campo8" label={t.fields.Campo8} value={data.Campo8} onChange={onDataChange} isTextarea/>
      </FormSection>

      <FormSection title={t.fields.section2}>
        <FormInput name="Campo9" label={t.fields.Campo9} value={data.Campo9} onChange={onDataChange} isTextarea />
        <FormInput name="Campo10" label={t.fields.Campo10} value={data.Campo10} onChange={onDataChange} isTextarea />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4 mt-4">
            <div>
              <h4 className="font-semibold text-center mb-2">{t.fields.competenciasEspecificas}</h4>
              <FormInput name="Campo11" label={t.fields.Campo11} value={data.Campo11} onChange={onDataChange} isTextarea/>
            </div>
            <div>
              <h4 className="font-semibold text-center mb-2">{t.fields.criteriosEvaluacion}</h4>
              <FormInput name="Campo12" label={t.fields.Campo12} value={data.Campo12} onChange={onDataChange} isTextarea/>
            </div>
        </div>
        <FormInput name="Campo13" label={t.fields.Campo13} value={data.Campo13} onChange={onDataChange} isTextarea />
      </FormSection>
      
      <FormSection title={t.fields.section3}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput name="Campo14" label={t.fields.Campo14} value={data.Campo14} onChange={onDataChange} />
            <FormInput name="Campo15" label={t.fields.Campo15} value={data.Campo15} onChange={onDataChange} />
            <FormInput name="Campo16" label={t.fields.Campo16} value={data.Campo16} onChange={onDataChange} />
            <FormInput name="Campo17" label={t.fields.Campo17} value={data.Campo17} onChange={onDataChange} />
        </div>
      </FormSection>

      <FormSection title={t.fields.section4}>
        <ActivitySection title={t.fields.actividad1} descKey="Campo18" sesKey="Campo19" recKey="Campo20" prodKey="Campo21" instKey="Campo22" data={data} onChange={onDataChange} t={t} />
        <ActivitySection title={t.fields.actividad2} descKey="Campo23" sesKey="Campo24" recKey="Campo25" prodKey="Campo26" instKey="Campo27" data={data} onChange={onDataChange} t={t} />
        <ActivitySection title={t.fields.actividad3} descKey="Campo28" sesKey="Campo29" recKey="Campo30" prodKey="Campo31" instKey="Campo32" data={data} onChange={onDataChange} t={t} />
        <ActivitySection title={t.fields.actividad4} descKey="Campo33" sesKey="Campo34" recKey="Campo35" prodKey="Campo36" instKey="Campo37" data={data} onChange={onDataChange} t={t} />
        <ActivitySection title={t.fields.actividad5} descKey="Campo38" sesKey="Campo39" recKey="Campo40" prodKey="Campo41" instKey="Campo42" data={data} onChange={onDataChange} t={t} />
      </FormSection>
      
      <FormSection title={t.fields.section5}>
        <FormInput name="Campo43" label={t.fields.Campo43} value={data.Campo43} onChange={onDataChange} isTextarea />
        <FormInput name="Campo44" label={t.fields.Campo44} value={data.Campo44} onChange={onDataChange} isTextarea />
        <FormInput name="Campo45" label={t.fields.Campo45} value={data.Campo45} onChange={onDataChange} isTextarea />
      </FormSection>

      <FormSection title={t.fields.section6}>
        <FormInput name="Campo46" label={t.fields.Campo46} value={data.Campo46} onChange={onDataChange} isTextarea />
      </FormSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput name="Campo47" label={t.fields.Campo47} value={data.Campo47} onChange={onDataChange} />
        <FormInput name="Campo48" label={t.fields.Campo48} value={data.Campo48} onChange={onDataChange} />
      </div>

    </div>
  );
};

export default SdaForm;
