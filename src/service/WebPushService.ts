import { IWebPushService } from "./IWebPushService";

export class WebPushService implements IWebPushService {
    private url:string = "http://localhost:51972/api/webpush/";  

    notifyUsers(notification:any): Promise<any>{
      return fetch(this.url + 'notify', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(notification)
      })
    }

    storeSubscription(pushSubscription:PushSubscription): Promise<any>{
      return fetch(this.url + 'store', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(pushSubscription)
      })
    }
}