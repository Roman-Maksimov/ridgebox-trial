import request from 'src/utils/request';

export const PRODUCTS_SET_LIST = 'PRODUCTS_SET_LIST';
export const PRODUCTS_SET_ITEM = 'PRODUCTS_SET_ITEM';

export const productsSetList = payload => ({
  type: PRODUCTS_SET_LIST,
  payload,
});

export const productsSetItem = payload => ({
  type: PRODUCTS_SET_ITEM,
  payload,
});

export const prodcutsGetList = () => dispatch => request('/products')
  .then(res => dispatch(productsSetList(res)));

export const productsGetItem = id => dispatch => request(`/products/${id}`)
  .then(res => dispatch(productsSetItem(res.id ? res : null)));
