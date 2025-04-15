import React, { useState } from 'react';
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
export const NameAnalysisBoxes = ({ name, language }) => {
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
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {letters.map((letter, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="bg-midnight-default/40 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-gold-default/20 hover:border-gold-default/40 transition-all group hover:shadow-md hover:shadow-gold-default/10"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-gold-default/30 flex items-center justify-center text-xl sm:text-2xl font-bold text-gold-default group-hover:bg-gold-default/50 transition-all">
                {letter}
              </div>
              <div>
                <h6 className="text-sm sm:text-base text-gold-light/90 font-cinzel mb-1">
                  {language === 'tr' ? 'Anlam' : 'Meaning'}
                </h6>
                <p className="text-gold-light/80 font-cormorant text-sm sm:text-base">
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
      <h3 className="text-xl sm:text-2xl font-cinzel text-gold-default text-center mb-6">
        {name} {language === 'tr' ? 'İçin Özel Analiz' : 'Special Analysis'}
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* İsim Anlamı ve Kökeni */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-midnight-light/30 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gold-default/30 hover:border-gold-default/70 transition-all duration-300 hover:shadow-lg hover:shadow-gold-default/10"
        >
          <h4 className="text-lg sm:text-xl font-cinzel text-gold-default mb-4 sm:mb-5">{t.nameTitle}</h4>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h5 className="text-base sm:text-lg font-semibold text-gold-light/90 mb-2">{t.meaningTitle}</h5>
              <p className="text-gold-light/80 font-cormorant text-base sm:text-lg">
                {nameInfo.meaning || t.unknownMeaning}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Köken bilgisi */}
              <div className="bg-midnight-default/40 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-gold-default/20 hover:border-gold-default/40 transition-all">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold-default/30 flex items-center justify-center text-gold-default flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h5 className="text-base sm:text-lg font-cinzel text-gold-light/90 truncate">{t.originTitle}</h5>
                </div>
                {renderOrigin(nameInfo.origin)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Numeroloji Değeri */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-midnight-light/30 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gold-default/30 hover:border-gold-default/70 transition-all duration-300 hover:shadow-lg hover:shadow-gold-default/10"
        >
          <h4 className="text-lg sm:text-xl font-cinzel text-gold-default mb-4 sm:mb-5">{t.numerologyTitle}</h4>
          
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
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
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-midnight-default/80 backdrop-blur-sm border-2 border-gold-default/50 flex items-center justify-center text-3xl sm:text-4xl font-bold text-gold-default relative z-10 shadow-lg shadow-gold-default/10">
                {nameInfo.numerology}
              </div>
            </div>
            
            <div className="flex-1">
              <h5 className="text-base sm:text-lg font-cinzel text-gold-light/90 mb-2 sm:mb-3 text-center md:text-left">
                {language === 'tr' ? 'Sayının Anlamı' : 'Meaning of Number'}
              </h5>
              <p className="text-gold-light/80 font-cormorant text-base sm:text-lg">
                {nameInfo.numerologyMeaning}
              </p>
              
              <div className="mt-4">
                <div className="text-xs sm:text-sm text-gold-light/60 mb-1 font-cinzel">
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
          className="bg-midnight-light/30 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gold-default/30 hover:border-gold-default/70 transition-all duration-300 hover:shadow-lg hover:shadow-gold-default/10 lg:col-span-2 mt-4 sm:mt-6"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold-default/30 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold-default" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-cinzel text-gold-default">{t.letterAnalysisTitle}</h4>
          </div>
          
          <p className="text-gold-light/80 italic mb-4 font-cormorant text-base sm:text-lg">
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

// NameSuggestions bileşeni
const NameSuggestions = ({ name, language, darkTheme, currentTheme }) => {
  const [hoveredName, setHoveredName] = useState('');

  // İsim kategorileri - Genişletilmiş veritabanı
  const nameCategories = {
    tr: {
      modern: [
        "Defne", "Mila", "Azra", "Eylül", "Nehir", "Mira", "Nil", "Ada", "Lina", "Derin", 
        "Ege", "Deniz", "Kuzey", "Atlas", "Bera", "Mert", "Çınar", "Demir", "Kayra", "Bora",
        "Arin", "Duru", "Esila", "Eliz", "Öykü", "Miray", "Lara", "İrem", "Almira", "Mina", 
        "Miran", "Arın", "Efe", "Rüzgar", "Umut", "Yağız", "Toprak", "Yiğit", "Alp", "Doruk"
      ],
      classic: [
        "Ayşe", "Fatma", "Zeynep", "Emine", "Hatice", "Elif", "Meryem", "Zehra", "Özlem", "Nazlı",
        "Ahmet", "Mehmet", "Mustafa", "Ali", "Hüseyin", "Hasan", "İbrahim", "Ömer", "İsmail", "Yusuf",
        "Safiye", "Hanım", "Leyla", "Saliha", "Gülsüm", "Nihal", "Servet", "Sabriye", "Melahat", "Sema",
        "Kemal", "Bekir", "Osman", "İsmet", "Cemal", "Nihat", "Orhan", "Recep", "Halil", "Şaban",
        "Nuray", "Nevin", "Sevim", "Türkan", "Aysel", "Melek", "Nurten", "Tülay", "Nurgül", "Serpil",
        "Adnan", "Necati", "Muzaffer", "Metin", "Cevdet", "Ercan", "Ferit", "Ferhat", "Dursun", "Haydar"
      ],
      spiritual: [
        "Asel", "Asya", "Erva", "Hira", "Fatima", "İnci", "Eymen", "Selim", "Asiye", "Nur", 
        "Muhammed", "Yunus", "Talha", "Bilal", "Hamza", "Yusuf", "Yakup", "Musa", "İsa", "Halil",
        "Kevser", "Betül", "Beyzanur", "Rabia", "Havva", "Zümra", "Sümeyye", "Esmanur", "Ayşenur", "Elifnur",
        "Ahmet", "Enes", "Furkan", "Ömer", "İbrahim", "Taha", "Muhammed Ali", "Eren", "Kerim", "Salih",
        "Reyyan", "Tuba", "Neva", "Medine", "Miraç", "Hatice", "Meryem", "Cennet", "Hüda", "Melek", 
        "Adem", "Said", "Yasin", "İlyas", "Eyüp", "Muaz", "Ebubekir", "Miraç", "Hüdai", "İsrafil"
      ]
    },
    en: {
      modern: [
        "Olivia", "Emma", "Sophia", "Luna", "Aria", "Zoe", "Nova", "Aurora", "Riley", "Stella", 
        "Liam", "Noah", "Oliver", "Ethan", "Mason", "Lucas", "Caleb", "Owen", "Miles", "Leo",
        "Mia", "Ava", "Amelia", "Harper", "Lily", "Evelyn", "Mila", "Willow", "Quinn", "Ruby", 
        "Jackson", "Aiden", "Carter", "Grayson", "Jayden", "Wyatt", "Finn", "Archer", "Rowan", "River"
      ],
      classic: [
        "Elizabeth", "Catherine", "Margaret", "Victoria", "Eleanor", "Alice", "Mary", "Jane", "Anne", "Charlotte", 
        "William", "James", "Edward", "Henry", "George", "Albert", "Thomas", "Richard", "Joseph", "Charles",
        "Beatrice", "Frances", "Helen", "Dorothy", "Clara", "Florence", "Rose", "Louise", "Edith", "Martha",
        "Robert", "John", "Frederick", "Arthur", "Walter", "Harold", "Ernest", "Louis", "Samuel", "Benjamin"
      ],
      spiritual: [
        "Faith", "Grace", "Hope", "Charity", "Joy", "Destiny", "Serenity", "Angel", "Genesis", "Trinity", 
        "Christian", "Matthew", "Noah", "Gabriel", "Elijah", "Michael", "David", "Solomon", "Isaiah", "Abraham",
        "Eden", "Heaven", "Harmony", "Nevaeh", "Miracle", "Bliss", "Divine", "Peace", "Blessing", "Justice", 
        "Zion", "Ezra", "Samuel", "Levi", "Malachi", "Jeremiah", "Ezekiel", "Judah", "Emmanuel", "Felix"
      ]
    }
  };

  // Her harf için enerji değerleri
  const letterEnergies = {
    'A': 9, 'B': 6, 'C': 3, 'Ç': 4, 'D': 8, 'E': 5, 'F': 8, 'G': 6, 'Ğ': 7, 
    'H': 5, 'I': 9, 'İ': 8, 'J': 1, 'K': 7, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 
    'Ö': 7, 'P': 8, 'R': 9, 'S': 3, 'Ş': 4, 'T': 5, 'U': 6, 'Ü': 7, 'V': 8, 
    'Y': 9, 'Z': 9
  };

  // İsim enerjisini hesaplama
  const calculateNameEnergy = (name) => {
    const letters = name.toUpperCase().split('');
    let totalEnergy = 0;
    let letterValues = [];
    
    letters.forEach(letter => {
      const energy = letterEnergies[letter] || 5; // Varsayılan değer
      totalEnergy += energy;
      letterValues.push({ letter, energy });
    });
    
    const averageEnergy = Math.round(totalEnergy / letters.length);
    
    return {
      total: totalEnergy,
      average: averageEnergy,
      letterValues: letterValues
    };
  };

  // Kategori sekmesi için çeviriler
  const translations = {
    tr: {
      title: 'Seçilmiş İsimler',
      subtitle: 'Aşağıdaki isimlerden esinlenebilirsiniz:',
      categories: {
        modern: 'Modern',
        classic: 'Klasik',
        spiritual: 'Manevi'
      },
      energyTitle: 'Enerji Grafiği',
      energyDescription: 'Her harfin isim içindeki enerji seviyesi:',
      totalEnergy: 'Toplam Enerji',
      averageEnergy: 'Ortalama Enerji',
      highEnergy: 'Yüksek',
      mediumEnergy: 'Orta',
      lowEnergy: 'Düşük'
    },
    en: {
      title: 'Curated Names',
      subtitle: 'You may be inspired by the following names:',
      categories: {
        modern: 'Modern',
        classic: 'Classic',
        spiritual: 'Spiritual'
      },
      energyTitle: 'Energy Chart',
      energyDescription: 'Energy level of each letter in the name:',
      totalEnergy: 'Total Energy',
      averageEnergy: 'Average Energy',
      highEnergy: 'High',
      mediumEnergy: 'Medium',
      lowEnergy: 'Low'
    }
  };

  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState('modern');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className={`mt-10 p-5 ${currentTheme.primaryBg} backdrop-blur-sm border ${currentTheme.border} rounded-lg shadow-lg`}
    >
      <h3 className={`text-xl font-cinzel ${currentTheme.accentText} mb-2`}>
        {t.title}
      </h3>
      <p className={`text-sm mb-5 ${currentTheme.text} opacity-90`}>
        {t.subtitle}
      </p>

      {/* Kategori Sekmeleri */}
      <div className="flex mb-4 border-b border-gold-default/20">
        {Object.keys(t.categories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-300 relative
                ${activeCategory === category 
                  ? `${currentTheme.accentText} font-semibold` 
                  : `${currentTheme.text} opacity-70 hover:opacity-100`}`}
          >
            {t.categories[category]}
            {activeCategory === category && (
              <motion.div
                layoutId="activeTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkTheme ? 'bg-gold-default' : 'bg-[#D4AF37]'}`}
                initial={false}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* İsim Listesi */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
        {nameCategories[language][activeCategory].map((item) => {
          const energy = calculateNameEnergy(item);
          
          return (
            <motion.div 
              key={item}
              onMouseEnter={() => setHoveredName(item)}
              onMouseLeave={() => setHoveredName('')}
              whileHover={{ scale: 1.05 }}
              className={`py-2 px-3 ${darkTheme ? 'bg-midnight-default/50' : 'bg-[#FFF8E7]/80'} 
                  rounded-lg border ${currentTheme.lightBorder} hover:border-gold-default/40
                  cursor-pointer transition-all duration-300 relative group`}
            >
              <span className={`font-cormorant text-lg ${currentTheme.text}`}>{item}</span>
              
              {/* Enerji Göstergesi */}
              <div className={`absolute bottom-1 right-2 flex items-center ${currentTheme.text} opacity-60 text-xs`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${energy.average * 2}px` }}
                  className={`h-1 rounded-full ${
                    energy.average > 7 ? (darkTheme ? 'bg-emerald-500' : 'bg-emerald-400') : 
                    energy.average > 4 ? (darkTheme ? 'bg-amber-500' : 'bg-amber-400') : 
                    (darkTheme ? 'bg-rose-500' : 'bg-rose-400')
                  }`}
                />
              </div>
              
              {/* Enerji Grafiği Tooltip */}
              {hoveredName === item && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`absolute left-0 -top-2 -translate-y-full w-56 p-3 
                      ${currentTheme.primaryBg} backdrop-blur-md border ${currentTheme.border} 
                      rounded-lg shadow-lg z-10`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={`text-sm font-cinzel ${currentTheme.accentText}`}>{t.energyTitle}</h4>
                    <div className={`text-xs ${currentTheme.text} opacity-70`}>
                      {t.averageEnergy}: {energy.average}/10
                    </div>
                  </div>
                  
                  <div className="flex items-end h-20 gap-1 mb-2">
                    {energy.letterValues.map((lv, index) => (
                      <motion.div 
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${lv.energy * 8}%` }}
                        className={`flex-1 ${
                          lv.energy > 7 ? (darkTheme ? 'bg-emerald-600' : 'bg-emerald-400') : 
                          lv.energy > 4 ? (darkTheme ? 'bg-amber-600' : 'bg-amber-400') : 
                          (darkTheme ? 'bg-rose-600' : 'bg-rose-400')
                        } rounded-t-sm relative group`}
                      >
                        <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs ${currentTheme.text}`}>
                          {lv.letter}
                        </span>
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-white opacity-80">
                          {lv.energy}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-xs mt-3">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${darkTheme ? 'bg-rose-600' : 'bg-rose-400'}`}></div>
                      <span className={`${currentTheme.text} opacity-80`}>{t.lowEnergy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${darkTheme ? 'bg-amber-600' : 'bg-amber-400'}`}></div>
                      <span className={`${currentTheme.text} opacity-80`}>{t.mediumEnergy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${darkTheme ? 'bg-emerald-600' : 'bg-emerald-400'}`}></div>
                      <span className={`${currentTheme.text} opacity-80`}>{t.highEnergy}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NameSuggestions;