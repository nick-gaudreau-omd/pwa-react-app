import * as React from 'react';
import "./dashboard.css";
import DashboardNav from './DashboardNav';
import Sidebar from './Sidebar';



export default class Dashboard extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        
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
                                        <button className="btn btn-sm btn-outline-secondary" onClick={this.handleClick}>Share</button>
                                        <button className="btn btn-sm btn-outline-secondary" onClick={this.handleClick}>Export</button>
                                    </div>
                                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                        <span data-feather="calendar"></span>
                                        This week
                                    </button>
                                </div>
                            </div>

                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
