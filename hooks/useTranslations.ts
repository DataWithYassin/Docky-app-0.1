
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const locales = {
  en: () => import('../localization/en.json'),
  es: () => import('../localization/es.json'),
  pt: () => import('../localization/pt.json'),
};

export const useTranslations = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    locales[language]().then(module => {
      // FIX: Dynamic import of a JSON file returns the module itself, not a `default` export.
      setTranslations(module);
    });
  }, [language]);

  const t = (key: string, replacements?: Record<string, string | number | undefined>): string => {
    let translation = key.split('.').reduce((obj, k) => obj && obj[k], translations);
    
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{{${placeholder}}}`, String(replacements[placeholder]));
      });
    }

    return translation;
  };

  return { t, language };
};
