import {
  FETCH_ACCOUNT_LOADING,
  FETCH_ACCOUNT_FULFILLED,
  FETCH_ACCOUNT_ERROR,
  FETCH_TOTAL_VALUE_LOADING,
  FETCH_TOTAL_VALUE_FULFILLED,
  REQUEST_ACCOUNT_TYPE_SUCCESS,
  REQUEST_ACCOUNT_TYPE_LOADING,
  CREATE_ACCOUNT_LOADING,
} from '../actions/actionType';

const initialState = {
  isFetching: false,
  accounts: [],
  totalValue: 0,
  error: null,
  loadingTotal: false,
};

export const account = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_LOADING: {
      return {...state, isFetching: true};
    }
    case CREATE_ACCOUNT_LOADING: {
      return {...state, isFetching: true};
    }
    case FETCH_ACCOUNT_FULFILLED: {
      return {...state, isFetching: false, accounts: action.payload};
    }
    case REQUEST_ACCOUNT_TYPE_LOADING: {
      return {...state, isFetching: true};
    }
    case REQUEST_ACCOUNT_TYPE_SUCCESS: {
      return {...state, isFetching: false, accountTypes: action.payload};
    }
    case FETCH_ACCOUNT_ERROR: {
      return {...state, isFetching: false, error: action.payload};
    }
    case FETCH_TOTAL_VALUE_LOADING: {
      return {...state, loadingTotal: true};
    }
    case FETCH_TOTAL_VALUE_FULFILLED: {
      return {...state, loadingTotal: false, totalValue: action.payload};
    }
  }
  return state;
};
