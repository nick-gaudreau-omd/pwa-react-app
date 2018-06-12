import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Survey from './pages/survey/Survey';
import ArticleContentContainer from './containers/article/Content';
import ArticleListContainer from './containers/article/List';
import Dashboard from './containers/admin/Dashboard';

class Routes extends React.Component<{ }, {}> {

    render() {
        return (
            <div>
                <Switch>
                    {/* {this.routeCollection} */}
                    {/* <Route exact={true} path='/' component={General} /> */}
                    {/* <Route path='/general/:category' render={ (props) => <General {...this.props} />  }  /> */}                    
                    <Route path='/news/:category' component={ArticleListContainer} />
                    <Route path='/content/:value' component={ArticleContentContainer} />
                    <Route path='/survey' component={Survey} />
                    <Route path='/admin' component={Dashboard} />
                    <Route path='/' component={ArticleListContainer} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;