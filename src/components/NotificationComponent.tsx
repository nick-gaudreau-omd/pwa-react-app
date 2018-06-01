import * as React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import Util from '../Util';
import { LocalStoreService } from '../service/LocalStoreService';
import { IWebPushService } from '../service/IWebPushService';
import { WebPushService } from '../service/WebPushService';
// bypass transpiler error for known type : interface Notification extends EventTarget
declare var Notification: any; // C:\Program Files\Microsoft VS Code\resources\app\extensions\node_modules\typescript\lib\lib.dom.d.ts

const pubKey = "BDL1okxySceuOI-i-4KMTDDRymnDtL_JTIzQyBHKkrNT0WHlBXLlmHnYegRecNmMQIOR06aR0wA1LOWlit75QlE";
// ref dev code only => privKey: fkbcr5dRSi0UGJt2pQSzT-iH1b6cjt5Tu3ce02KOf1E

export default class NotificationComponent extends React.Component<{}, {subscribed:boolean}> {
    private readonly _webPushService:IWebPushService;

    constructor(props: any) {
        super(props);
        this.state = {
            subscribed: false
        }
        this._webPushService = new WebPushService();
        this.hasSubscribed = this.hasSubscribed.bind(this);
        this.handleSubscriptionClick = this.handleSubscriptionClick.bind(this);
    }

    async componentDidMount() {
        this.hasSubscribed();        
    }

    hasSubscribed() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            
            // quick out
            if(Notification.permission === "denied") this.setState({subscribed : false});
            
            console.log(Notification.permission);

            // Case permission is 'default/ask' or 'granted'
            // access sw when its up and ready
            navigator.serviceWorker.ready.then( sw => {
                // check user subscription
                sw.pushManager.getSubscription().then( pushSubscription => {
                    if(pushSubscription === null) return this.setState({subscribed : false});
                    else return this.setState({subscribed : true});
                });
            }).catch(error => {
                console.error(error);                
            });            
        }
        return this.setState({subscribed : false});
    }

    handleSubscriptionClick() {
        // access sw when its up and ready
        navigator.serviceWorker.ready.then( sw => {
            // check user subscription
            sw.pushManager.getSubscription().then( pushSubscription => {
                if(pushSubscription !== null) { 
                    // UNSUBSCRIBE
                    // Suppose to remove subscription from user browser AND message server... 
                    // AFTER TEST IT SEEMS THAT IT ONLY REMOVES MESSAGE SERVER, user browser page setting will still be on allow
                    pushSubscription.unsubscribe(); 
                    
                    
                    // TODO if we have one, remove subscription on web server if any for this user (i.e persisted subscription)
                    
                    this.setState({subscribed : false});
                }
                else{
                    // SUBSCRIBE
                    sw.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: Util.urlBase64ToUint8Array(pubKey)
                    }) 
                    // then sync our server... if we have one                
                    .then(
                        s => this._webPushService.storeSubscription(s)
                    )
                    .then(res => {                        
                        // demo solution store locally
                        // LocalStoreService.persistData("pushSubscription", res);
                        this.setState({subscribed : true});
                    });
                }
            });
        }).catch(error => {
            console.error(error);
        }); 
    }

    render() {
        return (
            <span style={{ float: "right" }}>
                {/* <FontAwesome.FaRefresh id="btnRefresh" style={ { cursor: "pointer"} } /> */}
                {
                    this.state.subscribed ?
                        <FontAwesome.FaBellO style={{ cursor: "pointer" }} onClick={this.handleSubscriptionClick} />
                        :
                        <FontAwesome.FaBellSlashO style={{ cursor: "pointer" }} onClick={this.handleSubscriptionClick} />
                }
            </span>

        );
    }
}