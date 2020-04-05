import React from 'react';
import { HTMLSelect } from '@blueprintjs/core';


export default (props: {
    onChange: (year: string) => void,
    selectedYear: string,
}) => {
    const years = ['2020', '2019', '2018', '2017', '2016', '2015']
    const onSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => { 
        props.onChange(e.target.value);
    }

    return <HTMLSelect value={props.selectedYear} onChange={onSelectYear}>
        <option value=''>Year</option>
        {years.map((year, i) => <option key={i} value={year}>{year}</option>)}
    </HTMLSelect>
}