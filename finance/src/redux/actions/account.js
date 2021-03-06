import {
  FETCH_ACCOUNT_LOADING,
  FETCH_TOTAL_VALUE_LOADING,
  FETCH_TOTAL_VALUE_FULFILLED,
  FETCH_ACCOUNT_FULFILLED,
  FETCH_ACCOUNT_ERROR,
  REQUEST_ACCOUNT_TYPE_LOADING,
  REQUEST_ACCOUNT_TYPE_SUCCESS,
  CREATE_ACCOUNT_LOADING,
} from './actionType';

import Api from '../../shared/Api';

export const requestAccounts = () => {
  return async dispatch => {
    dispatch({type: FETCH_ACCOUNT_LOADING});
    try {
      let accounts = await Api.account();
      dispatch(accountRequestSuccess(accounts));
    } catch (err) {
      dispatch(accountRequestError(err));
    }
  };
};

export const handleAccountCreate = account => {
  return async dispatch => {
    dispatch({type: CREATE_ACCOUNT_LOADING});
    try {
      let accounts = await Api.createAccount(account);
    } catch (err) {
      dispatch(accountRequestError(err));
    }
  };
};

export const requestAccountType = () => {
  return async dispatch => {
    dispatch({type: REQUEST_ACCOUNT_TYPE_LOADING});
    try {
      let accountTypes = await Api.accountTypes();
      dispatch(accountTypeRequestSuccess(accountTypes));
    } catch (err) {
      dispatch(accountRequestError(err));
    }
  };
};

export const accountTypeRequestSuccess = accountTypes => {
  return dispatch => {
    dispatch({
      type: REQUEST_ACCOUNT_TYPE_SUCCESS,
      payload: accountTypes,
    });
  };
};

export const requestTotalValue = () => {
  return async dispatch => {
    dispatch({type: FETCH_TOTAL_VALUE_LOADING});
    try {
      let totalValue = await Api.dashboard();
      dispatch(totalValueRequestSuccess(totalValue));
    } catch (err) {
      dispatch(accountRequestError(err));
    }
  };
};

export const totalValueRequestSuccess = totalValue => {
  return dispatch => {
    dispatch({
      type: FETCH_TOTAL_VALUE_FULFILLED,
      payload: totalValue.total,
    });
  };
};

export const accountRequestSuccess = accounts => {
  return dispatch => {
    dispatch({
      type: FETCH_ACCOUNT_FULFILLED,
      payload: accounts,
    });
  };
};

export function accountRequestError(err) {
  return {
    type: FETCH_ACCOUNT_ERROR,
    payload: {
      err,
    },
  };
}
