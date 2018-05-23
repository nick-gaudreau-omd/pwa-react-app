export class LocalStoreService {

    public static getSessionData(key: string) {
        var data = sessionStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        } else {
            return void 0;
        }
    }

    public static persistData(data: any, key: string) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
}