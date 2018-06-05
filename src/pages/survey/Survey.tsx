import * as React from 'react';
import TestFormP1  from './TestFormP1';
import TestFormP2  from './TestFormP2';
import TestFormP3  from './TestFormP3';
import { LocalStoreService } from '../../service/LocalStoreService';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
import 'react-toastify/dist/ReactToastify.min.css';
import { LocalForageService } from '../../service/LocalForageService';

const FORM_STEPS = 3;

export default class Survey extends React.Component<{match:any},  {currentStep:number}> {

  private readonly _localForageService:LocalForageService;

  constructor(props: any) {
    super(props);    
    this.state = {
      currentStep : 1
    }

    this._localForageService = new LocalForageService();

    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this.childOnChangeListener = this.childOnChangeListener.bind(this);
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
  }

  private _next() {
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
   
  private _prev() {
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

    // console.log(key);
    // console.log(val);
  }

  notify(){     
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

        { this.state.currentStep != 1 ? <button className="btn btn-primary" onClick={this._prev}>Prev</button> : ''}      
        { this.state.currentStep != FORM_STEPS ? <button className="btn btn-primary float-right" onClick={this._next}>Next</button> : ''} 

        { this.state.currentStep == FORM_STEPS ? <button className="btn btn-success float-right" onClick={this.notify}>Submit</button> : ''} 
        <ToastContainer />
      </div>
    );
  }
}
