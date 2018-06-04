import * as React from 'react';
import "./dashboard.css";
import DashboardNav from './DashboardNav';
import Sidebar from './Sidebar';
import { LocalStoreService } from '../../service/LocalStoreService';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
import 'react-toastify/dist/ReactToastify.min.css';
import { IWebPushService } from '../../service/IWebPushService';
import { WebPushService } from '../../service/WebPushService';
import Util from '../../Util';

const webpush = require('web-push');

const pubKey = "BDL1okxySceuOI-i-4KMTDDRymnDtL_JTIzQyBHKkrNT0WHlBXLlmHnYegRecNmMQIOR06aR0wA1LOWlit75QlE";
const privKey = "fkbcr5dRSi0UGJt2pQSzT-iH1b6cjt5Tu3ce02KOf1E";

export default class Dashboard extends React.Component<{}, { title: string, body: string }> {
    private readonly _webPushService:IWebPushService;
    
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
        this._webPushService = new WebPushService();
        this.handleClick = this.handleClick.bind(this);
        this.handlePushNotification = this.handlePushNotification.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // FAIL attempt nodejs web push form browser
    // GCM API does not include CORS headers so it is not intended to be used from the browser
    // https://stackoverflow.com/questions/36662561/how-to-make-a-request-to-gcm-to-send-a-notification-via-xhr/36894224#36894224
    // https://stackoverflow.com/questions/36691533/how-to-send-push-notifications-in-chromeprogressive-web-apps/36717282#36717282
    handleClick() {
        // VAPID keys should only be generated only once.
        //const vapidKeys = webpush.generateVAPIDKeys();

        let ps = LocalStoreService.getSessionData("pushSubscription");

        if (!ps)
            return;

        webpush.setGCMAPIKey('AIzaSyB7Y8HrhkHL9i778Pu1GNiC7Um5yc0H1oI');
        webpush.setVapidDetails(
            'mailto:nick.gaudreau.ca@gmail.com',
            pubKey,
            privKey

            //vapidKeys.publicKey,
            //vapidKeys.privateKey
        );

        // This is the same output of calling JSON.stringify on a PushSubscription

        // I did not verify if the subscibe would generate a subscription without FCM
        const pushSubscription = {
            endpoint: ps.endpoint,
            keys: {
                auth: ps.keys.auth,
                p256dh: ps.keys.p256dh
            }
        };

        let payload = {
            category: "testCategory",
            title: "testTitle"
        }

        // valid options are ['headers', 'gcmAPIKey', 'vapidDetails', 'TTL', 'contentEncoding', 'proxy']
        let options = {
            TTL: 60,
            headers: {
                'Access-Control-Allow-Origin': '*', // attempt to bypass error
                'Content-Type': 'application/json',
                'Authorization': 'AIzaSyB7Y8HrhkHL9i778Pu1GNiC7Um5yc0H1oI'
            }
        }

        webpush.sendNotification(pushSubscription, JSON.stringify(payload), options);
    }

    handlePushNotification() {
        let notification = {
            title: this.state.title,
            body: this.state.body
        }
        this._webPushService.notifyUsers(notification)
        .then(res => {
            toast.success("Push notifications sent to all users", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        })
        .catch(error => {
            toast.warn("Push notifications have failed to be sent to all users", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
              })
        })
    }

    handleChange(e: any) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    async test(){
        let test = await Util.getUniqueIdentifier();
        console.log(test);
    }

    public render() {

        return (
            <div>
                <DashboardNav />

                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />

                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Dashboard</h1>
                                <div className="btn-toolbar mb-2 mb-md-0">
                                    <div className="btn-group mr-2">
                                        <button className="btn btn-sm btn-outline-secondary" onClick={this.test} >Share</button>
                                        <button className="btn btn-sm btn-outline-secondary" >Export</button>
                                    </div>
                                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                        <span data-feather="calendar"></span>
                                        This week
                                    </button>
                                </div>
                            </div>

                            <div className="shim-top">
                                <h2>Push Notification</h2>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Title</label>
                                    <div className="col-10">
                                        <input className="form-control" value={this.state.title} name="title" type="text" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Body</label>
                                    <div className="col-10">
                                        <input className="form-control" name="body" value={this.state.body} type="text" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label"></label>
                                    <div className="col-10">
                                        <button className="btn btn-success float-right" onClick={this.handlePushNotification}>Send</button>
                                    </div>
                                </div>
                            </div>
                            <ToastContainer />
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
