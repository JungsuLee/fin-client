import { Reducer, AnyAction } from 'redux';
import { AnalyticsActionType } from '../actions/analytics';


export const initialState = {
    annaulAnalytics: [] as IAnnualAnalytics[],
    selectedYear: '',
}

export type IAnalyticsStore = Readonly<typeof initialState>;

const reducer: Reducer<IAnalyticsStore, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case AnalyticsActionType.RECEIVE_ANNUAL_ANALYTICS:
            return {
                ...state,
                selectedYear: action.payload.selectedYear,
                annaulAnalytics: action.payload.annualAnalytics,
            };
        case AnalyticsActionType.CLEAN_ANNUAL_ANALYTICS:
            return {
                ...state,
                annaulAnalytics: [] as IAnnualAnalytics[],
                selectedYear: '',
            }
        default:
            return state;
    }
}

export default reducer;
