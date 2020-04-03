import { combineReducers } from 'redux';
import finance, { IFinanceStore } from './finance';
import analytics, { IAnalyticsStore } from './analytics';

export interface IStoreState {
    readonly finance: IFinanceStore;
    readonly analytics: IAnalyticsStore;
}
export default combineReducers<IStoreState>({ finance, analytics });