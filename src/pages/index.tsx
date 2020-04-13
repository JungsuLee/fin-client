import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import AnnualSettlement from './AnnualSettlement';
import FinanceDB from './FinanceDB';

import FinSummary from '../common/FinSummary';
import { Card } from '@blueprintjs/core';

export default () => {
    return <div>
        <Card className='space-between'>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName='active' to='/dashboard'>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/finance-db'>Finance Database</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/annual-settlement'>Annual Settlement</NavLink>
                    </li>
                </ul>
            </nav>
            <FinSummary />
        </Card>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/annual-settlement' component={AnnualSettlement} />
            <Route path='/finance-db' component={FinanceDB} />
            <Route path='/*' render={() => <Redirect to='/dashboard' />}  />
        </Switch>
    </div>
} 
