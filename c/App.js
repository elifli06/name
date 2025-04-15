const handleSearch = () => {
  playClickSound(); // Arama butonuna tıklandığında ses çal
  
  if (!searchTerm.trim() || analyzing) return;
  
  // İsim geçerlilik kontrolü (sadece harf karakterleri ve minimum/maksimum uzunluk)
  const nameValidationRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
  const trimmedName = searchTerm.trim();
  
  if (!nameValidationRegex.test(trimmedName)) {
    alert(language === 'tr' 
      ? 'Lütfen geçerli bir isim giriniz. İsimler sadece harf karakterlerinden oluşmalıdır.' 
      : 'Please enter a valid name. Names should contain only letter characters.');
    return;
  }
  
  if (trimmedName.length < 2) {
    alert(language === 'tr' 
      ? 'İsim en az 2 karakter olmalıdır.' 
      : 'Name should be at least 2 characters.');
    return;
  }
  
  if (trimmedName.length > 30) {
    alert(language === 'tr' 
      ? 'İsim en fazla 30 karakter olmalıdır.' 
      : 'Name should not exceed 30 characters.');
    return;
  }
  
  // Intro animasyonunu kısa süreliğine göster
  setShowIntro(true);
  setTimeout(() => {
    setShowIntro(false);
  }, 3000);
  
  // Analiz ediliyor durumunu aktifleştir
  setAnalyzing(true);
  
  const firstLetter = trimmedName[0].toLowerCase();
  
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
    // İsim analizini basit bir şekilde yap
    console.log("İsim analizi başlatılıyor:", trimmedName);
    
    // İsmin ilk harfi mevcut karakteristik sözlüğünde varsa
    if (nameCharacteristics[firstLetter]) {
      const description = nameCharacteristics[firstLetter];
      
      // Sonuç oluştur - Cinsiyet olmadan
      setResult({
        name: trimmedName,
        characteristics: {
          description: language === 'tr' 
            ? `${trimmedName} ismi, ${description.toLowerCase()}`
            : `The name ${trimmedName}, ${description.toLowerCase()}`,
          traits: getCompatibleLetters(firstLetter)
        },
        energy: Math.floor(Math.random() * 41) + 60 // 60-100 arası rastgele enerji
      });
    } else {
      setResult({
        name: trimmedName,
        message: language === 'tr' ? 'Bu isim veritabanımızda bulunmamaktadır.' : 'This name is not in our database.'
      });
    }
    
    // Analiz tamamlandı
    setAnalyzing(false);
    setShowHoroscopePrompt(true);
  }, 5000);
};

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
  'ayşe', 'fatma', 'hayriye', 'didem', 'melike', 'elif'
]; 