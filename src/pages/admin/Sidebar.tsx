import * as React from 'react';
import "./dashboard.css";

export default class Sidebar extends React.Component<{}, {}> {


    public render() {

        return (

            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">
                                <span data-feather="home"></span>
                                Dashboard <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Messages
                  </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Subscriptions
                  </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                API
                  </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Reports
                  </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Integrations
                  </a>
                        </li>
                    </ul>


                </div>
            </nav>


        );
    }
}
