import {createStackNavigator} from 'react-navigation-stack';
import Colors from '../../shared/Colors';

const RouteConfigMap = {
  Home: {
    path: '/',
    screen: require('./Home').default,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    path: '/login',
    screen: require('@screens/Login').default,
    mode: 'modal',
    navigationOptions: {
      gestureEnabled: false,
    },
  },
  Register: {
    path: '/register',
    screen: require('@screens/Register').default,
    mode: 'modal',
    navigationOptions: {
      gestureEnabled: false,
    },
  },
};

const StackConfig = {
  initialRouteName: 'Home',
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: Colors.lighterText,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
  },
};

const LoggedInRoutes = StackNavigator(RouteConfigMap, StackConfig);
const LoggedOutRoutes = StackNavigator(RouteConfigMap, {
  ...StackConfig,
  initialRouteName: 'Login',
});

export {LoggedInRoutes, LoggedOutRoutes};
