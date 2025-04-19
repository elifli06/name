import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { zodiacData, horoscopeTexts, horoscopeHistory } from '../data/zodiacData';

const HoroscopePage = ({ onClose, onExit, language, theme }) => {
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [activeTab, setActiveTab] = useState('daily'); // 'daily', 'traits', 'history'

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

  // Burç listesi ve çeviriler - zodiacData'dan alıyoruz artık
  const zodiacs = language === 'tr' ? Object.values(zodiacData.tr) : Object.values(zodiacData.en);
  
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
      exit: "Çıkış Yap",
      traits: "Burç Özellikleri",
      element: "Element",
      planet: "Gezegen",
      colors: "Renkler",
      strengths: "Güçlü Yönler",
      weaknesses: "Zayıf Yönler",
      characteristics: "Karakteristik Özellikler",
      history: "Geçmiş Yorumlar",
      noHistory: "Henüz kaydedilmiş yorum bulunmuyor",
      daily: "Günlük Yorum",
      overview: "Burç Hakkında",
      ruling: "Yönetici",
      symbol: "Sembol"
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
      exit: "Exit",
      traits: "Zodiac Traits",
      element: "Element",
      planet: "Planet",
      colors: "Colors",
      strengths: "Strengths",
      weaknesses: "Weaknesses",
      characteristics: "Characteristics",
      history: "Past Readings",
      noHistory: "No saved readings yet",
      daily: "Daily Reading",
      overview: "About",
      ruling: "Ruling",
      symbol: "Symbol"
    }
  };

  // Rastgele yorum seçme fonksiyonu
  const getRandomText = (category) => {
    const texts = horoscopeTexts[language][category];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  // Burç yorumunu simüle et - şimdi daha zengin
  const fetchHoroscope = (sign) => {
    if (!sign) return;
    
    setLoading(true);
    setError(null);

    // Geçmiş yorumları kontrol et - yeni yorumlar için geçmiş kayıtlarını okuma
    const zodiacHistory = Object.values(horoscopeHistory)
      .filter(item => {
        const signKey = language === 'tr' ? sign : sign;
        return item.sign === signKey;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setHistoryList(zodiacHistory);

    // Simülasyon için gecikme
    setTimeout(() => {
      try {
        // Burç verilerini alıyoruz
        const zodiacInfo = language === 'tr' ? zodiacData.tr[sign] : zodiacData.en[sign];
        
        if (!zodiacInfo) {
          throw new Error(language === 'tr' ? 'Burç bilgisi bulunamadı' : 'Zodiac information not found');
        }
        
        // Günlük yorum oluştur
        const todayReading = {
          sign: zodiacInfo.name,
          date: new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          text: {
            general: getRandomText('general'),
            love: getRandomText('love'),
            career: getRandomText('career'),
            health: getRandomText('health')
          }
        };
        
        // Burç bilgilerini de ekleyelim
        setHoroscopeData({
          ...todayReading,
          info: zodiacInfo
        });
        
        // Geçmişe kaydedelim (gerçek uygulamada veritabanına kaydedilir)
        const today = new Date().toISOString().split('T')[0];
        const historyId = `${sign}_${today}`;
        
        if (!horoscopeHistory[historyId]) {
          horoscopeHistory[historyId] = {
            id: historyId,
            date: today,
            sign: sign,
            texts: todayReading.text
          };
        }
        
        setLoading(false);
      } catch (err) {
        setError(language === 'tr' ? 'Burç yorumu alınırken bir hata oluştu.' : 'An error occurred while getting the horoscope.');
        setLoading(false);
      }
    }, 1000);
  };

  // Uygulamaya dön fonksiyonu
  const handleReturnToApp = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  // Çıkış yap fonksiyonu
  const handleExit = () => {
    if (typeof onExit === 'function') {
      onExit();
    } else {
      // Fallback - Sayfayı yenileme
      window.location.reload();
    }
  };

  // Seçilen burç değiştiğinde yorumu getir
  useEffect(() => {
    if (selectedZodiac) {
      fetchHoroscope(selectedZodiac);
      setActiveTab('daily'); // Burç değiştiğinde günlük yoruma geç
    }
  }, [selectedZodiac, language]);

  const t = translations[language];

  // Burç simgelerini göster
  const renderZodiacSymbol = (zodiac) => {
    if (!zodiac) return null;
    
    const zodiacInfo = language === 'tr' ? zodiacData.tr[zodiac.toLowerCase()] : zodiacData.en[zodiac.toLowerCase()];
    
    if (!zodiacInfo) return null;
    
    return (
      <div className="flex items-center justify-center mb-4">
        <span className="text-4xl mr-2">{zodiacInfo.symbol}</span>
        <span className="text-4xl">{zodiacInfo.emoji}</span>
      </div>
    );
  };

  // Sekme değiştirme fonksiyonu
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Aktif sekmeye göre içerik göster
  const renderTabContent = () => {
    if (!horoscopeData) return null;
    
    switch (activeTab) {
      case 'daily':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="mb-2">
              <div className={`${currentTheme.text} text-sm`}>{t.date} {horoscopeData.date}</div>
              <div className="flex items-center mt-2">
                <h3 className={`text-2xl font-cinzel ${currentTheme.accentText}`}>{horoscopeData.sign}</h3>
                <span className="ml-2 text-2xl">{horoscopeData.info.symbol}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                <h4 className={`${currentTheme.accentText} font-cinzel text-lg mb-2 flex items-center`}>
                  <span className="mr-2">✨</span> {t.general}
                </h4>
                <p className={`${currentTheme.text} text-lg`}>{horoscopeData.text.general}</p>
              </div>
              
              <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                <h4 className={`${currentTheme.accentText} font-cinzel text-lg mb-2 flex items-center`}>
                  <span className="mr-2">❤️</span> {t.love}
                </h4>
                <p className={`${currentTheme.text} text-lg`}>{horoscopeData.text.love}</p>
              </div>
              
              <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                <h4 className={`${currentTheme.accentText} font-cinzel text-lg mb-2 flex items-center`}>
                  <span className="mr-2">💼</span> {t.career}
                </h4>
                <p className={`${currentTheme.text} text-lg`}>{horoscopeData.text.career}</p>
              </div>
              
              <div className="bg-midnight-light/30 p-3 rounded-lg border border-gold-default/20">
                <h4 className={`${currentTheme.accentText} font-cinzel text-lg mb-2 flex items-center`}>
                  <span className="mr-2">🌿</span> {t.health}
                </h4>
                <p className={`${currentTheme.text} text-lg`}>{horoscopeData.text.health}</p>
              </div>
            </div>

            <div className="text-xs text-center mt-8 text-gold-light/70">
              {t.dailyUpdate}
            </div>
          </div>
        );
        
      case 'traits':
        return (
          <div className="space-y-6 animate-fadeIn">
            {renderZodiacSymbol(selectedZodiac)}
            
            <div className="mb-4 text-center">
              <h3 className={`text-2xl font-cinzel ${currentTheme.accentText}`}>{horoscopeData.sign}</h3>
              <p className={`${currentTheme.text} mt-2 italic`}>{horoscopeData.info.description}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`${currentTheme.section} ${currentTheme.border} rounded-lg p-4`}>
                <h4 className={`${currentTheme.accentText} font-cinzel mb-2 flex items-center`}>
                  <span className="mr-2">{horoscopeData.info.emoji}</span> {t.symbol}
                </h4>
                <p className={`${currentTheme.text}`}>{horoscopeData.info.symbol}</p>
              </div>
              
              <div className={`${currentTheme.section} ${currentTheme.border} rounded-lg p-4`}>
                <h4 className={`${currentTheme.accentText} font-cinzel mb-2 flex items-center`}>
                  {t.element}
                </h4>
                <p className={`${currentTheme.text}`}>{horoscopeData.info.element}</p>
              </div>
              
              <div className={`${currentTheme.section} ${currentTheme.border} rounded-lg p-4`}>
                <h4 className={`${currentTheme.accentText} font-cinzel mb-2 flex items-center`}>
                  {t.ruling} {t.planet}
                </h4>
                <p className={`${currentTheme.text}`}>{horoscopeData.info.ruling_planet}</p>
              </div>
              
              <div className={`${currentTheme.section} ${currentTheme.border} rounded-lg p-4`}>
                <h4 className={`${currentTheme.accentText} font-cinzel mb-2 flex items-center`}>
                  {t.colors}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {horoscopeData.info.colors.map((color, index) => (
                    <span 
                      key={index} 
                      className={`${currentTheme.input} ${currentTheme.text} px-2 py-1 rounded-full text-sm`}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`${currentTheme.section} ${currentTheme.border} rounded-lg p-4`}>
              <h4 className={`${currentTheme.accentText} font-cinzel mb-3`}>
                {t.characteristics}
              </h4>
              <div className="flex flex-wrap gap-2">
                {horoscopeData.info.traits.map((trait, index) => (
                  <span 
                    key={index} 
                    className={`${currentTheme.input} ${currentTheme.text} px-3 py-1 rounded-full text-sm`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`${currentTheme.section} ${currentTheme.border} rounded-lg p-4`}>
                <h4 className={`${currentTheme.accentText} font-cinzel mb-3`}>
                  {t.strengths}
                </h4>
                <ul className={`${currentTheme.text} list-disc pl-5 space-y-1`}>
                  {horoscopeData.info.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className={`${currentTheme.section} ${currentTheme.border} rounded-lg p-4`}>
                <h4 className={`${currentTheme.accentText} font-cinzel mb-3`}>
                  {t.weaknesses}
                </h4>
                <ul className={`${currentTheme.text} list-disc pl-5 space-y-1`}>
                  {horoscopeData.info.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
        
      case 'history':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className={`text-xl font-cinzel ${currentTheme.accentText} mb-4`}>
              {t.history}
            </h3>
            
            {historyList.length > 0 ? (
              <div className="space-y-4">
                {historyList.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${currentTheme.section} ${currentTheme.border} rounded-lg p-4`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`${currentTheme.accentText} font-cinzel`}>
                        {new Date(item.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <p className={`${currentTheme.text} text-sm`}>
                        <span className="font-bold">{t.general}:</span> {item.texts.general}
                      </p>
                      <p className={`${currentTheme.text} text-sm`}>
                        <span className="font-bold">{t.love}:</span> {item.texts.love}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${currentTheme.text} text-center p-6`}>
                {t.noHistory}
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  const ZodiacCard = ({ zodiac, selected, onClick }) => {
    return (
      <div 
        className={`p-4 rounded-lg cursor-pointer text-center zodiac-card 
          ${selected ? 'bg-gold-default/30 text-white border-2 border-gold-default' : 'bg-midnight-light/40 hover:bg-midnight-light/60 text-gold-light animate-glowPulse'}`}
        onClick={onClick}
      >
        <div className="zodiac-symbol text-2xl mb-2">{zodiac.symbol}</div>
        <div className="font-medium">{zodiac.name}</div>
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 ${currentTheme.background} z-50 overflow-y-auto`}>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Başlık ve geri dönüş butonu */}
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl md:text-4xl font-cinzel ${currentTheme.title}`}>
              {t.title}
            </h1>
            <button 
              onClick={handleReturnToApp}
              className={`${currentTheme.text} hover:${currentTheme.accentText} transition-colors`}
              aria-label="Geri Dön"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Burç seçimi ve sonuç kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Burç seçim paneli */}
            <div className={`${currentTheme.card} ${currentTheme.border} border rounded-2xl p-6 shadow-lg backdrop-blur-sm md:col-span-1`}>
              <h2 className={`text-xl font-cinzel ${currentTheme.text} mb-4`}>{t.selectZodiac}</h2>
              
              {/* Zodiac Grid */}
              {!selectedZodiac && (
                <div className="animate-fadeIn">
                  <div className="grid grid-cols-3 gap-3">
                    {zodiacs.map((zodiac) => (
                      <ZodiacCard
                        key={zodiac.id}
                        zodiac={zodiac}
                        selected={selectedZodiac === zodiac.id}
                        onClick={() => setSelectedZodiac(zodiac.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Seçilen burç özet bilgisi */}
              {selectedZodiac && horoscopeData && (
                <div className={`mt-6 p-4 ${currentTheme.section} rounded-xl ${currentTheme.border} border`}>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl mr-2">{horoscopeData.info.symbol}</span>
                    <span className="text-4xl">{horoscopeData.info.emoji}</span>
                  </div>
                  <h3 className={`text-xl font-cinzel ${currentTheme.accentText} text-center mt-2`}>
                    {horoscopeData.sign}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                    <div className={`${currentTheme.text}`}>
                      <span className="font-bold">{t.element}:</span> {horoscopeData.info.element}
                    </div>
                    <div className={`${currentTheme.text}`}>
                      <span className="font-bold">{t.planet}:</span> {horoscopeData.info.ruling_planet}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Burç yorum alanı */}
            <div className={`${currentTheme.card} ${currentTheme.border} border rounded-2xl p-6 shadow-lg backdrop-blur-sm md:col-span-2`}>
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <svg className="animate-spin h-10 w-10 text-gold-default" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : error ? (
                <div className={`${currentTheme.text} p-6 rounded-lg text-center`}>
                  <p className="text-red-400">{error}</p>
                </div>
              ) : selectedZodiac ? (
                horoscopeData ? (
                  <div>
                    {/* Sekmeler */}
                    <div className="flex border-b border-gold-default/30 mb-6">
                      <button
                        onClick={() => handleTabChange('daily')}
                        className={`py-2 px-4 font-cinzel text-sm ${
                          activeTab === 'daily' 
                            ? `${currentTheme.accentText} border-b-2 border-gold-default` 
                            : currentTheme.text
                        }`}
                      >
                        {t.daily}
                      </button>
                      <button
                        onClick={() => handleTabChange('traits')}
                        className={`py-2 px-4 font-cinzel text-sm ${
                          activeTab === 'traits' 
                            ? `${currentTheme.accentText} border-b-2 border-gold-default` 
                            : currentTheme.text
                        }`}
                      >
                        {t.traits}
                      </button>
                      <button
                        onClick={() => handleTabChange('history')}
                        className={`py-2 px-4 font-cinzel text-sm ${
                          activeTab === 'history' 
                            ? `${currentTheme.accentText} border-b-2 border-gold-default` 
                            : currentTheme.text
                        }`}
                      >
                        {t.history}
                      </button>
                    </div>
                    
                    {/* Sekme içeriği */}
                    {renderTabContent()}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <p className={`${currentTheme.text} text-center`}>
                      {language === 'tr' ? 'Lütfen bekleyin...' : 'Please wait...'}
                    </p>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <p className={`${currentTheme.text} text-center`}>
                    {language === 'tr' ? 'Burcunuzu seçerek günlük yorumu görüntüleyebilirsiniz' : 'Select your zodiac sign to view your daily horoscope'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Kontrol butonları */}
          <div className="flex justify-between mt-10">
            <motion.button
              onClick={handleReturnToApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg ${currentTheme.input} ${currentTheme.text} ${currentTheme.border} border backdrop-blur-sm transition-colors duration-300`}
            >
              {t.returnToApp}
            </motion.button>
            
            <motion.button
              onClick={handleExit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg ${currentTheme.section} ${currentTheme.accentText} ${currentTheme.border} border backdrop-blur-sm transition-colors duration-300`}
            >
              {t.exit}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopePage; 