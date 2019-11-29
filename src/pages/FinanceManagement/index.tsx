import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Icon, HTMLTable, InputGroup } from '@blueprintjs/core';
import uuid from 'uuid/v1';

interface fin {
    title: string;
    amount: string;
}

export default () => {
    const [fins, setFins] = useState<fin[]>([]);
    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const inputTitleRef = useRef<HTMLInputElement>(null);
    

    const onSubmit = (e) => {
        e.preventDefault();
        let currencyFormAmount = amount;
        if (!amount.includes('.')) {
            currencyFormAmount = amount + '.00'
        } else {
            currencyFormAmount = Number(amount).toFixed(2);
        }
        const fin = {
            title,
            amount: currencyFormAmount
        };
        setFins([
            ...fins,
            fin
        ]);
        clearFin();
        inputTitleRef.current && inputTitleRef.current.focus();
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                return setTitle(value);
            case 'amount':
                if (Number(value)) {
                    return setAmount(value)
                } else if (value === '') {
                    return setAmount('0.00')
                }
            default:
                break;
        }
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>, i) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                return setTitle(value);
            case 'amount':
                if (Number(value)) {
                    return fins[i][name] = value;
                } else if (value === '') {
                    return fins[i][name] = '0';
                }
            default:
                break;
        }
        setFins(fins);
    }

    const onDelete = (i) => {
        setFins(fins.filter((fin, j) => j !== i));
    }

    const clearFin = () => {
        setTitle('');
        setAmount('');
    }

    return <div>
        <HTMLTable className='bp3-html-table-condensed bp3-html-table-striped'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Del</th>
                </tr>
            </thead>
            <tbody>
                {fins.map((fin, i) => <tr key={uuid()} >
                    <th>
                        <input className='bp3-input bp3-small' name='title' defaultValue={fin.title} onChange={e => onEdit(e, i)} />
                    </th>
                    <th>
                        <input className='bp3-input bp3-small' name='amount' defaultValue={fin.amount} onChange={e => onEdit(e, i)} />
                    </th>
                    <th>
                        <Icon icon='cross' onClick={() => onDelete(i)} />
                    </th>
                </tr>)}
            </tbody>
        </HTMLTable>
        <form onSubmit={onSubmit}>
            <input className='bp3-input bp3-small' type='text' ref={inputTitleRef} name='title' placeholder='title' value={title} onChange={onChange} />
            <input className='bp3-input bp3-small' name='amount' placeholder='amount' value={amount} onChange={onChange} />
            <button type='submit' hidden>Submit</button>
        </form>
    </div>
}