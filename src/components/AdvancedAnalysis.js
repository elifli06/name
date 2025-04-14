import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, CalculatorIcon, BookOpenIcon, SparklesIcon } from '@heroicons/react/24/outline';

const numerologyValues = {
  A: 1, B: 2, C: 3, Ç: 3, D: 4, E: 5, F: 6, G: 7, Ğ: 7, H: 8, I: 9, İ: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, Ö: 6, P: 7, R: 8, S: 9, Ş: 9,
  T: 1, U: 2, Ü: 2, V: 3, Y: 4, Z: 5
};

const zodiacSigns = {
  'Koç': ['Mars', 'Ateş', 'Liderlik', 'Cesaret'],
  'Boğa': ['Venüs', 'Toprak', 'Kararlılık', 'Güvenilirlik'],
  'İkizler': ['Merkür', 'Hava', 'İletişim', 'Esneklik'],
  'Yengeç': ['Ay', 'Su', 'Duygusallık', 'Koruyuculuk'],
  'Aslan': ['Güneş', 'Ateş', 'Yaratıcılık', 'Cömertlik'],
  'Başak': ['Merkür', 'Toprak', 'Analitik', 'Mükemmeliyetçilik'],
  'Terazi': ['Venüs', 'Hava', 'Denge', 'Adalet'],
  'Akrep': ['Plüton', 'Su', 'Tutku', 'Derinlik'],
  'Yay': ['Jüpiter', 'Ateş', 'Özgürlük', 'Bilgelik'],
  'Oğlak': ['Satürn', 'Toprak', 'Disiplin', 'Başarı'],
  'Kova': ['Uranüs', 'Hava', 'Yenilikçilik', 'İnsancıllık'],
  'Balık': ['Neptün', 'Su', 'Sezgi', 'Merhamet']
};

const historicalFigures = {
  A: ['Atatürk', 'Alexander', 'Aristoteles'],
  B: ['Barbaros', 'Buddha', 'Beethoven'],
  C: ['Cengiz Han', 'Caesar', 'Cleopatra'],
  D: ['Dante', 'Darwin', 'Da Vinci'],
  E: ['Einstein', 'Edison', 'Euler'],
  F: ['Fatih Sultan Mehmet', 'Franklin', 'Freud'],
  G: ['Galileo', 'Gandhi', 'Goethe'],
  H: ['Hippokrates', 'Homer', 'Herodot'],
  I: ['Isaac Newton', 'Ibn Sina', 'Immanuel Kant'],
  K: ['Kanuni Sultan Süleyman', 'Konfüçyüs', 'Kepler'],
  L: ['Leonardo da Vinci', 'Lincoln', 'Leibniz'],
  M: ['Mevlana', 'Mozart', 'Michelangelo'],
  N: ['Newton', 'Nietzsche', 'Nobel'],
  O: ['Omar Khayyam', 'Orhan Veli', 'Oscar Wilde'],
  P: ['Platon', 'Pisagor', 'Pasteur'],
  R: ['Rumi', 'Rembrandt', 'Roosevelt'],
  S: ['Sokrates', 'Shakespeare', 'Spinoza'],
  T: ['Tesla', 'Tolstoy', 'Thomas Edison'],
  V: ['Van Gogh', 'Voltaire', 'Victor Hugo'],
  Y: ['Yunus Emre', 'Yahya Kemal', 'Yavuz Sultan Selim'],
  Z: ['Zerdüşt', 'Ziya Gökalp', 'Zeus']
};

