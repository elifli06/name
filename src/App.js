import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageIcon } from '@heroicons/react/24/outline';
import IntroAnimation from './components/IntroAnimation';
import NameAnalysisBoxes from './components/NameSuggestions';
import './App.css';
import { nameCharacteristics } from './data/nameCharacteristics';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [language, setLanguage] = useState('tr');
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const translations = {
    tr: {
      title: 'Nomen Est Omen',
      subtitle: 'İsminizin Sırrını Keşfedin',
      searchPlaceholder: 'İsminizi girin...',
      analyze: 'Analiz Et',
      share: 'Paylaş',
      language: 'Dil',
      characteristics: 'Karakter Özellikleri',
      energy: 'Enerji Seviyesi',
      compatibility: 'Uyumluluk',
      suggestions: 'İsim Önerileri'
    },
    en: {
      title: 'Nomen Est Omen',
      subtitle: 'Discover the Secret of Your Name',
      searchPlaceholder: 'Enter your name...',
      analyze: 'Analyze',
      share: 'Share',
      language: 'Language',
      characteristics: 'Character Traits',
      energy: 'Energy Level',
      compatibility: 'Compatibility',
      suggestions: 'Name Suggestions'
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim() || analyzing) return;
    
    // Analiz ediliyor durumunu aktifleştir
    setAnalyzing(true);
    
    const firstLetter = searchTerm[0].toLowerCase();
    
    // İsmin ilk harfine göre uyumlu harfler belirleme
    const getCompatibleLetters = (letter) => {
      const compatibilityMap = {
        a: ['E', 'L', 'R'],
        b: ['A', 'T', 'M'],
        c: ['K', 'S', 'Z'],
        ç: ['A', 'E', 'İ'],
        d: ['E', 'İ', 'Y'],
        e: ['A', 'L', 'R'],
        f: ['A', 'E', 'İ'],
        g: ['Ü', 'Z', 'E'],
        h: ['A', 'İ', 'Y'],
        ı: ['K', 'M', 'N'],
        i: ['L', 'M', 'S'],
        j: ['A', 'U', 'L'],
        k: ['A', 'E', 'R'],
        l: ['A', 'E', 'İ'],
        m: ['E', 'H', 'T'],
        n: ['A', 'E', 'İ'],
        o: ['R', 'K', 'A'],
        ö: ['Z', 'G', 'N'],
        p: ['E', 'İ', 'N'],
        r: ['A', 'E', 'İ'],
        s: ['A', 'E', 'İ'],
        ş: ['A', 'E', 'İ'],
        t: ['A', 'E', 'İ'],
        u: ['R', 'Ğ', 'L'],
        ü: ['M', 'İ', 'T'],
        v: ['E', 'Y', 'S'],
        y: ['A', 'İ', 'E'],
        z: ['E', 'Y', 'N']
      };
      
      return compatibilityMap[letter] || ['A', 'E', 'İ']; // Varsayılan harfler
    };
    
    // 5 saniyelik gecikme ile analiz sonucunu göster
    setTimeout(() => {
      if (nameCharacteristics[firstLetter]) {
        setResult({
          name: searchTerm,
          characteristics: {
            description: nameCharacteristics[firstLetter],
            traits: getCompatibleLetters(firstLetter)
          },
          energy: Math.floor(Math.random() * 41) + 60 // 60-100 arası rastgele enerji
        });
      } else {
        setResult({
          name: searchTerm,
          message: language === 'tr' ? 'Bu isim veritabanımızda bulunmamaktadır.' : 'This name is not in our database.'
        });
      }
      // Analiz durumunu kapat
      setAnalyzing(false);
    }, 5000);
  };

  const handleShare = async () => {
    const shareText = language === 'tr' 
      ? `${result.name} isminin analizi:\n${result.characteristics.description}\n\nUyumlu Harfler: ${result.characteristics.traits.join(', ')}`
      : `Analysis of the name ${result.name}:\n${result.characteristics.description}\n\nCompatible Letters: ${result.characteristics.traits.join(', ')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'İsim Analizi',
          text: shareText
        });
      } catch (err) {
        console.log('Paylaşım iptal edildi');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert(language === 'tr' ? 'Sonuçlar panoya kopyalandı!' : 'Results copied to clipboard!');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  return (
    <div className="min-h-screen bg-[#0A0B1A] text-gold-light relative overflow-hidden">
      <AnimatePresence>
        {showIntro && <IntroAnimation />}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[url('./assets/stars.png')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl font-cinzel font-bold mb-4 relative text-gold-default"
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 215, 0, 0.5)",
                "0 0 15px rgba(255, 215, 0, 0.7)",
                "0 0 10px rgba(255, 215, 0, 0.5)"
              ]
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <span className="bg-gradient-to-r from-gold-light via-gold-default to-gold-light bg-clip-text text-transparent">
              ✧ Nomen Est Omen ✧
            </span>
            
            {/* Yıldız parıltıları */}
            <motion.span 
              className="absolute -top-2 -left-2 text-xs text-gold-light"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✦
            </motion.span>
            
            <motion.span 
              className="absolute -bottom-2 -right-2 text-xs text-gold-light"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
                rotate: [0, -360, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              ✦
            </motion.span>
            
            <motion.span 
              className="absolute top-1/2 -translate-y-1/2 -left-6 text-sm text-gold-light"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              ⋆
            </motion.span>
            
            <motion.span 
              className="absolute top-1/2 -translate-y-1/2 -right-6 text-sm text-gold-light"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              ⋆
            </motion.span>
          </motion.h1>
          
          <motion.p
            animate={{ 
              opacity: [0.7, 1, 0.7],
              textShadow: [
                '0 0 3px rgba(255, 215, 0, 0.3)',
                '0 0 10px rgba(255, 215, 0, 0.7)',
                '0 0 3px rgba(255, 215, 0, 0.3)'
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
            className="text-xl text-gold-light/90 font-cormorant flex items-center justify-center gap-3"
          >
            <motion.span 
              initial={{ opacity: 0.8 }}
              animate={{ 
                opacity: [0.7, 1, 0.5, 0.9, 0.7],
                textShadow: [
                  '0 0 2px rgba(255, 215, 0, 0.4)',
                  '0 0 8px rgba(255, 215, 0, 0.8)',
                  '0 0 3px rgba(255, 215, 0, 0.2)',
                  '0 0 7px rgba(255, 215, 0, 0.7)',
                  '0 0 2px rgba(255, 215, 0, 0.4)'
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1]
              }}
              className="text-xl"
            >
              🕯️
            </motion.span>
            {language === 'tr' ? 'İsminizin sırrını keşfedin' : 'Discover the secret of your name'}
            <motion.span 
              initial={{ opacity: 0.8 }}
              animate={{ 
                opacity: [0.7, 0.4, 0.9, 0.6, 0.7],
                textShadow: [
                  '0 0 2px rgba(255, 215, 0, 0.4)',
                  '0 0 3px rgba(255, 215, 0, 0.2)',
                  '0 0 8px rgba(255, 215, 0, 0.8)',
                  '0 0 4px rgba(255, 215, 0, 0.3)',
                  '0 0 2px rgba(255, 215, 0, 0.4)'
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3.5,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
              className="text-xl"
            >
              🕯️
            </motion.span>
          </motion.p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-midnight/30 backdrop-blur-sm rounded-lg p-6 border border-gold/20"
          >
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={language === 'tr' ? 'İsminizi girin...' : 'Enter your name...'}
                className="flex-1 bg-midnight-light/20 border border-gold/20 rounded-lg px-4 py-2 text-gold-light focus:outline-none focus:border-gold/40"
              />
              <button
                onClick={handleSearch}
                disabled={analyzing}
                className={`bg-gold/20 hover:bg-gold/30 text-gold-light px-6 py-2 rounded-lg transition-all duration-300 ${analyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {language === 'tr' ? 'Analiz Et' : 'Analyze'}
              </button>
              <button
                onClick={toggleLanguage}
                className="bg-midnight-light/20 hover:bg-midnight-light/30 text-gold-light p-2 rounded-lg transition-all duration-300"
              >
                <LanguageIcon className="w-6 h-6" />
              </button>
            </div>

            <AnimatePresence>
              {analyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <div className="relative w-24 h-24 mb-6">
                    {/* Melek ikonu ve animasyonu */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* Melek kanatları - sol */}
                      <motion.div
                        initial={{ rotate: -5 }}
                        animate={{ rotate: [-10, 0, -10] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 4,
                          ease: "easeInOut"
                        }}
                        className="absolute left-0 w-8 h-16 bg-gradient-to-br from-gold-light/80 to-gold-default/40 rounded-tl-full rounded-bl-full blur-[1px] origin-right"
                        style={{ transform: "skewY(15deg)" }}
                      />
                      
                      {/* Melek kanatları - sağ */}
                      <motion.div
                        initial={{ rotate: 5 }}
                        animate={{ rotate: [10, 0, 10] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 4,
                          ease: "easeInOut"
                        }}
                        className="absolute right-0 w-8 h-16 bg-gradient-to-bl from-gold-light/80 to-gold-default/40 rounded-tr-full rounded-br-full blur-[1px] origin-left"
                        style={{ transform: "skewY(-15deg)" }}
                      />
                      
                      {/* Melek figürü - merkez */}
                      <motion.div 
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3,
                          ease: "easeInOut"
                        }}
                        className="w-6 h-16 bg-gold-light/60 rounded-full blur-[0.5px]"
                      />
                      
                      {/* Hale */}
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0.5 }}
                        animate={{ 
                          scale: [0.9, 1.1, 0.9],
                          opacity: [0.5, 0.8, 0.5] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 4,
                          ease: "easeInOut"
                        }}
                        className="absolute top-0 w-8 h-8 bg-gold-default/70 rounded-full blur-[2px]"
                        style={{ transform: "translateY(-40%)" }}
                      />
                    </motion.div>
                    
                    {/* Dönen çember */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 10,
                        ease: "linear"
                      }}
                      className="absolute inset-0 border-2 border-t-gold-default border-r-gold-light/30 border-b-gold-light/10 border-l-transparent rounded-full"
                    />
                  </div>
                  <motion.p
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    className="text-xl font-cinzel text-gold-default"
                  >
                    {language === 'tr' 
                      ? `${searchTerm} İsmin Analiz Ediliyor...` 
                      : `Analyzing Your Name: ${searchTerm}...`}
                  </motion.p>
                </motion.div>
              )}

              {result && !analyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 bg-midnight-light/30 backdrop-blur-sm border border-gold-default/30 rounded-lg p-6 max-w-4xl mx-auto"
                >
                  {result.message ? (
                    <p className="text-center text-gold-light">{result.message}</p>
                  ) : (
                    <>
                      <h2 className="text-2xl font-cinzel text-gold-default text-center mb-4">
                        {searchTerm}
                      </h2>
                      <p className="mb-6 text-gold-light">
                        {result.characteristics.description}
                      </p>
                      <div className="mt-6">
                        <h3 className="text-xl font-cinzel text-gold-default mb-2">
                          {language === 'tr' ? 'Uyumlu Harfler' : 'Compatible Letters'}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {result.characteristics.traits.map(letter => (
                            <span
                              key={letter}
                              className="bg-gold-default/20 text-gold-light px-3 py-1 rounded-full"
                            >
                              {letter}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* İsim Analiz Kutuları */}
                      <NameAnalysisBoxes name={searchTerm} language={language} />
                      
                      {/* Veda mesajı */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 text-center"
                      >
                        <motion.div
                          className="p-6 backdrop-blur-md bg-midnight-default/40 border border-gold-default/50 rounded-lg shadow-lg shadow-gold-default/20"
                          animate={{
                            y: [10, 0, 10],
                            boxShadow: [
                              "0 10px 15px -3px rgba(255, 184, 0, 0.1), 0 4px 6px -4px rgba(255, 184, 0, 0.1)",
                              "0 15px 25px -5px rgba(255, 184, 0, 0.2), 0 8px 10px -6px rgba(255, 184, 0, 0.2)",
                              "0 10px 15px -3px rgba(255, 184, 0, 0.1), 0 4px 6px -4px rgba(255, 184, 0, 0.1)"
                            ]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold-default/50 to-transparent"></div>
                            <motion.span 
                              className="mx-3 text-gold-default"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              ✧
                            </motion.span>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold-default/50 to-transparent"></div>
                          </div>
                          
                          <motion.p 
                            className="text-gold-light/90 font-cormorant text-xl italic"
                            animate={{ 
                              textShadow: [
                                "0 0 2px rgba(255, 215, 0, 0.3)",
                                "0 0 4px rgba(255, 215, 0, 0.5)",
                                "0 0 2px rgba(255, 215, 0, 0.3)"
                              ]
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 3,
                              ease: "easeInOut"
                            }}
                          >
                            {language === 'tr' 
                              ? `${searchTerm}, kendine iyi bak. Herşey gönlünce olsun, sen değerlisin. Hoşçakal!` 
                              : `${searchTerm}, take care of yourself. May everything be as you wish, you are valuable. Goodbye!`}
                          </motion.p>
                          
                          <div className="flex items-center justify-center mt-2">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold-default/50 to-transparent"></div>
                            <motion.span 
                              className="mx-3 text-gold-default"
                              animate={{ rotate: [0, -360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              ✧
                            </motion.span>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold-default/50 to-transparent"></div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;

// Created by Elif Cerav 2024. Tüm hakları saklıdır. 