// İsim özellikleri veri nesnesi
export const nameCharacteristics = {
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

// İsim bilgisi alma fonksiyonu
export const getNameInfo = (name, language = 'tr') => {
  if (!name || typeof name !== 'string') {
    return { 
      error: language === 'tr' ? 'Geçersiz isim' : 'Invalid name',
      numerology: 0 
    };
  }

  // İsmi normalize et
  const normalizedName = name.trim().toLowerCase();
  
  if (normalizedName.length === 0) {
    return { 
      error: language === 'tr' ? 'İsim boş olamaz' : 'Name cannot be empty',
      numerology: 0 
    };
  }
  
  // İlk harfi al
  const firstLetter = normalizedName[0];
  // Türkçe karakterler için normalizasyon
  const letterMap = { 'ı': 'i', 'ö': 'o', 'ü': 'u', 'ğ': 'g', 'ş': 's', 'ç': 'c' };
  const normalizedLetter = letterMap[firstLetter] || firstLetter;
  
  // İsmin sayısal değerini hesapla (basit numeroloji)
  const letterValues = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8, 'ı': 9,
    'ö': 6, 'ü': 3, 'ğ': 7, 'ş': 1, 'ç': 3
  };
  
  // Girilen ismin her harfini doğru sayısal değerlere dönüştür ve topla
  let nameSum = 0;
  for (let char of normalizedName) {
    // Boşlukları atla
    if (char === ' ') continue;
    // Karakter değerini letterValues'dan al, yoksa 0 ekle
    nameSum += letterValues[char] || 0;
  }
  
  // Sayıyı tek basamağa indir (1-9 arası)
  while (nameSum > 9) {
    let sum = 0;
    while (nameSum > 0) {
      sum += nameSum % 10;
      nameSum = Math.floor(nameSum / 10);
    }
    nameSum = sum;
  }

  // Eğer sonuç 0 ise (hiçbir harf tanınmadıysa), 1 olarak belirle
  if (nameSum === 0) {
    nameSum = 1;
  }
  
  // Karakter özelliklerini belirle
  // Eğer harfin özelliği bulunamazsa, varsayılan bir değer kullan
  const firstLetterCharacteristic = nameCharacteristics[firstLetter] || 
    nameCharacteristics[normalizedLetter] || 
    (language === 'tr' ? 
      "Özgün ve yaratıcı kişilik özellikleri gösterir" : 
      "Shows unique and creative personality traits");
  
  return {
    name: normalizedName,
    firstLetter: firstLetter,
    numerology: nameSum,
    characteristics: firstLetterCharacteristic
  };
};

// Harf anlamları
export const letterMeanings = {
  'a': { tr: 'Liderlik ve başlangıç', en: 'Leadership and beginning' },
  'b': { tr: 'İş birliği ve denge', en: 'Cooperation and balance' },
  'c': { tr: 'İfade ve uyum', en: 'Expression and adaptation' },
  'd': { tr: 'Kararlılık ve disiplin', en: 'Determination and discipline' },
  'e': { tr: 'Özgürlük ve iletişim', en: 'Freedom and communication' },
  'f': { tr: 'Uyum ve sorumluluk', en: 'Harmony and responsibility' },
  'g': { tr: 'Bilgelik ve derinlik', en: 'Wisdom and depth' },
  'h': { tr: 'Başarı ve güç', en: 'Achievement and power' },
  'i': { tr: 'Sezgi ve duyarlılık', en: 'Intuition and sensitivity' },
  'j': { tr: 'Adalet ve düzen', en: 'Justice and order' },
  'k': { tr: 'Enerji ve çok yönlülük', en: 'Energy and versatility' },
  'l': { tr: 'İfade ve çekicilik', en: 'Expression and attractiveness' },
  'm': { tr: 'Çalışkanlık ve dayanıklılık', en: 'Diligence and resilience' },
  'n': { tr: 'Yaratıcılık ve hayal gücü', en: 'Creativity and imagination' },
  'o': { tr: 'Liderlik ve güç', en: 'Leadership and power' },
  'p': { tr: 'Bilgelik ve arayış', en: 'Wisdom and quest' },
  'r': { tr: 'Sorumluluk ve güvenilirlik', en: 'Responsibility and reliability' },
  's': { tr: 'Duygusal güç ve cesaret', en: 'Emotional power and courage' },
  't': { tr: 'Yaratıcılık ve coşku', en: 'Creativity and enthusiasm' },
  'u': { tr: 'Sezgi ve uyum', en: 'Intuition and harmony' },
  'v': { tr: 'Yaratıcılık ve özgürlük', en: 'Creativity and freedom' },
  'y': { tr: 'Bağımsızlık ve macera', en: 'Independence and adventure' },
  'z': { tr: 'Analitik düşünce ve kararlılık', en: 'Analytical thinking and determination' }
};

// Numeroloji anlamları
export const numerologyMeanings = {
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
