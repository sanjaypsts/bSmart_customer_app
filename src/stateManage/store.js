import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './auth/reducer';
const rootReducer = combineReducers({
  loginReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));