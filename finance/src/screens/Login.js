import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Image, Alert} from 'react-native';

import Api from '../shared/Api';
import Colors from '../shared/Colors';
import OutlinedButtonPrimary from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        hasError: false,
        pristine: true,
        error: null,
      },
      password: {
        value: '',
        hasError: false,
        pristine: true,
        error: null,
      },

      isFetching: false,
      error: null,
    };
  }

  componentDidMount() {
    // TODO: Focus on email input
  }

  updateFormState(field, value, error) {
    this.setState({
      [field]: {
        pristine: false,
        hasError: !!error,
        value,
        error,
      },
    });
  }

  onChangeEmail = email => {
    let error = null;
    if (email.length === 0) {
      error = '请输入有效的电子邮件';
    }
    this.updateFormState('email', email, error);
  };

  onChangePassword = password => {
    let error = null;
    if (password.length === 0) {
      error = '请输入密码';
    }
    this.updateFormState('password', password, error);
  };

  goBack() {
    this.props.navigation.goBack();
  }

  login = async () => {
    let {email, password} = this.state;
    if (
      !email.pristine &&
      !password.pristine &&
      !email.hasError &&
      !password.hasError
    ) {
      this.setState({isFetching: true});

      try {
        let userForm = {
          email: email.value,
          password: password.value,
        };

        // let user = await Api.login(userForm);
        let user = {
          username: 'deeprado',
          email: 'xxx',
          password: '123456',
          access_token: 'aaaaaa',
        };

        this.props.screenProps.onUserUpdate &&
          this.props.screenProps.onUserUpdate(user);

        this.goBack();
      } catch (error) {
        this.setState({
          error,
        });
      }

      this.setState({isFetching: false});
    } else {
      Alert.alert('注意事项', '填写电子邮件和密码');
    }
  };

  render() {
    let {isFetching, email, password} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={{flex: 3, height: 300, width: 300}}
          />
        </View>
        <View style={styles.formContainer}>
          <View>
            <TextInput
              style={styles.textinput}
              maxLength={150}
              multiline={true}
              onChangeText={this.onChangeEmail}
              keyboardType="email-address"
              editable={!isFetching}
              value={email.value}
              autoCapitalize={'none'}
              autoCorrect={false}
              clearButtonMode={'always'}
              placeholder={'邮箱'}
            />
            {email.hasError ? (
              <View>
                <Text>{email.error}</Text>
              </View>
            ) : null}
          </View>
          <View>
            <TextInput
              style={styles.textinput}
              maxLength={150}
              multiline={true}
              onChangeText={this.onChangePassword}
              placeholder={'密码'}
              secureTextEntry={true}
              editable={!isFetching}
              value={password.value}
            />
            {password.hasError ? (
              <View>
                <Text>{password.error}</Text>
              </View>
            ) : null}
          </View>
          <Text
            onPress={() => this.props.navigation.navigate('Register')}
            style={{color: '#fff', textAlign: 'center'}}>
            还没有帐号？ 在这里创建！
          </Text>
          {isFetching && (
            <LoadingSpinner color={'#fff'} size={80} message="认证..." />
          )}
        </View>
        {this.state.error && (
          <Text style={styles.errorMessage}>{this.state.error.message}</Text>
        )}
        {!isFetching && (
          <View style={styles.buttons}>
            <OutlinedButtonPrimary title="报名" onPress={this.login}>
              报名
            </OutlinedButtonPrimary>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  imgContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  formContainer: {
    flex: 2,
    marginHorizontal: 16,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  forgotPasswordText: {
    color: Colors.lighterText,
    fontSize: 12,
    alignSelf: 'center',
  },
  errorMessage: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.errorColor,
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
});

export default Login;
