import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFinData, cleanFinData } from '../../store/actions/finance';
import { IStoreState } from 'src/store/reducers';
import { months, formatter } from '../helpers';
import { Card, HTMLSelect } from '@blueprintjs/core';
import { isEmpty } from 'lodash'
import YearSelection from '../../common/YearSelection';


export default () => {
    const years = useSelector((state: IStoreState) => state.finance.years);
    const selectedYear = useSelector((state: IStoreState) => state.finance.selectedYear);
    const finData: IFinData = useSelector((state: IStoreState) => state.finance.finData);
    
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [dates, setDates] = useState<string[]>([]);
    const dispatch = useDispatch();
    
    const [totalOffering, setTotalOffering] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);

    const [accOffering, setAccOffering] = useState<number>(0);
    const [accExpense, setAccExpense] = useState<number>(0);
    const [accRevenue, setAccRevenue] = useState<number>(0);
    const [accMiss, setAccMiss] = useState<number>(0);
    const [accVeh, setAccVeh] = useState<number>(0);
    const [accCon, setAccCon] = useState<number>(0);

    
    useEffect(() => {
        console.log(finData);
        setSelectedDate('');
        setDates([]);
    }, [finData]);

    const renderFinTable = (finData: any, title: string, headers: string[]) => {
        const dateMap = new Set<string>();
        let totalAmount = 0;

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
                let totalOffering = 0;
                let accOffering = 0;
                let accMissOffering = 0;
                let accVehOffering = 0;
                let accConOffering = 0;
                finData.offerings.forEach((offering) => {
                    const m = offering.date.split('/')[0];
                    const { amount, category } = offering;
                    if (m === month) {
                        totalOffering += amount;
                    }
                    if (m <= month) {
                        accOffering += amount;
                    }
                    if (m <= month && category === '선교헌금') {
                        accMissOffering += amount;
                    }
                    if (m <= month && category === '차량헌금') {
                        accVehOffering += amount;
                    }
                    if (m <= month && category === '건축헌금') {
                        accConOffering += amount;
                    }
                });
                setTotalOffering(totalOffering);
                setAccOffering(accOffering);

                let totalExpense = 0;
                let accExpense = 0;
                let accMissExpense = 0;
                let accVehExpense = 0;
                let accConExpense = 0;
                finData.expenses.forEach((expense: IExpense) => {
                    const m = expense.date.split('/')[0];
                    const { amount, category } = expense;
                    if (m === month) {
                        totalExpense += amount;
                    }
                    if (m <= month) {
                        accExpense += amount;
                    }
                    if (m <= month && category === '전도사역') {
                        accMissExpense += amount;
                    }
                    if (m <= month && category === '차량 지정') {
                        accVehExpense += amount;
                    }
                    if (m <= month && category === '건축사역') {
                        accConExpense += amount;
                    }
                });
                setTotalExpense(totalExpense);
                setAccExpense(accExpense);
                setAccMiss(accMissOffering - accMissExpense);
                setAccVeh(accVehOffering - accVehExpense);
                setAccCon(accConOffering - accConExpense);

                let totalRevenue = 0;
                let accRevenue = 0;
                finData.revenues.forEach((revenue) => {
                    const m = revenue.date.split('/')[0];
                    const { amount, category } = revenue;
                    if (m === month) {
                        totalRevenue += amount;
                    }
                    if (m <= month)  {
                        accRevenue += amount;
                    }
                });
                setTotalRevenue(totalRevenue);
                setAccRevenue(accRevenue);
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
                const selM = date.split('/')[0];
                const selD = date.split('/')[1];

                let totalOffering = 0;
                let accOffering = 0;
                let accMissOffering = 0;
                let accVehOffering = 0;
                let accConOffering = 0;
                finData.offerings.forEach((offering) => {
                    const m = offering.date.split('/')[0];
                    const d = offering.date.split('/')[1];
                    const { amount, category } = offering;
                    if (offering.date === date) {
                        totalOffering += amount;
                    }
                    if (m <= selM && d <= selD) {
                        accOffering += amount;
                    }
                    if (m <= selM && d <= selD && category === '선교헌금') {
                        accMissOffering += amount;
                    }
                    if (m <= selM && d <= selD && category === '차량헌금') {
                        accVehOffering += amount;
                    }
                    if (m <= selM && d <= selD && category === '건축헌금') {
                        accConOffering += amount;
                    }
                });
                setTotalOffering(totalOffering);
                setAccOffering(accOffering);

                let totalExpense = 0;
                let accExpense = 0;
                let accMissExpense = 0;
                let accVehExpense = 0;
                let accConExpense = 0;
                finData.expenses.forEach((expense: IExpense) => {
                    const m = expense.date.split('/')[0];
                    const d = expense.date.split('/')[1];
                    const { amount, category } = expense;
                    if (expense.date === date) {
                        totalExpense += amount;
                    }
                    if (m <= selM && d <= selD) {
                        accExpense += amount;
                    }
                    if (m <= selM && d <= selD && category === '전도사역') {
                        accMissExpense += amount;
                    }
                    if (m <= selM && d <= selD && category === '차량 지정') {
                        accVehExpense += amount;
                    }
                    if (m <= selM && d <= selD && category === '건축사역') {
                        accConExpense += amount;
                    }
                });
                setTotalExpense(totalExpense);
                setAccExpense(accExpense);
                setAccMiss(accMissOffering - accMissExpense);
                setAccVeh(accVehOffering - accVehExpense);
                setAccCon(accConOffering - accConExpense);

                let totalRevenue = 0;
                let accRevenue = 0;
                finData.revenues.forEach((revenue) => {
                    const m = revenue.date.split('/')[0];
                    const d = revenue.date.split('/')[1];
                    const { amount, category } = revenue;
                    if (revenue.date === date) {
                        totalRevenue += amount;
                    }
                    if (m <= selM && d <= selD)  {
                        accRevenue += amount;
                    }
                });
                setTotalRevenue(totalRevenue);
                setAccRevenue(accRevenue);
            }
        }
        return <HTMLSelect value={selectedDate} onChange={onSelectDate} disabled={!selectedYear}>
            <option value=''>Date</option>
            {dates.map((date, i) => <option key={i} value={date}>{date}</option>)}
        </HTMLSelect>
    };

    const renderSummaryElement = (title: string, amount: number, split?: boolean) => <div className={`space-between ${split && 'border-top'}`}>
        <div>{title}</div> 
        <div className={amount < 0 ? 'minus' : ''}>{formatter.format(amount)}</div>
    </div>
    const renderFinAnualSummary = () => {
        const totalOffering = finData.totalGeneralOffering + finData.totalSpecialOffering;
        const totalIncome = totalOffering + finData.totalRevenue;
        return <Card className='annual-summary-card'>

            <label className='title-text'>{selectedYear} Summary</label>
            <div className='content'>
                {renderSummaryElement('일반헌금:', finData.totalGeneralOffering)}
                {renderSummaryElement('특별헌금:', finData.totalSpecialOffering)}
                {renderSummaryElement('Offering:', totalOffering, true)}
                {renderSummaryElement('Revenue:', finData.totalRevenue)}
                {renderSummaryElement('Expense:', finData.totalExpense)}
                {renderSummaryElement('Difference:', totalIncome - finData.totalExpense, true)}
            </div>
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
                {renderSummaryElement('Difference:', totalOffering - totalExpense + totalRevenue, true)}
            </div>
        </Card>
    }

    const renderOfferingSummary = () => {
        const { totalAmount, totalMissionaryOffering, totalVehicleOffering, totalConstructionOffering } = finData.finSummary;
        return (
            <table className='bp3-html-table bp3-small bp3-html-table-striped border'>
                <thead>
                    <tr>
                        <th className='border-right'>{selectedMonth || selectedDate}/{selectedYear} Balance</th>
                        <th>선교헌금</th>
                        <th>차량헌금</th>
                        <th className='border-right'>건축헌금</th>
                        <th>Available</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border-right'>{formatter.format(totalAmount + accOffering + accRevenue - accExpense)}</td>
                        <td>{formatter.format(totalMissionaryOffering + accMiss)}</td>
                        <td>{formatter.format(totalVehicleOffering + accVeh)}</td>
                        <td className='border-right'>{formatter.format(totalConstructionOffering + accCon)}</td>
                        <td>
                            {formatter.format(
                                totalAmount - (totalMissionaryOffering + accMiss) - (totalVehicleOffering + accVeh) - (totalConstructionOffering + accCon) + accOffering + accRevenue - accExpense
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return <div className='finance-db-page'>
        <div className='header'>
            <Card className='control-field'>
                <div>
                    <YearSelection years={years} onChange={onSelectYear} selectedYear={selectedYear} />
                    {renderMonthSelect()}
                    <label> or </label>
                    {renderDateSelect()}
                </div>
                <div>
                    {(!isEmpty(finData) && (selectedMonth || selectedDate)) && renderOfferingSummary()}
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
                {(!isEmpty(finData) && selectedYear) && renderFinAnualSummary()}
                {(selectedMonth || selectedDate) && renderSubSummary()}
            </div>
        </div>}
    </div>
}