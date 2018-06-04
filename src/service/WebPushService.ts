import { IWebPushService } from "./IWebPushService";
import Util from "../Util";
import { AppPushSubscription } from "../model/AppPushSubscription";

export class WebPushService implements IWebPushService {
    private url:string = "http://localhost:51972/api/webpush/";  

    notifyUsers(notification:any): Promise<any>{
      return fetch(this.url + 'notify', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(notification)
      })
    }

    async storeSubscription(pushSubscription:PushSubscription): Promise<any>{
      let o = JSON.stringify(pushSubscription);
      let appPushSubscription:AppPushSubscription = JSON.parse(o);
      appPushSubscription.uqId = await Util.getUniqueIdentifier();
      return fetch(this.url + 'store', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(appPushSubscription)
      })
    }
}