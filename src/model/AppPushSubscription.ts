export interface AppPushSubscription {
    endpoint: string;
    keys : {
        auth:string,
        p256dh:string
    }
    uqId:string
}