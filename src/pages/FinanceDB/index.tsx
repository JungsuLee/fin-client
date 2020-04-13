import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFinData, cleanFinData } from '../../store/actions/finance';
import { IStoreState } from 'src/store/reducers';
import { months, formatter } from '../helpers';
import { Card, HTMLSelect } from '@blueprintjs/core';
import { isEmpty } from 'lodash'
import YearSelection from '../../common/YearSelection';


export default () => {
    const selectedYear = useSelector((state: IStoreState) => state.finance.selectedYear);
    const finData: IFinData = useSelector((state: IStoreState) => state.finance.finData);
    
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [dates, setDates] = useState<string[]>([]);
    const dispatch = useDispatch();
    
    const [totalOffering, setTotalOffering] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);


    // const [accGen, setAccGen] = useState<number>(0);
    // const [accMiss, setAccMiss] = useState<number>(0);
    // const [accVeh, setAccVeh] = useState<number>(0);
    // const [accCon, setAccCon] = useState<number>(0);

    
    useEffect(() => {
        console.log(finData);
        setSelectedDate('');
        setDates([]);
    }, [finData]);

    const renderFinTable = (finData: any, title: string, headers: string[]) => {
        const dateMap = new Set<string>();
        let totalAmount = 0;

        // let accGenOff = 0;
        // let accMissOff = 0;
        // let accVehOff = 0;
        // let accConOff = 0;

        return <Card>
            <h3>{title}</h3>
            <table className='bp3-html-table bp3-small'>
                <thead>
                    <tr>
                        {headers.map((header, i) => <th key={i}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {finData.map((fin: any, i) => {
                        let dateHidden = false;
                        let dateRowSpan = 0;
                        if(dateMap.has(fin.date)) {
                            dateHidden = true;
                        } else {
                            dateRowSpan = finData.filter((f: any) => f.date === fin.date).length;
                            dateMap.add(fin.date);
                        }

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

                        totalAmount += fin.amount;

                        return <tr key={i}>
                            {headers.includes('Date') && <td rowSpan={dateRowSpan} hidden={dateHidden}>{fin.date}</td>}
                            {headers.includes('Category') && <td>{fin.category}</td>}
                            {headers.includes('Amount') && <td className='amount-cell'>{formatter.format(fin.amount)}</td>}
                            {headers.includes('Description') && <td>{fin.description}</td>}
                        </tr>
                    })}
                    <tr className='total-amount-row'>
                        <td colSpan={2}>Total</td>
                        <td>{formatter.format(totalAmount)}</td>
                        <td hidden={title === 'Offering'}></td>
                    </tr>
                </tbody>
            </table>
        </Card>
    };

    const onSelectYear = (year: string) => {
        if (year) {
            dispatch(getFinData(year));
        } else {
            dispatch(cleanFinData());
        }
        setSelectedMonth('');
    }

    const renderMonthSelect = () => {
        const onSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
            let month = e.target.value;
            setSelectedMonth(month);
            setSelectedDate('');
            if (month) {
                const totalOffering = finData.offerings.filter((offering) => offering.date.split('/')[0] === month).map((offering) => offering.amount).reduce((a, b) => a + b, 0);
                const totalExpense = finData.expenses.filter((expense) => expense.date.split('/')[0] === month).map((expense) => expense.amount).reduce((a, b) => a + b, 0);
                const totalRevenue = finData.revenues.filter((revenue) => revenue.date.split('/')[0] === month).map((revenue) => revenue.amount).reduce((a, b) => a + b, 0);
                setTotalOffering(totalOffering);
                setTotalExpense(totalExpense);
                setTotalRevenue(totalRevenue);
            }
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
            if (date) {
                const totalOffering = finData.offerings.filter((offering) => offering.date === date).map((offering) => offering.amount).reduce((a, b) => a + b, 0);
                const totalExpense = finData.expenses.filter((expense) => expense.date === date).map((expense) => expense.amount).reduce((a, b) => a + b, 0);
                const totalRevenue = finData.revenues.filter((revenue) => revenue.date === date).map((revenue) => revenue.amount).reduce((a, b) => a + b, 0);
                setTotalOffering(totalOffering);
                setTotalExpense(totalExpense);
                setTotalRevenue(totalRevenue);
            }
        }
        return <HTMLSelect value={selectedDate} onChange={onSelectDate} disabled={!selectedYear}>
            <option value=''>Date</option>
            {dates.map((date, i) => <option key={i} value={date}>{date}</option>)}
        </HTMLSelect>
    };

    const renderSplitter = <div>-------------------------------------</div>;
    const renderSummaryElement = (title: string, amount: number) => <div className='space-between'>
        <div>{title}</div> 
        <div className={amount < 0 ? 'minus' : ''}>{formatter.format(amount)}</div>
    </div>
    const renderFinAnualSummary = () => {
        const totalOffering = finData.totalGeneralOffering + finData.totalSpecialOffering;
        const totalIncome = totalOffering + finData.totalRevenue;
        return <Card className='annual-summary-card'>
            <table className='bp3-html-table bp3-small bp3-html-table-striped'>
                <thead>
                    <tr>
                        <th className='border-right'>Annual Summary</th>
                        <th>일반헌금</th>
                        <th className='border-right'>특별헌금</th>
                        <th>Offering</th>
                        <th>Revenue</th>
                        <th className='border-right'>Expense</th>
                        <th>Difference</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border-right'>{selectedYear}</td>
                        <td>{formatter.format(finData.totalGeneralOffering)}</td>
                        <td className='border-right'>{formatter.format(finData.totalSpecialOffering)}</td>
                        <td>{formatter.format(totalOffering)}</td>
                        <td>{formatter.format(finData.totalRevenue)}</td>
                        <td className='border-right'>{formatter.format(finData.totalExpense)}</td>
                        <td className={totalIncome - finData.totalExpense < 0 ? 'minus' : ''}>{formatter.format(totalIncome - finData.totalExpense)}</td>
                    </tr>
                </tbody>
            </table>
        </Card>
    }
    const renderSubSummary = () => {
        let title = '';
        if (selectedMonth) {
            title = `${selectedYear} ${months[Number(selectedMonth) - 1]} Summary`; 
        } else if (selectedDate) {
            title = `${selectedDate}/${selectedYear} Summary`
        }
        return <Card className='summary-card'>
            <label className='title-text'>{title}</label>
            <div className='content'>
                {renderSummaryElement('Total Offering:', totalOffering)}
                {renderSummaryElement('Total Revenue:', totalRevenue)}
                {renderSummaryElement('Total Expense:', totalExpense)}
                {renderSplitter}
                {renderSummaryElement('Difference:', totalOffering - totalExpense + totalRevenue)}
            </div>
        </Card>
    }

    const renderOfferingSummary = () => {
        const { totalAmount, totalMissionaryOffering, totalVehicleOffering, totalConstructionOffering } = finData.finSummary;
        return (
            <Card>
                <table className='bp3-html-table bp3-small bp3-html-table-striped'>
                    <thead>
                        <tr>
                            <th>Current Balance</th>
                            <th>일반헌금</th>
                            <th>선교헌금</th>
                            <th>차량헌금</th>
                            <th>건축헌금</th>
                            <th>Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{formatter.format(totalAmount)}</td>
                            <td>{formatter.format(totalAmount - totalMissionaryOffering - totalVehicleOffering - totalConstructionOffering)}</td>
                            <td>{formatter.format(totalMissionaryOffering)}</td>
                            <td>{formatter.format(totalVehicleOffering)}</td>
                            <td>{formatter.format(totalConstructionOffering)}</td>
                            <td>{formatter.format(totalAmount - totalMissionaryOffering - totalVehicleOffering - totalConstructionOffering)}</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }

    return <div className='finance-db-page'>
        <div className='header'>
            <Card className='control-field'>
                <div>
                    <YearSelection onChange={onSelectYear} selectedYear={selectedYear} />
                    {renderMonthSelect()}
                    <label> or </label>
                    {renderDateSelect()}
                </div>
                <div>
                    {(!isEmpty(finData) && selectedYear) && renderFinAnualSummary()}
                    {(!isEmpty(finData) && selectedYear) && renderOfferingSummary()}
                </div>
            </Card>
        </div>
        {selectedYear &&
        <div className='finance-table-field'>
            <div>
                {finData.offerings && renderFinTable(finData.offerings, 'Offering', ['Date', 'Category', 'Amount'])}
                {finData.revenues && renderFinTable(finData.revenues, 'Revenue', ['Date', 'Category', 'Amount', 'Description'])}
            </div>
            {finData.expenses && renderFinTable(finData.expenses, 'Expense', ['Date', 'Category', 'Amount', 'Description'])}
            <div>
                {(selectedMonth || selectedDate) && renderSubSummary()}
            </div>
        </div>}
    </div>
}