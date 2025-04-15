import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DailyHoroscope = ({ name, language, onClose, darkTheme }) => {
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tema renkleri
  const currentTheme = {
    background: darkTheme ? 'bg-midnight-default/80' : 'bg-[#FFF8E7]/90',
    card: darkTheme ? 'bg-midnight-light/30' : 'bg-[#FFFBF2]/80',
    section: darkTheme ? 'bg-midnight-default/30' : 'bg-[#FFF1D6]/70',
    input: darkTheme ? 'bg-midnight-light/20' : 'bg-[#FFFFFF]',
    text: darkTheme ? 'text-gold-light' : 'text-[#725A38]',
    title: darkTheme ? 'text-gold-default' : 'text-[#B8860B]',
    border: darkTheme ? 'border-gold-default/50' : 'border-[#D4AF37]/60',
    borderLight: darkTheme ? 'border-gold-default/20' : 'border-[#D4AF37]/30',
    accent: darkTheme ? 'bg-gold-default/30' : 'bg-[#D4AF37]/30',
    accentHover: darkTheme ? 'hover:bg-gold-default/40' : 'hover:bg-[#D4AF37]/40',
    borderAccent: darkTheme ? 'border-gold-default/40' : 'border-[#D4AF37]/40'
  };

  // Burç listesi
  const zodiacs = {
    tr: [
      { id: 'koc', name: 'Koç' },
      { id: 'boga', name: 'Boğa' },
      { id: 'ikizler', name: 'İkizler' },
      { id: 'yengec', name: 'Yengeç' },
      { id: 'aslan', name: 'Aslan' },
      { id: 'basak', name: 'Başak' },
      { id: 'terazi', name: 'Terazi' },
      { id: 'akrep', name: 'Akrep' },
      { id: 'yay', name: 'Yay' },
      { id: 'oglak', name: 'Oğlak' },
      { id: 'kova', name: 'Kova' },
      { id: 'balik', name: 'Balık' }
    ],
    en: [
      { id: 'aries', name: 'Aries' },
      { id: 'taurus', name: 'Taurus' },
      { id: 'gemini', name: 'Gemini' },
      { id: 'cancer', name: 'Cancer' },
      { id: 'leo', name: 'Leo' },
      { id: 'virgo', name: 'Virgo' },
      { id: 'libra', name: 'Libra' },
      { id: 'scorpio', name: 'Scorpio' },
      { id: 'sagittarius', name: 'Sagittarius' },
      { id: 'capricorn', name: 'Capricorn' },
      { id: 'aquarius', name: 'Aquarius' },
      { id: 'pisces', name: 'Pisces' }
    ]
  };

  // Günlük burç yorumları - Gerçek API çağrısında bu veriler API'den gelecek
  const horoscopeTexts = {
    tr: {
      koc: {
        genel: "Bugün enerjiniz ve cesaretiniz yüksek seviyede. Yeni başlangıçlar için ideal bir gün, liderlik özelliklerinizi kullanacağınız fırsatlar doğabilir. Girişimcilik yönünüz ön plana çıkacak.",
        ask: "Aşk hayatınızda tutkulu ve heyecan verici gelişmeler olabilir. Partnerinize karşı daha açık sözlü olun ve duygularınızı çekinmeden ifade edin. Bekarsanız, yeni tanışacağınız biri ile aranızda güçlü bir çekim olabilir.",
        kariyer: "İş hayatınızda yeni projeler başlatmak için uygun bir zaman. Rekabet ortamında öne çıkabilir, liderlik pozisyonları için kendinizi gösterebilirsiniz. Ancak sabırsızlık ve dürtüsellik konusunda dikkatli olun.",
        saglik: "Fiziksel enerjiniz yüksek, spor ve egzersiz için ideal bir gün. Özellikle rekabetçi sporlar size iyi gelecektir. Baş ağrılarına dikkat edin ve yeterli su içmeyi unutmayın."
      },
      boga: {
        genel: "Bugün kararlılık ve sabır öne çıkıyor. Değerlerinizi ve prensiblerinizi koruma konusunda güçlü bir duruş sergileyebilirsiniz. Maddi konularda şanslı bir gündesiniz.",
        ask: "İlişkinizde güvenlik ve sadakat temaları öne çıkıyor. Partnerinizle daha derin ve anlamlı bağlar kurabilirsiniz. Bekarsanız, ortak değerler paylaştığınız biriyle tanışabilirsiniz.",
        kariyer: "Finansal konularda şanslı bir gündesiniz. Yatırımlar ve uzun vadeli planlar için uygun zaman. İş hayatınızda istikrar ve sürdürülebilirlik sağlayacak adımlar atabilirsiniz.",
        saglik: "Boğaz bölgesine dikkat etmeniz gereken bir gün. Beslenme alışkanlıklarınızı gözden geçirmek ve daha sağlıklı seçimler yapmak için iyi bir zaman. Doğada vakit geçirmek ruhsal dengenizi sağlar."
      },
      ikizler: {
        genel: "İletişim yeteneğiniz ve zekanız bugün daha da parlıyor. Sosyal bağlantılar kurmak ve bilgi alışverişinde bulunmak için ideal bir gün. Merakınız ve öğrenme arzunuz yüksek.",
        ask: "İlişkinizde iletişim ön planda. Partnerinizle entellektüel paylaşımlarda bulunmak ikinize de iyi gelecek. Bekarsanız, zeki ve esprili biriyle tanışabilirsiniz.",
        kariyer: "Yeni fikirler üretmek ve bunları ifade etmek için uygun bir gün. Toplantılarda ve sunumlarda etkileyici olabilirsiniz. İletişim gerektiren projeler veya görevler için ideal.",
        saglik: "Zihinsel aktiviteler için enerjiniz yüksek, ancak aşırı düşünme yüzünden sinir sisteminiz yorulabilir. Derin nefes egzersizleri ve meditasyon zihinsel dengenizi korumaya yardımcı olur."
      },
      yengec: {
        genel: "Duygusal derinliğiniz ve sezgileriniz bugün çok güçlü. Ailenizle ve sevdiklerinizle vakit geçirmek size büyük mutluluk verebilir. İçsel düşüncelerinize ve hislerinize odaklanma zamanı.",
        ask: "İlişkinizde duygusal güvenlik ve şefkat ön planda. Partnerinizle daha derin duygusal bağlar kurabilirsiniz. Bekarsanız, sizi duygusal olarak anlayan biriyle tanışabilirsiniz.",
        kariyer: "İş yerinde sezgilerinizi kullanarak doğru kararlar verebilirsiniz. Bakım, koruma veya destek gerektiren projeler için uygun bir gün. Çalışma ortamınızda daha ev gibi bir his yaratabilirsiniz.",
        saglik: "Duygusal sağlığınıza özen göstermelisiniz. Sindirim sisteminiz hassas olabilir, yediklerinize dikkat edin. Su içmeyi ihmal etmeyin ve duygusal olarak size iyi gelen ortamlarda bulunun."
      },
      aslan: {
        genel: "Yaratıcılığınız ve kendini ifade etme yeteneğiniz bugün öne çıkıyor. Liderlik özellikleriniz sayesinde çevrenizdekiler size hayranlık duyacak. Özgüveniniz yüksek ve ışıldıyorsunuz.",
        ask: "İlişkinizde tutkulu ve romantik bir gün sizi bekliyor. Partnerinize cömert davranın ve sevginizi göstermekten çekinmeyin. Bekarsanız, etkileyici ve karizmatik tavrınız ilgi çekecek.",
        kariyer: "İş hayatınızda parlayacağınız bir gün. Liderlik rollerini üstlenebilir veya yaratıcı projeler başlatabilirsiniz. Kendinizi göstermek ve takdir edilmek için uygun bir zaman.",
        saglik: "Kalp ve sırt bölgenize dikkat edin. Fiziksel aktiviteler ve sportif faaliyetler için iyi bir gün. Kendinizi şımartın ve kişisel bakımınıza özen gösterin."
      },
      basak: {
        genel: "Bugün analitik yetenekleriniz ve pratik zekânız öne çıkıyor. Detaylara odaklanmak ve sistemli çalışmak için ideal bir gün. Hizmet etmek ve faydalı olmak size tatmin duygusu verecek.",
        ask: "İlişkinizde pratik destek ve günlük rutinler önem kazanıyor. Partnerinize küçük yardımlarda bulunun ve hayatını kolaylaştırın. Bekarsanız, ortak ilgi alanlarınız olan biriyle tanışabilirsiniz.",
        kariyer: "İş hayatınızda analitik düşünce ve problem çözme yetenekleriniz öne çıkıyor. Detaylara dikkat ederek projeleri mükemmelleştirebilirsiniz. Organizasyon ve planlama için ideal bir gün.",
        saglik: "Sindirim sisteminize özen göstermelisiniz. Beslenme düzeninizi gözden geçirin ve daha sağlıklı seçimler yapın. Stres yönetimi için düzenli egzersiz ve meditasyon faydalı olacaktır."
      },
      terazi: {
        genel: "Denge ve uyum arayışınız bugün ön planda. İlişkilerinizde ve sosyal çevrenizde harmoni yaratabilirsiniz. Estetik anlayışınız ve güzelliğe olan ilginiz artıyor.",
        ask: "İlişkinizde denge ve karşılıklı anlayış önem kazanıyor. Partnerinizle uzlaşmalar yapabilir ve ilişkinizi güçlendirebilirsiniz. Bekarsanız, zarif ve kibar biriyle tanışabilirsiniz.",
        kariyer: "İş hayatınızda işbirliği ve ortaklıklar önem kazanıyor. Müzakereler ve anlaşmalar için uygun bir gün. Estetik ve tasarım gerektiren projeler için yaratıcılığınız yüksek.",
        saglik: "Böbreklerinize ve bel bölgenize dikkat etmelisiniz. Dengeli bir diyet ve düzenli egzersiz önemli. Stres yönetimi için sanat ve güzellikle ilgili aktiviteler size iyi gelecektir."
      },
      akrep: {
        genel: "Dönüşüm ve derinlik günü yaşıyorsunuz. Sırlar ve derin duygular konusunda sezgileriniz güçlü. Tutku ve yoğunluk hayatınızın her alanında kendini gösterebilir.",
        ask: "İlişkinizde tutku ve derinlik öne çıkıyor. Partnerinizle daha derin ve anlamlı bağlar kurabilirsiniz. Bekarsanız, gizemli ve çekici biriyle tanışabilirsiniz.",
        kariyer: "İş hayatınızda stratejik düşünce ve araştırma yetenekleriniz öne çıkıyor. Gizli bilgileri ortaya çıkarabilir veya derin analizler yapabilirsiniz. Finansal konularda keskin kararlar alabilirsiniz.",
        saglik: "Üreme sistemi ve hormonal dengenize dikkat etmelisiniz. Detoks ve arınma uygulamaları için uygun bir gün. Duygusal sağlığınız için derin meditasyon ve içsel çalışma faydalı olacaktır."
      },
      yay: {
        genel: "Özgürlük ve keşif ruhu bugün sizinle. Yeni fikirler ve farklı kültürler ilginizi çekiyor. İyimserliğiniz ve macera arzunuz yüksek, ufkunuzu genişletme zamanı.",
        ask: "İlişkinizde özgürlük ve samimi dostluk öne çıkıyor. Partnerinizle yeni deneyimler yaşayabilir ve ufkunuzu genişletebilirsiniz. Bekarsanız, farklı kültürden veya düşünce yapısından biriyle tanışabilirsiniz.",
        kariyer: "İş hayatınızda geniş vizyonunuz ve ileri görüşlülüğünüz öne çıkıyor. Eğitim, yayıncılık veya uluslararası bağlantılar için uygun bir gün. Büyük resmi görerek stratejik kararlar alabilirsiniz.",
        saglik: "Kalça ve uyluk bölgenize dikkat etmelisiniz. Açık havada egzersiz yapmak ve doğada vakit geçirmek size iyi gelecektir. Pozitif düşünce ve iyimserlik sağlığınızı olumlu etkileyecektir."
      },
      oglak: {
        genel: "Disiplin ve azim günü yaşıyorsunuz. Uzun vadeli hedeflerinize odaklanmak ve somut adımlar atmak için ideal bir zaman. Sorumluluk duygunuz ve pratik yaklaşımınız öne çıkıyor.",
        ask: "İlişkinizde bağlılık ve sorumluluk temaları öne çıkıyor. Partnerinizle uzun vadeli planlar yapabilir ve ilişkinizi sağlamlaştırabilirsiniz. Bekarsanız, olgun ve güvenilir biriyle tanışabilirsiniz.",
        kariyer: "İş hayatınızda disiplin ve organizasyon yetenekleriniz öne çıkıyor. Kariyer hedeflerinize odaklanabilir ve somut ilerlemeler kaydedebilirsiniz. Üstlerinizden takdir görebilirsiniz.",
        saglik: "Kemikler, dişler ve eklemlere dikkat etmelisiniz. Dengeli beslenme ve düzenli egzersiz önemli. Stres yönetimi için planlı ve disiplinli bir yaşam tarzı benimsemelisiniz."
      },
      kova: {
        genel: "Yenilikçi ve özgün fikirler günü yaşıyorsunuz. Teknoloji ve bilimsel konular ilginizi çekebilir. Sosyal çevrenizde beklenmedik olaylar gelişebilir, grup çalışmaları için ideal bir zaman.",
        ask: "İlişkinizde arkadaşlık ve entellektüel paylaşım öne çıkıyor. Partnerinizle yenilikçi fikirler üzerinde tartışabilir ve ortak ideallerinizi paylaşabilirsiniz. Bekarsanız, sıra dışı ve zeki biriyle tanışabilirsiniz.",
        kariyer: "İş hayatınızda yenilikçi düşünce ve teknolojik becerileriniz öne çıkıyor. Grup projeleri ve takım çalışmaları için uygun bir gün. Gelecek odaklı planlar yapabilirsiniz.",
        saglik: "Dolaşım sistemi ve bacaklarınıza dikkat etmelisiniz. Yenilikçi egzersiz rutinleri ve teknolojik destekli sağlık uygulamaları deneyebilirsiniz. Zihninizi dinlendirmek için meditasyon faydalı olacaktır."
      },
      balik: {
        genel: "Hayal gücünüz ve sezgileriniz bugün çok güçlü. Ruhsal konular ve sanatsal faaliyetler ilginizi çekiyor. Şefkat ve anlayış göstermek, başkalarına yardım etmek size tatmin duygusu verecek.",
        ask: "İlişkinizde romantizm ve duygusal derinlik öne çıkıyor. Partnerinize karşı şefkatli ve anlayışlı olun, ruhsal bir bağ kurabilirsiniz. Bekarsanız, sanatsal ve duyarlı biriyle tanışabilirsiniz.",
        kariyer: "İş hayatınızda yaratıcılık ve sezgisel yaklaşımınız öne çıkıyor. Sanat, müzik, film veya psikoloji ile ilgili projeler için uygun bir gün. Başkalarına yardım etme fırsatları doğabilir.",
        saglik: "Ayaklarınıza ve bağışıklık sisteminize dikkat etmelisiniz. Su içmeyi ihmal etmeyin ve nemli ortamlardan kaçının. Meditasyon, yoga ve ruhsal uygulamalar için ideal bir gün."
      }
    },
    en: {
      aries: {
        general: "Today your energy and courage are at a high level. It's an ideal day for new beginnings, and opportunities may arise where you'll use your leadership skills. Your entrepreneurial side will come to the forefront.",
        love: "There may be passionate and exciting developments in your love life. Be more outspoken with your partner and express your feelings without hesitation. If you're single, there might be a strong attraction between you and someone you'll meet.",
        career: "It's a suitable time to start new projects in your professional life. You can stand out in a competitive environment and show yourself for leadership positions. However, be careful about impatience and impulsiveness.",
        health: "Your physical energy is high, making it an ideal day for sports and exercise. Competitive sports in particular will be good for you. Watch out for headaches and remember to drink enough water."
      },
      taurus: {
        general: "Today, determination and patience stand out. You can take a strong stance in protecting your values and principles. You're having a lucky day in material matters.",
        love: "Security and loyalty themes come to the fore in your relationship. You can form deeper and more meaningful bonds with your partner. If you're single, you might meet someone with whom you share common values.",
        career: "You're having a lucky day in financial matters. It's a suitable time for investments and long-term plans. You can take steps that will provide stability and sustainability in your business life.",
        health: "It's a day to pay attention to your throat area. It's a good time to review your eating habits and make healthier choices. Spending time in nature ensures your spiritual balance."
      },
      gemini: {
        general: "Your communication skills and intelligence shine even more today. It's an ideal day to establish social connections and exchange information. Your curiosity and desire to learn are high.",
        love: "Communication is at the forefront in your relationship. Intellectual sharing with your partner will do both of you good. If you're single, you might meet someone smart and humorous.",
        career: "It's a suitable day to generate new ideas and express them. You can be impressive in meetings and presentations. Ideal for projects or tasks that require communication.",
        health: "Your energy is high for mental activities, but your nervous system may get tired due to overthinking. Deep breathing exercises and meditation help maintain your mental balance."
      },
      cancer: {
        general: "Your emotional depth and intuition are very strong today. Spending time with your family and loved ones can bring you great happiness. It's time to focus on your inner thoughts and feelings.",
        love: "Emotional security and compassion are at the forefront of your relationship. You can form deeper emotional bonds with your partner. If you're single, you might meet someone who understands you emotionally.",
        career: "You can make the right decisions at work by using your intuition. It's a suitable day for projects that require care, protection, or support. You can create a more homely feeling in your work environment.",
        health: "You should take care of your emotional health. Your digestive system may be sensitive, pay attention to what you eat. Don't neglect to drink water and be in environments that make you feel good emotionally."
      },
      leo: {
        general: "Your creativity and ability to express yourself stand out today. Those around you will admire you thanks to your leadership qualities. Your self-confidence is high and you're shining.",
        love: "A passionate and romantic day awaits you in your relationship. Be generous to your partner and don't hesitate to show your love. If you're single, your impressive and charismatic attitude will attract attention.",
        career: "A day you'll shine in your business life. You can assume leadership roles or initiate creative projects. It's an appropriate time to show yourself and be appreciated.",
        health: "Pay attention to your heart and back area. It's a good day for physical activities and sporting activities. Pamper yourself and take care of your personal care."
      },
      virgo: {
        general: "Today, your analytical abilities and practical intelligence stand out. It's an ideal day to focus on details and work systematically. Serving and being useful will give you a sense of satisfaction.",
        love: "Practical support and daily routines gain importance in your relationship. Offer your partner small helps and make their life easier. If you're single, you might meet someone with common interests.",
        career: "Your analytical thinking and problem-solving skills stand out in your business life. By paying attention to details, you can perfect projects. An ideal day for organization and planning.",
        health: "You should take care of your digestive system. Review your diet and make healthier choices. Regular exercise and meditation will be beneficial for stress management."
      },
      libra: {
        general: "Your search for balance and harmony is at the forefront today. You can create harmony in your relationships and social circle. Your aesthetic understanding and interest in beauty are increasing.",
        love: "Balance and mutual understanding gain importance in your relationship. You can make compromises with your partner and strengthen your relationship. If you're single, you might meet someone elegant and polite.",
        career: "Cooperation and partnerships gain importance in your business life. A suitable day for negotiations and agreements. Your creativity is high for projects requiring aesthetics and design.",
        health: "You should pay attention to your kidneys and waist area. A balanced diet and regular exercise are important. Activities related to art and beauty will be good for stress management."
      },
      scorpio: {
        general: "You're experiencing a day of transformation and depth. Your intuition is strong about secrets and deep emotions. Passion and intensity can manifest in every area of your life.",
        love: "Passion and depth stand out in your relationship. You can form deeper and more meaningful bonds with your partner. If you're single, you might meet someone mysterious and attractive.",
        career: "Your strategic thinking and research skills stand out in your business life. You can uncover hidden information or make deep analyses. You can make sharp decisions on financial matters.",
        health: "You should pay attention to your reproductive system and hormonal balance. A suitable day for detox and purification applications. Deep meditation and inner work will be beneficial for your emotional health."
      },
      sagittarius: {
        general: "The spirit of freedom and discovery is with you today. New ideas and different cultures interest you. Your optimism and desire for adventure are high, it's time to broaden your horizon.",
        love: "Freedom and sincere friendship stand out in your relationship. You can have new experiences with your partner and broaden your horizon. If you're single, you might meet someone from a different culture or mindset.",
        career: "Your broad vision and foresight stand out in your business life. A suitable day for education, publishing, or international connections. By seeing the big picture, you can make strategic decisions.",
        health: "You should pay attention to your hip and thigh area. Exercising outdoors and spending time in nature will be good for you. Positive thinking and optimism will positively affect your health."
      },
      capricorn: {
        general: "You're experiencing a day of discipline and perseverance. It's an ideal time to focus on your long-term goals and take concrete steps. Your sense of responsibility and practical approach stand out.",
        love: "Commitment and responsibility themes stand out in your relationship. You can make long-term plans with your partner and solidify your relationship. If you're single, you might meet someone mature and reliable.",
        career: "Your discipline and organizational skills stand out in your business life. You can focus on your career goals and make tangible progress. You may receive appreciation from your superiors.",
        health: "You should pay attention to bones, teeth, and joints. Balanced nutrition and regular exercise are important. You should adopt a planned and disciplined lifestyle for stress management."
      },
      aquarius: {
        general: "You're experiencing a day of innovative and original ideas. Technology and scientific subjects may interest you. Unexpected events may develop in your social circle, an ideal time for group work.",
        love: "Friendship and intellectual sharing stand out in your relationship. You can discuss innovative ideas with your partner and share your common ideals. If you're single, you might meet someone unusual and intelligent.",
        career: "Your innovative thinking and technological skills stand out in your business life. A suitable day for group projects and teamwork. You can make future-oriented plans.",
        health: "You should pay attention to your circulatory system and legs. You can try innovative exercise routines and technologically-supported health applications. Meditation will be beneficial to rest your mind."
      },
      pisces: {
        general: "Your imagination and intuition are very strong today. Spiritual matters and artistic activities interest you. Showing compassion and understanding, helping others will give you a sense of satisfaction.",
        love: "Romance and emotional depth stand out in your relationship. Be compassionate and understanding towards your partner, you can form a spiritual bond. If you're single, you might meet someone artistic and sensitive.",
        career: "Your creativity and intuitive approach stand out in your business life. A suitable day for projects related to art, music, film, or psychology. Opportunities to help others may arise.",
        health: "You should pay attention to your feet and immune system. Don't neglect to drink water and avoid humid environments. An ideal day for meditation, yoga, and spiritual practices."
      }
    }
  };

  // Burç yorumunu simüle etmek için (gerçek uygulamada API'den veri çekilecek)
  const fetchHoroscope = (zodiacId) => {
    if (!zodiacId) return; // Bir burç seçilmediyse işlemi iptal et
    
    setLoading(true);
    setError(null);

    // API çağrısını simüle ediyoruz
    setTimeout(() => {
      try {
        // Gerçek uygulamada bu kısım fetch API çağrısı olacak
        const horoscopeTextObj = language === 'tr' ? horoscopeTexts.tr[zodiacId] : horoscopeTexts.en[zodiacId];
        
        if (horoscopeTextObj) {
          // Günlük değişim için gün bazında küçük varyasyonlar ekleyelim
          const today = new Date();
          const dayOfMonth = today.getDate();
          const dayOfWeek = today.getDay(); // 0 = Pazar, 1 = Pazartesi, ...
          
          // Gün bazında enerji seviyesi (1 ile 10 arası)
          const dailyEnergyLevel = ((dayOfMonth % 5) + 5); // 5-10 arası
          const weekdayModifier = ['sakin', 'hareketli', 'değişken', 'odaklı', 'sosyal', 'yaratıcı', 'düşünceli'][dayOfWeek];
          const weekdayModifierEn = ['calm', 'active', 'changeable', 'focused', 'social', 'creative', 'thoughtful'][dayOfWeek];
          
          // Günlük şans oranı (gün bazında değişen)
          const dailyLuck = Math.floor((dayOfMonth + dayOfWeek) % 100) + 1; // 1-100 arası
          
          // Hafif günlük varyasyonlar eklenmiş metin
          let modifiedTexts = {};
          
          if (language === 'tr') {
            modifiedTexts = {
              genel: `${horoscopeTextObj.genel} Bugün enerji seviyeniz ${dailyEnergyLevel}/10 ve günün genel havası ${weekdayModifier}.`,
              ask: horoscopeTextObj.ask,
              kariyer: horoscopeTextObj.kariyer,
              saglik: `${horoscopeTextObj.saglik} Günlük şans oranınız: %${dailyLuck}.`
            };
          } else {
            modifiedTexts = {
              general: `${horoscopeTextObj.general} Today your energy level is ${dailyEnergyLevel}/10 and the general mood of the day is ${weekdayModifierEn}.`,
              love: horoscopeTextObj.love,
              career: horoscopeTextObj.career,
              health: `${horoscopeTextObj.health} Your daily luck rate: ${dailyLuck}%.`
            };
          }
          
          setHoroscopeData({
            zodiacName: zodiacs[language].find(z => z.id === zodiacId).name,
            text: modifiedTexts,
            date: new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          });
        } else {
          setError(language === 'tr' ? 'Burç yorumu bulunamadı.' : 'Horoscope not found.');
        }
        setLoading(false);
      } catch (err) {
        setError(language === 'tr' ? 'Burç yorumu alınırken bir hata oluştu.' : 'An error occurred while getting the horoscope.');
        setLoading(false);
      }
    }, 1000); // 1 saniye gecikme ile simüle ediyoruz
  };

  // Seçilen burcun değişiminde yorumunu getir
  useEffect(() => {
    if (selectedZodiac) {
      fetchHoroscope(selectedZodiac);
    }
  }, [selectedZodiac]);

  const translations = {
    tr: {
      title: "Günlük Burç Yorumu",
      selectZodiac: "Burcunuzu Seçiniz",
      loading: "Burç yorumu yükleniyor...",
      error: "Hata oluştu:",
      dailyHoroscope: "Günlük Burç Yorumu",
      date: "Bugünün Tarihi:",
      close: "Kapat",
      updateInfo: "* Burç yorumları her gün güncellenir.",
      selectPrompt: "Lütfen yorum görmek için burcunuzu seçin."
    },
    en: {
      title: "Daily Horoscope",
      selectZodiac: "Select Your Zodiac Sign",
      loading: "Loading horoscope...",
      error: "An error occurred:",
      dailyHoroscope: "Daily Horoscope",
      date: "Today's Date:",
      close: "Close",
      updateInfo: "* Horoscope readings are updated daily.",
      selectPrompt: "Please select your zodiac sign to see readings."
    }
  };

  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${currentTheme.background} backdrop-blur-md p-4`}
    >
      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className={`${currentTheme.card} backdrop-blur-sm rounded-lg border ${currentTheme.border} p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-cinzel ${currentTheme.title}`}>
            {t.title} - {name}
          </h2>
          <button 
            onClick={onClose}
            className={`${currentTheme.text} opacity-70 hover:opacity-100 transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h3 className={`text-lg font-cinzel ${currentTheme.text} mb-3`}>{t.selectZodiac}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {zodiacs[language].map((zodiac) => (
              <div key={zodiac.id} className="flex items-center">
                <input
                  type="radio"
                  id={zodiac.id}
                  name="zodiac"
                  value={zodiac.id}
                  checked={selectedZodiac === zodiac.id}
                  onChange={() => setSelectedZodiac(zodiac.id)}
                  className="hidden"
                />
                <label
                  htmlFor={zodiac.id}
                  className={`cursor-pointer flex items-center justify-center p-2 rounded-lg w-full transition-all duration-300 ${
                    selectedZodiac === zodiac.id
                      ? `${currentTheme.accent} ${currentTheme.borderAccent} ${currentTheme.text} font-bold`
                      : `${darkTheme ? 'bg-midnight-default/50' : 'bg-[#EFEFEF]/70'} hover:bg-opacity-70 ${currentTheme.borderLight} ${currentTheme.text} opacity-70`
                  } border`}
                >
                  {zodiac.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className={`inline-block w-8 h-8 border-2 ${currentTheme.borderLight} border-t-${darkTheme ? 'gold-default' : '[#9C7A3C]'} rounded-full animate-spin mb-2`}></div>
            <p className={currentTheme.text}>{t.loading}</p>
          </div>
        ) : error ? (
          <div className={`${currentTheme.text} ${darkTheme ? 'bg-midnight-default/50' : 'bg-[#EFEFEF]/70'} p-4 rounded-lg`}>
            <p className="text-red-400">{t.error} {error}</p>
          </div>
        ) : horoscopeData ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${currentTheme.section} backdrop-blur-sm rounded-lg p-4 border ${currentTheme.borderLight}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${currentTheme.accent} flex items-center justify-center ${currentTheme.title}`}>
                {/* Burç emojileri */}
                <span className="text-xl font-bold">
                  {selectedZodiac === 'koc' || selectedZodiac === 'aries' ? '♈' : 
                   selectedZodiac === 'boga' || selectedZodiac === 'taurus' ? '♉' : 
                   selectedZodiac === 'ikizler' || selectedZodiac === 'gemini' ? '♊' : 
                   selectedZodiac === 'yengec' || selectedZodiac === 'cancer' ? '♋' : 
                   selectedZodiac === 'aslan' || selectedZodiac === 'leo' ? '♌' : 
                   selectedZodiac === 'basak' || selectedZodiac === 'virgo' ? '♍' : 
                   selectedZodiac === 'terazi' || selectedZodiac === 'libra' ? '♎' : 
                   selectedZodiac === 'akrep' || selectedZodiac === 'scorpio' ? '♏' : 
                   selectedZodiac === 'yay' || selectedZodiac === 'sagittarius' ? '♐' : 
                   selectedZodiac === 'oglak' || selectedZodiac === 'capricorn' ? '♑' : 
                   selectedZodiac === 'kova' || selectedZodiac === 'aquarius' ? '♒' : 
                   selectedZodiac === 'balik' || selectedZodiac === 'pisces' ? '♓' : '★'}
                </span>
              </div>
              <h3 className={`text-xl font-cinzel ${currentTheme.title}`}>{horoscopeData.zodiacName} - {t.dailyHoroscope}</h3>
            </div>
            
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <p className={`${currentTheme.text} opacity-90 font-cormorant text-base italic mb-2 sm:mb-0`}>
                <span className={`${currentTheme.title} opacity-80 font-semibold`}>{t.date}</span> {horoscopeData.date}
              </p>
              <p className={`${currentTheme.text} opacity-60 text-xs italic`}>
                {t.updateInfo}
              </p>
            </div>
            
            <div className="space-y-4">
              {/* Genel bölümü */}
              <div className={`${darkTheme ? 'bg-midnight-default/30' : 'bg-[#FFFFFF]/80'} backdrop-blur-sm border ${currentTheme.borderLight} rounded-lg p-3`}>
                <h4 className={`text-lg font-cinzel ${currentTheme.title} mb-2`}>{language === 'tr' ? 'Genel' : 'General'}</h4>
                <p className={`${currentTheme.text} leading-relaxed font-cormorant text-base`}>
                  {language === 'tr' 
                    ? horoscopeData.text.genel 
                    : horoscopeData.text.general}
                </p>
              </div>
              
              {/* Aşk bölümü */}
              <div className={`${darkTheme ? 'bg-midnight-default/30' : 'bg-[#FFFFFF]/80'} backdrop-blur-sm border ${currentTheme.borderLight} rounded-lg p-3`}>
                <h4 className={`text-lg font-cinzel ${currentTheme.title} mb-2`}>{language === 'tr' ? 'Aşk' : 'Love'}</h4>
                <p className={`${currentTheme.text} leading-relaxed font-cormorant text-base`}>
                  {language === 'tr' 
                    ? horoscopeData.text.ask 
                    : horoscopeData.text.love}
                </p>
              </div>
              
              {/* Kariyer bölümü */}
              <div className={`${darkTheme ? 'bg-midnight-default/30' : 'bg-[#FFFFFF]/80'} backdrop-blur-sm border ${currentTheme.borderLight} rounded-lg p-3`}>
                <h4 className={`text-lg font-cinzel ${currentTheme.title} mb-2`}>{language === 'tr' ? 'Kariyer' : 'Career'}</h4>
                <p className={`${currentTheme.text} leading-relaxed font-cormorant text-base`}>
                  {language === 'tr' 
                    ? horoscopeData.text.kariyer 
                    : horoscopeData.text.career}
                </p>
              </div>
              
              {/* Sağlık bölümü */}
              <div className={`${darkTheme ? 'bg-midnight-default/30' : 'bg-[#FFFFFF]/80'} backdrop-blur-sm border ${currentTheme.borderLight} rounded-lg p-3`}>
                <h4 className={`text-lg font-cinzel ${currentTheme.title} mb-2`}>{language === 'tr' ? 'Sağlık' : 'Health'}</h4>
                <p className={`${currentTheme.text} leading-relaxed font-cormorant text-base`}>
                  {language === 'tr' 
                    ? horoscopeData.text.saglik 
                    : horoscopeData.text.health}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className={`text-center py-8 ${currentTheme.text} opacity-70 font-cormorant italic`}>
            {t.selectPrompt}
          </div>
        )}

        <div className="mt-6 text-center">
          <button 
            onClick={onClose}
            className={`px-6 py-2 ${currentTheme.accent} ${currentTheme.accentHover} transition-colors ${currentTheme.text} rounded-lg border ${currentTheme.borderAccent} hover:border-opacity-60`}
          >
            {t.close}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DailyHoroscope; 