export default function AdvancedAnalysis({ name, language }) {
  const [activeTab, setActiveTab] = useState('numerology');

  const calculateNumerology = (name) => {
    const numbers = name.toUpperCase().split('').map(letter => numerologyValues[letter] || 0);
    const total = numbers.reduce((sum, num) => sum + num, 0);
    let finalNumber = total;
    
    while (finalNumber > 9) {
      finalNumber = String(finalNumber).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    return {
      numbers,
      total,
      finalNumber,
      meaning: getNumerologyMeaning(finalNumber)
    };
  };

  const getNumerologyMeaning = (number) => {
    const meanings = {
      1: language === 'tr' ? 'Liderlik ve bağımsızlık' : 'Leadership and independence',
      2: language === 'tr' ? 'Uyum ve işbirliği' : 'Harmony and cooperation',
      3: language === 'tr' ? 'Yaratıcılık ve ifade' : 'Creativity and expression',
      4: language === 'tr' ? 'Düzen ve kararlılık' : 'Order and stability',
      5: language === 'tr' ? 'Özgürlük ve değişim' : 'Freedom and change',
      6: language === 'tr' ? 'Sevgi ve sorumluluk' : 'Love and responsibility',
      7: language === 'tr' ? 'Analiz ve bilgelik' : 'Analysis and wisdom',
      8: language === 'tr' ? 'Güç ve başarı' : 'Power and success',
      9: language === 'tr' ? 'Evrensel sevgi ve hümanizm' : 'Universal love and humanism'
    };
    return meanings[number];
  };

  const findCompatibleZodiac = (numerologyNumber) => {
    const compatibilities = {
      1: ['Koç', 'Aslan', 'Yay'],
      2: ['Yengeç', 'Akrep', 'Balık'],
      3: ['İkizler', 'Terazi', 'Kova'],
      4: ['Boğa', 'Başak', 'Oğlak'],
      5: ['Koç', 'Aslan', 'Yay'],
      6: ['Boğa', 'Başak', 'Oğlak'],
      7: ['İkizler', 'Terazi', 'Kova'],
      8: ['Yengeç', 'Akrep', 'Balık'],
      9: ['Koç', 'Aslan', 'Yay']
    };
    return compatibilities[numerologyNumber] || [];
  };

  const numerologyResult = calculateNumerology(name);
  const compatibleSigns = findCompatibleZodiac(numerologyResult.finalNumber);
  const firstLetter = name.charAt(0).toUpperCase();
  const historicalNamemates = historicalFigures[firstLetter] || [];

  return (
    <div className="space-y-8">
      <div className="bg-[#141832]/40 backdrop-blur-xl rounded-lg shadow-lg p-8 border border-[#FFB800]/20">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('numerology')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'numerology'
                ? 'bg-[#FFB800]/20 text-[#FFD700]'
                : 'text-[#FFB800]/60 hover:text-[#FFB800]'
            }`}
          >
            <CalculatorIcon className="h-5 w-5" />
            {language === 'tr' ? 'Numeroloji' : 'Numerology'}
          </button>
          <button
            onClick={() => setActiveTab('zodiac')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'zodiac'
                ? 'bg-[#FFB800]/20 text-[#FFD700]'
                : 'text-[#FFB800]/60 hover:text-[#FFB800]'
            }`}
          >
            <StarIcon className="h-5 w-5" />
            {language === 'tr' ? 'Burç Uyumları' : 'Zodiac Compatibility'}
          </button>
          <button
            onClick={() => setActiveTab('historical')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'historical'
                ? 'bg-[#FFB800]/20 text-[#FFD700]'
                : 'text-[#FFB800]/60 hover:text-[#FFB800]'
            }`}
          >
            <BookOpenIcon className="h-5 w-5" />
            {language === 'tr' ? 'Tarihsel Bağlantılar' : 'Historical Connections'}
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'numerology' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#FFD700] font-serif">
                {language === 'tr' ? 'Numeroloji Analizi' : 'Numerology Analysis'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FFB800]/5 p-6 rounded-lg border border-[#FFB800]/20">
                  <h4 className="text-[#FFD700] mb-4 font-serif">
                    {language === 'tr' ? 'Sayısal Değerler' : 'Numerical Values'}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {name.toUpperCase().split('').map((letter, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <span className="text-[#FFB800]">{letter}</span>
                        <span className="text-[#FFD700] text-sm">{numerologyValues[letter] || 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#FFB800]/5 p-6 rounded-lg border border-[#FFB800]/20">
                  <h4 className="text-[#FFD700] mb-4 font-serif">
                    {language === 'tr' ? 'Kader Sayısı' : 'Destiny Number'}
                  </h4>
                  <div className="text-center">
                    <span className="text-4xl text-[#FFD700] font-bold">{numerologyResult.finalNumber}</span>
                    <p className="text-[#FFB800]/80 mt-2">{numerologyResult.meaning}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'zodiac' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#FFD700] font-serif">
                {language === 'tr' ? 'Uyumlu Burçlar' : 'Compatible Zodiac Signs'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {compatibleSigns.map((sign) => (
                  <div key={sign} className="bg-[#FFB800]/5 p-6 rounded-lg border border-[#FFB800]/20">
                    <h4 className="text-[#FFD700] text-lg mb-3 font-serif">{sign}</h4>
                    <div className="space-y-2">
                      {zodiacSigns[sign].map((trait, index) => (
                        <div key={index} className="text-[#FFB800]/80 text-sm">
                          {trait}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'historical' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#FFD700] font-serif">
                {language === 'tr' ? 'Tarihteki İsim Yoldaşları' : 'Historical Namesakes'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {historicalNamemates.map((figure, index) => (
                  <div key={index} className="bg-[#FFB800]/5 p-6 rounded-lg border border-[#FFB800]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <SparklesIcon className="h-5 w-5 text-[#FFD700]" />
                      <h4 className="text-[#FFD700] font-serif">{figure}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 