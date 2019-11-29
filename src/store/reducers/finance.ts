import { FinanceActionType } from '../actions/finance';
import { AnyAction, Reducer } from 'redux';

const initialState = {
    finData: [],
    isFetching: false
}

export type IFinanceStore = Readonly<typeof initialState>;

const reducer: Reducer<IFinanceStore, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case FinanceActionType.CLEAN_FINANCE_DATA:
            return {
                ...state,
                finData: [],
                isFetching: false
            }
        case FinanceActionType.ADD_FINANCE_DATA:
            return {
                ...state,
                finData: action.payload 
            }
        default:
            return state
    }
}

export default reducer;