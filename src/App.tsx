import * as React from 'react';
import Routes from './Routes';
import {Nav} from './components/Nav';
import NavOffline from './containers/nav/NavOffline';
//import { Redirect } from 'react-router';
//import { withRouter } from 'react-router-dom';

class App extends React.Component<{}, {}> {

  private xDown: any;
  private yDown: any;

  private routeCollection = [
    '/general',
    '/business',
    '/technology',
    '/sports',
    '/entertainment',
    '/science',
    '/health',
    '/survey'
  ];

  constructor(props: any) {
    super(props);

    this.isOffline = this.isOffline.bind(this);
    this.touchMoveHandler = this.touchMoveHandler.bind(this);
  }

  isOffline() {
    return !navigator.onLine
  }

  componentDidMount() {
    this.initSwipeListener();
  }

  initSwipeListener() {
    //document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    //document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    let containers = document.getElementsByClassName("container");
    if (containers && containers.length > 0) {
      containers[0].addEventListener('touchstart', this.handleTouchStart.bind(this), false);
      containers[0].addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    }
  }

  handleTouchStart(evt: any) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  };

  handleTouchMove(evt: any) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        console.log('left swipe');
        document.location.replace(this.pathToReplace("left"));
      } else {
        /* right swipe */
        console.log('right swipe');
        document.location.replace(this.pathToReplace("right"));
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }

  pathToReplace(dir: string) {
    let currentPath = window.location.pathname;
    let index = this.routeCollection.indexOf(currentPath);
    if (dir === "left") {
      if (index == this.routeCollection.length - 1) {
        return this.routeCollection[index]
      } else {
        return this.routeCollection[index + 1]
      }
    }
    else {
      if (index == 0) {
        return this.routeCollection[index]
      } else {
        return this.routeCollection[index - 1]
      }
    }
  }

  touchMoveHandler() {
    console.log('touchMoveHandler');
  } 

  public render() {
    return (
      <div>
        {this.isOffline() ? <h3 className="offline-h3"> Offline experience </h3> : ''}
        <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
          {this.isOffline() ? <NavOffline /> : <Nav />}          
          {/* <Routes touchMoveHandler={this.touchMoveHandler} /> */}
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
