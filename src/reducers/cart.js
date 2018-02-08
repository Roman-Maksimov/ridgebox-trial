import { CART_SET_ITEM, CART_REMOVE_ITEM } from 'src/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case CART_SET_ITEM:
      return {
        ...state,
        [action.product.id]: {
          ...action.product,
          quantity: action.quantity,
        },
      };

    case CART_REMOVE_ITEM: {
      const res = { ...state };
      delete res[action.id];
      return res;
    }

    default:
      return state;
  }
};
