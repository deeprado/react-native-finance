import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import reducers from '../reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware, promiseMiddleware),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
