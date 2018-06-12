import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { INavProps } from './INavProps';

export const Nav: React.SFC<INavProps> = (props) => {    
    return (
        <ul className="nav nav-tabs" ref={props.navElementRef}>
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
    );    
}