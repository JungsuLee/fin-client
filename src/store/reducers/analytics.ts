import { Reducer, AnyAction } from 'redux';
import { AnalyticsActionType } from '../actions/analytics';


export const initialState = {
    annaulAnalytics: [] as IAnnualAnalytics[]
}

export type IAnalyticsStore = Readonly<typeof initialState>;

const reducer: Reducer<IAnalyticsStore, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case AnalyticsActionType.RECEIVE_ANNUAL_ANALYTICS:
            return {
                ...state,
                annaulAnalytics: action.payload.annualAnalytics,
            };
        default:
            return state;
    }
}

export default reducer;
