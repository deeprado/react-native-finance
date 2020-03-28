import React from 'react';
import {View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

import {RenderDrawerMenu} from '../../components/DrawerUtils';
import Colors from '../../shared/Colors';
import {StyledContainerView} from '../../shared/Styled';

const data = [
  {name: '账目', press: 'Accounts', icon: 'account-balance'},
  {name: '分类', press: 'Categories', icon: 'folder'},
];

class Settings extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '设置',
    drawerLabel: '设置',
    drawerIcon: ({tintColor}) => <Icon name="settings" color={tintColor} />,
    headerLeft: () => RenderDrawerMenu(navigation),
    headerStyle: {backgroundColor: Colors.primaryColor},
  });

  renderList = () => {
    return data.map((list, idx) => {
      return (
        <ListItem
          hideChevron
          containerStyle={styles.containerStyle}
          key={idx}
          title={list.name}
          leftIcon={{name: list.icon}}
          onPress={() => this.props.navigation.navigate(list.press)}
        />
      );
    });
  };

  render() {
    return (
      <StyledContainerView style={{padding: 10}}>
        <View style={styles.containerStyle}>{this.renderList()}</View>
      </StyledContainerView>
    );
  }
}

const styles = {
  containerStyle: {
    borderTopColor: Colors.grayColor,
    borderColor: Colors.grayColor,
    borderBottomColor: Colors.grayColor,
  },
};

export default Settings;
