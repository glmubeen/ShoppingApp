import {configureStore, combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartSlice from './cartSlice';
import userSlice from './userSlice';
import globalSlice from './globalSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'cart'],
};

let rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  globalState: globalSlice,
});

let reducerPersisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: reducerPersisted,
});
