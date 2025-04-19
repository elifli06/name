import React, { createContext, useState, useEffect } from 'react';

// Dil context'i oluşturma
export const LanguageContext = createContext();

// Dil sağlayıcı bileşeni
export const LanguageProvider = ({ children }) => {
  // Yerel depolamadan dil ayarını almaya çalışma veya varsayılan olarak 'tr' kullanma
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'tr';
  });

  // Dil değiştiğinde yerel depolamayı güncelleme
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider; 