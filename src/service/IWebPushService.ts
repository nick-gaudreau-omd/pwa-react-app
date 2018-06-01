export interface IWebPushService{
  notifyUsers(notification:any): Promise<any>;
  storeSubscription(pushSubscription:PushSubscription): Promise<any>;
}