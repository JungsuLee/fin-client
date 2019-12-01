import React, { useState, ChangeEvent, useRef, useEffect, FormEvent, useMemo } from 'react';
import { Icon, HTMLTable, ControlGroup, Button, Colors, Card, FormGroup } from '@blueprintjs/core';
import uuid from 'uuid/v1';
import { addFinData, deleteFinData, editFinData } from '../../store/actions/finance';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from 'src/store';
import DateInput from '../../common/DateInput';
import { RadioGroup, Radio } from '@blueprintjs/core';


export default () => {
    const [date, setDate] = useState<Date>(new Date());
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string>('income');
    const [amount, setAmount] = useState<string>('');
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const finData = useSelector((state: IStoreState) => state.finance.finData);
    const finDataLen = finData.length;
    const [totalAmount, setTotalAmount] = useState<number>(0); 


    useEffect(() => {
        calcTotalAmount();
    }, [finData.length]);

    const calcTotalAmount = () => {
        let totalAmount = 0;
        finData.forEach((fin) => totalAmount += Number(fin.amount));
        setTotalAmount(totalAmount);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const fin: IFinData = {
            date,
            title,
            type,
            amount,
            isSaved: false,
            
        };
        dispatch(addFinData(fin));
        clearFin();
        inputTitleRef.current && inputTitleRef.current.focus();
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                return setTitle(value);
            case 'amount':
                return setAmount(value);
            default:
                break;
        }
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(editFinData(index, name, value));
    }

    const onDelete = (index: number) => {
        dispatch(deleteFinData(index));
    }

    const clearFin = () => {
        setTitle('');
        setAmount('');
    }

    const onSelectDate = (selectedDate: Date) => {
        setDate(selectedDate);
    }

    const onEditDate = (selectedDate: Date, index: number) => {
        dispatch(editFinData(index, 'date', selectedDate))
    }

    const onSelectType = (e: FormEvent<HTMLInputElement>) => {
        setType(e.currentTarget.value);
    }

    return <div className='finance-management-page'>
        <Card>
            <HTMLTable className='bp3-html-table-condensed bp3-html-table-striped'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Del</th>
                    </tr>
                </thead>
                <tbody>
                    {finData.map((fin, i) => <tr key={uuid()} >
                            <th>
                                <DateInput value={fin.date} onSelectDate={(selectedDate: Date) => onEditDate(selectedDate, i)} />
                            </th>
                            <th>
                                <input className='bp3-input bp3-small' name='title' defaultValue={fin.title} onChange={e => onEdit(e, i)} />
                            </th>
                            <th>
                                <input className='bp3-input bp3-small' name='amount' onBlur={calcTotalAmount} defaultValue={fin.amount} onChange={e => onEdit(e, i)} />
                            </th>
                            <th>
                                <Icon icon='cross' onClick={() => onDelete(i)} />
                            </th>
                        </tr>
                    )}
                    <tr>
                        <th></th>
                        <th className='th-align-right'>Total :</th>
                        <th>$ {totalAmount.toFixed(2)}</th>
                    </tr>
                </tbody>
            </HTMLTable>
        </Card>
        <br />
        <Card>
            <form onSubmit={onSubmit}>
                <ControlGroup vertical >
                    <FormGroup label='Date' >
                        <DateInput value={date} onSelectDate={onSelectDate} />
                    </FormGroup>
                    <RadioGroup label='Type' onChange={onSelectType} selectedValue={type}>
                        <Radio label='income' value='income' />
                        <Radio label='outcome' value='outcome' />
                    </RadioGroup>
                    <FormGroup label='Title' >
                        <input className='bp3-input bp3-small' type='text' ref={inputTitleRef} name='title' placeholder='title' value={title} onChange={onChange} />
                    </FormGroup>
                    <FormGroup label='Amount' >
                        <input className='bp3-input bp3-small' name='amount' placeholder='amount' value={amount} onChange={onChange} />
                    </FormGroup>
                    <button type='submit' hidden>Submit</button>
                </ControlGroup>
            </form>
        </Card>
    </div>
}
