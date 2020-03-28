import {createStackNavigator} from 'react-navigation-stack';

import Occurrences from './Occurrences';

import Colors from '../../shared/Colors';

export default createStackNavigator(
  {
    Occurrences: {screen: Occurrences},
  },
  {
    initialRouteName: 'Occurrences',
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: Colors.lighterText,
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
    },
  },
);
