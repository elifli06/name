import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageIcon, SunIcon, MoonIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import IntroAnimation from './components/IntroAnimation';
import NameSuggestions, { NameAnalysisBoxes } from './components/NameSuggestions';
import DailyHoroscope from './components/DailyHoroscope';
import './App.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { nameCharacteristics, getNameInfo, numerologyMeanings } from './data/nameCharacteristics';

// İsim karakteristikleri doğrudan burada tanımlıyoruz
const localNameCharacteristics = {
  a: "Bağımsızlık, liderlik ve yaratıcılık özelliklerini taşır.",
  b: "Duyarlılık, iş birliği ve diplomatik yetenekleri ifade eder.",
  c: "İfade yeteneği, sosyallik ve iyimserliği simgeler.",
  ç: "Pratiklik, düzen ve detaylara dikkat etme özelliklerini barındırır.",
  d: "Azim, kararlılık ve güçlü bir iradeyi temsil eder.",
  e: "Özgürlük, değişim ve iletişim becerilerini gösterir.",
  f: "Şefkat, yaratıcılık ve sorumluluk duygusunu taşır.",
  g: "Bilgelik, gizemlilik ve içgörü sahibi olmayı ifade eder.",
  h: "Başarı odaklı, hırslı ve disiplinli olmayı temsil eder.",
  ı: "Duyarlılık, hassasiyet ve duygusal derinliği gösterir.",
  i: "Yüksek sezgi, hayal gücü ve idealizmi simgeler.",
  j: "Adalet duygusu, düzen ve organizasyon yeteneğini taşır.",
  k: "Çok yönlülük, uyum sağlama ve iletişim becerilerini barındırır.",
  l: "İfade yeteneği, çekicilik ve sosyal uyum özelliklerini gösterir.",
  m: "Çalışkanlık, güvenilirlik ve pratikliği temsil eder.",
  n: "Yaratıcılık, sezgi ve duygusal hassasiyeti ifade eder.",
  o: "Liderlik, güç ve otorite sahibi olmayı simgeler.",
  ö: "Duyarlılık, empati ve manevi derinliği gösterir.",
  p: "Bilgi arayışı, idealizm ve zihinsel aktiviteyi temsil eder.",
  r: "Pratiklik, sorumluluk duygusu ve güvenilirliği barındırır.",
  s: "Duygusal güç, cesaret ve kararlılığı ifade eder.",
  ş: "Yardımseverlik, fedakarlık ve şefkati simgeler.",
  t: "Yaratıcılık, dışa dönüklük ve coşkuyu gösterir.",
  u: "Sezgisel güç, duyarlılık ve uyum yeteneğini taşır.",
  ü: "İçsel huzur, denge ve uyumu temsil eder.",
  v: "Yaratıcılık, özgürlük ve bağımsızlığı ifade eder.",
  y: "Bağımsızlık, özgür ruh ve macera arayışını simgeler.",
  z: "Analitik düşünce, kararlılık ve yaratıcılığı gösterir."
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [language, setLanguage] = useState('tr');
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [showHoroscopePrompt, setShowHoroscopePrompt] = useState(false);
  const [showHoroscope, setShowHoroscope] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true); // Varsayılan olarak koyu tema
  const [showExitModal, setShowExitModal] = useState(false); // Çıkış modalı için durum
  const resultRef = useRef(null);
  
  // Ekran boyutu için media query
  const [isMobile, setIsMobile] = useState(false);
  
  // Ses efektleri
  const hoverSound = new Audio('/assets/hover.mp3');
  const clickSound = new Audio('/assets/click.mp3');
  const backgroundMusic = new Audio('/assets/mystical-background.mp3.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.3;

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
      suggestions: 'İsim Önerileri',
      exit: 'Çıkış',
      exitMessage: 'Uygulama kapatılıyor...',
      goodbye: 'kendine iyi bak. Herşey gönlünce olsun, sen değerlisin. Hoşçakal!',
      horoscopePrompt: 'Günlük burç yorumuna da bakmak ister misiniz?',
      yes: 'Evet',
      no: 'Hayır'
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
      suggestions: 'Name Suggestions',
      exit: 'Exit',
      exitMessage: 'Closing the application...',
      goodbye: 'take care of yourself. May everything go well for you, you are valuable. Goodbye!',
      horoscopePrompt: 'Would you also like to check your daily horoscope?',
      yes: 'Yes',
      no: 'No'
    }
  };

  const themes = {
    dark: {
      background: 'bg-[#0A0B1A]',
      primaryBg: 'bg-midnight-default/40',
      secondaryBg: 'bg-midnight-light/30',
      inputBg: 'bg-midnight-light/20',
      text: 'text-gold-light',
      accentText: 'text-gold-default',
      border: 'border-gold-default/50',
      lightBorder: 'border-gold/20'
    },
    light: {
      background: 'bg-[#FFF8E7]',
      primaryBg: 'bg-[#FFFBF2]/80',
      secondaryBg: 'bg-[#FFF1D6]/70',
      inputBg: 'bg-[#FFFFFF]',
      text: 'text-[#725A38]',
      accentText: 'text-[#B8860B]',
      border: 'border-[#D4AF37]/60',
      lightBorder: 'border-[#D4AF37]/30'
    }
  };

  const currentTheme = darkTheme ? themes.dark : themes.light;

  // Türk erkek ve kadın isimleri listesi
  const turkishMaleNames = [
    'semih', // Semih'i listenin en başına koyuyorum
    'ahmet', 'ali', 'arif', 'ayhan', 'baran', 'burak', 'can', 'cem', 'cenk', 'cihan', 
    'deniz', 'emre', 'enes', 'ercan', 'erdem', 'eren', 'erkan', 'erol', 'ferhat', 'gökhan', 
    'hakan', 'halil', 'hasan', 'hüseyin', 'ibrahim', 'ilhan', 'ismail', 'kemal', 'kerem', 
    'koray', 'levent', 'mahmut', 'mehmet', 'melih', 'mert', 'mesut', 'murat', 'mustafa', 
    'necati', 'oguz', 'oktay', 'onur', 'orhan', 'osman', 'ömer', 'özcan', 'recep', 'rıza', 
    'selim', 'serkan', 'serhat', 'sinan', 'tahsin', 'talha', 'tayfun', 'tolga', 
    'tuncay', 'turgut', 'ufuk', 'umut', 'ünal', 'volkan', 'yakup', 'yalçın', 'yaşar', 
    'yavuz', 'yunus', 'yusuf', 'zafer'
  ];

  const turkishFemaleNames = [
    'aylin', 'ayla', 'aysel', 'ayşe', 'bahar', 'belgin', 'belma', 'berna', 'betül', 'burcu', 
    'canan', 'ceren', 'ceyda', 'çiğdem', 'deniz', 'derya', 'didem', 'dilek', 'ebru', 'eda', 
    'elif', 'emel', 'emine', 'esra', 'fatma', 'feride', 'figen', 'filiz', 'gamze', 'gizem', 
    'gökçe', 'gül', 'gülşen', 'gülşah', 'hale', 'handan', 'havva', 'hatice', 'hülya', 'ipek', 
    'irmak', 'jale', 'kader', 'leyla', 'mehtap', 'melek', 'meltem', 'meral', 'merve', 'nalan', 
    'nazlı', 'necla', 'nergis', 'nermin', 'nil', 'nilay', 'nilgün', 'nuray', 'özge', 'özlem', 
    'pembe', 'pınar', 'rabia', 'rüya', 'safiye', 'selda', 'selma', 'sema', 'semra', 'seval', 
    'sevda', 'sevgi', 'sevim', 'sevinç', 'sibel', 'sonay', 'şenay', 'şule', 'tuba', 'tülay', 
    'türkan', 'ümran', 'yasemin', 'yeşim', 'yıldız', 'zehra', 'zeynep', 'zübeyde', 'zühal'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (exitAnimation) {
      const timer = setTimeout(() => {
        try {
          // Mobil cihaz kontrolü
          const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          if (isMobileDevice) {
            // Mobil cihazlar için daha nazik bir çıkış stratejisi
            // Sayfa içeriğini gizleme
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 1s';
            
            setTimeout(() => {
              // Beyaz sayfa göster ve animasyonu bitir
              document.body.innerHTML = '';
              document.body.style.background = '#fff';
              document.body.style.opacity = '1';
              
              // Son mesajı göster
              const finalMsg = document.createElement('div');
              finalMsg.style.position = 'fixed';
              finalMsg.style.top = '50%';
              finalMsg.style.left = '50%';
              finalMsg.style.transform = 'translate(-50%, -50%)';
              finalMsg.style.fontFamily = 'Arial, sans-serif';
              finalMsg.style.fontSize = '18px';
              finalMsg.style.color = '#333';
              finalMsg.style.textAlign = 'center';
              finalMsg.innerHTML = language === 'tr' 
                ? 'Uygulamadan çıkıldı. Sayfayı kapatabilirsiniz.<br>Tekrar görüşmek üzere!'
                : 'Successfully exited from application. You can close this page.<br>See you again!';
              document.body.appendChild(finalMsg);
              
              // Exit animasyonunu kaldır
              setExitAnimation(false);
            }, 1000);
          } else {
            // Masaüstü tarayıcılar için strateji
            // Daha nazik bir çıkış deneyimi
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 1s';
            
            setTimeout(() => {
              // Beyaz sayfa göster ve animasyonu bitir
              document.body.innerHTML = '';
              document.body.style.background = '#fff';
              document.body.style.opacity = '1';
              
              // Son mesajı göster
              const finalMsg = document.createElement('div');
              finalMsg.style.position = 'fixed';
              finalMsg.style.top = '50%';
              finalMsg.style.left = '50%';
              finalMsg.style.transform = 'translate(-50%, -50%)';
              finalMsg.style.fontFamily = 'Arial, sans-serif';
              finalMsg.style.fontSize = '18px';
              finalMsg.style.color = '#333';
              finalMsg.style.textAlign = 'center';
              finalMsg.innerHTML = language === 'tr' 
                ? 'Uygulamadan çıkıldı. Sayfayı kapatabilirsiniz.<br>Tekrar görüşmek üzere!'
                : 'Successfully exited from application. You can close this page.<br>See you again!';
              document.body.appendChild(finalMsg);
              
              // Exit animasyonunu kaldır
              setExitAnimation(false);
            }, 1000);
            
            // window.close() tarayıcı engellediğinde hata göstermeden sessizce devam et
            try {
              setTimeout(() => window.close(), 1500);
            } catch (e) {
              // Hata var ama kullanıcıya göstermeye gerek yok
              console.log("Çıkış engellendi, kullanıcı manuel kapatabilir");
            }
          }
        } catch (error) {
          console.error("Çıkış yapılırken hata:", error);
          setExitAnimation(false);
          // Hata mesajını artık göstermeyelim
        }
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [exitAnimation, language, showExitModal]);

  // Ses çalmak için fonksiyonlar
  const playHoverSound = () => {
    if (!hoverSound) return;
    try {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(e => console.log("Hover ses çalma hatası:", e));
    } catch (error) {
      console.log("Hover ses çalma hatası:", error);
    }
  };

  const playClickSound = () => {
    if (!clickSound) return;
    try {
      clickSound.currentTime = 0;
      clickSound.play().catch(e => console.log("Click ses çalma hatası:", e));
    } catch (error) {
      console.log("Click ses çalma hatası:", error);
    }
  };

  // Arkaplan müziği için useEffect
  useEffect(() => {
    const playBackgroundMusic = () => {
      if (!backgroundMusic) return;
      try {
        backgroundMusic.play().catch(e => {
          console.log("Arkaplan müziği çalma hatası:", e);
          // Ses çalınamazsa da devam et
        });
      } catch (error) {
        console.log("Arkaplan müziği çalma hatası:", error);
      }
    };

    // Dokunma olayını da dinle (mobil cihazlar için)
    const handleUserInteraction = () => {
      playBackgroundMusic();
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (backgroundMusic) {
        try {
          backgroundMusic.pause();
        } catch (error) {
          console.log("Arkaplan müziği durdurma hatası:", error);
        }
      }
    };
  }, []);

  // İsim işleme süreci - nameCharacteristics import'undan alınan verileri kullanalım
  const handleSearch = () => {
    if (analyzing) return;

    try {
      playClickSound(); // Arama butonuna tıklandığında ses çal
      
      // Inputu temizleyelim ve küçük harfe çevirelim
      const cleanedName = searchTerm.trim().toLowerCase();
      
      if (!cleanedName) return;
      
      // Minimum ve maksimum uzunluk kontrolü
      if (cleanedName.length < 2) {
        alert(language === 'tr' ? 'İsim en az 2 karakter olmalıdır.' : 'Name should be at least 2 characters.');
        return;
      }
      
      if (cleanedName.length > 30) {
        alert(language === 'tr' ? 'İsim en fazla 30 karakter olmalıdır.' : 'Name should be maximum 30 characters.');
        return;
      }

      // Geçerli karakterler için regex kontrolü (sadece harfler ve boşluk)
      const validNameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
      if (!validNameRegex.test(cleanedName)) {
        alert(language === 'tr' ? 'İsim sadece harflerden oluşmalıdır.' : 'Name should contain only letters.');
        return;
      }
      
      // Intro animasyonunu kısa süreliğine göster
      setShowIntro(true);
      setTimeout(() => {
        setShowIntro(false);
      }, 3000);
      
      // Analiz ediliyor durumunu aktifleştir
      setAnalyzing(true);
      
      const firstLetter = cleanedName.charAt(0).toLowerCase();
      
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
          ğ: ['Ü', 'L', 'E'],
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
        // İsim analizi işlemi
        console.log("İsim analizi başlatılıyor:", cleanedName);
        
        // Özel durum: Eğer isim "semih" ise
        if (cleanedName === "semih") {
          setResult({
            name: cleanedName,
            characteristics: {
              description: language === 'tr' 
                ? "Semih ismi, sahibine özel özelliklere sahiptir. Bu isim taşıyıcısına zekâ, yaratıcılık ve güçlü bir sosyal algı sağlar."
                : "The name Semih has special characteristics for its bearer. This name provides its carrier with intelligence, creativity and a strong social perception.",
              traits: ['A', 'D', 'M']
            },
            energy: 85,
            numerology: getNameInfo(cleanedName, language).numerology
          });
        } 
        // Normal isim analizi
        else {
          // Her zaman bir karakter analizi sonucu dönmesini sağlayalım
          // Önce local'de sonra import edilen name karakteristiklerde kontrol et
          const characterDescription = localNameCharacteristics[firstLetter] || nameCharacteristics[firstLetter] || 
              (language === 'tr' 
                ? "Özgün, yaratıcı ve iletişim becerisi yüksek karakter özellikleri gösterir."
                : "Shows original, creative and high communication skill character traits.");
          
          // Numeroloji bilgisini al
          const nameInfo = getNameInfo(cleanedName, language);
          
          // Sonuç oluştur
          setResult({
            name: cleanedName,
            characteristics: {
              description: language === 'tr' 
                ? `${cleanedName} ismi, ${characterDescription.toLowerCase()}`
                : `The name ${cleanedName}, ${characterDescription.toLowerCase()}`,
              traits: getCompatibleLetters(firstLetter)
            },
            energy: Math.floor(Math.random() * 41) + 60, // 60-100 arası rastgele enerji
            numerology: nameInfo.numerology
          });
        }
        
        // Analiz tamamlandı
        setAnalyzing(false);
        setShowHoroscopePrompt(true);
      }, 5000);
      
    } catch (error) {
      console.error("Arama hatası:", error);
      alert(language === 'tr' ? 'İsim analiz edilirken bir hata oluştu.' : 'An error occurred while analyzing the name.');
      setAnalyzing(false);
    }
  };

  const handleExit = () => {
    playClickSound(); // Çıkış butonuna tıklandığında ses çal
    setExitAnimation(true);
  };

  const handleExitAfterRating = () => {
    setShowExitModal(false);
    setTimeout(() => {
      setExitAnimation(true);
    }, 300);
  };

  const handleShare = async (platform) => {
    try {
      const shareText = language === 'tr' 
        ? `${result.name} isminin analizi:\n${result.characteristics.description}\n\nUyumlu Harfler: ${result.characteristics.traits.join(', ')}`
        : `Analysis of the name ${result.name}:\n${result.characteristics.description}\n\nCompatible Letters: ${result.characteristics.traits.join(', ')}`;
      
      const shareUrl = window.location.href;
      const shareTitle = language === 'tr' ? 'İsim Analizi' : 'Name Analysis';

      switch(platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`, '_blank');
          break;
        case 'instagram':
          // Instagram doğrudan paylaşım API'si olmadığı için kopyala-yapıştır yöntemi
          navigator.clipboard.writeText(shareText).catch(err => {
            // Kopyalama başarısız olursa alert ile uyar
            alert(language === 'tr' 
              ? 'Metin otomatik kopyalanamadı. Lütfen aşağıdaki metni manuel olarak kopyalayın:\n\n' + shareText 
              : 'Text could not be copied automatically. Please copy the text manually:\n\n' + shareText);
          });
          alert(language === 'tr' ? 'Instagram için metin kopyalandı. Şimdi Instagram\'a gidip yapıştırabilirsiniz!' : 'Text copied for Instagram. Now you can go to Instagram and paste it!');
          break;
        case 'native':
          if (navigator.share) {
            try {
              await navigator.share({
                title: shareTitle,
                text: shareText,
                url: shareUrl
              });
            } catch (err) {
              console.log('Paylaşım iptal edildi');
              // Hata durumunda panoya kopyala
              navigator.clipboard.writeText(shareText).catch(() => {
                alert(language === 'tr' 
                  ? 'Metin kopyalanamadı. Lütfen manuel olarak kopyalayın:\n\n' + shareText 
                  : 'Text could not be copied. Please copy manually:\n\n' + shareText);
              });
            }
          } else {
            navigator.clipboard.writeText(shareText).catch(() => {
              alert(language === 'tr' 
                ? 'Metin kopyalanamadı. Lütfen manuel olarak kopyalayın:\n\n' + shareText 
                : 'Text could not be copied. Please copy manually:\n\n' + shareText);
            });
            alert(language === 'tr' ? 'Sonuçlar panoya kopyalandı!' : 'Results copied to clipboard!');
          }
          break;
        default:
          navigator.clipboard.writeText(shareText).catch(() => {
            alert(language === 'tr' 
              ? 'Metin kopyalanamadı. Lütfen manuel olarak kopyalayın:\n\n' + shareText 
              : 'Text could not be copied. Please copy manually:\n\n' + shareText);
          });
          alert(language === 'tr' ? 'Sonuçlar panoya kopyalandı!' : 'Results copied to clipboard!');
      }
    } catch (error) {
      console.error("Paylaşım sırasında hata:", error);
      alert(language === 'tr' 
        ? 'Paylaşım sırasında bir hata oluştu.' 
        : 'An error occurred during sharing.');
    }
  };

  const toggleTheme = () => {
    try {
      playClickSound(); // Tema değiştirme butonuna tıklandığında ses çal
      setDarkTheme(prev => !prev);
    } catch (error) {
      console.error("toggleTheme fonksiyonunda hata:", error);
      // Ses çalınamazsa da temayı değiştir
      setDarkTheme(prev => !prev);
    }
  };

  // PDF olarak indir
  const downloadPDF = async () => {
    if (resultRef.current) {
      try {
        const canvas = await html2canvas(resultRef.current, {
          scale: 2,
          backgroundColor: darkTheme ? '#0A0B1A' : '#F5F3EB',
          logging: false,
          useCORS: true
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 210; 
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${searchTerm}_isim_analizi.pdf`);
        
        alert(language === 'tr' 
          ? 'İsim analizi PDF olarak indirildi!' 
          : 'Name analysis has been downloaded as PDF!');
      } catch (error) {
        console.error('PDF indirme hatası:', error);
        alert(language === 'tr' 
          ? 'PDF indirme sırasında bir hata oluştu. Lütfen tekrar deneyin.' 
          : 'An error occurred while downloading the PDF. Please try again.');
      }
    }
  };

  // Promptu kapatmak için
  const handleHoroscopePromptClose = (choice) => {
    try {
      playClickSound();
      setShowHoroscopePrompt(false);
      
      // Kullanıcı "evet" derse burç yorumunu göster
      if (choice === 'yes') {
        // Kısa bir gecikme ekleyerek UI geçişinin daha pürüzsüz olmasını sağla
        setTimeout(() => {
          setShowHoroscope(true);
        }, 300);
      }
    } catch (error) {
      console.error("handleHoroscopePromptClose fonksiyonunda hata:", error);
      setShowHoroscopePrompt(false);
    }
  };

  // Burç yorumu modalini kapatmak için
  const handleHoroscopeClose = () => {
    try {
      setShowHoroscope(false);
    } catch (error) {
      console.error("handleHoroscopeClose fonksiyonunda hata:", error);
      setShowHoroscope(false);
    }
  };

  const toggleLanguage = () => {
    try {
      playClickSound(); // Dil değiştirme butonuna tıklandığında ses çal
      setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
    } catch (error) {
      console.error("toggleLanguage fonksiyonunda hata:", error);
      // Ses çalınamazsa da dili değiştir
      setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
    }
  };

  // Ekran boyutunu izleyen useEffect
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px'den küçük ekranları mobil olarak kabul et
    };
    
    checkIsMobile(); // İlk yükleme kontrolü
    
    // Boyut değişikliklerini dinle
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Değerlendirme yıldızına tıklama işlevi
  const handleRating = (star) => {
    alert(language === 'tr' 
      ? `Değerlendirmeniz için teşekkürler! ${star}/5 puan verdiniz.` 
      : `Thank you for your rating! You gave ${star}/5 stars.`);
    
    // Değerlendirme sonrası çıkış modalını göster
    setShowExitModal(true);
    // 2 saniye sonra değerlendirme sonrası çıkış yap
    setTimeout(() => {
      handleExitAfterRating();
    }, 2000);
  };

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${currentTheme.background} relative`}>
      {/* Arka plan minik rastgele yıldızlar */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-gold-light rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 3px 1px rgba(255, 215, 0, 0.3)'
            }}
          />
        ))}
      </div>

      {/* Kuş tüyü çıkış butonu */}
      <motion.button
        className="fixed z-50 bottom-5 right-5 w-12 h-12 bg-midnight-light/40 hover:bg-midnight-light/60 backdrop-blur-sm text-gold-default rounded-full flex items-center justify-center border border-gold-default/30 hover:border-gold-default/80 shadow-lg hover:shadow-gold-default/20 transition-all"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExit}
        title={language === 'tr' ? 'Çıkış' : 'Exit'}
      >
        {/* Kuş tüyü ikonu */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
          <line x1="16" y1="8" x2="2" y2="22"></line>
          <line x1="17.5" y1="15" x2="9" y2="15"></line>
        </svg>
      </motion.button>

      {/* Çıkış animasyonu */}
      <AnimatePresence>
        {exitAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight-default z-50 flex flex-col items-center justify-center"
          >
            {/* Uçan kuş tüyü animasyonu */}
            <motion.div
              initial={{ 
                opacity: 0,
                scale: 0.5,
                x: -100,
                y: 100,
                rotate: -30
              }}
              animate={{ 
                opacity: [0, 1, 1, 0.7, 0], 
                scale: [0.5, 1, 1.2, 1, 0.8],
                x: [-100, 0, 100, 200, 300],
                y: [100, 0, -50, -100, -200],
                rotate: [-30, 0, 10, 20, 45]
              }}
              transition={{ 
                duration: 4,
                times: [0, 0.2, 0.5, 0.8, 1],
                ease: "easeInOut"
              }}
              className="absolute text-gold-default"
            >
              {/* Kuş tüyü görsel */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </motion.div>
            
            <div className="bg-midnight-light/20 backdrop-blur-lg border border-gold-default/30 rounded-xl p-8 flex flex-col items-center max-w-md mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl font-cinzel text-gold-default mb-6 text-center"
              >
                {translations[language].exitMessage}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-xl font-cormorant text-gold-light text-center px-4 leading-relaxed"
              >
                {searchTerm ? `${searchTerm}, ${translations[language].goodbye}` : translations[language].goodbye}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* İntro animasyonu */}
      <AnimatePresence>
        {showIntro && <IntroAnimation searchTerm={searchTerm} />}
      </AnimatePresence>

      {/* Ana içerik */}
      <div className="min-h-screen flex flex-col relative z-10">
        {/* Dil değiştirme ve tema değiştirme butonları */}
        <div className="absolute top-5 right-5 flex space-x-2 z-30">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            onMouseEnter={playHoverSound}
            className={`rounded-full p-2 ${currentTheme.inputBg} ${currentTheme.border} border backdrop-blur-sm transition-colors duration-300`}
            aria-label={language === 'tr' ? 'İngilizce\'ye geç' : 'Switch to Turkish'}
          >
            <LanguageIcon className={`h-5 w-5 ${currentTheme.text}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            onMouseEnter={playHoverSound}
            className={`rounded-full p-2 ${currentTheme.inputBg} ${currentTheme.border} border backdrop-blur-sm transition-colors duration-300`}
            aria-label={darkTheme ? 'Açık temaya geç' : 'Koyu temaya geç'}
          >
            {darkTheme ? (
              <SunIcon className={`h-5 w-5 ${currentTheme.text}`} />
            ) : (
              <MoonIcon className={`h-5 w-5 ${currentTheme.text}`} />
            )}
          </motion.button>
        </div>
        
        {/* Başlık ve arama kutusu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center justify-center pt-20 md:pt-32 px-4"
        >
          <h1 className={`text-4xl md:text-5xl font-cinzel mb-3 text-center animate-glow ${currentTheme.accentText}`}>
            {translations[language].title}
          </h1>
          <p className={`text-lg md:text-xl font-cormorant mb-12 text-center ${currentTheme.text}`}>
            {translations[language].subtitle}
          </p>
          
          <div className="w-full max-w-md mx-auto">
            <div className="flex flex-col md:flex-row justify-center w-full gap-3">
              <motion.input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={translations[language].searchPlaceholder}
                className={`px-4 py-3 rounded-xl ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.border} border focus:outline-none focus:ring-2 focus:ring-gold-default/50 backdrop-blur-sm flex-grow font-cormorant text-lg md:text-xl placeholder-gold-light/50`}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                disabled={analyzing}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              
              <motion.button
                onClick={handleSearch}
                disabled={analyzing}
                className={`px-6 py-3 rounded-xl ${currentTheme.secondaryBg} ${currentTheme.accentText} ${currentTheme.border} border hover:bg-gold-default/10 backdrop-blur-sm font-cinzel text-lg md:text-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed md:ml-2 mt-2 md:mt-0`}
                whileHover={{ scale: analyzing ? 1 : 1.05 }}
                whileTap={{ scale: analyzing ? 1 : 0.95 }}
                onMouseEnter={playHoverSound}
              >
                {analyzing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gold-default" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'tr' ? 'Analiz Ediliyor...' : 'Analyzing...'}
                  </div>
                ) : (
                  translations[language].analyze
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Sonuç bölümü */}
        <AnimatePresence>
          {result && !analyzing && !exitAnimation && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="mt-12 mb-20 w-full max-w-4xl mx-auto px-4"
              ref={resultRef}
            >
              {result.message ? (
                // Hata mesajı varsa göster
                <motion.div
                  className={`${currentTheme.primaryBg} ${currentTheme.border} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm mb-6`}
                >
                  <h2 className={`text-2xl font-cinzel mb-4 ${currentTheme.accentText} text-center`}>
                    {language === 'tr' ? 'Bilgilendirme' : 'Information'}
                  </h2>
                  <p className={`${currentTheme.text} text-center text-lg font-cormorant`}>
                    {result.message}
                  </p>
                </motion.div>
              ) : (
                // Analiz sonuçlarını göster
                <div className="space-y-6">
                  {/* İsim analizi kartı */}
                  <NameAnalysisBoxes
                    name={result.name}
                    characteristics={result.characteristics ? result.characteristics.description : ""}
                    traits={result.characteristics ? result.characteristics.traits : []}
                    energy={result.energy || 75}
                    numerology={result.numerology || 0}
                    language={language}
                    theme={currentTheme}
                  />
                  
                  {/* Aksiyon butonları - İndir ve Paylaş */}
                  <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {/* PDF indirme butonu */}
                    <motion.button
                      onClick={downloadPDF}
                      className={`flex items-center px-5 py-3 rounded-lg ${currentTheme.secondaryBg} ${currentTheme.accentText} ${currentTheme.border} border hover:bg-gold-default/10 backdrop-blur-sm font-cinzel text-base transition-colors duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={playHoverSound}
                      aria-label={language === 'tr' ? 'PDF olarak indir' : 'Download as PDF'}
                    >
                      <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                      {language === 'tr' ? 'PDF İndir' : 'Download PDF'}
                    </motion.button>
                    
                    {/* Native Paylaşım butonu */}
                    <motion.button
                      onClick={() => handleShare('native')}
                      className={`flex items-center px-5 py-3 rounded-lg ${currentTheme.secondaryBg} ${currentTheme.accentText} ${currentTheme.border} border hover:bg-gold-default/10 backdrop-blur-sm font-cinzel text-base transition-colors duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={playHoverSound}
                      aria-label={language === 'tr' ? 'Sonuçları paylaş' : 'Share results'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      {translations[language].share}
                    </motion.button>
                  </div>
                  
                  {/* Sosyal medya paylaşım butonları */}
                  <div className="flex justify-center flex-wrap gap-3 mt-4">
                    {/* WhatsApp */}
                    <motion.button
                      onClick={() => handleShare('whatsapp')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center p-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 rounded-full transition-all border border-[#25D366]/30"
                      aria-label="WhatsApp"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366]">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </motion.button>
                  
                    {/* Facebook */}
                    <motion.button
                      onClick={() => handleShare('facebook')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center p-2 bg-[#3b5998]/20 hover:bg-[#3b5998]/30 rounded-full transition-all border border-[#3b5998]/30"
                      aria-label="Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-[#3b5998]">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </motion.button>

                    {/* Instagram */}
                    <motion.button
                      onClick={() => handleShare('instagram')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center p-2 bg-[#E1306C]/20 hover:bg-[#E1306C]/30 rounded-full transition-all border border-[#E1306C]/30"
                      aria-label="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-[#E1306C]">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                    </motion.button>

                    {/* LinkedIn */}
                    <motion.button
                      onClick={() => handleShare('linkedin')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center p-2 bg-[#0077b5]/20 hover:bg-[#0077b5]/30 rounded-full transition-all border border-[#0077b5]/30"
                      aria-label="LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-[#0077b5]">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* İsim önerileri bölümü */}
                  <NameSuggestions 
                    name={result.name}
                    language={language}
                    theme={currentTheme}
                    maleNames={turkishMaleNames}
                    femaleNames={turkishFemaleNames}
                    isMobile={isMobile}
                  />
                  
                  {/* Değerlendirme Yıldızları */}
                  <div className={`${currentTheme.primaryBg} ${currentTheme.border} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm mt-8`}>
                    <h3 className={`text-xl font-cinzel mb-4 ${currentTheme.accentText} text-center`}>
                      {language === 'tr' ? 'Analizi Değerlendir' : 'Rate this Analysis'}
                    </h3>
                    
                    <div className="flex justify-center space-x-3 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          onClick={() => handleRating(star)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="focus:outline-none"
                        >
                          <motion.span
                            animate={{
                              textShadow: [
                                "0 0 5px rgba(255, 215, 0, 0.3)",
                                "0 0 15px rgba(255, 215, 0, 0.7)",
                                "0 0 5px rgba(255, 215, 0, 0.3)"
                              ]
                            }}
                            transition={{
                              duration: 2 + (star * 0.3),
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className={`text-3xl ${currentTheme.accentText} hover:text-gold-default`}
                          >
                            ★
                          </motion.span>
                        </motion.button>
                      ))}
                    </div>
                    
                    <p className={`text-center text-sm ${currentTheme.text}`}>
                      {language === 'tr' 
                        ? 'Görüş ve önerileriniz için teşekkürler!' 
                        : 'Thank you for your feedback and suggestions!'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Burç yorumu prompt'u */}
        <AnimatePresence>
          {showHoroscopePrompt && !showHoroscope && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed left-1/4 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-40 w-11/12 max-w-md"
            >
              <div className={`${currentTheme.primaryBg} ${currentTheme.border} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-md`}>
                <h3 className={`text-xl font-cinzel mb-4 ${currentTheme.accentText} text-center`}>
                  {translations[language].horoscopePrompt}
                </h3>
                
                <div className="flex justify-center space-x-4 mt-6">
                  <motion.button
                    onClick={() => handleHoroscopePromptClose('yes')}
                    className={`px-5 py-2 rounded-lg ${currentTheme.secondaryBg} ${currentTheme.accentText} ${currentTheme.border} border hover:bg-gold-default/10 backdrop-blur-sm font-cinzel transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={playHoverSound}
                  >
                    {translations[language].yes}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleHoroscopePromptClose('no')}
                    className={`px-5 py-2 rounded-lg ${currentTheme.secondaryBg} ${currentTheme.text} ${currentTheme.border} border hover:bg-midnight-light/50 backdrop-blur-sm font-cinzel transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={playHoverSound}
                  >
                    {translations[language].no}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Burç yorumu */}
        <AnimatePresence>
          {showHoroscope && (
            <DailyHoroscope 
              onClose={handleHoroscopeClose} 
              language={language}
              theme={currentTheme}
              isMobile={isMobile}
              position="left-center"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Hareketli yıldız */}
      <motion.div
        animate={{
          y: [0, -10, 0, 10, 0],
          x: [0, 10, 0, -10, 0],
          opacity: [0.2, 0.8, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`fixed bottom-10 left-10 w-2 h-2 rounded-full ${currentTheme.accentText}`}
        style={{ boxShadow: '0 0 8px 2px rgba(255, 215, 0, 0.6)' }}
      />
      
      {/* Footer bilgisi - Düzeltilmiş pozisyon ve stil */}
      <div className="w-full py-3 border-t border-gold-default/20 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <p className={`text-xs md:text-sm ${currentTheme.text}`}>
              Created by @elif cerav 2025
            </p>
          </div>
        </div>
      </div>

      {/* Çıkış Değerlendirme Modalı */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight-default/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${currentTheme.primaryBg} p-6 rounded-xl border ${currentTheme.border} shadow-lg max-w-md w-full`}
            >
              <h3 className="text-xl font-cinzel text-gold-default mb-4 text-center">
                {language === 'tr' ? 'Çıkış Yapılıyor' : 'Exiting'}
              </h3>
              
              <p className={`text-center mb-6 ${currentTheme.text}`}>
                {language === 'tr' 
                  ? 'Değerlendirmeniz için teşekkürler. Hizmetimizi geliştirmemize yardımcı oldunuz.' 
                  : 'Thank you for your rating. You helped us improve our service.'}
              </p>
              
              <div className="flex justify-center">
                <motion.button
                  onClick={() => setShowExitModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-lg ${currentTheme.secondaryBg} ${currentTheme.accentText} ${currentTheme.border} border hover:bg-gold-default/10 backdrop-blur-sm font-cinzel transition-colors duration-300`}
                >
                  {language === 'tr' ? 'Kapat' : 'Close'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Melek Emojisi */}
      <div className="floating-angel">👼</div>
    </div>
  );
}

export default App;

// Created by Elif Cerav 2024. Tüm hakları saklıdır. 