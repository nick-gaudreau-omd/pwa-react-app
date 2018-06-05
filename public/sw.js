const CACHE_VERSION = 'offline-react-web-app-v1.2';

const cachedAssets = [
    'favicon.ico',
    'favicon-32x32.png',
    'favicon-16x16.png',
    'safari-pinned-tab.svg',
    'apple-touch-icon.png',
    'offline/css/offline-main.css',
    'offline/js/offline-main.js',
    'offline-index.html'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                return cache.addAll(cachedAssets);
            })

    );
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
    
    // ignore api calls
    if(event.request.url.indexOf('api/webpush') > -1){
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
                        caches.match(new Request('offline-index.html')).then(function (response) {    
                            console.log(response);    
                            if (response)
                                return response;
                            else // 
                                return new Response("<h1> Offline and no cache !? Sorry :'( </h1>");
                        });                        
                    }
                })
        )
    }
    
});

function fetchAndUpdate(request) {
    // error: Uncaught (in promise) TypeError: Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
    // work around: https://stackoverflow.com/questions/48463483/what-causes-a-failed-to-execute-fetch-on-serviceworkerglobalscope-only-if?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
        return;
    }
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


/* Notifications after user accepted the prompt: add to home screen */
self.addEventListener('appinstalled', (evt) => {
    evt.waitUntil(
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
                    action: "survey", title: "Survey", icon: "/favicon-32x32.png"
                }
            ],
            tag: 'onload'
        })
    );
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
        case 'survey':
            console.log('notificationclick => Survey');
            evt.waitUntil(
                clients.openWindow(
                    `${evt.target.location.origin}/survey`
                )
            );
            break;
        case 'news':
            console.log('notificationclick => news');
            evt.waitUntil(
                clients.openWindow(
                    `${evt.target.location.origin}/news/general`
                )
            );
            break;
        default:
            break;
    }
});

/* Notifications managed from admin dashboard */
self.addEventListener('push', function(evt){ 
    data = evt.data.json(); 
    evt.waitUntil(self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/android-chrome-192x192.png",
        badge: "/favicon-32x32.png",
        actions:[
            {
                action: "news", title: "Headlines"
            },
            {
                action: "survey", title: "Survey"
            }
        ],
    }));  
}); 

/* Bg sync */
self.addEventListener('sync', function(evt){ 
    console.log(evt);
    console.log("SW is back online and will send data to the server . . .");
    evt.waitUntil(
        openIndexedDb('Pwa-react-news-app', 10)
        .then( response =>{
            var db = response.target.result;
            var rows = db.transaction(['BgSync_Survey'], 'readwrite').objectStore('BgSync_Survey');
            getIdbStoreData(rows, r => r != '').then(data => {
                //console.log(data);
                // Mock api
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
                .then(json => {console.log(json);console.log("Data has been sent sucessfully to the server!")})

            });
            
        })
    );
    
}); 

function openIndexedDb(name, version){
    return new Promise((resolve, reject) => {
        var idb = indexedDB.open(name, version);
        idb.onsuccess = resolve;
        idb.onerror = reject;
    });
}

function getIdbStoreData(objStoreRows, predicate){
    return new Promise((resolve, reject) => {
        var r = [];
        function onsuccess(evt){
            var cursor = evt.target.result;
            if(cursor) {
                if(predicate(cursor.value)) {
                    r.push(cursor.value);
                }
                cursor.continue();
            } else {
                resolve(r);
            }
        }
        objStoreRows.openCursor().onsuccess = onsuccess;
    });
}

/* Chrome 68+ requires listen beforeinstallprompt  */
self.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt - otherwise we will have 2 prompt
    e.preventDefault();
    
    // trigger manually for 68+
    e.prompt();
});