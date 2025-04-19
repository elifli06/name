import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import ZodiacSymbol from './ZodiacSymbol';

function Header({ playClickSound, toggleSound, isSoundEnabled }) {
  const { language, setLanguage } = useContext(LanguageContext);

  const translations = {
    en: {
      title: 'Nomen Est Omen',
      subtitle: 'The Name is a Sign',
      nameAnalyzer: 'Name Analyzer',
      horoscope: 'Horoscope',
      about: 'About'
    },
    tr: {
      title: 'Nomen Est Omen',
      subtitle: 'İsmin Kaderindir',
      nameAnalyzer: 'İsim Analizi',
      horoscope: 'Burç Yorumları',
      about: 'Hakkında'
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
    if (playClickSound) playClickSound();
  };

  const handleLinkClick = () => {
    if (playClickSound) playClickSound();
  };

  return (
    <header className="bg-midnight py-3 px-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ZodiacSymbol symbol="★" name="Star" size="small" />
          <div className="animate-fadeIn">
            <h1 className="text-xl md:text-2xl font-serif text-gold-default">{translations[language].title}</h1>
            <p className="text-xs md:text-sm text-gray-400 italic">{translations[language].subtitle}</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-3 md:space-x-6">
          <button 
            onClick={handleLanguageToggle} 
            className="text-sm md:text-base bg-midnight border border-gold-default text-gold-default px-2 py-1 rounded hover:bg-gold-default hover:text-midnight transition-colors animate-glowPulse"
          >
            {language === 'en' ? 'TR' : 'EN'}
          </button>
          
          <button 
            onClick={toggleSound} 
            className="text-sm md:text-base bg-midnight border border-gold-default text-gold-default px-2 py-1 rounded hover:bg-gold-default hover:text-midnight transition-colors animate-glowPulse"
            title={language === 'en' ? (isSoundEnabled ? 'Mute' : 'Unmute') : (isSoundEnabled ? 'Sessiz' : 'Ses Aç')}
          >
            {isSoundEnabled ? '🔊' : '🔇'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header; 