import React from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import App from './App';

import Colors from './shared/Colors';
import configureStore from './redux/store/store';

const {persistor, store} = configureStore();

const Root = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.statusBarColor}
        barStyle="light-content"
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </View>
  );
};

export default function setup() {
  console.disableYellowBox = true;
  return Root;
}
