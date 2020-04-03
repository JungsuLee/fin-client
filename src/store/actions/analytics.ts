import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../reducers';
import api from '../api';


export enum AnalyticsActionType {
    RECEIVE_ANNUAL_ANALYTICS = 'RECEIVE_ANNUAL_ANALYTICS', 
}

export type AnalyticsAction = Action<AnalyticsActionType>;
export type AnalyticsAsyncAction = ThunkAction<Promise<void>, IStoreState, null, AnalyticsAction>;


const receiveAnnualAnalytics: ActionCreator<AnalyticsAction> = (annualAnalytics: IAnnualAnalytics[]) => ({
    type: AnalyticsActionType.RECEIVE_ANNUAL_ANALYTICS,
    payload: { annualAnalytics }
})

export const getAnnualAnalytics: ActionCreator<AnalyticsAsyncAction> = (year: string) => async (dispatch) => {
    try {
        const annualAnalytics: IAnnualAnalytics[] = await api.request('get', `/analytics/${year}`);
        dispatch(receiveAnnualAnalytics(annualAnalytics)); 
    } catch (error) {}
}