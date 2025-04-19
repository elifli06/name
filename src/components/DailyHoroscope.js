import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { zodiacData } from '../data/zodiacData';

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
    borderAccent: 'border-gold-default/40',
    primaryBg: 'bg-midnight-default/90',
    secondaryBg: 'bg-midnight-light/40'
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

  // Burç listesi - zodiacData'dan sembolleri alalım
  const zodiacs = {
    tr: [
      { id: 'koc', name: 'Koç', symbol: zodiacData.tr.koc.symbol },
      { id: 'boga', name: 'Boğa', symbol: zodiacData.tr.boga.symbol },
      { id: 'ikizler', name: 'İkizler', symbol: zodiacData.tr.ikizler.symbol },
      { id: 'yengec', name: 'Yengeç', symbol: zodiacData.tr.yengec.symbol },
      { id: 'aslan', name: 'Aslan', symbol: zodiacData.tr.aslan.symbol },
      { id: 'basak', name: 'Başak', symbol: zodiacData.tr.basak.symbol },
      { id: 'terazi', name: 'Terazi', symbol: zodiacData.tr.terazi.symbol },
      { id: 'akrep', name: 'Akrep', symbol: zodiacData.tr.akrep.symbol },
      { id: 'yay', name: 'Yay', symbol: zodiacData.tr.yay.symbol },
      { id: 'oglak', name: 'Oğlak', symbol: zodiacData.tr.oglak.symbol },
      { id: 'kova', name: 'Kova', symbol: zodiacData.tr.kova.symbol },
      { id: 'balik', name: 'Balık', symbol: zodiacData.tr.balik.symbol }
    ],
    en: [
      { id: 'aries', name: 'Aries', symbol: zodiacData.en.aries.symbol },
      { id: 'taurus', name: 'Taurus', symbol: zodiacData.en.taurus.symbol },
      { id: 'gemini', name: 'Gemini', symbol: zodiacData.en.gemini.symbol },
      { id: 'cancer', name: 'Cancer', symbol: zodiacData.en.cancer.symbol },
      { id: 'leo', name: 'Leo', symbol: zodiacData.en.leo.symbol },
      { id: 'virgo', name: 'Virgo', symbol: zodiacData.en.virgo.symbol },
      { id: 'libra', name: 'Libra', symbol: zodiacData.en.libra.symbol },
      { id: 'scorpio', name: 'Scorpio', symbol: zodiacData.en.scorpio.symbol },
      { id: 'sagittarius', name: 'Sagittarius', symbol: zodiacData.en.sagittarius.symbol },
      { id: 'capricorn', name: 'Capricorn', symbol: zodiacData.en.capricorn.symbol },
      { id: 'aquarius', name: 'Aquarius', symbol: zodiacData.en.aquarius.symbol },
      { id: 'pisces', name: 'Pisces', symbol: zodiacData.en.pisces.symbol }
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
          symbol: zodiacs[language].find(z => z.id === sign).symbol,
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

  // Ortak modal backdrop (arkaplan örtüsü)
  const modalBackdrop = (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
      onClick={handleClose}
    />
  );

  // Masaüstü için modal görünümü
  if (!isMobile) {
    return (
      <>
        {modalBackdrop}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`fixed ${getPositionClass()} top-1/2 -translate-y-1/2 z-50 w-11/12 max-w-md web-horoscope-modal`}
          style={{ maxHeight: '90vh' }}
        >
          <div className={`${currentTheme.primaryBg} ${currentTheme.border} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm overflow-y-auto`} 
              style={{ maxHeight: '85vh' }}>
            <div className="flex justify-between items-center mb-4">
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
                    className={`p-2 rounded-lg transition-all animate-fadeIn ${
                      selectedZodiac === zodiac.id
                        ? `${currentTheme.accent} text-white font-bold ${currentTheme.border}`
                        : `bg-midnight-light/40 ${currentTheme.text} ${currentTheme.lightBorder} hover:${currentTheme.border}`
                    } border text-sm`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-1 zodiac-symbol">{zodiac.symbol}</span>
                      <span>{zodiac.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center p-4">
                <div className="spinner"></div>
              </div>
            ) : error ? (
              <div className="text-gold-light p-3 rounded-lg text-center">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            ) : horoscopeData ? (
              <div className={`${currentTheme.secondaryBg} ${currentTheme.border} border rounded-xl p-4 animate-fadeIn`}>
                <div className="mb-3 border-b border-gold-default/20 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold font-cinzel text-gold-default">{horoscopeData.sign}</h3>
                      <span className="ml-2 text-xl">{horoscopeData.symbol}</span>
                    </div>
                    <div className="text-gold-light text-xs">{horoscopeData.date}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                    <h4 className="text-gold-default font-bold font-cinzel text-sm mb-1">{t.general}</h4>
                    <p className="text-gold-light text-sm leading-relaxed">{horoscopeData.text.general}</p>
                  </div>
                  
                  <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                    <h4 className="text-gold-default font-bold font-cinzel text-sm mb-1">{t.love}</h4>
                    <p className="text-gold-light text-sm leading-relaxed">{horoscopeData.text.love}</p>
                  </div>
                  
                  <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                    <h4 className="text-gold-default font-bold font-cinzel text-sm mb-1">{t.career}</h4>
                    <p className="text-gold-light text-sm leading-relaxed">{horoscopeData.text.career}</p>
                  </div>
                  
                  <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                    <h4 className="text-gold-default font-bold font-cinzel text-sm mb-1">{t.health}</h4>
                    <p className="text-gold-light text-sm leading-relaxed">{horoscopeData.text.health}</p>
                  </div>

                  {/* Mobil cihazlarda kapatma butonu - kolay erişim için büyük buton */}
                  <div className="pt-4 text-center">
                    <motion.button
                      onClick={handleClose}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gold-default/40 hover:bg-gold-default/50 border-2 border-gold-default/70 w-full py-3 rounded-lg text-white font-bold text-center touch-manipulate shadow-lg"
                      style={{ touchAction: 'manipulation' }}
                    >
                      {t.close}
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </>
    );
  }

  // Mobil için modal görünümü
  return (
    <>
      {modalBackdrop}
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-0 right-0 bottom-0 z-50 w-full mobile-horoscope-modal"
        style={{ maxHeight: '90vh' }}
      >
        <div className={`${currentTheme.primaryBg} ${currentTheme.border} border-t-2 border-l-2 border-r-2 rounded-t-2xl px-3 py-4 shadow-lg backdrop-blur-sm overflow-y-auto`} 
            style={{ maxHeight: '85vh' }}>
          <div className="flex justify-between items-center mb-4 border-b border-gold-default/30 pb-3">
            <h2 className="text-xl font-bold font-cinzel text-gold-default">
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

          <div className="mb-4">
            <h3 className="text-base font-bold font-cinzel text-gold-light mb-3">{t.selectZodiac}</h3>
            <div className="grid grid-cols-4 gap-1.5">
              {zodiacs[language].map((zodiac) => (
                <button
                  key={zodiac.id}
                  onClick={() => setSelectedZodiac(zodiac.id)}
                  className={`p-1.5 rounded-lg transition-all ${
                    selectedZodiac === zodiac.id
                      ? `${currentTheme.accent} text-white font-bold ${currentTheme.border}`
                      : `bg-midnight-light/40 ${currentTheme.text} ${currentTheme.borderLight}`
                  } border text-sm touch-manipulate w-full`}
                  style={{ touchAction: 'manipulation' }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg zodiac-symbol">{zodiac.symbol}</span>
                    <span className="text-[10px] mt-0.5 leading-tight">{zodiac.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-3">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="text-gold-light p-3 rounded-lg text-center">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          ) : horoscopeData ? (
            <div className={`${currentTheme.secondaryBg} ${currentTheme.border} border rounded-xl p-4 animate-fadeIn`}>
              <div className="mb-3 border-b border-gold-default/20 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold font-cinzel text-gold-default">{horoscopeData.sign}</h3>
                    <span className="ml-2 text-xl">{horoscopeData.symbol}</span>
                  </div>
                  <div className="text-gold-light text-xs">{horoscopeData.date}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                  <h4 className="text-gold-default font-bold font-cinzel text-sm mb-1">{t.general}</h4>
                  <p className="text-gold-light text-sm leading-relaxed">{horoscopeData.text.general}</p>
                </div>
                
                <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                  <h4 className="text-gold-default font-bold font-cinzel text-sm mb-1">{t.love}</h4>
                  <p className="text-gold-light text-sm leading-relaxed">{horoscopeData.text.love}</p>
                </div>
                
                <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                  <h4 className="text-gold-default font-bold font-cinzel text-sm mb-1">{t.career}</h4>
                  <p className="text-gold-light text-sm leading-relaxed">{horoscopeData.text.career}</p>
                </div>
                
                <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                  <h4 className="text-gold-default font-bold font-cinzel text-sm mb-1">{t.health}</h4>
                  <p className="text-gold-light text-sm leading-relaxed">{horoscopeData.text.health}</p>
                </div>

                {/* Mobil cihazlarda kapatma butonu - kolay erişim için büyük buton */}
                <div className="pt-4 text-center">
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gold-default/40 hover:bg-gold-default/50 border-2 border-gold-default/70 w-full py-3 rounded-lg text-white font-bold text-center touch-manipulate shadow-lg"
                    style={{ touchAction: 'manipulation' }}
                  >
                    {t.close}
                  </motion.button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </>
  );
};

export default DailyHoroscope; 