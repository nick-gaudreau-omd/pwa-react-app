import * as React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component<{}, {}> {

    render() {
        return (
            <ul className="nav nav-tabs">
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/general'>General</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/business'>Business</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/technology'>Tech</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/sports'>Sport</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/entertainment'>Entertainment</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/science'>Science</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/health'>Health</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/survey'>Survey</NavLink>
                </li>
            </ul>
            // <header className="masthead mb-auto">
            //     <div className="inner">
            //     {/* <h3 className="masthead-brand"><NavLink to='/'>News</NavLink></h3> */}
            //     <nav className="nav nav-masthead justify-content-center">
            //         <NavLink className="nav-link active" to='/general'>General</NavLink>
            //         <NavLink className="nav-link" to='/tech'>Tech</NavLink>
            //         <a className="nav-link" href="#">Business</a>
            //         <NavLink className="nav-link" to='/sport'>Sport</NavLink>
            //         <a className="nav-link" href="#">Contact</a>
            //     </nav>
            //     </div>
            // </header>
        );
    }
}

export default Nav;