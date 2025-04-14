import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import angelImage from '../assets/angel.png'; // Eğer melek resmi assets klasöründeyse bu şekilde import edin

const symbols = ['Σ', 'π', '∞', '∆', 'Ω', '√'];

function IntroAnimation() {
  const [showSymbols, setShowSymbols] = useState(true);
  const audioRef = useRef(null);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSymbols(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (audioRef.current && !audioStarted) {
      audioRef.current.volume = 0.2;
      audioRef.current.play();
      setAudioStarted(true);
    }
  };

  return (
    <AnimatePresence>
      {showSymbols && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-midnight-default z-50"
          onClick={handleClick}
        >
          {/* Gizli ses elementi */}
          <audio ref={audioRef} loop>
            <source src="/assets/mystical-background.mp3.mp3" type="audio/mp3" />
          </audio>

          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Yıldızlı arka plan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-[#0A0B1A] overflow-hidden"
            >
              {/* Parlayan yıldızlar */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                  className="absolute w-1 h-1 bg-gold-light rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: '0 0 4px 1px rgba(255, 215, 0, 0.6)'
                  }}
                />
              ))}
            </motion.div>

            {/* Üç bölümlü içerik */}
            <div className="flex w-full h-full justify-center items-center px-4 md:px-12">
              {/* Sol taraftaki melek görseli */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="w-1/3 flex justify-center items-center"
              >
                <img
                  src="/golden-angel.jpg.png"
                  alt="Melek"
                  className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-lg shadow-gold-default/20"
                />
              </motion.div>
              
              {/* Ortadaki kanat animasyonu */}
              <motion.div
                className="w-1/3 flex flex-col items-center justify-center relative h-full"
              >
                {/* Kanatlar animasyonu */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, rotateY: [0, 10, 0] }}
                  transition={{ 
                    duration: 4, 
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                  }}
                  className="relative w-64 h-64"
                >
                  <div className="flex justify-center">
                    {/* Sol Kanat */}
                    <motion.div
                      initial={{ rotate: -20 }}
                      animate={{ rotate: [-20, -10, -20] }}
                      transition={{ 
                        duration: 3, 
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                      }}
                      className="w-32 h-64 bg-gradient-to-br from-gold-light/90 to-gold-default/50 rounded-full blur-sm transform -rotate-12 origin-bottom"
                      style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)" }}
                    />
                    
                    {/* Sağ Kanat */}
                    <motion.div
                      initial={{ rotate: 20 }}
                      animate={{ rotate: [20, 10, 20] }}
                      transition={{ 
                        duration: 3, 
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                      }}
                      className="w-32 h-64 bg-gradient-to-bl from-gold-light/90 to-gold-default/50 rounded-full blur-sm transform rotate-12 origin-bottom"
                      style={{ clipPath: "polygon(0 0, 100% 50%, 100% 100%, 0 100%)" }}
                    />
                  </div>
                </motion.div>

                {/* Merkez sembol */}
                <motion.div
                  initial={{ scale: 0, rotate: 0, opacity: 0 }}
                  animate={{ scale: 1, rotate: 360, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                  className="absolute"
                >
                  <span className="text-6xl font-cinzel text-gold-default">∞</span>
                </motion.div>

                {/* Dönen semboller */}
                {symbols.map((symbol, index) => (
                  <motion.div
                    key={symbol}
                    initial={{ scale: 0, rotate: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      rotate: 360,
                      opacity: 0.8,
                      x: Math.cos(index * (2 * Math.PI / symbols.length)) * 100,
                      y: Math.sin(index * (2 * Math.PI / symbols.length)) * 100
                    }}
                    transition={{
                      duration: 2,
                      delay: 1 + (index * 0.2),
                      ease: "easeOut"
                    }}
                    className="absolute z-10"
                  >
                    <span className="text-4xl font-cinzel text-gold-light">{symbol}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Sağ taraftaki melek görseli (aynı resim) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="w-1/3 flex justify-center items-center"
              >
                <img
                  src="/golden-angel.jpg.png"
                  alt="Melek"
                  className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-lg shadow-gold-default/20"
                />
              </motion.div>
            </div>

            {/* Işık efekti */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-radial from-gold-default/30 via-transparent to-transparent"
              style={{
                backgroundSize: '120% 120%',
                backgroundPosition: 'center',
              }}
            />

            {/* Başlık ve Hoşgeldiniz mesajı */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-3xl md:text-4xl font-cinzel text-gold-default whitespace-nowrap bg-midnight-default/50 px-6 py-2 rounded-lg"
              >
                Nomen Est Omen
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-4 text-xl font-cinzel text-gold-light bg-midnight-default/50 px-4 py-1 rounded-lg"
              >
                Hoşgeldiniz
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroAnimation; 