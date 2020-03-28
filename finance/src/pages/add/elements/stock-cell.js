import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import * as StockActions from '../../../redux/actions/stock';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'black',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
});

class StockCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
    };
  }

  onPressAdd(symbol) {
    console.log('_onPressAdd', symbol);
    this.props.addStock(symbol);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.onPressAdd(this.props.stock.symbol)}
        underlayColor="#202020">
        <View style={styles.container}>
          <View style={styles.stock}>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>{this.props.stock.symbol}</Text>
              <Text style={styles.marketText}>{this.props.stock.exchDisp}</Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.nameText}>{this.props.stock.name}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

StockCell.propTypes = {
  stock: PropTypes.shape({
    symbol: PropTypes.string,
    exchDisp: PropTypes.string,
    name: PropTypes.string,
  }),
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addStock: symbol => dispatch(StockActions.addStock(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCell);
