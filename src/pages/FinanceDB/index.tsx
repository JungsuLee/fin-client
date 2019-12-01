import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from 'src/store';


export default () => {
    const finData = useSelector((state: IStoreState) => state.finance.finData)

    useEffect(() => {
        console.log(finData);
    })
    return <div>
        Finance DB
    </div>
}