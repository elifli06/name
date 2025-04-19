// Burçlar için veri dosyası
// Her burç için emoji simgesi, element, gezegen, renk ve özellikler

const zodiacData = {
  tr: {
    koc: {
      id: "koc",
      name: "Koç",
      symbol: "♈",
      emoji: "🔥",
      element: "Ateş",
      ruling_planet: "Mars",
      colors: ["Kırmızı", "Turuncu"],
      traits: ["Liderlik", "Hırs", "Cesaret", "Enerji", "Rekabetçilik"],
      strengths: ["Kararlılık", "Spontanelik", "Özgüven", "Motivasyon"],
      weaknesses: ["Sabırsızlık", "İnatçılık", "Dürtüsellik"],
      description: "Koç burcu, ateş elementinin etkisiyle enerjik ve tutkulu bir yapıya sahiptir. Yönetici gezegeni Mars'ın etkisiyle cesur ve kararlıdır. Liderlik etmeyi sever ve yeni zorluklardan kaçınmaz."
    },
    boga: {
      id: "boga",
      name: "Boğa",
      symbol: "♉",
      emoji: "🌱",
      element: "Toprak",
      ruling_planet: "Venüs",
      colors: ["Yeşil", "Pembe"],
      traits: ["Kararlılık", "Güvenilirlik", "Sabır", "Pratiklik", "Sadakat"],
      strengths: ["Güçlü irade", "Dayanıklılık", "Sakinlik", "Duyarlılık"],
      weaknesses: ["İnatçılık", "Sahiplenme", "Değişime direnç"],
      description: "Boğa burcu, toprak elementinin etkisiyle pratik ve kararlı bir yapıya sahiptir. Yönetici gezegeni Venüs'ün etkisiyle sanat, güzellik ve konfora düşkündür. Güvenlik ve istikrar onlar için önceliklidir."
    },
    ikizler: {
      id: "ikizler",
      name: "İkizler",
      symbol: "♊",
      emoji: "💬",
      element: "Hava",
      ruling_planet: "Merkür",
      colors: ["Sarı", "Açık Mavi"],
      traits: ["Uyarlanabilirlik", "İletişim", "Merak", "Çok yönlülük", "Zeka"],
      strengths: ["Öğrenme yeteneği", "Esneklik", "İfade gücü", "Sosyallik"],
      weaknesses: ["Dikkatsizlik", "Tutarsızlık", "Kararsızlık"],
      description: "İkizler burcu, hava elementinin etkisiyle iletişime açık ve hızlı düşünebilen bir yapıya sahiptir. Yönetici gezegeni Merkür'ün etkisiyle bilgiye aç ve meraklıdır. Çok yönlü ve uyumludur."
    },
    yengec: {
      id: "yengec",
      name: "Yengeç",
      symbol: "♋",
      emoji: "🌊",
      element: "Su",
      ruling_planet: "Ay",
      colors: ["Gümüş", "Beyaz"],
      traits: ["Duygusallık", "Şefkat", "Koruyuculuk", "Sadakat", "Sezgisellik"],
      strengths: ["Empati", "Anlayış", "Fedakarlık", "İçgüdüsel kavrayış"],
      weaknesses: ["Aşırı hassasiyet", "Değişken ruh hali", "Kendini soyutlama"],
      description: "Yengeç burcu, su elementinin etkisiyle duygusal ve sezgisel bir yapıya sahiptir. Yönetici gezegeni Ay'ın etkisiyle duygu değişimleri yaşayabilir. Aile odaklı ve koruyucudur."
    },
    aslan: {
      id: "aslan",
      name: "Aslan",
      symbol: "♌",
      emoji: "👑",
      element: "Ateş",
      ruling_planet: "Güneş",
      colors: ["Altın", "Turuncu"],
      traits: ["Özgüven", "Yaratıcılık", "Cömertlik", "Sadakat", "Liderlik"],
      strengths: ["Cesaret", "Karizma", "Organizasyon yeteneği", "Coşku"],
      weaknesses: ["Kibir", "Hükmetme eğilimi", "İnatçılık"],
      description: "Aslan burcu, ateş elementinin etkisiyle tutkulu ve enerjik bir yapıya sahiptir. Yönetici gezegeni Güneş'in etkisiyle parlak ve dikkat çekicidir. Liderlik etmeyi sever ve cömerttir."
    },
    basak: {
      id: "basak",
      name: "Başak",
      symbol: "♍",
      emoji: "📊",
      element: "Toprak",
      ruling_planet: "Merkür",
      colors: ["Toprak tonları", "Yeşil"],
      traits: ["Analitik zeka", "Detaycılık", "Çalışkanlık", "Mükemmeliyetçilik", "Pratiklik"],
      strengths: ["Problem çözme", "Düzen", "Verimlilik", "Güvenilirlik"],
      weaknesses: ["Eleştirellik", "Aşırı endişe", "Titizlik"],
      description: "Başak burcu, toprak elementinin etkisiyle pratik ve analitik bir yapıya sahiptir. Yönetici gezegeni Merkür'ün etkisiyle detaylara önem verir ve düzenlidir. Yardımsever ve çalışkandır."
    },
    terazi: {
      id: "terazi",
      name: "Terazi",
      symbol: "♎",
      emoji: "⚖️",
      element: "Hava",
      ruling_planet: "Venüs",
      colors: ["Pastel mavi", "Pembe"],
      traits: ["Adalet", "Denge", "Diplomatik", "Uyumlu", "Estetik"],
      strengths: ["İkna yeteneği", "İşbirliği", "Zarif", "Barışçıl"],
      weaknesses: ["Kararsızlık", "Çatışmadan kaçınma", "Başkalarına bağımlılık"],
      description: "Terazi burcu, hava elementinin etkisiyle sosyal ve iletişime açık bir yapıya sahiptir. Yönetici gezegeni Venüs'ün etkisiyle güzelliğe ve uyuma önem verir. Adalet duygusu gelişmiştir."
    },
    akrep: {
      id: "akrep",
      name: "Akrep",
      symbol: "♏",
      emoji: "🔮",
      element: "Su",
      ruling_planet: "Plüton",
      colors: ["Koyu kırmızı", "Siyah"],
      traits: ["Tutku", "Kararlılık", "Derinlik", "Gizem", "Sezgisellik"],
      strengths: ["Güçlü irade", "Karizma", "Analitik zeka", "Sezgiler"],
      weaknesses: ["Kıskançlık", "Kontrol ihtiyacı", "Takıntılı olabilme"],
      description: "Akrep burcu, su elementinin etkisiyle duygusal derinliği olan ve sezgisel bir yapıya sahiptir. Yönetici gezegeni Plüton'un etkisiyle dönüşüm ve yenilenme yeteneği vardır. Kararlı ve bağlılığı yüksektir."
    },
    yay: {
      id: "yay",
      name: "Yay",
      symbol: "♐",
      emoji: "🏹",
      element: "Ateş",
      ruling_planet: "Jüpiter",
      colors: ["Mor", "Mavi"],
      traits: ["İyimserlik", "Açık fikirlilik", "Macera", "Felsefe", "Özgürlük"],
      strengths: ["Dürüstlük", "Cömertlik", "Mizah", "Vizyon"],
      weaknesses: ["Sabırsızlık", "Taktir yoksunluğu", "Aşırı idealistlik"],
      description: "Yay burcu, ateş elementinin etkisiyle enerjik ve tutkulu bir yapıya sahiptir. Yönetici gezegeni Jüpiter'in etkisiyle iyimser ve şanslıdır. Özgürlüğüne düşkün, keşfetmeyi seven bireylerdir."
    },
    oglak: {
      id: "oglak",
      name: "Oğlak",
      symbol: "♑",
      emoji: "🏔️",
      element: "Toprak",
      ruling_planet: "Satürn",
      colors: ["Kahverengi", "Gri"],
      traits: ["Disiplin", "Sorumluluk", "Hırs", "Pratiklik", "Sabır"],
      strengths: ["Organizasyon", "Dayanıklılık", "Güvenilirlik", "Azim"],
      weaknesses: ["Aşırı ciddiyet", "Katılık", "Pesimizm"],
      description: "Oğlak burcu, toprak elementinin etkisiyle pratik ve kararlı bir yapıya sahiptir. Yönetici gezegeni Satürn'ün etkisiyle sorumluluk sahibi ve disiplinlidir. Hedeflerine ulaşmak için sabırla çalışır."
    },
    kova: {
      id: "kova",
      name: "Kova",
      symbol: "♒",
      emoji: "⚡",
      element: "Hava",
      ruling_planet: "Uranüs",
      colors: ["Elektrik mavisi", "Gümüş"],
      traits: ["Yenilikçilik", "Bağımsızlık", "Özgünlük", "İnsancıllık", "Akılcılık"],
      strengths: ["Yaratıcılık", "Entelektüellik", "İdealizm", "Sıra dışı düşünme"],
      weaknesses: ["Duygusal uzaklık", "İsyankarlık", "Dağınıklık"],
      description: "Kova burcu, hava elementinin etkisiyle akılcı ve analitik bir yapıya sahiptir. Yönetici gezegeni Uranüs'ün etkisiyle yenilikçi ve öncüdür. Toplumsal konulara duyarlı, özgür düşünceli bireylerdir."
    },
    balik: {
      id: "balik",
      name: "Balık",
      symbol: "♓",
      emoji: "✨",
      element: "Su",
      ruling_planet: "Neptün",
      colors: ["Deniz mavisi", "Mor"],
      traits: ["Sezgisellik", "Duyarlılık", "Hayal gücü", "Yaratıcılık", "Şefkat"],
      strengths: ["Empati", "Sanatsal yetenek", "Sezgiler", "Fedakarlık"],
      weaknesses: ["Dağınıklık", "Kaçış eğilimi", "Aşırı hassasiyet"],
      description: "Balık burcu, su elementinin etkisiyle duygusal ve sezgisel bir yapıya sahiptir. Yönetici gezegeni Neptün'ün etkisiyle hayal gücü kuvvetli ve yaratıcıdır. Şefkatli ve anlayışlıdır."
    }
  },
  en: {
    aries: {
      id: "aries",
      name: "Aries",
      symbol: "♈",
      emoji: "🔥",
      element: "Fire",
      ruling_planet: "Mars",
      colors: ["Red", "Orange"],
      traits: ["Leadership", "Ambition", "Courage", "Energy", "Competitiveness"],
      strengths: ["Determination", "Spontaneity", "Confidence", "Motivation"],
      weaknesses: ["Impatience", "Stubbornness", "Impulsiveness"],
      description: "Aries, influenced by the fire element, has an energetic and passionate nature. Ruled by Mars, they are brave and determined. They love to lead and don't shy away from new challenges."
    },
    taurus: {
      id: "taurus",
      name: "Taurus",
      symbol: "♉",
      emoji: "🌱",
      element: "Earth",
      ruling_planet: "Venus",
      colors: ["Green", "Pink"],
      traits: ["Determination", "Reliability", "Patience", "Practicality", "Loyalty"],
      strengths: ["Strong will", "Endurance", "Calmness", "Sensitivity"],
      weaknesses: ["Stubbornness", "Possessiveness", "Resistance to change"],
      description: "Taurus, influenced by the earth element, has a practical and determined nature. Ruled by Venus, they appreciate art, beauty, and comfort. Security and stability are priorities for them."
    },
    gemini: {
      id: "gemini",
      name: "Gemini",
      symbol: "♊",
      emoji: "💬",
      element: "Air",
      ruling_planet: "Mercury",
      colors: ["Yellow", "Light Blue"],
      traits: ["Adaptability", "Communication", "Curiosity", "Versatility", "Intelligence"],
      strengths: ["Learning ability", "Flexibility", "Expressiveness", "Sociability"],
      weaknesses: ["Restlessness", "Inconsistency", "Indecisiveness"],
      description: "Gemini, influenced by the air element, is open to communication and can think quickly. Ruled by Mercury, they are hungry for knowledge and curious. They are versatile and adaptable."
    },
    cancer: {
      id: "cancer",
      name: "Cancer",
      symbol: "♋",
      emoji: "🌊",
      element: "Water",
      ruling_planet: "Moon",
      colors: ["Silver", "White"],
      traits: ["Emotionality", "Compassion", "Protectiveness", "Loyalty", "Intuition"],
      strengths: ["Empathy", "Understanding", "Self-sacrifice", "Intuitive insight"],
      weaknesses: ["Oversensitivity", "Mood swings", "Self-isolation"],
      description: "Cancer, influenced by the water element, has an emotional and intuitive nature. Ruled by the Moon, they may experience mood changes. They are family-oriented and protective."
    },
    leo: {
      id: "leo",
      name: "Leo",
      symbol: "♌",
      emoji: "👑",
      element: "Fire",
      ruling_planet: "Sun",
      colors: ["Gold", "Orange"],
      traits: ["Confidence", "Creativity", "Generosity", "Loyalty", "Leadership"],
      strengths: ["Courage", "Charisma", "Organizational skills", "Enthusiasm"],
      weaknesses: ["Arrogance", "Domineering tendencies", "Stubbornness"],
      description: "Leo, influenced by the fire element, has a passionate and energetic nature. Ruled by the Sun, they are bright and attention-grabbing. They enjoy leadership and are generous."
    },
    virgo: {
      id: "virgo",
      name: "Virgo",
      symbol: "♍",
      emoji: "📊",
      element: "Earth",
      ruling_planet: "Mercury",
      colors: ["Earth tones", "Green"],
      traits: ["Analytical thinking", "Attention to detail", "Diligence", "Perfectionism", "Practicality"],
      strengths: ["Problem-solving", "Organization", "Efficiency", "Reliability"],
      weaknesses: ["Criticism", "Excessive worry", "Meticulousness"],
      description: "Virgo, influenced by the earth element, has a practical and analytical nature. Ruled by Mercury, they pay attention to details and are organized. They are helpful and hardworking."
    },
    libra: {
      id: "libra",
      name: "Libra",
      symbol: "♎",
      emoji: "⚖️",
      element: "Air",
      ruling_planet: "Venus",
      colors: ["Pastel Blue", "Pink"],
      traits: ["Justice", "Balance", "Diplomatic", "Harmonious", "Aesthetic"],
      strengths: ["Persuasiveness", "Cooperation", "Elegance", "Peacefulness"],
      weaknesses: ["Indecisiveness", "Conflict avoidance", "Dependency on others"],
      description: "Libra, influenced by the air element, has a social and communicative nature. Ruled by Venus, they value beauty and harmony. They have a developed sense of justice."
    },
    scorpio: {
      id: "scorpio",
      name: "Scorpio",
      symbol: "♏",
      emoji: "🔮",
      element: "Water",
      ruling_planet: "Pluto",
      colors: ["Deep Red", "Black"],
      traits: ["Passion", "Determination", "Depth", "Mystery", "Intuition"],
      strengths: ["Strong will", "Charisma", "Analytical mind", "Intuition"],
      weaknesses: ["Jealousy", "Need for control", "Obsessiveness"],
      description: "Scorpio, influenced by the water element, has emotional depth and an intuitive nature. Ruled by Pluto, they have the ability to transform and renew. They are determined and highly committed."
    },
    sagittarius: {
      id: "sagittarius",
      name: "Sagittarius",
      symbol: "♐",
      emoji: "🏹",
      element: "Fire",
      ruling_planet: "Jupiter",
      colors: ["Purple", "Blue"],
      traits: ["Optimism", "Open-mindedness", "Adventure", "Philosophy", "Freedom"],
      strengths: ["Honesty", "Generosity", "Humor", "Vision"],
      weaknesses: ["Impatience", "Lack of tact", "Excessive idealism"],
      description: "Sagittarius, influenced by the fire element, has an energetic and passionate nature. Ruled by Jupiter, they are optimistic and lucky. They are freedom-loving individuals who enjoy exploration."
    },
    capricorn: {
      id: "capricorn",
      name: "Capricorn",
      symbol: "♑",
      emoji: "🏔️",
      element: "Earth",
      ruling_planet: "Saturn",
      colors: ["Brown", "Gray"],
      traits: ["Discipline", "Responsibility", "Ambition", "Practicality", "Patience"],
      strengths: ["Organization", "Resilience", "Reliability", "Perseverance"],
      weaknesses: ["Excessive seriousness", "Rigidity", "Pessimism"],
      description: "Capricorn, influenced by the earth element, has a practical and determined nature. Ruled by Saturn, they are responsible and disciplined. They work patiently to achieve their goals."
    },
    aquarius: {
      id: "aquarius",
      name: "Aquarius",
      symbol: "♒",
      emoji: "⚡",
      element: "Air",
      ruling_planet: "Uranus",
      colors: ["Electric Blue", "Silver"],
      traits: ["Innovation", "Independence", "Originality", "Humanitarianism", "Rationality"],
      strengths: ["Creativity", "Intellectualism", "Idealism", "Unconventional thinking"],
      weaknesses: ["Emotional detachment", "Rebelliousness", "Disorganization"],
      description: "Aquarius, influenced by the air element, has a rational and analytical nature. Ruled by Uranus, they are innovative and pioneering. They are individuals with free thinking who are sensitive to social issues."
    },
    pisces: {
      id: "pisces",
      name: "Pisces",
      symbol: "♓",
      emoji: "✨",
      element: "Water",
      ruling_planet: "Neptune",
      colors: ["Sea Blue", "Purple"],
      traits: ["Intuition", "Sensitivity", "Imagination", "Creativity", "Compassion"],
      strengths: ["Empathy", "Artistic ability", "Intuition", "Self-sacrifice"],
      weaknesses: ["Disorganization", "Escapism", "Oversensitivity"],
      description: "Pisces, influenced by the water element, has an emotional and intuitive nature. Ruled by Neptune, they have a strong imagination and are creative. They are compassionate and understanding."
    }
  }
};

