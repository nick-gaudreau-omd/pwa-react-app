import * as React from 'react';
import {DashboardNav} from '../../components/admin/DashboardNav';
import {Sidebar} from '../../components/admin/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
import 'react-toastify/dist/ReactToastify.min.css';
import { IWebPushService } from '../../service/IWebPushService';
import { WebPushService } from '../../service/WebPushService';
import { MainTopSection } from '../../components/admin/MainTopSection';
import { MainBody } from '../../components/admin/MainBody';

export default class Dashboard extends React.Component<{}, { title: string, body: string }> {
    private readonly _webPushService:IWebPushService;
    
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
        this._webPushService = new WebPushService();
        this.handlePushNotification = this.handlePushNotification.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                draggable: true,
                draggablePercent: 60
            });
        })
        .catch(error => {
            toast.warn("Push notifications have failed to be sent to all users", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 60
              })
        })
    }

    handleChange(e: any) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    public render() {
        return (
            <div>
                <DashboardNav />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <MainTopSection title="Dashboard" />
                            <MainBody title="Push Notification" input1={this.state.title} input2={this.state.body} inputChangeHandler={this.handleChange} onSubmitHandler={this.handlePushNotification} />                            
                            <ToastContainer />
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
