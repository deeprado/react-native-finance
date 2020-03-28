import {
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_ERROR,
} from './actionType';
import Api from '../../shared/Api';

export const requestCategories = () => {
  return async dispatch => {
    dispatch({type: FETCH_CATEGORIES_LOADING});
    try {
      let categories = await Api.categories();
      dispatch(categoriesRequestSuccess(categories));
    } catch (err) {
      dispatch(categoriesRequestError(err));
    }
  };
};

export const categoriesRequestSuccess = categories => {
  return dispatch => {
    dispatch({
      type: FETCH_CATEGORIES_FULFILLED,
      payload: categories,
    });
  };
};

export function categoriesRequestError(err) {
  return {
    type: FETCH_CATEGORIES_ERROR,
    payload: {
      err,
    },
  };
}
