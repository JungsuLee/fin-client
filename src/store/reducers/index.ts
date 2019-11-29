import { combineReducers } from 'redux';
import finance, { IFinanceStore } from './finance';

export interface IStoreState {
    readonly finance: IFinanceStore;
}

export default combineReducers<IStoreState>({ finance });