import { FinanceActionType } from '../actions/finance';
import { AnyAction, Reducer } from 'redux';


export const initialState = {
    finData: [] as IFinData[],
    isFetching: false
}

export type IFinanceStore = Readonly<typeof initialState>;

const reducer: Reducer<IFinanceStore, AnyAction> = (state = initialState, action) => {
    const finData = state.finData;
    switch (action.type) {
        case FinanceActionType.CLEAN_FINANCE_DATA:
            return {
                ...state,
                finData: [],
                isFetching: false,
            }
        case FinanceActionType.ADD_FINANCE_DATA:
            const newFinData: IFinData = action.payload.finData;
            finData.push(newFinData)
            return {
                ...state,
                finData
            }
        case FinanceActionType.DELETE_FINANCE_DATA:
            const deleteIndex = action.payload.index;
            return {
                ...state,
                finData: finData.filter((fin, index) => index !== deleteIndex)
            }
        case FinanceActionType.EDIT_FINANCE_DATA:            
            const editIndex = action.payload.index;
            const editKey = action.payload.key;
            const editValue = action.payload.value;
            finData[editIndex][editKey] = editValue;
            return {
                ...state,
                finData
            }

        default:
            return state
    }
}

export default reducer;