import React, { useState, useEffect } from 'react';
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

// Test ismi ekle
export const debugTestName = "Nursel" // Bu isim cinsiyeti dişi olarak tespit edilecek

// NameAnalysisBoxes bileşeni (named export olarak)
export const NameAnalysisBoxes = ({ name, characteristics, traits, energy, numerology, language, theme }) => {
  const numerologyInfo = numerologyMeanings[numerology] || { 
    tr: "Bu sayı hakkında bilgi bulunamadı.", 
    en: "No information found about this number." 
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Karakter Özellikleri */}
      <div className={`${theme.primaryBg} ${theme.border} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm`}>
        <h2 className={`text-2xl font-cinzel mb-4 ${theme.accentText}`}>
          {language === 'tr' ? 'Karakter Analizi' : 'Character Analysis'}
        </h2>
        <p className={`${theme.text} text-lg font-cormorant mb-6`}>
          {characteristics}
        </p>

        <h3 className={`text-xl font-cinzel mb-2 ${theme.accentText}`}>
          {language === 'tr' ? 'Uyumlu Harfler' : 'Compatible Letters'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait, index) => (
            <div key={index} className={`${theme.secondaryBg} ${theme.border} border px-4 py-1 rounded-full ${theme.text}`}>
              {trait}
            </div>
          ))}
        </div>
      </div>

      {/* Enerji ve Numeroloji */}
      <div className={`${theme.primaryBg} ${theme.border} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm`}>
        <h2 className={`text-2xl font-cinzel mb-4 ${theme.accentText}`}>
          {language === 'tr' ? 'Enerji & Numeroloji' : 'Energy & Numerology'}
        </h2>
        
        {/* Enerji Seviyesi */}
        <div className="mb-6">
          <h3 className={`text-xl font-cinzel mb-2 ${theme.accentText}`}>
            {language === 'tr' ? 'Enerji Seviyesi' : 'Energy Level'}
          </h3>
          <div className="w-full bg-midnight-light/30 h-4 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gold-light/60 to-gold-default rounded-full"
              style={{ width: `${energy}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className={`text-sm ${theme.text}`}>0</span>
            <span className={`text-sm ${theme.text}`}>100</span>
          </div>
        </div>
        
        {/* Numeroloji */}
        <div>
          <h3 className={`text-xl font-cinzel mb-2 ${theme.accentText}`}>
            {language === 'tr' ? 'Numeroloji Değeri' : 'Numerology Value'}
          </h3>
          <div className="flex items-center gap-4 mb-3">
            <div className={`w-12 h-12 ${theme.secondaryBg} ${theme.border} border-2 rounded-full flex items-center justify-center ${theme.accentText} text-2xl font-cinzel`}>
              {numerology}
            </div>
            <div className={`${theme.text} text-lg font-cormorant`}>
              {numerologyMeanings[numerology] ? numerologyMeanings[numerology][language === 'tr' ? 'tr' : 'en'] : 
                language === 'tr' ? 'Bu sayı hakkında bilgi bulunamadı.' : 'No information found for this number.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// NameSuggestions bileşeni
const NameSuggestions = ({ name, language, theme, maleNames, femaleNames, isMobile }) => {
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    // İsim önerilerini oluştur
    if (!name) return;
    
    const normalizedName = name.trim().toLowerCase();
    // İlk harfi al
    const firstLetter = normalizedName[0];
    
    // İsim listelerini birleştir
    const allNames = [...maleNames, ...femaleNames];
    
    // İlk harfe göre filtrele ve ismin kendisini hariç tut
    let filteredNames = allNames.filter(n => 
      n.startsWith(firstLetter) && n !== normalizedName
    );
    
    // Rastgele 3-9 isim seç (cihaz boyutuna göre)
    const count = isMobile ? 3 : 9;
    
    // Yeterince isim yoksa, tüm isimleri döndür
    if (filteredNames.length <= count) {
      setSuggestions(filteredNames);
      return;
    }
    
    // Rastgele seçim yap
    const selected = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * filteredNames.length);
      selected.push(filteredNames[randomIndex]);
      filteredNames.splice(randomIndex, 1);
    }
    
    setSuggestions(selected);
  }, [name, maleNames, femaleNames, isMobile]);
  
  if (suggestions.length === 0) return null;
  
  return (
    <div className={`${theme.primaryBg} ${theme.border} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm mt-8`}>
      <h2 className={`text-2xl font-cinzel mb-4 ${theme.accentText}`}>
        {language === 'tr' ? 'Benzer İsim Önerileri' : 'Similar Name Suggestions'}
      </h2>
      
      <p className={`${theme.text} text-lg font-cormorant mb-6`}>
        {language === 'tr' 
          ? `${name} ismiyle uyumlu olabilecek diğer isimleri keşfedin.` 
          : `Discover other names that might harmonize with ${name}.`}
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className={`${theme.secondaryBg} ${theme.border} border rounded-lg p-3 text-center cursor-pointer hover:shadow-md hover:shadow-gold-default/10 transition-all duration-300`}
          >
            <span className={`${theme.text} text-lg font-cinzel`}>{suggestion}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NameSuggestions;