import React from 'react';
import { HTMLSelect } from '@blueprintjs/core';


export default (props: {
    years: string[],
    onChange: (year: string) => void,
    selectedYear: string,
}) => {
    const onSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => { 
        props.onChange(e.target.value);
    }

    return <HTMLSelect value={props.selectedYear} onChange={onSelectYear}>
        <option value=''>Year</option>
        {props.years.map((year, i) => <option key={i} value={year}>{year}</option>)}
    </HTMLSelect>
}