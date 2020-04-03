import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../store/reducers';
import { getAnnualAnalytics } from '../../store/actions/analytics';
import { months, formatter } from '../helpers';


export default () => {
    
    const annaulAnalytics = useSelector((state: IStoreState) => state.analytics.annaulAnalytics) 
    const [annualData, setAnnualData] = useState<Object | null>(null);
    const [expenseTotals, setExpenseTotals] = useState<number[]>([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAnnualAnalytics('2019'))
    }, []);

    useEffect(() => {
        if (annaulAnalytics.length > 0) {
            let result = {};
            let totals: number[] = [];
            totals[12] = 0;
            annaulAnalytics.forEach((a) => {
                result[a.category] = {
                    ...result[a.category],
                    [a.month]: a.amount,
                    type: a.type,
                }
                if (result[a.category].total) {
                    result[a.category].total += a.amount;
                } else {
                    result[a.category].total = a.amount;
                }
                if (a.type === 'expense') {
                    totals[12] += a.amount;
                    if (totals[a.month - 1]) {
                        totals[a.month - 1] += a.amount;
                    } else {
                        totals[a.month - 1] = a.amount;
                    }
                }
            });
            setExpenseTotals(totals);
            setAnnualData(result);
        }
    }, [annaulAnalytics])

    const renderCell = (value: any, i?: number) => value ? <td key={i} className='align-right'>{formatter.format(value)}</td> : <td className='align-center'>-</td>;

    return <div className='analytics-page'>
        {annualData && 
        <table className='bp3-html-table bp3-html-table-striped bp3-small'>
            <thead>
                <tr>
                    <th>Category</th>
                    {months.map((m, i) => <th key={i}>{m}</th>)}
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(annualData).filter((a) => annualData[a].type === 'expense').map((a, i) => <tr key={i}>
                    <td>{a}</td>
                    {renderCell(annualData[a][1])}
                    {renderCell(annualData[a][2])}
                    {renderCell(annualData[a][3])}
                    {renderCell(annualData[a][4])}
                    {renderCell(annualData[a][5])}
                    {renderCell(annualData[a][6])}
                    {renderCell(annualData[a][7])}
                    {renderCell(annualData[a][8])}
                    {renderCell(annualData[a][9])}
                    {renderCell(annualData[a][10])}
                    {renderCell(annualData[a][11])}
                    {renderCell(annualData[a][12])}
                    {renderCell(annualData[a].total)}
                </tr>)}
                <tr>
                    <td>Total</td>
                    {expenseTotals.map((e, i) => renderCell(e, i))}
                </tr>
            </tbody>
        </table>
        }
    </div>
}
