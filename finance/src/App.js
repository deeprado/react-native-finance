import React, {Component} from 'react';
import {StyleSheet, StatusBar, Text, View} from 'react-native';

import {LoggedInRoutes, LoggedOutRoutes} from './Routes';

import UserStorage from './shared/UserStorage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false,
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    try {
      let user = await UserStorage.getUser();
      this.setState({
        loaded: true,
        user,
      });
    } catch (e) {
      this.setState({
        loaded: true,
      });
    }
  }

  onUserUpdate(user) {
    this.setState({
      user,
    });
    UserStorage.updateUser(user);
  }

  render() {
    let {user, loaded} = this.state;
    if (!loaded) {
      return (
        <View>
          <Text>错误</Text>
        </View>
      );
    }

    let Routes = !user ? LoggedOutRoutes : LoggedInRoutes;

    return (
      <Routes
        initialRouteName="Login"
        screenProps={{
          user,
          onUserUpdate: this.onUserUpdate.bind(this),
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
