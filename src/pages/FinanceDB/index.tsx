import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOfferings } from '../../store/actions/finance';
import { IStoreState } from 'src/store/reducers';

import {} from '@blueprintjs/core';

export default () => {
    const offerings: IOffering[] = useSelector((state: IStoreState) => state.finance.offerings);
    const dispatch = useDispatch();
    const onClickGetOffering = () => dispatch(getOfferings());
    useEffect(() => {
        console.log(offerings);
    }, [offerings])
    const renderOfferingTable = () => {
        return <table className='bp3-html-table bp3-html-table-striped bp3-small'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {offerings.map((offering) => <tr key={offering.id}>
                    <td>{offering.date}</td>
                    <td>${offering.amount.toFixed(2)}</td>
                </tr>)}
            </tbody>
        </table>
    }

    return <div>
        Finance DB
        <button onClick={onClickGetOffering}>get offerings</button>
        {offerings.length > 0 && renderOfferingTable()}
    </div>
}