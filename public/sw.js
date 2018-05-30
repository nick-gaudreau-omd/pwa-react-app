const CACHE_VERSION = 'offline-react-web-app-v1.2';

const cachedAssets = [
    '/favicon.ico',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/safari-pinned-tab.svg',
    '/apple-touch-icon.png',
    '/offline/css/offline-main.css',
    '/offline/css/offline-main.css.map',
    '/offline/js/offline-main.js',
    '/offline/js/offline-main.js.map',
    '/offline-index.html'
];

self.addEventListener('install', function (event) {
  console.log(`Installed: ${CACHE_VERSION}, ${new Date().toLocaleTimeString()}`);
});
self.addEventListener('activate', function (event) {
  console.log(`Activated: ${CACHE_VERSION}, ${new Date().toLocaleTimeString()}`);
  event.waitUntil(
    caches.keys() // get all keys
        .then(function (keys) {
            console.log(keys);
            return Promise.all(keys.filter(function (key) {
                console.log(key);
                return key !== CACHE_VERSION; // find all cache keys not in current version
            }).map(function (key) {
                // create each delete promise base on above filtered returned nnon current version
                return caches.delete(key);
            })
            );
        })
    );
});

// Network First Pattern.
// Cache fallback if offline.
self.addEventListener('fetch', function (event) {
    // ignore chrome ext 
    if(event.request.url.indexOf('chrome-extension') > -1){
        return false;
    }    
    console.log(event.request);

    if (navigator.onLine){
        // get from network
        console.log('fetch from network');
        return fetchAndUpdate(event.request);
    } else {
        event.respondWith(
            caches.match(event.request) // match for the request
                .then(function (response) {    
                    console.log(response);    
                    if (response)
                        return response; // if there's a resp store in cache we return
                    else {  // offline and no cached response                       
                        caches.match(new Request('/offline/offline-index.html')).then(function (response) {    
                            console.log(response);    
                            if (response)
                                return response;
                            else
                             return new Response("<h1> It seems like you never opened this site online before !? :( </h1>");
                        });                        
                    }
                })
        )
    }
    
});

function fetchAndUpdate(request) {
    return fetch(request)
        .then(function (response) {            
            console.log(response); 
            if (response) {
                return caches.open(CACHE_VERSION)
                    .then(function (cache) {
                        // add key/val : req/resp to cache
                        // since resp stream can only be read once we will add a clone of resp
                        // and return original resp to browser
                        
                            return cache.put(request, response.clone())
                                .then(function () {
                                    return response;
                                })
                                .catch( function (error) {
                                    if(error.message && error.message.indexOf('chrome-extension') > -1) {
                                        // ignore
                                    }
                                    else
                                        console.error(error);
                                    
                                })
                    });
            }
        });

}


/* Notifications */
self.registration.showNotification("Welcome to Offline News", {
    body: "Save news for later read and/or once a page has been visited, it is available offline.",
    image: "/ss-network-falling-back-to-cache.png",
    icon: "/android-chrome-192x192.png",
    badge: "/favicon-32x32.png",
    actions:[
        {
            action: "ok", title: "Ok", icon: "/favicon-32x32.png"
        },
        {
            action: "rate", title: "Rate", icon: "/favicon-32x32.png"
        }
    ],
    tag: 'onload'
});

self.addEventListener('notificationclose', evt => {
    // do somthing... ping ggole analytics see if user intereacted with notif
    console.log('notificationclose');
});

self.addEventListener('notificationclick', evt => {
    evt.notification.close();

    switch(evt.action) { // switch case on action prop sort of an id
        case 'ok':
            console.log('notificationclick => Ok');
            break;
        case 'rate':
            console.log('notificationclick => Rate');
            break;
        default:
            break;
    }
});