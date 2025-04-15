import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { letterMeanings, numerologyMeanings } from '../data/nameCharacteristics';

export const NameAnalysisBoxes = ({ name, language, darkTheme, currentTheme }) => {
  // İsmin adı ve karakterlerini analiz et
  const characters = name ? name.split('') : [];
  
  // İlk harfin özelliği
  const firstLetter = name && name.length > 0 ? name.toLowerCase()[0] : '';
  
  // Harflerin anlamları sözlüğü
  const letterMeanings = {
    a: { tr: "Bağımsızlık, liderlik ve yaratıcılık", en: "Independence, leadership and creativity" },
    b: { tr: "Duyarlılık, iş birliği ve diplomatik yetenekler", en: "Sensitivity, cooperation and diplomatic abilities" },
    c: { tr: "İfade yeteneği, sosyallik ve iyimserlik", en: "Expression ability, sociability and optimism" },
    ç: { tr: "Pratiklik, düzen ve detaylara dikkat", en: "Practicality, order and attention to detail" },
    d: { tr: "Azim, kararlılık ve güçlü irade", en: "Perseverance, determination and strong will" },
    e: { tr: "Özgürlük, değişim ve iletişim becerileri", en: "Freedom, change and communication skills" },
    f: { tr: "Şefkat, yaratıcılık ve sorumluluk", en: "Compassion, creativity and responsibility" },
    g: { tr: "Bilgelik, gizemlilik ve içgörü", en: "Wisdom, mystery and insight" },
    h: { tr: "Başarı odaklılık, hırs ve disiplin", en: "Achievement-oriented, ambition and discipline" },
    ı: { tr: "Duyarlılık, hassasiyet ve duygusal derinlik", en: "Sensitivity, gentleness and emotional depth" },
    i: { tr: "Sezgi, hayal gücü ve idealizm", en: "Intuition, imagination and idealism" },
    j: { tr: "Adalet duygusu, düzen ve organizasyon", en: "Sense of justice, order and organization" },
    k: { tr: "Çok yönlülük, uyum ve iletişim", en: "Versatility, adaptation and communication" },
    l: { tr: "İfade yeteneği, çekicilik ve sosyal uyum", en: "Expression ability, attractiveness and social harmony" },
    m: { tr: "Çalışkanlık, güvenilirlik ve pratiklik", en: "Diligence, reliability and practicality" },
    n: { tr: "Yaratıcılık, sezgi ve duygusal hassasiyet", en: "Creativity, intuition and emotional sensitivity" },
    o: { tr: "Liderlik, güç ve otorite", en: "Leadership, power and authority" },
    ö: { tr: "Duyarlılık, empati ve manevi derinlik", en: "Sensitivity, empathy and spiritual depth" },
    p: { tr: "Bilgi arayışı, idealizm ve zihinsel aktivite", en: "Knowledge seeking, idealism and mental activity" },
    r: { tr: "Pratiklik, sorumluluk ve güvenilirlik", en: "Practicality, responsibility and reliability" },
    s: { tr: "Duygusal güç, cesaret ve kararlılık", en: "Emotional strength, courage and determination" },
    ş: { tr: "Yardımseverlik, fedakarlık ve şefkat", en: "Helpfulness, sacrifice and compassion" },
    t: { tr: "Yaratıcılık, dışa dönüklük ve coşku", en: "Creativity, extroversion and enthusiasm" },
    u: { tr: "Sezgisel güç, duyarlılık ve uyum", en: "Intuitive power, sensitivity and harmony" },
    ü: { tr: "İçsel huzur, denge ve uyum", en: "Inner peace, balance and harmony" },
    v: { tr: "Yaratıcılık, özgürlük ve bağımsızlık", en: "Creativity, freedom and independence" },
    y: { tr: "Bağımsızlık, özgür ruh ve macera", en: "Independence, free spirit and adventure" },
    z: { tr: "Analitik düşünce, kararlılık ve yaratıcılık", en: "Analytical thinking, determination and creativity" }
  };

  // Numeroloji sözlüğü
  const numerologyMeanings = {
    1: { tr: 'Liderlik, bağımsızlık ve özgüven', en: 'Leadership, independence and self-confidence' },
    2: { tr: 'İş birliği, uyum ve hassasiyet', en: 'Cooperation, harmony and sensitivity' },
    3: { tr: 'İfade, yaratıcılık ve sosyallik', en: 'Expression, creativity and sociability' },
    4: { tr: 'Düzen, pratiklik ve çalışkanlık', en: 'Order, practicality and diligence' },
    5: { tr: 'Özgürlük, değişim ve macera', en: 'Freedom, change and adventure' },
    6: { tr: 'Sorumluluk, uyum ve şefkat', en: 'Responsibility, harmony and compassion' },
    7: { tr: 'Analiz, içgörü ve maneviyat', en: 'Analysis, insight and spirituality' },
    8: { tr: 'Güç, maddi başarı ve otorite', en: 'Power, material success and authority' },
    9: { tr: 'İnsanlık, yardımseverlik ve idealzim', en: 'Humanity, helpfulness and idealism' }
  };

  // Numeroloji hesaplama fonksiyonu
  const calculateNumerology = (char) => {
    const letterValues = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 1, 
      'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9, 's': 1, 't': 2, 
      'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8, 'ı': 9, 'ö': 6, 'ü': 3, 'ğ': 7, 
      'ş': 1, 'ç': 3
    };
    
    return letterValues[char.toLowerCase()] || 1;
  };

  // İsmin toplam numeroloji değerini hesapla
  const calculateTotalNumerology = () => {
    if (!name) return 0;
    
    let total = 0;
    for (let char of name.toLowerCase()) {
      if (char !== ' ') {
        total += calculateNumerology(char);
      }
    }
    
    // Tek basamağa indir
    while (total > 9) {
      let sum = 0;
      while (total > 0) {
        sum += total % 10;
        total = Math.floor(total / 10);
      }
      total = sum;
    }
    
    return total;
  };
  
  const totalNumerology = calculateTotalNumerology();
  const numerologyDescription = numerologyMeanings[totalNumerology] ? 
    (language === 'tr' ? numerologyMeanings[totalNumerology].tr : numerologyMeanings[totalNumerology].en) : 
    (language === 'tr' ? 'Geçerli numeroloji değeri bulunmamaktadır.' : 'No valid numerology value found.');

  if (!name) return null;

  return (
    <div className="mt-16">
      {/* İsim Analizi başlık */}
      <div className="text-center mb-6">
        <h3 className={`text-lg font-cinzel ${currentTheme.accentText} mb-2`}>
          {language === 'tr' ? 'İsim Analizi' : 'Name Analysis'}
        </h3>
        <div className="h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-gold-default/60 to-transparent mb-6"></div>
      </div>
      
      {/* Numeroloji bölümü */}
      <div className="mb-8">
        <div className="mb-4">
          <div className="flex items-center">
            <motion.span 
              className={`mr-2 text-xl ${currentTheme.accentText}`}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✧
            </motion.span>
            <h3 className={`text-base font-cinzel ${currentTheme.accentText}`}>
              {language === 'tr' ? 'Numeroloji Değeri' : 'Numerology Value'}
            </h3>
          </div>
          
          <div className={`mt-3 p-4 ${darkTheme ? 'bg-midnight-default/70' : 'bg-[#FFFBF2]/80'} backdrop-blur-sm border ${currentTheme.border} rounded-lg`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`text-2xl font-bold ${currentTheme.accentText} flex items-center justify-center w-10 h-10 rounded-full border ${currentTheme.border} bg-midnight-light/30`}>
                {totalNumerology}
              </div>
              <h4 className={`text-lg ${currentTheme.text}`}>
                {language === 'tr' ? `${name} isminin numeroloji değeri` : `Numerology value of ${name}`}
              </h4>
            </div>
            <p className={`text-sm ${currentTheme.text}`}>
              {numerologyDescription}
            </p>
          </div>
        </div>
      </div>
      
      {/* Harf harf analiz bölümü */}
      <div className="mb-8">
        <div className="mb-4">
          <div className="flex items-center">
            <motion.span 
              className={`mr-2 text-xl ${currentTheme.accentText}`}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✧
            </motion.span>
            <h3 className={`text-base font-cinzel ${currentTheme.accentText}`}>
              {language === 'tr' ? 'Harf Analizi' : 'Letter Analysis'}
            </h3>
          </div>
          <p className={`text-sm ${currentTheme.text} mt-1 mb-4`}>
            {language === 'tr' 
              ? 'İsminizin her harfi, kişiliğinize farklı bir enerji ve özellik katar.' 
              : 'Each letter of your name brings a different energy and trait to your personality.'}
          </p>
        </div>
        
        {/* Harf kartları */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {characters.map((char, index) => {
            // Boşlukları atla
            if (char === ' ') return null;
            
            // Harfin anlamını bul
            const meaning = letterMeanings[char.toLowerCase()] ? 
              (language === 'tr' ? letterMeanings[char.toLowerCase()].tr : letterMeanings[char.toLowerCase()].en) :
              (language === 'tr' ? 'Özel bir enerji taşır.' : 'Carries a special energy.');
            
            // Numeroloji değerini hesapla
            const numerology = calculateNumerology(char);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`${darkTheme ? 'bg-midnight-default/70' : 'bg-[#FFFBF2]/80'} backdrop-blur-sm border ${currentTheme.border} rounded-lg p-3 relative overflow-hidden`}
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-gold-default/10 to-gold-default/30 blur-lg z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-2xl font-cinzel ${currentTheme.accentText}`}>{char.toUpperCase()}</span>
                    <div className="h-0.5 flex-grow bg-gradient-to-r from-gold-default/50 to-transparent"></div>
                    <span className={`text-sm ${currentTheme.accentText}`}>{numerology}</span>
                  </div>
                  <p className={`text-xs ${currentTheme.text}`}>
                    {meaning}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const NameSuggestions = ({ name, isMale = false, language, setSearchTerm, onClick }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!name) return;

    // İsim önerileri için basit bir algoritma (örnek için statik liste)
    const maleSuggestions = {
      'a': ['Ahmet', 'Ali', 'Abdullah', 'Adem', 'Alp'],
      'b': ['Burak', 'Berk', 'Batuhan', 'Bilal', 'Barış'],
      'c': ['Can', 'Cem', 'Cihan', 'Cenk', 'Cemal'],
      'd': ['Deniz', 'Doruk', 'Doğan', 'Davut', 'Derya'],
      'e': ['Emre', 'Enes', 'Eren', 'Erdem', 'Ege'],
      'f': ['Furkan', 'Faruk', 'Fatih', 'Fikret', 'Ferhat'],
      'g': ['Gökhan', 'Göktuğ', 'Görkem', 'Giray', 'Gürkan'],
      'h': ['Hakan', 'Hasan', 'Halil', 'Hüseyin', 'Harun'],
      'i': ['İsmail', 'İbrahim', 'İlhan', 'İlyas', 'İsmet'],
      'j': ['Jale', 'Jalal', 'Janset', 'Jamal', 'Janberk'],
      'k': ['Kemal', 'Kerem', 'Kaan', 'Koray', 'Kadir'],
      'l': ['Levent', 'Lütfi', 'Latif', 'Lemi', 'Lokman'],
      'm': ['Mehmet', 'Mustafa', 'Murat', 'Melih', 'Mesut'],
      'n': ['Nihat', 'Necati', 'Nazım', 'Nevzat', 'Nail'],
      'o': ['Osman', 'Onur', 'Ozan', 'Orhan', 'Oğuz'],
      'ö': ['Ömer', 'Özgür', 'Özkan', 'Önder', 'Özcan'],
      'p': ['Polat', 'Poyraz', 'Pınar', 'Pamir', 'Peker'],
      'r': ['Recep', 'Ramazan', 'Rıza', 'Resul', 'Rüştü'],
      's': ['Selim', 'Serkan', 'Sinan', 'Semih', 'Salih'],
      'ş': ['Şahin', 'Şükrü', 'Şenol', 'Şener', 'Şinasi'],
      't': ['Tuncay', 'Turan', 'Tolga', 'Tarık', 'Tahir'],
      'u': ['Uğur', 'Umut', 'Utku', 'Ufuk', 'Ulaş'],
      'ü': ['Ümit', 'Ünal', 'Ünsal', 'Üzeyir', 'Ürfan'],
      'v': ['Volkan', 'Vedat', 'Veli', 'Veysel', 'Vahit'],
      'y': ['Yusuf', 'Yasin', 'Yakup', 'Yavuz', 'Yunus'],
      'z': ['Zafer', 'Zeki', 'Zekai', 'Ziya', 'Zahit']
    };

    const femaleSuggestions = {
      'a': ['Ayşe', 'Aslı', 'Aylin', 'Arzu', 'Ayla'],
      'b': ['Betül', 'Buket', 'Berna', 'Burcu', 'Bahar'],
      'c': ['Ceyda', 'Canan', 'Cansu', 'Ceren', 'Cemre'],
      'd': ['Derya', 'Didem', 'Deniz', 'Damla', 'Duygu'],
      'e': ['Elif', 'Esra', 'Ebru', 'Eda', 'Emine'],
      'f': ['Fatma', 'Funda', 'Filiz', 'Fulya', 'Feride'],
      'g': ['Gül', 'Gamze', 'Gizem', 'Gülşen', 'Gülten'],
      'h': ['Hülya', 'Hatice', 'Hande', 'Hacer', 'Hayriye'],
      'i': ['İrem', 'İlayda', 'İnci', 'İpek', 'İlknur'],
      'j': ['Jale', 'Janset', 'Jülide', 'Jalenur', 'Jasemin'],
      'k': ['Kübra', 'Kadriye', 'Kumsal', 'Kader', 'Keriman'],
      'l': ['Leyla', 'Lale', 'Latife', 'Leman', 'Lamia'],
      'm': ['Merve', 'Melis', 'Melek', 'Meltem', 'Meryem'],
      'n': ['Nur', 'Nazlı', 'Neslihan', 'Nihal', 'Nilüfer'],
      'o': ['Özge', 'Özlem', 'Oya', 'Olcay', 'Oylum'],
      'ö': ['Özge', 'Özlem', 'Övgü', 'Öykü', 'Özden'],
      'p': ['Pınar', 'Pembe', 'Perihan', 'Pelin', 'Piraye'],
      'r': ['Rabia', 'Raziye', 'Reyhan', 'Ruken', 'Rüya'],
      's': ['Seda', 'Selma', 'Sibel', 'Sevgi', 'Selcan'],
      'ş': ['Şeyma', 'Şule', 'Şenay', 'Şebnem', 'Şermin'],
      't': ['Tuğba', 'Tuba', 'Türkan', 'Tülay', 'Tanyeli'],
      'u': ['Ummuhan', 'Umay', 'Ulviye', 'Utku', 'Ufuk'],
      'ü': ['Ümran', 'Ülkü', 'Ümmü', 'Ülker', 'Ümmiye'],
      'v': ['Vildan', 'Vecibe', 'Vahide', 'Vedia', 'Vicdan'],
      'y': ['Yasemin', 'Yeliz', 'Yağmur', 'Yıldız', 'Yaren'],
      'z': ['Zeynep', 'Züleyha', 'Zeliha', 'Zühal', 'Zehra']
    };

    // İsmin ilk harfine göre öneriler
    const firstLetter = name.toLowerCase()[0];
    const suggestList = isMale ? maleSuggestions : femaleSuggestions;
    
    if (suggestList[firstLetter]) {
      // İsmin kendisi öneri listesinde varsa kaldır
      setSuggestions(suggestList[firstLetter].filter(n => n.toLowerCase() !== name.toLowerCase()));
    } else {
      // İlk harf için eşleşme yoksa cinsiyet listesinden rastgele 5 isim seç
      const allNames = Object.values(suggestList).flat();
      const filteredNames = allNames.filter(n => n.toLowerCase() !== name.toLowerCase());
      const randomSelection = filteredNames.sort(() => 0.5 - Math.random()).slice(0, 5);
      setSuggestions(randomSelection);
    }
  }, [name, isMale]);

  if (!name || suggestions.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center mb-2">
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gold-default/30 to-transparent"></div>
        <h3 className="text-base font-cinzel text-gold-default mx-3">
          {language === 'tr' ? 'Benzer İsimler' : 'Similar Names'}
        </h3>
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gold-default/30 to-transparent"></div>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-midnight-light/20 hover:bg-midnight-light/30 text-gold-light px-3 py-1 rounded-full transition-all duration-300 text-sm border border-gold-default/20"
            onClick={() => {
              setSearchTerm(suggestion);
              onClick && onClick();
            }}
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default NameSuggestions; 