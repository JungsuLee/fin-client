import React from 'react';
import {
     Switch, Route, Link, NavLink, Redirect
} from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import FinanceManagement from './FinanceManagement';

export default () => {
    return <div>
        <nav>
            <ul>
                <li>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='/finance-management'>Finance Management</NavLink>
                </li>
            </ul>
        </nav>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/finance-management' component={FinanceManagement} />
            <Route path='/*' render={() => <Redirect to='/dashboard' />}  />
        </Switch>
    </div>
} 
