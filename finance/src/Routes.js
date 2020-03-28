import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Colors from './shared/Colors';

import Home from './Home';
import Login from './screens/Login';
import Register from './screens/Register';

const RouteConfigMap = {
  Home: {
    path: '/',
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    path: '/login',
    screen: Login,
    mode: 'modal',
    navigationOptions: {
      gestureEnabled: false,
    },
  },
  Register: {
    path: '/register',
    screen: Register,
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

export const LoggedInRoutes = createAppContainer(
  createStackNavigator(RouteConfigMap, StackConfig),
);
export const LoggedOutRoutes = createAppContainer(
  createStackNavigator(RouteConfigMap, {
    ...StackConfig,
    initialRouteName: 'Login',
  }),
);

export default {
  LoggedInRoutes,
  LoggedOutRoutes,
};
