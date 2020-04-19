import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../store/reducers';
import { getAnnualAnalytics, cleanAnnualAnalytics } from '../../store/actions/analytics';
import { months, formatter } from '../helpers';
import { Card } from '@blueprintjs/core';
import YearSelection from '../../common/YearSelection';
import BarChart from '../../common/Analytics/BarChart';

export default () => {
    
    const years = useSelector((state: IStoreState) => state.finance.years);
    const annaulAnalytics = useSelector((state: IStoreState) => state.analytics.annaulAnalytics);
    const selectedYear = useSelector((state: IStoreState) => state.analytics.selectedYear);
    const [annualExpenseData, setAnnualExpenseData] = useState<null | Object>(null);
    const [expenseTotals, setExpenseTotals] = useState<number[]>([]);
    const [annualOfferingData, setAnnualOfferingData] = useState<null | Object>(null);
    const [offeringTotals, setOfferingTotals] = useState<number[]>([]);
    const [annualRevenueData, setAnnualRevenueData] = useState<null | Object>(null);
    const [revenueTotals, setRevenueTotals] = useState<number[]>([]);
    const [annualTotals, setAnnualTotals] = useState([]);
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (!selectedYear) {
            cleanUp();
            dispatch(cleanAnnualAnalytics());
        }
    }, [selectedYear])

    useEffect(() => {
        if (annaulAnalytics && annaulAnalytics.length > 0) {
            let expense = {};
            let offering = {};
            let revenue = {};
            let expenseTotals: number[] = new Array(13).fill(0);
            let offeringTotals: number[] = new Array(13).fill(0);
            let revenueTotals: number[] = new Array(13).fill(0);
            annaulAnalytics.forEach((a) => {
                if (a.type === 'expense') {
                    if (!expense[a.category]) {
                        expense[a.category] = {
                            total: 0,
                        };
                    } 
                    expense[a.category][a.month] = a.amount;
                    expense[a.category].total += a.amount;
                    expenseTotals[12] += a.amount;
                    expenseTotals[a.month - 1] += a.amount;
                } else if (a.type === 'offering') {
                    if (!offering[a.category]) {
                        offering[a.category] = {
                            total: 0,
                        };
                    } 
                    offering[a.category][a.month] = a.amount;
                    offering[a.category].total += a.amount;
                    offeringTotals[12] += a.amount;
                    offeringTotals[a.month - 1] += a.amount;
                } else if (a.type === 'revenue') {
                    if (!revenue[a.category]) {
                        revenue[a.category] = {
                            total: 0,
                        };
                    } 
                    revenue[a.category][a.month] = a.amount;
                    revenue[a.category].total += a.amount;
                    revenueTotals[12] += a.amount;
                    revenueTotals[a.month - 1] += a.amount;
                }
            });
            let totals: any = [];
            for (let i = 0; i < 12; i++) {
                totals.push(offeringTotals[i], expenseTotals[i],  revenueTotals[i])
            }
            setAnnualTotals(totals);
            setAnnualExpenseData(expense);            
            setExpenseTotals(expenseTotals);
            setAnnualOfferingData(offering);
            setOfferingTotals(offeringTotals);
            setAnnualRevenueData(revenue);
            setRevenueTotals(revenueTotals);
        }
    }, [annaulAnalytics])
    const cleanUp = () => {
        setAnnualExpenseData(null);            
        setExpenseTotals(new Array(13).fill(0));
        setAnnualOfferingData(null);
        setOfferingTotals(new Array(13).fill(0));
        setAnnualRevenueData(null);
        setRevenueTotals(new Array(13).fill(0));
        setAnnualTotals([]);
    }
    const renderCell = (value: any, i?: number) => value ? <td key={i} className={`align-right ${value < 0 && 'minus'}`}>{formatter.format(value)}</td> : <td key={i} className='align-center'>-</td>;
    const tableClassName = 'bp3-html-table bp3-html-table-striped bp3-small bp3-interactive';
    const renderAnnualTable = (title: string, data, totals) => {
        if (data) {
            return (
                <Card>
                    <h3>{selectedYear} {title}</h3>
                    <table className={tableClassName}>
                        <thead>
                            <tr>
                                <th>Category</th>
                                {months.map((m, i) => <th key={i}>{m}</th>)}
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data).map((a, i) => { 
                                return (
                                    <tr key={i}>
                                        <td>{a}</td>
                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => renderCell(data[a][n], n))}
                                        {renderCell(data[a].total)}
                                    </tr>
                                )
                            })}
                            <tr>
                                <td>Total</td>
                                {totals.map((e, i) => renderCell(e, i))}
                            </tr>
                        </tbody>
                    </table>
                </Card>
            )
        }
    }    

    const onSelectYear = (year: string) => {
        if (year) {
            dispatch(getAnnualAnalytics(year));
        } else {
            dispatch(cleanAnnualAnalytics());
        }
    }

    const renderAnnualSummary = () => {
        if (annualExpenseData && annualOfferingData && annualRevenueData) {
            return (
                <Card>
                    <h3>{selectedYear} Summary</h3>
                    <table className={tableClassName}>
                        <thead>
                            <tr>
                                <th>Type</th>
                                {months.map((m, i) => <th key={i}>{m}</th>)}
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Offering</td>
                                {offeringTotals.map((o, i) => renderCell(o, i))}
                            </tr>
                            <tr>
                                <td>Revenue</td>
                                {revenueTotals.map((r, i) => renderCell(r, i))}
                            </tr>
                            <tr>
                                <td>Expense</td>
                                {expenseTotals.map((e, i) => renderCell(e, i))}
                            </tr>
                            <tr>
                                <td>Difference</td>
                                {offeringTotals.map((o, i) => renderCell(o + revenueTotals[i] - expenseTotals[i], i))}
                            </tr>
                        </tbody>
                    </table>
                </Card>
            )
        }
    }
    
    

    return <div className='analytics-page'>
        <Card className='header'>
            <YearSelection years={years} selectedYear={selectedYear} onChange={onSelectYear} />
            {annualTotals.length > 0 && <BarChart title={`${selectedYear} Annual Summary`} data={annualTotals} />}
        </Card>
        {renderAnnualSummary()}
        {renderAnnualTable('Expense', annualExpenseData, expenseTotals)}
        {renderAnnualTable('Offering', annualOfferingData, offeringTotals)}
        {renderAnnualTable('Revenue', annualRevenueData, revenueTotals)}
    </div>
}
