import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import loginReducer from './redux/auth/reducer';
import creditDataReducer from './redux/credit/reducer';




import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
  loginReducer,creditDataReducer


});

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = createStore(persistedReducer,applyMiddleware(thunkMiddleware))
export const persistor = persistStore(store)

console.log(store.getState())