// Günlük burç yorumları için metin veritabanı
const horoscopeTexts = {
  tr: {
    general: [
      "Bugün enerjiniz yüksek olacak ve yeni fırsatlara açık olacaksınız.",
      "Bugün içgörünüz güçlü, sezgilerinize güvenebilirsiniz.",
      "Bugün pratik düşünme yeteneğiniz ön planda olacak.",
      "Bugün yaratıcılığınız zirvede, sanatsal projelere yönelebilirsiniz.",
      "Bugün sosyal ilişkilerinizi güçlendirmek için uygun bir gün."
    ],
    love: [
      "İlişkilerinizde açık iletişim kurmanız önemli olacak.",
      "Sevdiklerinize zaman ayırmak için ideal bir gün.",
      "Duygusal bağlarınızı güçlendirmek için adım atabilirsiniz.",
      "Romantik sürprizler için uygun bir zaman.",
      "İlişkilerinizde dürüstlük ve şeffaflık önem kazanacak."
    ],
    career: [
      "İş hayatınızda yeni projeler başlatmak için uygun bir gün.",
      "Kariyerinizde ilerleme kaydetmek için fırsatlar doğabilir.",
      "İş arkadaşlarıyla işbirliği yapmak başarı getirecek.",
      "Finansal konularda dikkatli kararlar verme zamanı.",
      "Profesyonel becerilerinizi geliştirmek için ideal bir zaman."
    ],
    health: [
      "Fiziksel aktivitelere zaman ayırın, enerjinizi dengeleyecektir.",
      "Stres yönetimi için meditasyon ve nefes egzersizleri yapın.",
      "Beslenme düzeninize dikkat etmek için uygun bir gün.",
      "Sağlık rutinlerinizi gözden geçirmek için ideal bir zaman.",
      "Dinlenmeye ve kendinize zaman ayırmaya özen gösterin."
    ]
  },
  en: {
    general: [
      "Today your energy will be high and you will be open to new opportunities.",
      "Your insight is strong today, you can trust your intuition.",
      "Your practical thinking ability will be at the forefront today.",
      "Your creativity is at its peak today, you can turn to artistic projects.",
      "Today is a good day to strengthen your social relationships."
    ],
    love: [
      "Open communication in your relationships will be important.",
      "An ideal day to spend time with your loved ones.",
      "You can take steps to strengthen your emotional bonds.",
      "A suitable time for romantic surprises.",
      "Honesty and transparency in your relationships will gain importance."
    ],
    career: [
      "A good day to start new projects in your work life.",
      "Opportunities may arise to advance in your career.",
      "Collaborating with colleagues will bring success.",
      "Time to make careful decisions on financial matters.",
      "An ideal time to develop your professional skills."
    ],
    health: [
      "Make time for physical activities, it will balance your energy.",
      "Practice meditation and breathing exercises for stress management.",
      "A good day to pay attention to your diet.",
      "An ideal time to review your health routines.",
      "Take care to rest and take time for yourself."
    ]
  }
};

// Geçmiş burç yorumları için veri
const horoscopeHistory = {};

// Dışa aktarma
export { zodiacData, horoscopeTexts, horoscopeHistory }; 