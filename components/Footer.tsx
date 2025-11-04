import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslations();
  return (
    <footer className="bg-primary text-slate-400 mt-16">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Docky. {t('footer.rightsReserved')}</p>
        <p className="text-sm mt-1">{t('footer.tagline')}</p>
        <div className="mt-4 border-t border-slate-700 pt-4">
          <button onClick={() => onNavigate('login')} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;