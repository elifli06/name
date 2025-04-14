// Bu isteğe bağlı kod service worker kullanarak uygulama içeriğinizi daha hızlı 
// yüklemeye, ayrıca çevrimdışı yetenekler de eklemeye yardımcı olur.
// Ancak bu yaklaşım bazı tuzakları da beraberinde getirir; service worker'ların
// yaşam döngüsü tam olarak anlaşılmazsa çalışma zamanı hatalarına neden olabilir.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] localhost için IPv6 adresidir.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 localhost için özel IPv4 adresi kabul edilir.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // URL constructor, SW'nin https sayfalarında çalışmasını sağlar
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // PUBLIC_URL farklı bir originden geliyorsa, service worker çalışmaz
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Localhost'tayız. SW'nin hala var olup olmadığını kontrol edelim
        checkValidServiceWorker(swUrl, config);

        // Console'a ek bilgiler ekle
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Bu web uygulaması ilk önce önbelleğe alınmakta ve ' +
              'daha sonra service worker tarafından sunulmaktadır.'
          );
        });
      } else {
        // Localhost değiliz. Sadece service worker'ı kaydet
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Bu noktada önceden önbelleğe alınmış içerik vardır
              console.log(
                'Yeni içerik kullanılabilir, lütfen sayfayı yenileyin.'
              );

              // Callback'i çağır
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Bu noktada her şey önbelleğe alınmıştır
              console.log('İçerik çevrimdışı kullanım için önbelleğe alındı.');

              // Callback'i çağır
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Service worker kaydı sırasında hata oluştu:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Service worker'ın bulunup bulunmadığını kontrol et
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // JS dosyasının alınabildiğinden emin ol
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Service worker bulunamadı. Muhtemelen farklı bir uygulama.
        // Sayfayı yenile.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker bulundu. Normal şekilde devam et.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('İnternet bağlantısı yok. Uygulama çevrimdışı modda çalışıyor.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
} 