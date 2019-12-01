import { createStore, applyMiddleware, Middleware, Action, compose } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import rootReducer, { IStoreState as _IStoreState } from './reducers';

let middleware: Middleware[] = [thunkMiddleware];
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export type DispatchFunction = ThunkDispatch<_IStoreState, null, Action>;
export default store;
export type IStoreState = _IStoreState;
