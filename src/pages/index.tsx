import React from 'react';
import {
     Switch, Route, Link, NavLink, Redirect
} from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import Analytics from './Analytics';
import FinanceDB from './FinanceDB';

export default () => {
    return <div>
        <nav>
            <ul>
                <li>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='/finance-db'>Finance Database</NavLink>
                </li>
                <li>
                    <NavLink to='/analytics'>Analytics</NavLink>
                </li>
            </ul>
        </nav>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/analytics' component={Analytics} />
            <Route path='/finance-db' component={FinanceDB} />
            <Route path='/*' render={() => <Redirect to='/dashboard' />}  />
        </Switch>
    </div>
} 
