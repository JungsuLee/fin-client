import { createStore, applyMiddleware, Middleware, Action, compose } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import rootReducer, { IStoreState as _IStoreState } from './reducers';
import { createLogger } from 'redux-logger';

let middleware: Middleware[] = [thunkMiddleware];
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger({
      collapsed: true,
    });
    middleware = [...middleware, loggerMiddleware];
  }
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export type DispatchFunction = ThunkDispatch<IStoreState, null, Action>;
export default store;
export type IStoreState = _IStoreState;
