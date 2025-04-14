import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeScreen({ onComplete }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const startJourney = () => {
    setHasInteracted(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0B1A]"
          onClick={startJourney}
        >
          <div className="relative w-full max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="relative"
            >
              <img
                src="/angel.jpg"
                alt="Melek"
                className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1A] to-transparent opacity-50" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-8 text-4xl font-serif text-[#FFD700] tracking-wider"
            >
              Nomen Est Omen
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-4 text-[#FFB800]/80 text-lg"
            >
              İsminizin Kadim Sırlarını Keşfedin
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 2.5, duration: 1.5, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-6 border-2 border-[#FFB800]/40 rounded-full" />
              <div className="w-1 h-8 bg-gradient-to-b from-[#FFB800]/40 to-transparent mx-auto mt-2" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 