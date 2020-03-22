import { FinanceActionType } from '../actions/finance';
import { AnyAction, Reducer } from 'redux';


export const initialState = {
    offerings: [] as IOffering[],
    isFetching: false
}

export type IFinanceStore = Readonly<typeof initialState>;

const reducer: Reducer<IFinanceStore, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case FinanceActionType.FETCH_OFFERINGS:
            return {
                ...state,
                offerings: action.payload.offerings,
                isFetching: false,
            }
        // case FinanceActionType.ADD_FINANCE_DATA:
        //     const newFinData: IFinData = action.payload.finData;
        //     finData.push(newFinData)
        //     return {
        //         ...state,
        //         finData
        //     }
        // case FinanceActionType.DELETE_FINANCE_DATA:
        //     const deleteIndex = action.payload.index;
        //     return {
        //         ...state,
        //         finData: finData.filter((fin, index) => index !== deleteIndex)
        //     }
        // case FinanceActionType.EDIT_FINANCE_DATA:            
        //     const editIndex = action.payload.index;
        //     const editFinData = action.payload.finData;
        //     finData[editIndex] = editFinData;
        //     return {
        //         ...state,
        //         finData
        //     }
        default:
            return state
    }
}

export default reducer;