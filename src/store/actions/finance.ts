import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../reducers';
import api from '../api';


export enum FinanceActionType {
    FETCH_FIN_DATA = 'FETCH_FIN_DATA',
    FETCH_FIN_SUMMARY = 'FETCH_FIN_SUMMARY',
}

export type FinanceAction = Action<FinanceActionType>;
export type FinanceAsyncAction = ThunkAction<Promise<void>, IStoreState, null, FinanceAction>;

const fetchFinData: ActionCreator<FinanceAction> = (finData: IFinData) => ({
    type: FinanceActionType.FETCH_FIN_DATA,
    payload: { finData },
});

export const getFinData: ActionCreator<FinanceAsyncAction> = (year: string) => async (dispatch) => {
    try {
        const finData: IFinData = await api.request('get', `/fin/data/${year}`);
        dispatch(fetchFinData(finData));
    } catch (error) {}
}

const fetchFinSummary = (finSummary: IFinSummary) => ({
    type: FinanceActionType.FETCH_FIN_SUMMARY,
    payload: { finSummary }
});

export const getFinSummary: ActionCreator<FinanceAsyncAction> = () => async (dispatch) => {
    try {
        const finSummary: IFinSummary = await api.request('get', '/fin/summary');
        console.log(finSummary);
        
        dispatch(fetchFinSummary(finSummary));
    } catch (error) {}
}


// export const cleanFinData: ActionCreator<FinanceAction> = () => {
//     return {
//         type: FinanceActionType.GET_OFFERINGS,
//         payload: {}
//     }
// }

// export const addFinData: ActionCreator<FinanceAction> = (finData: IFinData) => {
//     return {
//         type: FinanceActionType.ADD_FINANCE_DATA,
//         payload: { finData }
//     }
// }

// export const deleteFinData: ActionCreator<FinanceAction> = (index: number) => {
//     return {
//         type: FinanceActionType.DELETE_FINANCE_DATA,
//         payload: { index }
//     }
// }

// export const editFinData: ActionCreator<FinanceAction> = (index: number, finData: IFinData) => {
//     return {
//         type: FinanceActionType.EDIT_FINANCE_DATA,
//         payload: { index, finData }
//     }
// }

