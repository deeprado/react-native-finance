import {createStackNavigator} from 'react-navigation-stack';

import Accounts from './Accounts';
import CreateAccount from './CreateAccount';
import Settings from './Settings';

import Colors from '../../shared/Colors';

export default createStackNavigator(
  {
    Settings: {screen: Settings},
    Accounts: {screen: Accounts},
    CreateAccount: {screen: CreateAccount},
  },
  {
    initialRouteName: 'Settings',
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: Colors.lighterText,
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
    },
  },
);
