import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import loginReducer from './auth/reducer';
import {categoryReducer} from './category/reducer';
import {orderReducer} from './order/reducer';
import {cartReducer} from './cart/reducer';

import {userDetailsReducer,addressReducer,userdatareducer,ProductCountReducer} from './userDetails/reducer';



import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
  loginReducer,
  categoryReducer,

  userDetailsReducer,
  addressReducer,
  userdatareducer,
  ProductCountReducer,
  orderReducer,
  cartReducer

});

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = createStore(persistedReducer,applyMiddleware(thunkMiddleware))
export const persistor = persistStore(store)

console.log(store.getState())
