import type { Language } from '../types';
import { es } from '../translations/es';
import { eu } from '../translations/eu';

const translations = { es, eu };

export const useTranslations = (language: Language) => {
  return { t: translations[language] };
};
