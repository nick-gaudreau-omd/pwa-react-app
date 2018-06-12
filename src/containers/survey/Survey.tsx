import * as React from 'react';
import TestFormP1  from './TestFormP1';
import TestFormP2  from './TestFormP2';
import TestFormP3  from './TestFormP3';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
import 'react-toastify/dist/ReactToastify.min.css';
import { LocalForageService } from '../../service/LocalForageService';
import { IContainerProps } from '../IContainerProps';

const FORM_STEPS = 3;

export default class Survey extends React.Component<IContainerProps,  {currentStep:number}> {

  private readonly _localForageService:LocalForageService;

  constructor(props: any) {
    super(props);    
    this.state = {
      currentStep : 1
    }

    this._localForageService = new LocalForageService();

    this.nextFormPage = this.nextFormPage.bind(this);
    this.prevFormPage = this.prevFormPage.bind(this);
    this.childOnChangeListener = this.childOnChangeListener.bind(this);
  }

  componentDidMount() {
    this.openIndexedDb('Pwa-react-news-app', 10)
        .then( (response:any) => {
            var db = response.target.result;
            var rows = db.transaction(['BgSync_Survey'], 'readwrite').objectStore('BgSync_Survey');
            this.getIdbStoreMap(rows, r => r != '').then(data => {

              // TODO have Survey as Container, reloading state with indexedDB data for generic test form as presentation
              console.log(data);
            });
        });
    console.log(this.props.match.params.id);
  }

  public openIndexedDb(name:string, version:number) {
    return new Promise((resolve, reject) => {
        var idb = indexedDB.open(name, version);
        idb.onsuccess = resolve;
        idb.onerror = reject;
    });
  }

  getIdbStoreMap(objStoreRows:any, predicate:any){
    return new Promise((resolve, reject) => {
        var r = new Map();
        function onsuccess(evt:any){
            var cursor = evt.target.result;
            if(cursor) {
                if(predicate(cursor.value)) {
                    r.set(cursor.key,cursor.value);
                }
                cursor.continue();
            } else {
                resolve(r);
            }
        }
        objStoreRows.openCursor().onsuccess = onsuccess;
    });
  }

  private nextFormPage() {
    let currentStep = this.state.currentStep;
    // limit
    if (currentStep >= 2) {
      currentStep = FORM_STEPS;
    } else {
      currentStep = currentStep + 1;
    }
    
    this.setState({
      currentStep: currentStep
    });
  }
   
  private prevFormPage() {
    let currentStep = this.state.currentStep;
    if (currentStep <= 1) {
      currentStep = 1;
    } else {
      currentStep = currentStep - 1;
    }
    
    this.setState({
      currentStep: currentStep
    });
  }

  childOnChangeListener(e:any){
    let val = e.target.value;
    let key = e.target.name;
    
    if(this._localForageService)
      this._localForageService.storeData(key, val);
  }

  handleSubmit(){     
    let message = "😊 Thank you for filling our survey!";
    
    if(!navigator.onLine) {
      if('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then(
            sw => {
                return sw.sync.register('dashboard-sync-test').then(x => {
                  message = "❗ You are offline, but no worries. Don't close/terminate your browser/app and we will send your data when you're back online!";
                  toast.warn(message, {
                    position: "bottom-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                  });
                  toast.info("You can still navigate through the site in the meantime.", {
                    position: "bottom-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 60
                  });

                });
            }
        )
      }
      
    } else {
      // TODO: send to server... 
      // then ...
      toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 60
      });
    }
  }

  public render() {
    return (
      <div className="container">
        <TestFormP1 currentStep={this.state.currentStep} onChangeRef={this.childOnChangeListener} localforageService={this._localForageService} />
        <TestFormP2 currentStep={this.state.currentStep} onChangeRef={this.childOnChangeListener}  localforageService={this._localForageService}/>  
        <TestFormP3 currentStep={this.state.currentStep} onChangeRef={this.childOnChangeListener}  localforageService={this._localForageService}/>  

        { this.state.currentStep != 1 ? <button className="btn btn-primary" onClick={this.prevFormPage}>Prev</button> : ''}      
        { this.state.currentStep != FORM_STEPS ? <button className="btn btn-primary float-right" onClick={this.nextFormPage}>Next</button> : ''} 

        { this.state.currentStep == FORM_STEPS ? <button className="btn btn-success float-right" onClick={this.handleSubmit}>Submit</button> : ''} 
        <ToastContainer />
      </div>
    );
  }
}
