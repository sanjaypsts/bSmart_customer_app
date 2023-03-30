import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import loginReducer from './auth/reducer';
import CategoryReducer from './category/reducer';

import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
  loginReducer:loginReducer,CategoryReducer:CategoryReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer,applyMiddleware(thunkMiddleware))
export const persistor = persistStore(store)