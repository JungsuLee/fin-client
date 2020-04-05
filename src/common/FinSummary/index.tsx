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
    
    const renderSummaryElement = (title: string, amount: number) => <div className='space-between'>
        <div>{title}</div> 
        <div>{formatter.format(amount)}</div>
    </div>

    return (
        <Card className='summary-card'>
            <label className='title-text'>Financial Status</label>
            <div className='content'>
                {renderSummaryElement('일반헌금:', finSummary.totalAmount - finSummary.totalMissionaryOffering - finSummary.totalVehicleOffering - finSummary.totalConstructionOffering)}
                {renderSummaryElement('선교헌금:', finSummary.totalMissionaryOffering)}
                {renderSummaryElement('차량헌금:', finSummary.totalVehicleOffering)}
                {renderSummaryElement('건축헌금:', finSummary.totalConstructionOffering)}
                <div>-------------------------------------</div>
                {renderSummaryElement('Total:', finSummary.totalAmount)}
                {renderSummaryElement('Available:', finSummary.totalAmount - finSummary.totalMissionaryOffering - finSummary.totalVehicleOffering - finSummary.totalConstructionOffering)}
            </div>
        </Card>
    )
}