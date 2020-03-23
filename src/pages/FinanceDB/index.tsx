import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFinData, getFinSummary } from '../../store/actions/finance';
import { IStoreState } from 'src/store/reducers';

import { Card, HTMLSelect } from '@blueprintjs/core';

export default () => {
    const finData: IFinData = useSelector((state: IStoreState) => state.finance.finData);
    const finSummary: IFinSummary = useSelector((state: IStoreState) => state.finance.finSummary);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [dates, setDates] = useState<string[]>([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(finData);
        setSelectedDate('');
        setDates([]);
    }, [finData]);

    useEffect(() => {
        dispatch(getFinSummary());
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const renderFinTable = (finData: any, title: string, headers: string[]) => {
        return <Card>
            <h3>{title}</h3>
            <table className='bp3-html-table bp3-html-table-striped bp3-small'>
                <thead>
                    <tr>
                        {headers.map((header, i) => <th key={i}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {finData.map((fin: any, i) => {
                        if (!dates.includes(fin.date)) {
                            dates.push(fin.date);
                            setDates(dates);
                        }
                        if (selectedDate && fin.date !== selectedDate) {
                            return
                        }
                        if (selectedMonth && fin.date.split('/')[0] !== selectedMonth) {
                            return
                        }
                        return <tr key={i}>
                            {headers.includes('Date') && <td>{fin.date}</td>}
                            {headers.includes('Category') && <td>{fin.category}</td>}
                            {headers.includes('Team') && <td>{fin.team}</td>}
                            {headers.includes('Amount') && <td className='amount-cell'>{formatter.format(fin.amount)}</td>}
                            {headers.includes('Description') && <td>{fin.description}</td>}
                        </tr>
                    })}
                </tbody>
            </table>
        </Card>
    };

    const renderYearSelect = () => {
        const years = ['2020', '2019']
        const onSelectYear = (e: ChangeEvent<HTMLSelectElement>) => {
            const year = e.target.value;
            if (year) {
                dispatch(getFinData(year));
            }
            setSelectedYear(year);
            setSelectedMonth('');
        }
        return <HTMLSelect onChange={onSelectYear}>
            <option value=''>Year</option>
            {years.map((year, i) => <option key={i} value={year}>{year}</option>)}
        </HTMLSelect>
    };

    const renderMonthSelect = () => {
        const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        const onSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
            let month = e.target.value;
            setSelectedMonth(month);
            setSelectedDate('');
        }
        return <HTMLSelect className='month-select' value={selectedMonth} onChange={onSelectMonth} disabled={!selectedYear}>
            <option value=''>Month</option>
            {months.map((month, i) => <option key={i} value={`${i + 1}`.length === 1 ? `0${i + 1}` : `${i + 1}`}>{month}</option>)}
        </HTMLSelect>
    };

    const renderDateSelect = () => {
        const onSelectDate = (e: ChangeEvent<HTMLSelectElement>) => {
            const date = e.target.value;
            setSelectedDate(date);
            setSelectedMonth('');
        }
        return <HTMLSelect value={selectedDate} onChange={onSelectDate} disabled={!selectedYear}>
            <option value=''>Date</option>
            {dates.map((date, i) => <option key={i} value={date}>{date}</option>)}
        </HTMLSelect>
    };

    const renderSummaryElement = (title: string, amount: number) => <div className='space-between'>
        <div>{title}</div> 
        <div>{formatter.format(amount)}</div>
    </div>
    const renderFinSummary = () => {
        return <Card className='summary-card'>
            <label className='title-text'>Total Offering Summary</label>
            <div className='content'>
                {renderSummaryElement('일반헌금:', finSummary.totalAmount - finSummary.totalMissionaryOffering - finSummary.totalVehicleOffering - finSummary.totalConstructionOffering)}
                {renderSummaryElement('선교헌금:', finSummary.totalMissionaryOffering)}
                {renderSummaryElement('차량헌금:', finSummary.totalVehicleOffering)}
                {renderSummaryElement('건축헌금:', finSummary.totalConstructionOffering)}
                <div>-------------------------------------</div>
                {renderSummaryElement('Total:', finSummary.totalAmount)}
            </div>
        </Card>
    }
    const renderFinAnualSummary = () => {
        return <Card className='summary-card'>
            <label className='title-text'>{`${selectedYear} Summary`}</label>
            <div className='content'>
                {renderSummaryElement('일반헌금:', finData.totalGeneralOffering)}
                {renderSummaryElement('노회(1.5%):', finData.totalGeneralOffering * 0.015)}
                {renderSummaryElement('총회(0.5%):', finData.totalGeneralOffering * 0.005)}
            </div>
        </Card>
    }
    // const renderMonthlySummary = () => {
    //     finData
    // }

    return <div className='finance-db-page'>
        <div className='header'>
            <Card className='control-field'>
                <div>
                    {renderYearSelect()}
                    {renderMonthSelect()}
                    <label> or </label>
                    {renderDateSelect()}
                </div>
                <div className='flex'>
                    {finData.totalGeneralOffering && renderFinAnualSummary()}
                    {finSummary.totalAmount && renderFinSummary()}
                </div>
            </Card>
        </div>
        <div className='finance-table-field'>
            {finData.offerings && renderFinTable(finData.offerings, 'Offering', ['Date', 'Category', 'Amount'])}
            {finData.expenses && renderFinTable(finData.expenses, 'Expense', ['Date', 'Team', 'Amount', 'Description'])}
            {finData.revenues && renderFinTable(finData.revenues, 'Revenue', ['Date', 'Team', 'Amount', 'Description'])}
        </div>
    </div>
}