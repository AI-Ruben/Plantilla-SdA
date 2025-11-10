import React from 'react';
import type { SdaFormData, Activity } from '../types';

interface SdaFormProps {
  data: SdaFormData;
  onDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onActivityChange: (index: number, field: keyof Omit<Activity, 'id'>, value: string) => void;
  onAddActivity: () => void;
  onRemoveActivity: (index: number) => void;
  onDynamicFieldChange: (field: keyof SdaFormData, index: number, value: string) => void;
  onAddDynamicField: (field: keyof SdaFormData) => void;
  onRemoveDynamicField: (field: keyof SdaFormData, index: number) => void;
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

const FormInput: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, isTextarea?: boolean, placeholder?: string }> = ({ name, label, value, onChange, isTextarea = false, placeholder }) => (
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

const ActivityEditor: React.FC<{ activity: Activity, index: number, onDataChange: (index: number, field: keyof Omit<Activity, 'id'>, value: string) => void, onRemove: (index: number) => void, t: any, canDelete: boolean }> = ({ activity, index, onDataChange, onRemove, t, canDelete }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as { name: keyof Omit<Activity, 'id'>, value: string };
        onDataChange(index, name, value);
    };

    return (
        <div className="border border-brand-gray p-4 rounded-md mt-4 relative bg-gray-50">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-brand-dark-teal">{`${t.fields.activity} ${index + 1}`}</h4>
                {canDelete && (
                  <button
                      onClick={() => onRemove(index)}
                      className="text-red-500 hover:text-red-700 font-bold text-2xl leading-none p-1 -mt-2 -mr-2"
                      aria-label={`${t.fields.removeActivity} ${index + 1}`}
                      title={t.fields.removeActivity}
                  >
                      &times;
                  </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <FormInput name="description" label={t.fields.Campo18} value={activity.description} onChange={handleChange} isTextarea />
                </div>
                <FormInput name="sessions" label={t.fields.Campo19} value={activity.sessions} onChange={handleChange} />
                <FormInput name="resources" label={t.fields.Campo20} value={activity.resources} onChange={handleChange} />
                <FormInput name="products" label={t.fields.Campo21} value={activity.products} onChange={handleChange} />
                <FormInput name="instruments" label={t.fields.Campo22} value={activity.instruments} onChange={handleChange} />
            </div>
        </div>
    );
};

const DynamicFieldEditor: React.FC<{
    fieldName: keyof SdaFormData;
    label: string;
    values: string[];
    onChange: (fieldName: keyof SdaFormData, index: number, value: string) => void;
    onAdd: (fieldName: keyof SdaFormData) => void;
    onRemove: (fieldName: keyof SdaFormData, index: number) => void;
    t: any;
}> = ({ fieldName, label, values, onChange, onAdd, onRemove, t }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="space-y-2">
                {values.map((value, index) => (
                    <div key={index} className="flex items-start space-x-2">
                        <textarea
                            value={value}
                            onChange={(e) => onChange(fieldName, index, e.target.value)}
                            rows={2}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-dark-teal focus:border-brand-dark-teal"
                            placeholder={`${label} ${index + 1}`}
                        />
                        {values.length > 1 && (
                            <button
                                onClick={() => onRemove(fieldName, index)}
                                className="text-red-500 hover:text-red-700 font-bold p-1 rounded-full text-2xl leading-none flex-shrink-0 mt-1"
                                aria-label={`${t.removeEntry}`}
                                title={t.removeEntry}
                            >
                                &times;
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={() => onAdd(fieldName)}
                className="mt-2 w-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-md transition duration-300 ease-in-out flex items-center justify-center space-x-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>{t.addEntry}</span>
            </button>
        </div>
    );
};

const SdaForm: React.FC<SdaFormProps> = ({ 
    data, 
    onDataChange, 
    onActivityChange, 
    onAddActivity, 
    onRemoveActivity, 
    onDynamicFieldChange,
    onAddDynamicField,
    onRemoveDynamicField,
    t 
}) => {
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
        <DynamicFieldEditor
            fieldName="Campo9"
            label={t.fields.Campo9}
            values={data.Campo9}
            onChange={onDynamicFieldChange}
            onAdd={onAddDynamicField}
            onRemove={onRemoveDynamicField}
            t={t}
        />
        <DynamicFieldEditor
            fieldName="Campo10"
            label={t.fields.Campo10}
            values={data.Campo10}
            onChange={onDynamicFieldChange}
            onAdd={onAddDynamicField}
            onRemove={onRemoveDynamicField}
            t={t}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4 mt-4">
            <DynamicFieldEditor
                fieldName="Campo11"
                label={t.fields.Campo11}
                values={data.Campo11}
                onChange={onDynamicFieldChange}
                onAdd={onAddDynamicField}
                onRemove={onRemoveDynamicField}
                t={t}
            />
            <DynamicFieldEditor
                fieldName="Campo12"
                label={t.fields.Campo12}
                values={data.Campo12}
                onChange={onDynamicFieldChange}
                onAdd={onAddDynamicField}
                onRemove={onRemoveDynamicField}
                t={t}
            />
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
          {data.activities.map((activity, index) => (
              <ActivityEditor
                  key={activity.id}
                  activity={activity}
                  index={index}
                  onDataChange={onActivityChange}
                  onRemove={onRemoveActivity}
                  t={t}
                  canDelete={data.activities.length > 1}
              />
          ))}
          <button
              onClick={onAddActivity}
              className="mt-4 w-full bg-brand-teal hover:bg-brand-dark-teal text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center space-x-2"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>{t.fields.addActivity}</span>
          </button>
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
        {/* FIX: Corrected component name from _FormInput to FormInput */}
        <FormInput name="Campo48" label={t.fields.Campo48} value={data.Campo48} onChange={onDataChange} />
      </div>

    </div>
  );
};

export default SdaForm;