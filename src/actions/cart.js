export const CART_SET_ITEM = 'CART_GET_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

export const cartSetItem = (product, quantity) => ({
  type: CART_SET_ITEM,
  product, quantity,
});

export const cartRemoveItem = id => ({
  type: CART_REMOVE_ITEM,
  id,
});
