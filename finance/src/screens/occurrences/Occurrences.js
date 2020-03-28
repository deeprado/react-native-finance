import React from 'react';

import moment from 'moment';
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon, List} from 'react-native-elements';

import _ from 'lodash';
import {zhCn} from 'moment/locale/zh-cn';

import Colors from '../../shared/Colors';

import {RenderDrawerMenu} from '../../components/DrawerUtils';
import OccurrencesList from '../../components/OccurrencesList';

import {
  fetchOccurrences,
  deleteOccurrence,
} from '../../redux/actions/occurrence';

moment.locale(zhCn);

class Occurrences extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '收支',
    drawerLabel: '收支',
    drawerIcon: ({tintColor}) => <Icon name="trending-up" color={tintColor} />,
    headerLeft: () => RenderDrawerMenu(navigation),
    headerStyle: {
      position: 'absolute',
      backgroundColor: Colors.primaryColor,
      top: 0,
      left: 0,
      right: 0,
      elevation: 0,
      borderBottomWidth: 0,
    },
  });

  state = {
    refreshing: false,
  };

  componentDidMount = () => {
    this.fetchOccurrences();
  };

  fetchOccurrences = () => {
    this.props.fetchOccurrences();
  };

  delete = async id => {
    await this.props.deleteOccurrence(id);
    await this.fetchOccurrences();
  };

  _onRefresh = async () => {
    this.setState({refreshing: true});
    await this.props.requestTotalValue();
    this.setState({refreshing: false});
  };

  renderList = () => {
    let {occurrences} = this.props;
    var groups = _.groupBy(occurrences, function(occurrence) {
      return moment(occurrence.date).format();
    });
    var result = _.map(groups, function(group, day) {
      return {
        day: day,
        occurrence: group,
      };
    });

    return result.map((r, idx) => {
      return (
        <OccurrencesList
          press={id => this.delete(id)}
          key={idx}
          date={r.day}
          occurrence={r.occurrence}
        />
      );
    });
  };

  render() {
    let {loading} = this.props;

    if (loading) {
      return (
        <SafeAreaView>
          <View
            style={{
              marginTop: 20,
            }}>
            <ActivityIndicator color={Colors.primaryColor} size={'large'} />
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
          <View
            style={{
              paddingTop: 40,
            }}>
            {/* <List></List> */}
            {this.renderList()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({occurrence}) => {
  let {loading, deleteLoading, occurrences} = occurrence;
  return {loading, occurrences, deleteLoading};
};

const mapDispatchToProps = dispatch => ({
  fetchOccurrences: async () => dispatch(fetchOccurrences()),
  deleteOccurrence: async () => dispatch(deleteOccurrence()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Occurrences);
