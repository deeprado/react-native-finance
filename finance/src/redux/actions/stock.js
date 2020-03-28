import * as type from './actionType';

export function updateStocks() {
  return dispatch => {
    dispatch(st_updateStocks());
  };
}

function st_updateStocks() {
  return {
    type: type.UPDATE_STOCKS,
  };
}

export function updateStock(stock) {
  return dispatch => {
    dispatch(st_updateStock(stock));
  };
}

function st_updateStock(stock) {
  return {
    type: type.UPDATE_STOCK,
    stock: stock,
  };
}

export function addStock(stock) {
  return dispatch => {
    dispatch(st_addStock(stock));
  };
}

function st_addStock(stock) {
  return {
    type: type.ADD_STOCK,
    stock: stock,
  };
}

export function deleteStock(stock) {
  return dispatch => {
    dispatch(st_deleteStock(stock));
  };
}

function st_deleteStock(stock) {
  return {
    type: type.ADD_STOCK,
    stock: stock,
  };
}

export function selectStock(stock) {
  return dispatch => {
    dispatch(st_selectStock(stock));
  };
}

function st_selectStock(stock) {
  return {
    type: type.ADD_STOCK,
    stock: stock,
  };
}

export function selectProperty(property) {
  return dispatch => {
    dispatch(st_selectProperty(property));
  };
}

function st_selectProperty(property) {
  return {
    type: type.SELECT_PROPERTY,
    property: property,
  };
}

/* default 导出所有 Action Creators */
export default {
  // 虽然是同步的函数，但请不要自行 bindActionCreators
  // 皆因调用 connect 后，react-redux 已经帮我们做了，见：
  // https://github.com/reactjs/react-redux/blob/master/src/utils/wrapActionCreators.js
  updateStock,
  selectStock,
  addStock,
  deleteStock,
};

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
