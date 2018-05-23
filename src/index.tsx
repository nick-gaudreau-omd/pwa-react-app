import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
//import LocalServiceWorkerRegister from './local-sw-register';
import registerServiceWorker from './registerServiceWorker';
// import 'bootswatch/dist/darkly/bootstrap.min.css';
import 'bootswatch/dist/materia/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <div>
    <BrowserRouter>
      <App />
    </BrowserRouter>   
  </div>,
  document.getElementById('root') as HTMLElement
);

//LocalServiceWorkerRegister();
registerServiceWorker();

