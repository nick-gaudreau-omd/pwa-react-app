import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Survey from './pages/survey/Survey';
import NewsContent from './pages/news/Content';
import NewsContainer from './pages/news/Container';
import Dashboard from './pages/admin/Dashboard';

class Routes extends React.Component<{ }, {}> {

    render() {
        return (
            <div>
                <Switch>
                    {/* {this.routeCollection} */}
                    {/* <Route exact={true} path='/' component={General} /> */}
                    {/* <Route path='/general/:category' render={ (props) => <General {...this.props} />  }  /> */}                    
                    <Route path='/news/:category' component={NewsContainer} />
                    <Route path='/content/:value' component={NewsContent} />
                    <Route path='/survey' component={Survey} />
                    <Route path='/admin' component={Dashboard} />
                    <Route path='/' component={NewsContainer} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;