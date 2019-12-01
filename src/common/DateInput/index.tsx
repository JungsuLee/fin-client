import React from 'react';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime'

const jsDataFormatter: IDateFormatProps = {
    formatDate: date => date.toLocaleDateString(),
    parseDate: str => new Date(str),
    placeholder: 'M/D/YYYY'
}

export default (
    props: {
        value: Date,
        onSelectDate: (selectedDate: Date, isUserChange: boolean) => void
    }
) => {
    return <DateInput defaultValue={props.value} onChange={props.onSelectDate} {...jsDataFormatter} />
};
