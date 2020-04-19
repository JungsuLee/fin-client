import { FinanceActionType } from '../actions/finance';
import { AnyAction, Reducer } from 'redux';


export const initialState = {
    finData: {} as IFinData,
    finSummary: {} as IFinSummary,
    selectedYear: '',
    years: [] as string[],
}

export type IFinanceStore = Readonly<typeof initialState>;

const reducer: Reducer<IFinanceStore, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case FinanceActionType.FETCH_FIN_DATA:
            return {
                ...state,
                finData: action.payload.finData,
                selectedYear: action.payload.selectedYear,
            };
        case FinanceActionType.FETCH_FIN_SUMMARY:
            return {
                ...state,
                finSummary: action.payload.finSummary,
                years: action.payload.finSummary.years,
            };
        case FinanceActionType.CLEAN_FIN_DATA:
            return {
                ...state,
                finData: {},
                selectedYear: '',
                years: [],
            }
        default:
            return state
    }
}

export default reducer;