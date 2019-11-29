import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../reducers';

export enum FinanceActionType {
    CLEAN_FINANCE_DATA = 'CLEAN_FINANCE_DATA',
    ADD_FINANCE_DATA = 'ADD_FINANCE_DATA'    
}

export type FinanceAction = Action<FinanceActionType>;
export type FinanceAsyncAction = ThunkAction<Promise<void>, IStoreState, null, FinanceAction>;

export const cleanFinData: ActionCreator<FinanceAction> = () => {
    return {
        type: FinanceActionType.CLEAN_FINANCE_DATA,
        payload: {}
    }
}

export const addFinData: ActionCreator<FinanceAction> = (finData) => {
    return {
        type: FinanceActionType.ADD_FINANCE_DATA,
        payload: { finData }
    }
}

