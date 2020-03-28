import React from 'react';
import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import t from 'tcomb-form-native';

import _ from 'lodash';
import moment from 'moment';
import {Button} from 'react-native-elements';

import Colors from '../../shared/Colors';

import maskedInputTemplate from '../../components/maskedInputTemplate';

import {
  requestTypes,
  requestIncomeOccurrence,
} from '../../redux/actions/occurrence';
import {requestCategories} from '../../redux/actions/category';
import {requestAccounts} from '../../redux/actions/account';

const {width, height} = Dimensions.get('window');

let Form = t.form.Form;

const amountStyle = _.cloneDeep(t.form.Form.stylesheet);
amountStyle.textbox.normal.fontSize = 50;
amountStyle.textbox.error.fontSize = 50;
amountStyle.textbox.normal.color = '#fff';
amountStyle.textbox.normal.borderWidth = 0;
amountStyle.textbox.normal.height = 120;
amountStyle.textbox.normal.width = width;
amountStyle.textbox.normal.textAlign = 'right';
amountStyle.textbox.error.borderWidth = 0;
amountStyle.textbox.error.height = 120;
amountStyle.textbox.error.width = width;
amountStyle.textbox.error.textAlign = 'right';
amountStyle.textbox.error.color = '#fff';

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.normal.borderBottomWidth = 1;
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textbox.normal.height = 34;
stylesheet.controlLabel.normal.fontWeight = 'normal';
stylesheet.controlLabel.normal.fontSize = 15;
stylesheet.controlLabel.normal.color = Colors.terciaryColor;
stylesheet.controlLabel.normal.marginBottom = 0;
stylesheet.textboxView.normal.borderRadius = 2;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderColor = '#ccc';
stylesheet.textboxView.error.borderColor = Colors.errorColor;
stylesheet.dateValue.normal.borderColor = '#ccc';
stylesheet.dateValue.normal.alignItems = 'center';
stylesheet.dateValue.normal.justifyContent = 'center';
stylesheet.dateValue.normal.borderRadius = 4;
stylesheet.dateValue.normal.height = 34;
stylesheet.dateValue.normal.borderBottomWidth = 1;
stylesheet.dateValue.normal.fontSize = 15;

const dateFormat = (format, date) => {
  return moment(date).format(format);
};

const effectiveDate = {
  label: '日期',
  mode: 'date',
  error: '日期为必填项',
  config: {
    format: date => dateFormat('DD/MM/YYYY', date),
  },
  placeholder: 'xxxxxxxx',
};

function incomesTemplate(locals) {
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primaryColor,
          height: height / 4,
        }}>
        {locals.inputs.amount}
      </View>
      <View style={{padding: 10}}>
        {locals.inputs.date}
        {locals.inputs.categoryId}
        {locals.inputs.accountId}
        {locals.inputs.description}
      </View>
    </View>
  );
}

const formOptions = {
  stylesheet: stylesheet,
  template: incomesTemplate,
  fields: {
    date: effectiveDate,
    amount: {
      auto: 'none',
      keyboardType: 'phone-pad',
      placeholder: '0,00',
      stylesheet: amountStyle,
      template: maskedInputTemplate,
      config: {
        type: 'money',
      },
      placeholderTextColor: '#fff',
    },
    categoryId: {
      label: '类别',
      nullOption: {value: '', text: '选择类别'},
    },
    accountId: {
      label: '账户/卡',
      nullOption: {value: '', text: '选择帐号'},
    },

    description: {
      label: '内容描述',
    },
  },
};

class Incomes extends React.Component {
  static navigationOptions = {
    title: '收入',
    headerStyle: {},
  };

  componentDidMount = async () => {
    await this.props.requestTypes();
    await this.props.requestAccounts();
    await this.props.requestCategories();
  };

  handleIncome = async () => {
    let value = this.form.getValue();
    // if (!value) {
    //   Alert.alert('请稍候重试');
    //   return false;
    // }
    let tmpValue = {
      amount: 'R$20',
      date: '20200104',
      accountId: 1,
      categoryId: 1,
      description: 'aaaa',
    };
    // value = value || tmpValue;

    const incomesId = this.props.typeOccurrences.filter(
      t => t.name === 'Receita',
    )[0].id;

    let {amount, date, accountId, categoryId, description} = value;
    let amountFormatted = amount.replace('R$', '');
    if (value) {
      let occurrence = {
        amount: amountFormatted,
        date,
        account_id: accountId,
        category_id: categoryId,
        type_id: incomesId,
        description,
      };
      await this.props.requestIncomeOccurrence(occurrence);
      this.goBack();
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    let {loading} = this.props;
    let accountsData = (this.props.accounts || []).reduce((acc, row) => {
      acc[row.id] = row.name;
      return acc;
    }, {});

    let categoriesData = (this.props.categories || []).reduce((acc, row) => {
      acc[row.id] = row.name;
      return acc;
    }, {});

    let Accounts = t.enums(accountsData, 'Accounts');
    let Categories = t.enums(categoriesData, 'Categories');
    let IncomesForm = t.struct({
      amount: t.String,
      date: t.Date,
      accountId: Accounts,
      categoryId: Categories,
      description: t.maybe(t.String),
    });
    return (
      <View style={{flex: 2, backgroundColor: '#fff'}}>
        <Form
          ref={form => (this.form = form)}
          options={formOptions}
          type={IncomesForm}
        />
        <View style={styles.buttons}>
          <Button
            title="添加"
            medium
            loading={loading}
            onPress={this.handleIncome}
            backgroundColor={Colors.primaryColor}
            iconRight={{name: 'check', size: 30}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
});

const mapStateToProps = ({occurrence, account, category, typeOccurrence}) => {
  let {loading} = occurrence;
  let {typeOccurrences} = typeOccurrence;
  let {accounts} = account;
  let {categories} = category;
  return {loading, accounts, categories, typeOccurrences};
};

export default connect(mapStateToProps, {
  requestTypes,
  requestIncomeOccurrence,
  requestAccounts,
  requestCategories,
})(Incomes);
