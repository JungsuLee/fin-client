import React, { useState, ChangeEvent, useRef, useEffect, FormEvent } from 'react';
import { Icon, HTMLTable, ControlGroup, Button, Colors, Card, FormGroup, Label, RadioGroup, Radio, HTMLSelect } from '@blueprintjs/core';
import uuid from 'uuid/v1';
import { addFinData, deleteFinData, editFinData } from '../../store/actions/finance';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from 'src/store';
import DateInput from '../../common/DateInput';


export default () => {
    const [date, setDate] = useState<Date>(new Date());
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string>('income');
    const [amount, setAmount] = useState<string>('');
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const finData = useSelector((state: IStoreState) => state.finance.finData);
    const [totalAmount, setTotalAmount] = useState<number>(0); 
    const [description, setDescription] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [category, setCategory] = useState<string>('');

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
            type,
            category,
            title,
            amount,
            description,
            isSaved: false,
        };
        if (selectedIndex || selectedIndex === 0) {
            dispatch(editFinData(selectedIndex, fin));
            calcTotalAmount();
        } else {
            dispatch(addFinData(fin));
        }

        clearFin();
        inputTitleRef.current && inputTitleRef.current.focus();
    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                return setTitle(value);
            case 'amount':
                return setAmount(value);
            case 'description':
                return setDescription(value);
            default:
                break;
        }
    }

    const onDelete = (index: number) => {
        dispatch(deleteFinData(index));
    }

    const clearFin = () => {
        setSelectedIndex(null);
        setTitle('');
        setAmount('');
        setDescription('');
    }

    const onSelectDate = (selectedDate: Date) => {
        setDate(selectedDate);
    }

    const onSelectType = (e: FormEvent<HTMLInputElement>) => {
        setType(e.currentTarget.value);
    }

    const onEdit = (index: number) => {
        const {date, type, title, amount, description} = finData[index];
        setSelectedIndex(index);
        setDate(date);
        setType(type);
        setTitle(title);
        setAmount(amount);
        setDescription(description);
    }

    return <div className='finance-management-page'>
        <Card>
            <HTMLTable className='bp3-html-table-striped' small striped>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {finData.map((fin, i) => <tr key={uuid()} >
                            <th>
                                <Label>{fin.date.toLocaleDateString()}</Label>
                            </th>
                            <th>
                                <Label>{fin.title}</Label>
                            </th>
                            <th>
                                <Label className='align-right'>$ {Number(fin.amount).toFixed(2)}</Label>
                            </th>
                            <th>
                                <Label>{fin.description}</Label>
                            </th>
                            <th>
                                <Icon icon='edit' onClick={() => onEdit(i)} />
                            </th>
                            <th>
                                <Icon icon='delete' onClick={() => onDelete(i)} />
                            </th>
                        </tr>
                    )}
                    <tr>
                        <th></th>
                        <th className='align-right'>Total :</th>
                        <th className='align-right'>$ {totalAmount.toFixed(2)}</th>
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
                    <RadioGroup label='Type' onChange={onSelectType} selectedValue={type} inline>
                        <Radio label='income' value='income' />
                        <Radio label='outcome' value='outcome' />
                    </RadioGroup>
                    <FormGroup label='Category'>
                        <HTMLSelect >
                            <option>Category</option>
                        </HTMLSelect>
                    </FormGroup>
                    <FormGroup label='Title' >
                        <input className='bp3-input bp3-small' type='text' ref={inputTitleRef} name='title' placeholder='title' value={title} onChange={onChange} />
                    </FormGroup>
                    <FormGroup label='Amount' >
                        <input className='bp3-input bp3-small' name='amount' placeholder='amount' value={amount} onChange={onChange} />
                    </FormGroup>
                    <FormGroup label='Description' >
                        <input className='bp3-input bp3-small bp3-fill' name='description' placeholder='description' value={description} onChange={onChange} />
                    </FormGroup>
                    <Button text='Save' type='submit' />
                </ControlGroup>
            </form>
        </Card>
    </div>
}
