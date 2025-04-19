import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageIcon, SunIcon, MoonIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import IntroAnimation from './components/IntroAnimation';
import NameSuggestions, { NameAnalysisBoxes } from './components/NameSuggestions';
import HoroscopePage from './components/HoroscopePage';
import Header from './components/Header';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import { BrowserRouter as Router } from 'react-router-dom';
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

function AppContent() {
  const { language } = useContext(LanguageContext);
  const [showIntro, setShowIntro] = useState(true);
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
  const clickSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const bgMusicRef = useRef(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  // Ses ayarlarını yerel depolamadan al
  useEffect(() => {
    const soundSetting = localStorage.getItem('sound');
    setIsSoundEnabled(soundSetting === 'true');
  }, []);

  // Ses dosyalarını yükle
  useEffect(() => {
    // Ses dosyalarının doğruluğunu kontrol et
    try {
      // Yalnızca kullanıcı etkinleştirirse sesleri oynat
      if (isSoundEnabled) {
        // Arka plan müziği için
        const bgMusic = new Audio();
        bgMusic.src = '/assets/bg-music.mp3';
        bgMusic.loop = true;
        bgMusic.volume = 0.2;
        bgMusicRef.current = bgMusic;

        // Tıklama sesi için
        const clickSound = new Audio();
        clickSound.src = '/assets/click.mp3';
        clickSound.volume = 0.3;
        clickSoundRef.current = clickSound;

        // Hover sesi için
        const hoverSound = new Audio();
        hoverSound.src = '/assets/hover.mp3';
        hoverSound.volume = 0.1;
        hoverSoundRef.current = hoverSound;
      }
    } catch (err) {
      console.log("Ses dosyalarını yükleme hatası:", err);
    }
  }, [isSoundEnabled]);

  // Kullanıcı etkileşimiyle sesi başlat
  const initializeAudio = () => {
    try {
      if (isSoundEnabled && bgMusicRef.current && !bgMusicRef.current.playing) {
        const playPromise = bgMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Arkaplan müziği çalma hatası:", error);
          });
        }
      }
    } catch (err) {
      console.log("Ses başlatma hatası:", err);
    }
  };

  // Click sesi çal
  const playClickSound = () => {
    try {
      if (isSoundEnabled && clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0;
        const playPromise = clickSoundRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            if (error.name !== "NotAllowedError") {
              console.log("Click ses çalma hatası:", error);
            }
          });
        }
      }
    } catch (err) {
      // Sessiz bir şekilde hatayı yakala
    }
  };

  // Hover sesi çal
  const playHoverSound = () => {
    try {
      if (isSoundEnabled && hoverSoundRef.current) {
        hoverSoundRef.current.currentTime = 0;
        const playPromise = hoverSoundRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            if (error.name !== "NotAllowedError") {
              console.log("Hover ses çalma hatası:", error);
            }
          });
        }
      }
    } catch (err) {
      // Sessiz bir şekilde hatayı yakala
    }
  };

  // Ses ayarını değiştir
  const toggleSound = () => {
    const newSetting = !isSoundEnabled;
    setIsSoundEnabled(newSetting);
    localStorage.setItem('sound', newSetting);
    
    if (newSetting) {
      // Sesi aç
      initializeAudio();
    } else {
      // Sesi kapat
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    }
  };

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
          
          // Her cihaz için aynı çıkış stratejisini kullan, ayrım yapma
          // Sayfa içeriğini gizleme
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 1s';
          
          setTimeout(() => {
            try {
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
              
              // Yeniden yükleme butonu ekle
              const reloadBtn = document.createElement('button');
              reloadBtn.style.marginTop = '20px';
              reloadBtn.style.padding = '10px 20px';
              reloadBtn.style.border = '1px solid #ccc';
              reloadBtn.style.borderRadius = '5px';
              reloadBtn.style.backgroundColor = '#f5f5f5';
              reloadBtn.style.cursor = 'pointer';
              reloadBtn.innerHTML = language === 'tr' ? 'Uygulamaya Geri Dön' : 'Return to Application';
              reloadBtn.onclick = function() {
                window.location.reload();
              };
              
              // Mesajın altına butonu ekle
              finalMsg.appendChild(document.createElement('br'));
              finalMsg.appendChild(document.createElement('br'));
              finalMsg.appendChild(reloadBtn);
            } catch (innerError) {
              console.error("Çıkış sayfası gösterme hatası:", innerError);
              // Hata durumunda sayfayı yeniden yükle
              window.location.reload();
            }
            
            // Exit animasyonunu kaldır
            setExitAnimation(false);
          }, 1000);
        } catch (error) {
          console.error("Çıkış yapılırken hata:", error);
          setExitAnimation(false);
          alert(language === 'tr' 
            ? 'Çıkış sırasında bir hata oluştu. Sayfayı manuel olarak kapatabilirsiniz.' 
            : 'An error occurred during exit. You can close the page manually.');
        }
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [exitAnimation, language]);

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
        
        try {
          // Önce import edilen name karakteristiklerde kontrol et
          const characterDescription = localNameCharacteristics[firstLetter] || 
            // Local'de yoksa varsayılan değer döndür
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
        } catch (error) {
          console.error("İsim analizi sırasında hata:", error);
          
          // Hata durumunda da bir sonuç döndür
          setResult({
            name: cleanedName,
            characteristics: {
              description: language === 'tr' 
                ? `${cleanedName} ismi için bir analiz oluşturuldu.`
                : `An analysis has been created for the name ${cleanedName}.`,
              traits: ['A', 'E', 'İ'] // Varsayılan harfler
            },
            energy: 70, // Varsayılan enerji değeri
            numerology: { number: 5, meaning: language === 'tr' ? 'Değişim ve özgürlük' : 'Change and freedom' }
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
    
    // Mobil cihazlar için PDF indirme ve sosyal medya butonlarını göster
    if (isMobile && result) {
      // Sonuç varsa kullanıcıya mobil butonları göster
      alert(language === 'tr' 
        ? 'Çıkmadan önce, sonuçlarınızı indirmek veya paylaşmak isteyebilirsiniz. Devam etmek için TAMAM\'a tıklayın.' 
        : 'Before leaving, you may want to download or share your results. Click OK to continue.');
      
      // Sayfayı sonuç bölümüne scroll et
      if (resultRef && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
      // 2 saniye sonra çıkış animasyonunu başlat
      setTimeout(() => {
        setExitAnimation(true);
      }, 2000);
    } else {
      // Web için normal çıkış
      setExitAnimation(true);
    }
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

  // handleHoroscopePromptClose fonksiyonunu güncelle
  const handleHoroscopePromptClose = (choice) => {
    setShowHoroscopePrompt(false);
    
    if (choice === 'yes') {
      setShowHoroscope(true);
    }
  };

  // handleHoroscopeClose fonksiyonunu güncelle
  const handleHoroscopeClose = () => {
    setShowHoroscope(false);
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
    <div className={`App min-h-screen font-mystical ${currentTheme.background} transition-colors duration-500`} onClick={initializeAudio}>
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="container mx-auto px-4 py-6 relative">
          <Header 
            playClickSound={playClickSound} 
            toggleSound={toggleSound} 
            isSoundEnabled={isSoundEnabled} 
          />
          
          {/* Ana içerik */}
          <main className="mt-8">
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

                    {/* Yeni eklenen mum ve yıldız mesajı */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.7 }}
                      className="text-2xl font-cinzel text-gold-default mb-4 text-center"
                    >
                      {searchTerm ? `🕯️ ${searchTerm} - Yıldızlar seninle olsun 🕯️` : `🕯️ Yıldızlar seninle olsun 🕯️`}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="text-xl font-cormorant text-gold-light text-center px-4 leading-relaxed"
                    >
                      {searchTerm ? `${searchTerm}, ${translations[language].goodbye}` : translations[language].goodbye}
                    </motion.p>

                    {/* Veda notu - Teşekkür mesajı */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 1 }}
                      className="mt-8 text-center"
                    >
                      <p className="text-gold-light text-lg mb-2">
                        {searchTerm && (
                          <span className="text-gold-default font-bold">
                            {language === 'tr' 
                              ? `${searchTerm}, sen çok değerlisin!` 
                              : `${searchTerm}, you are very valuable!`}
                          </span>
                        )}
                      </p>
                      <p className="text-gold-light text-sm italic">
                        {language === 'tr' 
                          ? "Vaktiniz için teşekkür ederiz, sevgi ve ışıkla yolunuz aydınlık olsun."
                          : "Thank you for your time, may your path be filled with love and light."}
                      </p>
                      <p className="text-gold-light text-sm mt-3">
                        ★ {language === 'tr' ? "Yıldızlar daima sizinle olsun" : "May the stars always be with you"} ★
                      </p>
                    </motion.div>
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
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder={translations[language].searchPlaceholder}
                      className={`px-5 py-3 rounded-xl ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.border} border backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-default/30 w-full text-center md:text-left`}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    <motion.button
                      onClick={handleSearch}
                      onMouseEnter={playHoverSound}
                      className={`px-8 py-3 rounded-xl ${currentTheme.secondaryBg} ${currentTheme.accentText} ${currentTheme.border} border hover:bg-gold-default/10 backdrop-blur-sm font-cinzel transition-colors duration-300 flex-shrink-0`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={analyzing}
                    >
                      {analyzing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gold-default" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {language === 'tr' ? 'Analiz Ediliyor...' : 'Analyzing...'}
                        </span>
                      ) : (
                        translations[language].analyze
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              
              {/* Sonuç bölümü */}
              {result && !analyzing && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-2xl mx-auto px-4 py-8 mt-8"
                  ref={resultRef}
                >
                  <div className={`${currentTheme.primaryBg} backdrop-blur-sm border ${currentTheme.border} rounded-2xl p-6 shadow-lg`}>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h2 className={`text-2xl md:text-3xl font-cinzel mb-6 text-center ${currentTheme.accentText}`}>
                        {result.name}
                      </h2>
                      
                      {result.message ? (
                        <p className={`mb-4 text-center ${currentTheme.text}`}>{result.message}</p>
                      ) : (
                        <>
                          <div className={`${currentTheme.secondaryBg} backdrop-blur-sm border ${currentTheme.lightBorder} rounded-xl p-4 mb-6`}>
                            <h3 className={`text-lg font-cinzel mb-3 ${currentTheme.accentText}`}>
                              {translations[language].characteristics}
                            </h3>
                            <p className={`mb-4 ${currentTheme.text}`}>{result.characteristics.description}</p>
                            
                            {/* Nümeroloji Bilgisi */}
                            {result.numerology && (
                              <div className="mt-4">
                                <h4 className={`text-lg font-cinzel mb-2 ${currentTheme.accentText}`}>
                                  {language === 'tr' ? 'Nümeroloji' : 'Numerology'}
                                </h4>
                                <div className="flex items-center">
                                  <span className={`text-2xl mr-2 ${currentTheme.accentText} font-cinzel`}>
                                    {result.numerology.number}
                                  </span>
                                  <span className={`${currentTheme.text}`}>
                                    - {result.numerology.meaning}
                                  </span>
                                </div>
                              </div>
                            )}
                            
                            {/* Enerji Seviyesi */}
                            <div className="mt-6">
                              <h4 className={`text-lg font-cinzel mb-2 ${currentTheme.accentText}`}>
                                {translations[language].energy}
                              </h4>
                              <div className="w-full h-4 bg-midnight-light/30 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.energy}%` }}
                                  transition={{ delay: 0.5, duration: 1 }}
                                  className="h-full bg-gradient-to-r from-gold-light/70 to-gold-default"
                                />
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className={`text-xs ${currentTheme.text}`}>0</span>
                                <span className={`text-xs ${currentTheme.text}`}>100</span>
                              </div>
                              <p className={`text-center mt-2 ${currentTheme.text}`}>
                                {result.energy}/100
                              </p>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className={`text-lg font-cinzel mb-3 ${currentTheme.accentText}`}>
                              {translations[language].compatibility}
                            </h3>
                            
                            <div className="flex justify-center gap-3 flex-wrap">
                              {result.characteristics.traits.map((trait, index) => (
                                <motion.div 
                                  key={index}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                                  className={`w-14 h-14 ${currentTheme.secondaryBg} backdrop-blur-sm border ${currentTheme.border} rounded-lg flex items-center justify-center`}
                                >
                                  <span className={`text-2xl font-cinzel ${currentTheme.accentText}`}>
                                    {trait}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          {/* PDF İndirme ve Paylaşım Butonları - Mobil cihazlarda da görünecek */}
                          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={downloadPDF}
                              onMouseEnter={playHoverSound}
                              className={`flex items-center justify-center px-4 py-2 rounded-xl ${currentTheme.secondaryBg} backdrop-blur-sm border ${currentTheme.border} transition-colors duration-300 hover:bg-gold-default/10`}
                            >
                              <DocumentArrowDownIcon className={`h-5 w-5 mr-2 ${currentTheme.accentText}`} />
                              <span className={`font-cinzel ${currentTheme.accentText}`}>
                                {language === 'tr' ? 'PDF İndir' : 'Download PDF'}
                              </span>
                            </motion.button>
                            
                            <div className="flex justify-center sm:justify-start gap-2 mt-3 sm:mt-0">
                              {/* Sosyal medya paylaşım butonları */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleShare('whatsapp')}
                                onMouseEnter={playHoverSound}
                                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg"
                                aria-label="WhatsApp'ta Paylaş"
                              >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleShare('facebook')}
                                onMouseEnter={playHoverSound}
                                className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center shadow-lg"
                                aria-label="Facebook'ta Paylaş"
                              >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleShare('instagram')}
                                onMouseEnter={playHoverSound}
                                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FCAF45] via-[#E1306C] to-[#5851DB] flex items-center justify-center shadow-lg"
                                aria-label="Instagram'da Paylaş"
                              >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.053-.059 1.37-.059 4.04 0 2.667.01 2.985.059 4.036.045.977.207 1.505.344 1.858.182.466.399.8.748 1.38.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" fillRule="evenodd" clipRule="evenodd"/>
                                </svg>
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleShare('linkedin')}
                                onMouseEnter={playHoverSound}
                                className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center shadow-lg"
                                aria-label="LinkedIn'de Paylaş"
                              >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                          
                          {/* Değerlendirme Yıldızları - Mobil cihazlarda da görünecek */}
                          <div className="mt-8">
                            <h3 className={`text-lg font-cinzel mb-3 text-center ${currentTheme.accentText}`}>
                              {language === 'tr' ? 'Bizi Değerlendirin' : 'Rate Us'}
                            </h3>
                            <div className="flex justify-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                  key={star}
                                  whileHover={{ scale: 1.2, rotate: 5 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRating(star)}
                                  onMouseEnter={playHoverSound}
                                  className="text-2xl text-gold-default hover:text-gold-light transition-colors"
                                >
                                  ★
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {/* Günlük burç yorumu için soru alanı */}
              <AnimatePresence>
                {showHoroscopePrompt && !showHoroscope && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                  >
                    <div 
                      className="fixed inset-0 bg-black/70 backdrop-blur-sm" 
                      onClick={() => handleHoroscopePromptClose('no')}
                    ></div>
                    <div className={`${darkTheme ? 'bg-midnight-default/95' : 'bg-[#FFFBF2]/95'} ${currentTheme.border} border-2 rounded-xl p-6 shadow-lg backdrop-blur-lg relative w-full max-w-md mx-auto`}>
                      <h3 className={`text-xl font-bold font-cinzel ${currentTheme.accentText} mb-6 text-center`}>
                        {translations[language].horoscopePrompt}
                      </h3>
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                        <motion.button
                          onClick={() => handleHoroscopePromptClose('yes')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full sm:w-auto px-6 py-3 rounded-lg ${darkTheme ? 'bg-gold-default/60 hover:bg-gold-default/80' : 'bg-[#9C7A3C]/70 hover:bg-[#9C7A3C]/90'} ${darkTheme ? 'text-white' : 'text-black'} font-bold ${currentTheme.border} border-2 backdrop-blur-sm font-cinzel transition-colors duration-300 text-center`}
                        >
                          {translations[language].yes}
                        </motion.button>
                        <motion.button
                          onClick={() => handleHoroscopePromptClose('no')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full sm:w-auto px-6 py-3 rounded-lg ${darkTheme ? 'bg-midnight-light/60 hover:bg-midnight-light/80' : 'bg-[#FFF5E0] hover:bg-[#FFF5E0]/80'} ${currentTheme.text} font-medium ${currentTheme.borderLight} border-2 backdrop-blur-sm transition-colors duration-300 text-center`}
                        >
                          {translations[language].no}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Burç sayfası */}
              {showHoroscope && (
                <HoroscopePage 
                  onClose={handleHoroscopeClose} 
                  onExit={handleExit}
                  language={language} 
                  theme={currentTheme}
                />
              )}

              {/* Melek Emojisi */}
              <div className="floating-angel">👼</div>
              
              {/* Footer bilgisi - Web ve Mobil için ayrı yapılar */}
              {isMobile ? (
                // Mobil cihazlar için footer
                <div className="w-full py-3 mt-12 footer-mobile">
                  <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center">
                      <p className="text-xs text-gold-light footer-only-copyright-mobile" style={{opacity: 1, visibility: 'visible'}}>
                        Created by @elif cerav 2025
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Web için footer
                <div className="w-full py-3 mt-12">
                  <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center">
                      <p className="text-sm text-gold-light footer-only-copyright-web" style={{opacity: 1, visibility: 'visible'}}>
                        Created by @elif cerav 2025 | Tüm hakları saklıdır
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App; 