const localforage = require("localforage");

export class LocalForageService {

    constructor(){
        localforage.config({
            name        : 'Pwa-react-news-app',
            version     : 10, // can't set v1 for whatever reason
            storeName   : 'BgSync_Survey', // Should be alphanumeric, with underscores.
            description : 'Pwa bg sync demo'
        });
    }

    public getData(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            localforage.getItem(key)
            .then( (data:any) => {
                if (data) {
                    resolve(data);
                } 
            });
        });
        
        
    }

    public storeData(key: string, data: any ) {
        localforage.setItem(key, data);
    }
}