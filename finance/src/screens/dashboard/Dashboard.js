/*
 * @flow
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';

import ActionButton from 'react-native-action-button';

import AccountCard from '../../components/AccountCard';
import {RenderDrawerMenu} from '../../components/DrawerUtils';

import {StyledContainerView, TextAmount} from '../../shared/Styled';
import Colors from '../../shared/Colors';

import {requestTypes} from '../../redux/actions/typeOccurrence';
import {fetchOccurrences} from '../../redux/actions/occurrence';
import {requestAccounts, requestTotalValue} from '../../redux/actions/account';

const {height} = Dimensions.get('window');

class Dashboard extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '仪表盘',
    drawerLabel: '仪表盘',
    drawerIcon: ({tintColor}) => <Icon name="pie-chart" color={tintColor} />,
    headerLeft: () => RenderDrawerMenu(navigation),
  });

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    await this.props.requestAccounts();
    await this.props.requestTypes();
    await this.props.requestTotalValue();
    await this.props.fetchOccurrences();
  };

  _goTarget = routeName => {
    this.props.navigation.navigate(routeName);
  };

  _onRefresh = async () => {
    this.setState({refreshing: true});
    await this.props.requestTotalValue();
    this.setState({refreshing: false});
  };

  renderAccounts = () => {
    let {accounts} = this.props;
    return (accounts || []).map(acc => {
      return <AccountCard key={acc.id} name={acc.name} amount={acc.amount} />;
    });
  };

  render() {
    let {isFetching, typeOccurrences, totalValue, loadingTotal} = this.props;
    const loadAll = loadingTotal || !totalValue || isFetching;
    return (
      <StyledContainerView>
        <ScrollView
          flex={1}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          <View
            style={[
              styles.containerAccount,
              {
                backgroundColor:
                  totalValue >= 0 ? Colors.primaryColor : Colors.redColor,
              },
            ]}>
            {loadAll && <ActivityIndicator color={'#fff'} size={'small'} />}
            <TextAmount>R$ {totalValue.toFixed(2) || 0.0}</TextAmount>
          </View>
          <View style={{flex: 2}}>{this.renderAccounts()}</View>
        </ScrollView>
        {/* 悬浮按钮  */}
        <ActionButton buttonColor={Colors.terciaryColor} size={45}>
          <ActionButton.Item
            buttonColor={Colors.primaryColor}
            title={'收入'}
            onPress={() => this._goTarget('Incomes')}>
            <Icon name="add" color={'#fff'} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.redColor}
            title={'费用'}
            onPress={() => this._goTarget('Expenses')}>
            <Icon name="add" color={'#fff'} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.terciaryColor}
            title={'调动'}
            onPress={() => this._goTarget('Transference')}>
            <Icon name="add" buttonColor={'#ccc'} color={'#fff'} />
          </ActionButton.Item>
        </ActionButton>
      </StyledContainerView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  containerAccount: {
    height: height / 3,
    justifyContent: 'center',
  },

  actionButtonIcon: {
    color: '#fff',
  },
  // actionButtonIcon: {
  //   fontSize: 20,
  //   height: 22,
  //   color: 'white',
  // },
});

const mapStateToProps = ({account, typeOccurrence}) => {
  const {isFetching, accounts, totalValue, loadingTotal} = account;
  const {typeOccurrences} = typeOccurrence;
  return {
    isFetching,
    accounts,
    typeOccurrences,
    totalValue,
    loadingTotal,
  };
};

const mapDispatchToProps = dispatch => ({
  requestAccounts: async () => dispatch(requestAccounts()),
  requestTotalValue: async () => dispatch(requestTotalValue()),
  requestTypes: async () => dispatch(requestTypes()),
  fetchOccurrences: async () => dispatch(fetchOccurrences()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
