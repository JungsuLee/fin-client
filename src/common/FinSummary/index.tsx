import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
import { IStoreState } from '../../store/reducers';
import { getFinSummary } from '../../store/actions/finance';
import { formatter } from '../../pages/helpers';


export default () => {
    const finSummary = useSelector((state: IStoreState) => state.finance.finSummary);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isEmpty(finSummary)) {
            dispatch(getFinSummary());
        }
    }, [finSummary]);
    const today = new Date();
    const dateString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    return (
        <Card className='summary-card'>
            <table className='bp3-html-table bp3-html-table-striped bp3-small'>
                <thead>
                    <tr>
                        <th className='border-right'>Current Status</th>
                        <th>일반헌금</th>
                        <th>선교헌금</th>
                        <th>차량헌금</th>
                        <th className='border-right'>건축헌금</th>
                        <th className='border-right'>Total</th>
                        <th>Available</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border-right'>{dateString}</td>
                        <td>{formatter.format(finSummary.totalAmount - finSummary.totalMissionaryOffering - finSummary.totalVehicleOffering - finSummary.totalConstructionOffering)}</td>
                        <td>{formatter.format(finSummary.totalMissionaryOffering)}</td>
                        <td>{formatter.format(finSummary.totalVehicleOffering)}</td>
                        <td className='border-right'>{formatter.format(finSummary.totalConstructionOffering)}</td>
                        <td className='border-right'>{formatter.format(finSummary.totalAmount)}</td>
                        <td>{formatter.format(finSummary.totalAmount - finSummary.totalMissionaryOffering - finSummary.totalVehicleOffering - finSummary.totalConstructionOffering)}</td>
                    </tr>
                </tbody>
            </table>
        </Card>
    )
}