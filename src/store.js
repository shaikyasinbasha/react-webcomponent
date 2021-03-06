import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const store = createStore(combineReducers, applyMiddleware(thunk, logger));

export default store;