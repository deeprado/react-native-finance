import * as type from '../actions/actionType';

const initialState = {
  stocks: [
    {
      symbol: 'sss',
      exchDisp: 'asdfs',
      name: 'asdfss',
    },
  ],
  selectedProperty: '',
  watchlistResult: [],
};

const theme = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_STOCK:
      return {
        ...state,
        stock: action.stock,
      };
    default:
      return state;
  }
};

export default theme;
