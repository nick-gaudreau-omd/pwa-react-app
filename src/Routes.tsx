import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NewsContainer from './pages/NewsContainer';
import Survey from './pages/survey/Survey';

class Routes extends React.Component<{ }, {}> {

    render() {
        return (
            <div>
                <Switch>
                    {/* {this.routeCollection} */}
                    {/* <Route exact={true} path='/' component={General} /> */}
                    {/* <Route path='/general/:category' render={ (props) => <General {...this.props} />  }  /> */}
                    <Route path='/news/:category' component={NewsContainer} />
                    <Route path='/survey' component={Survey} />
                    <Redirect to="/news/general" />
                </Switch>
            </div>
        );
    }
}

export default Routes;