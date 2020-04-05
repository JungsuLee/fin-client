import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../reducers';
import api from '../api';


export enum AnalyticsActionType {
    RECEIVE_ANNUAL_ANALYTICS = 'RECEIVE_ANNUAL_ANALYTICS', 
    CLEAN_ANNUAL_ANALYTICS = 'CLEAN_ANNUAL_ANALYTICS',
}

export type AnalyticsAction = Action<AnalyticsActionType>;
export type AnalyticsAsyncAction = ThunkAction<Promise<void>, IStoreState, null, AnalyticsAction>;


const receiveAnnualAnalytics: ActionCreator<AnalyticsAction> = (annualAnalytics: IAnnualAnalytics[], selectedYear: string) => ({
    type: AnalyticsActionType.RECEIVE_ANNUAL_ANALYTICS,
    payload: { annualAnalytics, selectedYear }
})
export const cleanAnnualAnalytics: ActionCreator<AnalyticsAction> = () => ({
    type: AnalyticsActionType.CLEAN_ANNUAL_ANALYTICS,
    payload: {}
})
export const getAnnualAnalytics: ActionCreator<AnalyticsAsyncAction> = (year: string) => async (dispatch) => {
    try {
        const annualAnalytics: IAnnualAnalytics[] = await api.request('get', `/analytics/${year}`);
        dispatch(receiveAnnualAnalytics(annualAnalytics, year)); 
    } catch (error) {}
}
