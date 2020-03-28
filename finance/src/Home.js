import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {Icon, Text} from 'react-native-elements';

import Colors from './shared/Colors';

import Dashboard from './screens/dashboard';
import Occurrences from './screens/occurrences';
import Settings from './screens/settings';

const CustomDrawerContentComponentDemo = ({
  inactiveTintColor,
  itemsContainerStyle,
  ...props
}) => {
  const logout = () => {
    props.navigation.navigate('Login');
    props.screenProps.onUserUpdate && props.screenProps.onUserUpdate(null);
  };
  const {user} = props.screenProps;

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.drawerHeader}>
          <View
            style={{
              justifyContent: 'center',
              marginHorizontal: 8,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri:
                  'https://avatars1.githubusercontent.com/u/10285020?s=460&u=380f15b6a64d43fad6ec2e85944ad96b5a78f2fd&v=4',
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginHorizontal: 8,
              alignItems: 'center',
            }}>
            <Text h4 style={styles.drawerHeaderText}>
              {user.username}
            </Text>
            <Text style={styles.drawerHeaderText}>{user.email}</Text>
          </View>
        </View>
        <DrawerItems {...props} />
        <View style={[styles.container, itemsContainerStyle]}>
          <TouchableOpacity onPress={logout}>
            <View style={styles.item}>
              <View style={styles.icon}>
                <Icon name="exit-to-app" color={Colors.darkText} />
              </View>
              <Text style={[styles.label, {color: inactiveTintColor}]}>
                退出
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const drawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        drawerLabel: '仪表盘',
        drawerIcon: ({tintColor}) => (
          <Icon name="pie-chart" color={tintColor} />
        ),
      },
    },
    Occurrences: {
      screen: Occurrences,
      navigationOptions: {
        drawerLabel: '收支',
        drawerIcon: ({tintColor}) => (
          <Icon name="trending-up" color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        drawerLabel: '设置',
        drawerIcon: ({tintColor}) => <Icon name="settings" color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'Dashboard',
    contentOptions: {
      activeTintColor: Colors.primaryColor,
    },
    drawerBackgroundColor: Colors.primaryColor,
    contentComponent: CustomDrawerContentComponentDemo,
  },
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  drawerHeader: {
    height: 120,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: Colors.lighterText,
  },
});

export default drawerNavigator;
