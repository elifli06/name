import React from 'react';
import { motion } from 'framer-motion';
import { getNameInfo, letterMeanings, numerologyMeanings } from '../data/nameCharacteristics';

const nameCategories = {
  modern: {
    tr: ['Atlas', 'Deniz', 'Maya', 'Zeynep', 'Kuzey'],
    en: ['Atlas', 'Ocean', 'Maya', 'Zephyr', 'North']
  },
  classic: {
    tr: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali'],
    en: ['Alexander', 'Michael', 'Elizabeth', 'Mary', 'John']
  },
  spiritual: {
    tr: ['Aydın', 'Işık', 'Yıldız', 'Güneş', 'Ay'],
    en: ['Light', 'Star', 'Sun', 'Moon', 'Spirit']
  }
};

const letterEnergies = {
  A: 90, B: 70, C: 60, D: 80, E: 85,
  F: 65, G: 75, H: 70, I: 80, J: 60,
  K: 75, L: 70, M: 80, N: 75, O: 85,
  P: 70, Q: 60, R: 80, S: 75, T: 70,
  U: 75, V: 65, W: 70, X: 60, Y: 75,
  Z: 80
};

// İsim-burç uyumu verileri
const nameZodiacData = {
  a: ['Koç', 'Aslan'], 
  b: ['Boğa', 'Başak'],
  c: ['İkizler', 'Terazi'],
  ç: ['Yengeç', 'Akrep'],
  d: ['Aslan', 'Yay'],
  e: ['Başak', 'Oğlak'],
  f: ['Terazi', 'Kova'],
  g: ['Akrep', 'Balık'],
  h: ['Yay', 'Koç'],
  ı: ['Oğlak', 'Boğa'],
  i: ['Kova', 'İkizler'],
  j: ['Balık', 'Yengeç'],
  k: ['Koç', 'Aslan'],
  l: ['Boğa', 'Başak'],
  m: ['İkizler', 'Terazi'],
  n: ['Yengeç', 'Akrep'],
  o: ['Aslan', 'Yay'],
  ö: ['Başak', 'Oğlak'],
  p: ['Terazi', 'Kova'],
  r: ['Akrep', 'Balık'],
  s: ['Yay', 'Koç'],
  ş: ['Oğlak', 'Boğa'],
  t: ['Kova', 'İkizler'],
  u: ['Balık', 'Yengeç'],
  ü: ['Koç', 'Aslan'],
  v: ['Boğa', 'Başak'],
  y: ['İkizler', 'Terazi'],
  z: ['Yengeç', 'Akrep']
};

// İsim-element uyumu
const nameElementData = {
  a: 'Ateş',
  b: 'Toprak',
  c: 'Hava',
  ç: 'Su',
  d: 'Ateş',
  e: 'Toprak',
  f: 'Hava',
  g: 'Su',
  h: 'Ateş',
  ı: 'Toprak',
  i: 'Hava',
  j: 'Su',
  k: 'Ateş',
  l: 'Toprak',
  m: 'Hava',
  n: 'Su',
  o: 'Ateş',
  ö: 'Toprak',
  p: 'Hava',
  r: 'Su',
  s: 'Ateş',
  ş: 'Toprak',
  t: 'Hava',
  u: 'Su',
  ü: 'Ateş',
  v: 'Toprak',
  y: 'Hava',
  z: 'Su'
};

// İsim-şans rengi
const nameLuckyColors = {
  a: ['Kırmızı', 'Turuncu'],
  b: ['Yeşil', 'Kahverengi'],
  c: ['Sarı', 'Mavi'],
  ç: ['Gümüş', 'Beyaz'],
  d: ['Altın', 'Turuncu'],
  e: ['Kahverengi', 'Yeşil'],
  f: ['Mavi', 'Açık Mor'],
  g: ['Lacivert', 'Mor'],
  h: ['Mor', 'Kırmızı'],
  ı: ['Siyah', 'Kahverengi'],
  i: ['Mavi', 'Turkuaz'],
  j: ['Deniz mavisi', 'Yeşil'],
  k: ['Kırmızı', 'Turuncu'],
  l: ['Toprak tonları', 'Beyaz'],
  m: ['Sarı', 'Turuncu'],
  n: ['Mavi', 'Yeşil'],
  o: ['Altın', 'Sarı'],
  ö: ['Yeşil', 'Mor'],
  p: ['Mavi', 'Gri'],
  r: ['Kırmızı', 'Siyah'],
  s: ['Mor', 'Lacivert'],
  ş: ['Kahverengi', 'Toprak tonları'],
  t: ['Mavi', 'Mor'],
  u: ['Deniz mavisi', 'Turkuaz'],
  ü: ['Kırmızı', 'Turuncu'],
  v: ['Yeşil', 'Gri'],
  y: ['Sarı', 'Mavi'],
  z: ['Su mavi', 'Beyaz']
};

