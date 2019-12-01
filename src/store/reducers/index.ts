import { combineReducers } from 'redux';
import finance, { IFinanceStore, initialState as financeInitState } from './finance';

export interface IStoreState {
    readonly finance: IFinanceStore;
}
export default combineReducers<IStoreState>({ finance });