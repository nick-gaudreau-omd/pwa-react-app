import * as React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
// bypass transpiler error for known type : interface Notification extends EventTarget
declare var Notification: any; // C:\Program Files\Microsoft VS Code\resources\app\extensions\node_modules\typescript\lib\lib.dom.d.ts

const pubKey = "BDL1okxySceuOI-i-4KMTDDRymnDtL_JTIzQyBHKkrNT0WHlBXLlmHnYegRecNmMQIOR06aR0wA1LOWlit75QlE";
// ref privKey: fkbcr5dRSi0UGJt2pQSzT-iH1b6cjt5Tu3ce02KOf1E

export default class NotificationComponent extends React.Component<{}, {subscribed:boolean}> {

    constructor(props: any) {
        super(props);
        this.state = {
            subscribed: false
        }
        this.hasSubscribed = this.hasSubscribed.bind(this);
        
    }

    componentDidMount(){
        this.setState({subscribed : this.hasSubscribed()});
    }

    hasSubscribed(): boolean {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            
            // quick out
            if(Notification.permission === "denied") return false;
            else if(Notification.permission === "granted") return true;
            
            console.log(Notification.permission);

            // Case permission is default/ask
            // access sw when its up and ready
            navigator.serviceWorker.ready.then( sw => {
                // check user subscription
                sw.pushManager.getSubscription().then( pushSubscription => {
                    if(pushSubscription === null) return false;
                    else return true;
                });
            }).catch(error => {
                console.error(error);
                return false;
            });            
        }
        return false;
    }


    render() {
        return (
            <span style={{ float: "right" }}>
                {/* <FontAwesome.FaRefresh id="btnRefresh" style={ { cursor: "pointer"} } /> */}
                {
                    this.state.subscribed ?
                        <FontAwesome.FaBellO style={{ cursor: "pointer" }}  />
                        :
                        <FontAwesome.FaBellSlashO style={{ cursor: "pointer" }}  />
                }
            </span>

        );
    }
}