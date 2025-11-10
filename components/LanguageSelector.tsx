import React from 'react';
import type { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  t: any;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange, t }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700">{t.language}:</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-dark-teal focus:border-brand-dark-teal sm:text-sm rounded-md"
      >
        <option value="es">Castellano</option>
        <option value="eu">Euskera</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
