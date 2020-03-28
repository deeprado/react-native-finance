import {combineReducers} from 'redux';

// 导航
import nav from './nav';
// 业务
import theme from './theme';

import {dashboard} from './dashboard';
import {account} from './account';
import {occurrence} from './occurrence';
import {category} from './category';
import {typeOccurrence} from './typeOccurrence';

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export default combineReducers({
  nav: nav,
  theme: theme,
  dashboard,
  account,
  occurrence,
  category,
  typeOccurrence,
});

// const redu = combineReducers({
//   nav: nav,
//   theme: theme,
// });

// export default redu;
