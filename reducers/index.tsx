import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import authReducers from "./authReducers";
import userReducers from "./userReducers";
import reduxThunk from 'redux-thunk';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
const rootReducer = combineReducers({
    Auth: authReducers,
    Users: persistReducer(persistConfig,userReducers)
});

export const store = createStore (rootReducer,{},applyMiddleware(reduxThunk));
export const pesistor = persistStore(store)