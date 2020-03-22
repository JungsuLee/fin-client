import React, { useEffect, useState, FormEventHandler, ChangeEvent, ReactChildren, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFinData } from '../../store/actions/finance';
import { IStoreState } from 'src/store/reducers';

import { Card, InputGroup, HTMLSelect } from '@blueprintjs/core';

export default () => {
    const finData: IFinData = useSelector((state: IStoreState) => state.finance.data);
    const [searchString, setSearchString] = useState<string>('');
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
                        const date = new Date(fin.date);
                        const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
                        if (!dates.includes(dateString)) {
                            dates.push(dateString);
                            setDates(dates);
                        }
                        if (selectedDate && dateString !== selectedDate) {
                            return
                        }
                        if (selectedMonth && dateString.split('/')[0] !== selectedMonth) {
                            return
                        }
                        return <tr key={i}>
                            {headers.includes('Date') && <td>{dateString}</td>}
                            {headers.includes('Category') && <td>{fin.category}</td>}
                            {headers.includes('Team') && <td>{fin.team}</td>}
                            {headers.includes('Amount') && <td className='amount-col'>
                                <div>$</div>
                                <div>{fin.amount.toFixed(2)}</div>
                            </td>}
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
            <option value=''>Select Year</option>
            {years.map((year, i) => <option key={i} value={year}>{year}</option>)}
        </HTMLSelect>
    };

    const renderMonthSelect = () => {
        const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        const onSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
            const month = e.target.value;
            setSelectedMonth(month);
            setSelectedDate('');
        }
        return <HTMLSelect value={selectedMonth} onChange={onSelectMonth} disabled={!selectedYear}>
            <option value=''>Select Month</option>
            {months.map((month, i) => <option key={i} value={`${i + 1}`}>{month}</option>)}
        </HTMLSelect>
    };

    const renderDateSelect = () => {
        const onSelectDate = (e: ChangeEvent<HTMLSelectElement>) => {
            const date = e.target.value;
            setSelectedDate(date);
            setSelectedMonth('');
        }
        return <HTMLSelect value={selectedDate} onChange={onSelectDate} disabled={!selectedYear}>
            <option value=''>Select Date</option>
            {dates.map((date, i) => <option key={i} value={date}>{date}</option>)}
        </HTMLSelect>
    };

    return <div className='finance-db-page'>
        {renderYearSelect()}
        {renderMonthSelect()}
        <label> or </label>
        {renderDateSelect()}
        <InputGroup leftIcon='search' value={searchString} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)} />
        <div className='finance-table-field'>
            {finData.offerings && renderFinTable(finData.offerings, 'Offering', ['Date', 'Category', 'Amount', 'Description'])}
            {finData.expenses && renderFinTable(finData.expenses, 'Expense', ['Date', 'Team', 'Amount', 'Description'])}
            {finData.revenues && renderFinTable(finData.revenues, 'Revenue', ['Date', 'Team', 'Amount', 'Description'])}
        </div>
    </div>
}