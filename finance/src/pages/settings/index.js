import React from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';

import * as StockActions from '../../../redux/actions/stock';

import Icon from 'react-native-vector-icons/MaterialIcons';

import StockCell from './elements/stock-cell';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.updateStocks();
  }

  onStockStoreChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.watchlist),
      watchlistResult: state.watchlistResult,
      selectedProperty: state.selectedProperty,
      key: Math.random(),
    });
  }

  onActionSelected(position) {
    if (position === 0) {
      // index of 'Add'
      // Actions.add();
    } else if (position === 1) {
      // index of 'Done'
      // Actions.pop();
    }
  }

  renderToolbar() {
    // if (Platform.OS === 'ios') {
    //   return (
    //     <NavigationBar
    //       statusBar={{tintColor: '#202020', style: 'light-content'}}
    //       style={styles.navigatorBarIOS}
    //       title={{title: this.props.title, tintColor: 'white'}}
    //       leftButton={
    //         <Icon
    //           style={styles.navigatorLeftButton}
    //           name="add"
    //           size={26}
    //           color="#3CABDA"
    //           // onPress={Actions.add}
    //         />
    //       }
    //       rightButton={{
    //         title: 'Done',
    //         tintColor: '#3CABDA',
    //         // handler: Actions.pop,
    //       }}
    //     />
    //   );
    // } else if (Platform.OS === 'android') {
    //   return (
    //     <Icon.ToolbarAndroid
    //       style={styles.toolbar}
    //       title={this.props.title}
    //       titleColor="white"
    //       actions={[
    //         {title: 'Add', iconName: 'add', iconSize: 26, show: 'always'},
    //         {title: 'Done', iconName: 'check', iconSize: 26, show: 'always'},
    //       ]}
    //       onActionSelected={position => this.onActionSelected(position)}
    //     />
    //   );
    // }
  }

  render() {
    let {
      stocks,
      watchlistResult,
      selectProperty,
      selectedProperty,
    } = this.props;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          {this.renderToolbar()}
          <View style={styles.topBlock}>
            <FlatList
              data={stocks}
              renderItem={({item, index}) => {
                let stock = item;
                return (
                  <StockCell
                    key={index}
                    stock={stock}
                    watchlistResult={watchlistResult}
                  />
                );
              }}
            />
          </View>
          <View style={styles.bottomBlock}>
            <TouchableHighlight
              style={[
                styles.buttonLeft,
                selectedProperty === 'ChangeinPercent'
                  ? styles.buttonSelected
                  : null,
              ]}
              underlayColor="#66CCFF"
              onPress={() => selectProperty('ChangeinPercent')}>
              <Text
                style={[
                  styles.buttonText,
                  selectedProperty === 'ChangeinPercent'
                    ? styles.buttonTextSelected
                    : null,
                ]}>
                百分比
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.buttonMiddle,
                selectedProperty === 'Change' ? styles.buttonSelected : null,
              ]}
              underlayColor="#66CCFF"
              onPress={() => selectProperty('Change')}>
              <Text
                style={[
                  styles.buttonText,
                  selectedProperty === 'Change'
                    ? styles.buttonTextSelected
                    : null,
                ]}>
                价格
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.buttonRight,
                selectedProperty === 'MarketCapitalization'
                  ? styles.buttonSelected
                  : null,
              ]}
              underlayColor="#66CCFF"
              onPress={() => selectProperty('MarketCapitalization')}>
              <Text
                style={[
                  styles.buttonText,
                  selectedProperty === 'MarketCapitalization'
                    ? styles.buttonTextSelected
                    : null,
                ]}>
                市值
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

Settings.propTypes = {
  title: PropTypes.string,
};

Settings.defaultProps = {
  title: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  navigatorBarIOS: {
    backgroundColor: '#202020',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424242',
  },
  navigatorLeftButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
  },
  navigatorRightButton: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 10,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#202020',
  },
  topBlock: {
    flex: 1,
  },
  bottomBlock: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#3CABDA',
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center',
  },
  buttonTextSelected: {
    color: 'black',
  },
});

// export default Settings;

const mapStateToProps = state => ({
  selectedProperty: state.stock.selectedProperty,
  watchlistResult: state.stock.watchlistResult,
});

const mapDispatchToProps = dispatch => ({
  updateStocks: () => dispatch(StockActions.updateStocks()),
  selectProperty: property => dispatch(StockActions.selectProperty(property)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
