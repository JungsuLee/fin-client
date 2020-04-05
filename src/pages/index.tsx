import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import AnnualSettlement from './AnnualSettlement';
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
                    <NavLink to='/annual-settlement'>Annual Settlement</NavLink>
                </li>
            </ul>
        </nav>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/annual-settlement' component={AnnualSettlement} />
            <Route path='/finance-db' component={FinanceDB} />
            <Route path='/*' render={() => <Redirect to='/dashboard' />}  />
        </Switch>
    </div>
} 
