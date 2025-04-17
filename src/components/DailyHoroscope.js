import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DailyHoroscope = ({ onClose, language, theme, isMobile, position = "center" }) => {
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tema renkleri
  const currentTheme = theme || {
    background: 'bg-midnight-default/80',
    card: 'bg-midnight-light/30',
    section: 'bg-midnight-default/30',
    input: 'bg-midnight-light/20',
    text: 'text-gold-light',
    title: 'text-gold-default',
    border: 'border-gold-default/50',
    borderLight: 'border-gold-default/20',
    accent: 'bg-gold-default/30',
    accentHover: 'hover:bg-gold-default/40',
    borderAccent: 'border-gold-default/40'
  };

  // Position sınıfını belirle - Mobil cihazlar için konumlandırmayı iyileştir
  const getPositionClass = () => {
    // Mobil cihazlarda merkeze konumlandır
    if (isMobile) {
      return "left-1/2 -translate-x-1/2";
    }
    
    // Masaüstü/tablet için eski konumlandırma
    switch (position) {
      case "left-center":
        return "left-1/4 -translate-x-1/2";
      case "right-center":
        return "right-1/4 translate-x-1/2";
      default:
        return "left-1/2 -translate-x-1/2"; // Varsayılan merkez
    }
  };

  // Burç listesi
  const zodiacs = {
    tr: [
      { id: 'koc', name: 'Koç' },
      { id: 'boga', name: 'Boğa' },
      { id: 'ikizler', name: 'İkizler' },
      { id: 'yengec', name: 'Yengeç' },
      { id: 'aslan', name: 'Aslan' },
      { id: 'basak', name: 'Başak' },
      { id: 'terazi', name: 'Terazi' },
      { id: 'akrep', name: 'Akrep' },
      { id: 'yay', name: 'Yay' },
      { id: 'oglak', name: 'Oğlak' },
      { id: 'kova', name: 'Kova' },
      { id: 'balik', name: 'Balık' }
    ],
    en: [
      { id: 'aries', name: 'Aries' },
      { id: 'taurus', name: 'Taurus' },
      { id: 'gemini', name: 'Gemini' },
      { id: 'cancer', name: 'Cancer' },
      { id: 'leo', name: 'Leo' },
      { id: 'virgo', name: 'Virgo' },
      { id: 'libra', name: 'Libra' },
      { id: 'scorpio', name: 'Scorpio' },
      { id: 'sagittarius', name: 'Sagittarius' },
      { id: 'capricorn', name: 'Capricorn' },
      { id: 'aquarius', name: 'Aquarius' },
      { id: 'pisces', name: 'Pisces' }
    ]
  };

  // Çeviriler
  const translations = {
    tr: {
      title: "Günlük Burç Yorumu",
      selectZodiac: "Burcunuzu Seçiniz",
      loading: "Burç yorumu yükleniyor...",
      error: "Hata oluştu:",
      dailyHoroscope: "Günlük Burç Yorumu",
      date: "Bugünün Tarihi:",
      close: "Kapat",
      general: "Genel",
      love: "Aşk",
      career: "Kariyer",
      health: "Sağlık",
      dailyUpdate: "Yorumlar her gün güncellenir",
      returnToApp: "Uygulamaya Dön",
      exit: "Çıkış Yap"
    },
    en: {
      title: "Daily Horoscope",
      selectZodiac: "Select Your Zodiac Sign",
      loading: "Loading horoscope...",
      error: "An error occurred:",
      dailyHoroscope: "Daily Horoscope",
      date: "Today's Date:",
      close: "Close",
      general: "General",
      love: "Love",
      career: "Career",
      health: "Health",
      dailyUpdate: "Horoscopes updated daily",
      returnToApp: "Return to App",
      exit: "Exit"
    }
  };

  // Burç yorumunu simüle et
  const fetchHoroscope = (sign) => {
    if (!sign) return;
    
    setLoading(true);
    setError(null);

    // Simülasyon için gecikme
    setTimeout(() => {
      try {
        setHoroscopeData({
          sign: zodiacs[language].find(z => z.id === sign).name,
          date: new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          text: {
            general: language === 'tr' 
              ? "Bugün enerjiniz yüksek olacak ve yeni fırsatlara açık olacaksınız."
              : "Today your energy will be high and you will be open to new opportunities.",
            love: language === 'tr'
              ? "İlişkilerinizde açık iletişim kurmanız önemli olacak."
              : "Open communication in your relationships will be important.",
            career: language === 'tr'
              ? "İş hayatınızda yeni projeler başlatmak için uygun bir gün."
              : "It's a good day to start new projects in your career.",
            health: language === 'tr'
              ? "Fiziksel aktivitelere zaman ayırın, enerjinizi dengeleyecektir."
              : "Make time for physical activities, it will balance your energy."
          }
        });
        setLoading(false);
      } catch (err) {
        setError(language === 'tr' ? 'Burç yorumu alınırken bir hata oluştu.' : 'An error occurred while getting the horoscope.');
        setLoading(false);
      }
    }, 1000);
  };

  // Çıkış fonksiyonunu güçlendirme
  const handleClose = () => {
    // Önce state'i güncelleyin ve sonra onClose callback'i çağırın
    setSelectedZodiac('');
    setHoroscopeData(null);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  // Çıkış yap fonksiyonu - Sayfa yenileme ile simüle edilir
  const handleExit = () => {
    // Sayfayı yenile - Uygulamadan çıkma işlemini simüle etmek için 
    window.location.reload();
  };

  // Seçilen burç değiştiğinde yorumu getir
  useEffect(() => {
    if (selectedZodiac) {
      fetchHoroscope(selectedZodiac);
    }
  }, [selectedZodiac, language]);

  const t = translations[language];

  // Masaüstü için modal görünümü
  if (!isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className={`fixed ${getPositionClass()} top-1/2 -translate-y-1/2 z-50 w-11/12 max-w-md web-horoscope-modal`}
        style={{ maxHeight: '80vh' }}
      >
        <div className={`${currentTheme.primaryBg} ${currentTheme.border} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm overflow-y-auto`} 
            style={{ maxHeight: '80vh' }}>
          <div className="flex justify-between items-center mb-5">
            <h2 className={`text-2xl font-cinzel ${currentTheme.accentText}`}>
              {t.title}
            </h2>
            <button 
              onClick={handleClose}
              className={`${currentTheme.text} hover:${currentTheme.accentText} transition-colors z-50`}
              aria-label={t.close}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-5">
            <h3 className={`text-lg font-cinzel ${currentTheme.text} mb-3`}>{t.selectZodiac}</h3>
            <div className="grid grid-cols-3 gap-2">
              {zodiacs[language].map((zodiac) => (
                <button
                  key={zodiac.id}
                  onClick={() => setSelectedZodiac(zodiac.id)}
                  className={`p-2 rounded-lg transition-all ${
                    selectedZodiac === zodiac.id
                      ? `${currentTheme.secondaryBg} ${currentTheme.accentText} font-bold ${currentTheme.border}`
                      : `${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.lightBorder} hover:${currentTheme.border}`
                  } border text-sm`}
                >
                  {zodiac.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-4">
              <svg className="animate-spin h-6 w-6 text-gold-default" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className={`${currentTheme.text} p-4 rounded-lg text-center`}>
              <p className="text-red-400">{error}</p>
            </div>
          ) : horoscopeData ? (
            <div className={`${currentTheme.secondaryBg} ${currentTheme.border} border rounded-xl p-4`}>
              <div className="mb-4">
                <div className={`${currentTheme.text} text-sm`}>{t.date} {horoscopeData.date}</div>
                <h3 className={`text-xl font-cinzel ${currentTheme.accentText} mt-2`}>{horoscopeData.sign}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className={`${currentTheme.accentText} font-cinzel mb-1`}>{t.general}</h4>
                  <p className={`${currentTheme.text}`}>{horoscopeData.text.general}</p>
                </div>
                
                <div>
                  <h4 className={`${currentTheme.accentText} font-cinzel mb-1`}>{t.love}</h4>
                  <p className={`${currentTheme.text}`}>{horoscopeData.text.love}</p>
                </div>
                
                <div>
                  <h4 className={`${currentTheme.accentText} font-cinzel mb-1`}>{t.career}</h4>
                  <p className={`${currentTheme.text}`}>{horoscopeData.text.career}</p>
                </div>
                
                <div>
                  <h4 className={`${currentTheme.accentText} font-cinzel mb-1`}>{t.health}</h4>
                  <p className={`${currentTheme.text}`}>{horoscopeData.text.health}</p>
                </div>
              </div>

              <div className="text-xs text-center mt-4 text-gold-light/70">
                {t.dailyUpdate}
              </div>
              
              {/* Kontrol butonları */}
              <div className="flex justify-between mt-6">
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.border} border backdrop-blur-sm transition-colors duration-300 text-sm`}
                >
                  {t.returnToApp}
                </motion.button>
                
                <motion.button
                  onClick={handleExit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg ${currentTheme.secondaryBg} ${currentTheme.accentText} ${currentTheme.border} border backdrop-blur-sm transition-colors duration-300 text-sm`}
                >
                  {t.exit}
                </motion.button>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    );
  }

  // Mobil için modal görünümü
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 w-11/12 max-w-[95vw] mobile-horoscope-modal"
      style={{ maxHeight: '90vh' }}
    >
      <div className={`${currentTheme.primaryBg} ${currentTheme.border} border rounded-2xl p-4 shadow-lg backdrop-blur-sm overflow-y-auto`} 
          style={{ maxHeight: '90vh' }}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-cinzel text-gold-default">
            {t.title}
          </h2>
          <button 
            onClick={handleClose}
            className="text-gold-light hover:text-gold-default transition-colors z-50 p-2"
            aria-label={t.close}
            style={{ touchAction: 'manipulation' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-3">
          <h3 className="text-base font-cinzel text-gold-light mb-2">{t.selectZodiac}</h3>
          <div className="grid grid-cols-4 gap-1">
            {zodiacs[language].map((zodiac) => (
              <button
                key={zodiac.id}
                onClick={() => setSelectedZodiac(zodiac.id)}
                className={`p-1.5 text-xs rounded-lg transition-all ${
                  selectedZodiac === zodiac.id
                    ? `${currentTheme.secondaryBg} ${currentTheme.accentText} font-bold ${currentTheme.border}`
                    : `${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.lightBorder}`
                } border touch-manipulate`}
                style={{ touchAction: 'manipulation' }}
              >
                {zodiac.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-3">
            <svg className="animate-spin h-5 w-5 text-gold-default" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="text-gold-light p-3 rounded-lg text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : horoscopeData ? (
          <div className={`${currentTheme.secondaryBg} ${currentTheme.border} border rounded-xl p-3`}>
            <div className="mb-2">
              <div className="text-gold-light text-xs">{t.date} {horoscopeData.date}</div>
              <h3 className="text-lg font-cinzel text-gold-default mt-1">{horoscopeData.sign}</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-gold-default font-cinzel text-sm mb-1">{t.general}</h4>
                <p className="text-gold-light text-sm">{horoscopeData.text.general}</p>
              </div>
              
              <div>
                <h4 className="text-gold-default font-cinzel text-sm mb-1">{t.love}</h4>
                <p className="text-gold-light text-sm">{horoscopeData.text.love}</p>
              </div>
              
              <div>
                <h4 className="text-gold-default font-cinzel text-sm mb-1">{t.career}</h4>
                <p className="text-gold-light text-sm">{horoscopeData.text.career}</p>
              </div>
              
              <div>
                <h4 className="text-gold-default font-cinzel text-sm mb-1">{t.health}</h4>
                <p className="text-gold-light text-sm">{horoscopeData.text.health}</p>
              </div>

              {/* Mobil cihazlarda kapatma butonu - kolay erişim için büyük buton */}
              <div className="pt-3 text-center">
                <button
                  onClick={handleClose}
                  className="bg-midnight-light/30 border border-gold-default/70 w-full py-3 rounded-lg text-gold-default text-center touch-manipulate"
                  style={{ touchAction: 'manipulation' }}
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default DailyHoroscope; 