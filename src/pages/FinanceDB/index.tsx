import React, { useEffect, useState, FormEventHandler, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFinData } from '../../store/actions/finance';
import { IStoreState } from 'src/store/reducers';

import { Card, InputGroup } from '@blueprintjs/core';

export default () => {
    const finData: IFinData = useSelector((state: IStoreState) => state.finance.data);
    const [searchString, setSearchString] = useState<string>('');
    const dispatch = useDispatch();
    const onClickGetFinData = () => dispatch(getFinData());
    useEffect(() => {
        console.log(finData);
    }, [finData])
    const renderOfferingTable = (offerings: IOffering[]) => {
        return <Card>
            <h3>Offering</h3>
            <table className='bp3-html-table bp3-html-table-striped bp3-small'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {offerings.map((offering, i) => {
                        if (searchString && !offering.date.includes(searchString)) {
                            return
                        }
                        return <tr key={i}>
                            <td>{offering.date.split(' ')[0]}</td>
                            <td>{offering.category}</td>
                            <td>${offering.amount.toFixed(2)}</td>
                            <td>{offering.description}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </Card>
    }
    const renderExpenseTable = (expenses: IExpense[]) => {
        return <Card>
            <h3>Expense</h3>
            <table className='bp3-html-table bp3-html-table-striped bp3-small'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Team</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, i) => {
                        if (searchString && !expense.date.includes(searchString)) {
                            return
                        }
                        return <tr key={i}>
                            <td>{expense.date.split(' ')[0]}</td>
                            <td>{expense.team}</td>
                            <td>${expense.amount.toFixed(2)}</td>
                            <td>{expense.description}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </Card>
    }
    // const renderExpenseTable = (expenses: IExpense[]) => {
    //     return <div>
    //         <h3>Expense</h3>
    //         <table className='bp3-html-table bp3-html-table-striped bp3-small'>
    //             <thead>
    //                 <tr>
    //                     <th>Date</th>
    //                     <th>Team</th>
    //                     <th>Amount</th>
    //                     <th>Description</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {expenses.map((expense, i) => <tr key={i}>
    //                     <td>{expense.date.split(' ')[0]}</td>
    //                     <td>{expense.team}</td>
    //                     <td>${expense.amount.toFixed(2)}</td>
    //                     <td>{expense.description}</td>
    //                 </tr>)}
    //             </tbody>
    //         </table>
    //     </div>
    // }

    return <div className='finance-db-page'>
        Finance DB
        <button onClick={onClickGetFinData}>get finance data</button>
        <InputGroup leftIcon='search' value={searchString} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)} />
        <div className='finance-table-field'>
            {finData.offerings && renderOfferingTable(finData.offerings)}
            {finData.revenues && renderExpenseTable(finData.expenses)}
        </div>
    </div>
}