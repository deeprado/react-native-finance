import React from 'react';

import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import AccountCard from '../../components/AccountCard';

import Colors from '../../shared/Colors';
import {StyledScrollView} from '../../shared/Styled';

class Accounts extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '帐目',
    headerStyle: {backgroundColor: Colors.primaryColor},
    headerRight: () => (
      <Icon
        component={TouchableOpacity}
        onPress={() => navigation.navigate('CreateAccount')}
        name={'add'}
        size={30}
        color={'#fff'}
      />
    ),
  });

  renderAccount = () => {
    let {accounts} = this.props;
    return (accounts || []).map(acc => {
      return <AccountCard key={acc.id} name={acc.name} amount={acc.amount} />;
    });
  };

  render() {
    return <StyledScrollView>{this.renderAccount()}</StyledScrollView>;
  }
}

const mapStateToProps = ({account}) => {
  let {isFetching, accounts} = account;
  return {isFetching, accounts};
};

export default connect(mapStateToProps, {})(Accounts);
