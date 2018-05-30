const CACHE_VERSION = 'offline-react-web-app-v1.0';
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
                    else {
                        // test - if api request
                        // did not work as expected... will simply disable anchor not in cache
                        if(event.request.url.indexOf('newsapi.org') > -1){
                            caches.match(new Request('https://newsapi.org/v2/top-headlines?language=en&country=us&apiKey=9933f02648834737bc4dd4f7c48cba94&sortBy=publishedAt&category=general')).then(function (response) {    
                                console.log(response);    
                                if (response)
                                    return response;
                            });
                        } else { // this should be an offline page if website called for first time while offline
                            caches.match(new Request('/')).then(function (response) {    
                                console.log(response);    
                                if (response)
                                    return response;
                            });
                        }
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
    ]
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