// İsim-şans sayısı
const nameLuckyNumbers = {
  a: [1, 9], 
  b: [6, 2],
  c: [5, 3],
  ç: [2, 7],
  d: [1, 4],
  e: [5, 6],
  f: [3, 8],
  g: [9, 4],
  h: [3, 1],
  ı: [4, 8],
  i: [7, 5],
  j: [2, 6],
  k: [1, 5],
  l: [6, 9],
  m: [3, 5],
  n: [2, 9],
  o: [9, 1],
  ö: [6, 4],
  p: [3, 7],
  r: [4, 9],
  s: [3, 1],
  ş: [4, 2],
  t: [5, 8],
  u: [2, 7],
  ü: [1, 3],
  v: [6, 8],
  y: [5, 7],
  z: [2, 4]
};

const NameAnalysisBoxes = ({ name, language }) => {
  // Eğer isim yoksa boş döndür
  if (!name) return null;
  
  // İsim bilgilerini al
  const nameInfo = getNameInfo(name);

  // Dil çevirileri
  const translations = {
    tr: {
      nameTitle: "İsim Analizi",
      originTitle: "Köken",
      meaningTitle: "Anlam",
      letterAnalysisTitle: "Harf Analizi",
      numerologyTitle: "Numeroloji Değeri",
      compatibleZodiacsTitle: "Uyumlu Burçlar",
      elementTitle: "Element",
      unknownOrigin: "Bilinmiyor",
      unknownMeaning: "Bu isim için kayıtlı bir anlam bulunamadı.",
      male: "Erkek",
      female: "Kadın",
      unisex: "Ortak Cinsiyet",
      genderTitle: "Cinsiyet",
      unknown: "Belirsiz",
      letterTitle: "Harf",
      meaningSubtitle: "Anlam",
      compatibilityTitle: "Uyumluluk"
    },
    en: {
      nameTitle: "Name Analysis",
      originTitle: "Origin",
      meaningTitle: "Meaning",
      letterAnalysisTitle: "Letter Analysis",
      numerologyTitle: "Numerology Value",
      compatibleZodiacsTitle: "Compatible Zodiacs",
      elementTitle: "Element",
      unknownOrigin: "Unknown",
      unknownMeaning: "No recorded meaning found for this name.",
      male: "Male",
      female: "Female",
      unisex: "Unisex",
      genderTitle: "Gender",
      unknown: "Unknown",
      letterTitle: "Letter",
      meaningSubtitle: "Meaning",
      compatibilityTitle: "Compatibility"
    }
  };

  // Dil seçimi
  const t = translations[language] || translations.tr;

  // Harflerin görüntülenmesi için yardımcı fonksiyon
  const renderLetterAnalysis = () => {
    if (!nameInfo.letterMeanings) return null;
    
    const letters = Object.keys(nameInfo.letterMeanings);
    
    return (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {letters.map((letter, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="bg-midnight-default/40 rounded-lg p-4 backdrop-blur-sm border border-gold-default/20 hover:border-gold-default/40 transition-all group hover:shadow-md hover:shadow-gold-default/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gold-default/30 flex items-center justify-center text-2xl font-bold text-gold-default group-hover:bg-gold-default/50 transition-all">
                {letter}
              </div>
              <div>
                <h6 className="text-gold-light/90 font-cinzel mb-1">
                  {language === 'tr' ? 'Anlam' : 'Meaning'}
                </h6>
                <p className="text-gold-light/80 font-cormorant text-base">
                  {nameInfo.letterMeanings[letter]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // İsim kökenleri için görüntüleme
  const renderOrigin = (origin) => {
    if (origin === "Bilinmiyor" || origin === "Unknown") {
      return (
        <div className="text-gold-light/80 italic">
          {language === 'en' 
            ? "This name may be used in multiple cultures or may not have a specific origin."
            : "Bu isim birden fazla kültürde kullanılıyor olabilir veya belirgin bir kökeni olmayabilir."}
        </div>
      );
    }
    return <div className="text-gold-default">{origin}</div>;
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-cinzel text-gold-default text-center mb-6">
        {name} {language === 'tr' ? 'İçin Özel Analiz' : 'Special Analysis'}
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* İsim Anlamı ve Kökeni */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-midnight-light/30 backdrop-blur-sm p-6 rounded-lg border border-gold-default/30 hover:border-gold-default/70 transition-all duration-300 hover:shadow-lg hover:shadow-gold-default/10"
        >
          <h4 className="text-xl font-cinzel text-gold-default mb-5">{t.nameTitle}</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="text-lg font-semibold text-gold-light/90 mb-2">{t.meaningTitle}</h5>
              <p className="text-gold-light/80 font-cormorant text-lg">
                {nameInfo.meaning || t.unknownMeaning}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Köken bilgisi */}
              <div className="bg-midnight-default/40 rounded-lg p-4 backdrop-blur-sm border border-gold-default/20 hover:border-gold-default/40 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gold-default/30 flex items-center justify-center text-gold-default flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h5 className="text-lg font-cinzel text-gold-light/90 truncate">{t.originTitle}</h5>
                </div>
                {renderOrigin(nameInfo.origin)}
              </div>
              
              {/* Cinsiyet bilgisi */}
              <div className="bg-midnight-default/40 rounded-lg p-4 backdrop-blur-sm border border-gold-default/20 hover:border-gold-default/40 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gold-default/30 flex items-center justify-center text-gold-default flex-shrink-0">
                    {nameInfo.gender === 'female' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    ) : nameInfo.gender === 'male' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : nameInfo.gender === 'unisex' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-8.707a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 10.586l-1.293-1.293z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 6a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <h5 className="text-lg font-cinzel text-gold-light/90 truncate">{t.genderTitle}</h5>
                </div>
                <p className="text-gold-light/80 font-cormorant text-lg">
                  {nameInfo.gender === 'male' ? t.male : nameInfo.gender === 'female' ? t.female : nameInfo.gender === 'unisex' ? (language === 'tr' ? 'Ortak Cinsiyet' : 'Unisex') : t.unknown}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Numeroloji Değeri */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-midnight-light/30 backdrop-blur-sm p-6 rounded-lg border border-gold-default/30 hover:border-gold-default/70 transition-all duration-300 hover:shadow-lg hover:shadow-gold-default/10"
        >
          <h4 className="text-xl font-cinzel text-gold-default mb-5">{t.numerologyTitle}</h4>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ 
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.7, 1, 0.7] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gold-default/20 blur-md"
              />
              <div className="w-24 h-24 rounded-full bg-midnight-default/80 backdrop-blur-sm border-2 border-gold-default/50 flex items-center justify-center text-4xl font-bold text-gold-default relative z-10 shadow-lg shadow-gold-default/10">
                {nameInfo.numerology}
              </div>
            </div>
            
            <div className="flex-1">
              <h5 className="text-lg font-cinzel text-gold-light/90 mb-3">
                {language === 'tr' ? 'Sayının Anlamı' : 'Meaning of Number'}
              </h5>
              <p className="text-gold-light/80 font-cormorant text-lg">
                {nameInfo.numerologyMeaning}
              </p>
              
              <div className="mt-4">
                <div className="text-sm text-gold-light/60 mb-1 font-cinzel">
                  {language === 'tr' ? 'Etki Seviyesi' : 'Influence Level'}
                </div>
                <div className="w-full bg-midnight-default/60 h-2 rounded-full mb-1 backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${nameInfo.numerology * 11}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold-default/50 to-gold-default rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gold-light/50">
                  <span>1</span>
                  <span>9</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Harf Analizi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-midnight-light/30 backdrop-blur-sm p-6 rounded-lg border border-gold-default/30 hover:border-gold-default/70 transition-all duration-300 hover:shadow-lg hover:shadow-gold-default/10 lg:col-span-2 mt-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-gold-default/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-gold-default" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </div>
            <h4 className="text-xl font-cinzel text-gold-default">{t.letterAnalysisTitle}</h4>
          </div>
          
          <p className="text-gold-light/80 italic mb-4 font-cormorant text-lg">
            {language === 'tr' 
              ? 'İsminizin her harfi, kişiliğinize farklı bir enerji ve özellik katar.'
              : 'Each letter in your name adds a different energy and trait to your personality.'}
          </p>
          
          {renderLetterAnalysis()}
        </motion.div>
      </div>
    </div>
  );
};

export default NameAnalysisBoxes;

// Test ismi ekle
export const debugTestName = "Nursel" // Bu isim cinsiyeti dişi olarak tespit edilecek