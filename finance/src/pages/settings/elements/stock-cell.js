import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as StockActions from '../../../redux/actions/stock';

class StockCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlistResult: props.watchlistResult ? props.watchlistResult : [],
      stock: props.stock ? props.stock : {},
    };
  }

  onPressDelete(symbol) {
    console.log('onPressDelete', symbol);
    StockActions.deleteStock(symbol);
  }

  render() {
    let {stock, watchlistResult} = this.state;
    return (
      <View style={styles.container}>
        <Icon
          style={styles.deleteIcon}
          name="remove-circle"
          color="red"
          size={22}
          onPress={() => this.onPressDelete(stock.symbol)}
        />
        <View style={styles.stock}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>{stock.symbol}</Text>
            <Text style={styles.marketText}>
              {watchlistResult &&
                watchlistResult[stock.symbol] &&
                watchlistResult[stock.symbol].StockExchange}
            </Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>
              {watchlistResult &&
                watchlistResult[stock.symbol] &&
                watchlistResult[stock.symbol].Name}
            </Text>
          </View>
        </View>
        <Icon style={styles.move} name="menu" color="white" size={22} />
      </View>
    );
  }
}

StockCell.propTypes = {
  watchlistResult: PropTypes.shape({}),
  stock: PropTypes.shape({
    symbol: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
    height: 65,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  deleteIcon: {
    flex: 1,
    alignSelf: 'center',
  },
  deleteText: {
    fontSize: 15,
    color: '#FC3D39',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
  },
  stock: {
    flex: 8,
    flexDirection: 'column',
  },
  symbol: {
    flex: 1,
    flexDirection: 'row',
  },
  symbolText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  marketText: {
    fontSize: 15,
    color: '#A6A6A6',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  name: {
    flex: 1,
  },
  nameText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  move: {
    flex: 1,
    alignSelf: 'center',
  },
  moveText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
  },
});

export default StockCell;
