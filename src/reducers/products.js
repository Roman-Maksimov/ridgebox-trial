import { PRODUCTS_SET_LIST, PRODUCTS_SET_ITEM } from 'src/actions';

const initialState = {
  product: null,
  catalog: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_SET_LIST:
      return { ...state, catalog: action.payload };

    case PRODUCTS_SET_ITEM:
      return { ...state, product: action.payload };

    default:
      return state;
  }
};
