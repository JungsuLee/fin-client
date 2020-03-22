import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../reducers';
import api from '../api';


export enum FinanceActionType {
    FETCH_OFFERINGS = 'FETCH_OFFERINGS',
}

export type FinanceAction = Action<FinanceActionType>;
export type FinanceAsyncAction = ThunkAction<Promise<void>, IStoreState, null, FinanceAction>;


const fetchOfferings: ActionCreator<FinanceAction> = (offerings: IOffering[]) => ({
    type: FinanceActionType.FETCH_OFFERINGS,
    payload: { offerings},
});

export const getOfferings: ActionCreator<FinanceAsyncAction> = () => async (dispatch) => {
    try {
        const offerings: IOffering = await api.request('get', '/fin/offerings');
        dispatch(fetchOfferings(offerings))
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

