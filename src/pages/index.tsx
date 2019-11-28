import React from 'react';
import {
    BrowserRouter, Switch, Route, Link, NavLink
} from 'react-router-dom';

export default () => {
    return <BrowserRouter >
    <div>
        <nav>
            <ul>
                <li>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>
            </ul>
        </nav>
    </div>
    </BrowserRouter >
} 
