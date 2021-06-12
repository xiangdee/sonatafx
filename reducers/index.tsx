import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import CryptoJS from 'crypto-js';

import authReducers from "./authReducers";
import userReducers from "./userReducers";
import reduxThunk from 'redux-thunk';

const encrypt = createTransform(
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    const cryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState), 'secret key 123');

    return cryptedText.toString(); 
  },
  (outboundState, key) => {
    if (!outboundState) return outboundState;
    const bytes = CryptoJS.AES.decrypt(outboundState, 'secret key 123');
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  },
);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    transforms: [encrypt]
  };
const rootReducer =persistReducer(persistConfig, combineReducers({
    Auth: authReducers,
    Users: userReducers
}));

export const store = createStore (rootReducer,{},applyMiddleware(reduxThunk));
export const pesistor = persistStore(store)