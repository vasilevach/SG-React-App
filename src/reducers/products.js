import * as types from 'constants/action-types';
const _ = require('lodash');

const initialState = {
  products: [],
  loading: false
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case types.LIST_LOAD_FINISH:
      return { ...state, loading: false, products: action.products };

    case types.LIST_LOAD:
      return { ...state, loading: true };

    case types.ITEM_DELETE:
      let newProductsState = state.products.filter(c => c.name !== action.productName);
      return { ...state, products: newProductsState };

    case types.ITEM_EDIT:
      console.log(action.productData);
      return { products : state.products.map( (item) => {
          if(item.name !== action.productData.name) {
              return item;
          }

          return {
              ...item,
              ...action.productData
          };
      })
    }

    case types.ITEM_CREATE:
      return { ...state, loaded: false, products: state.products.concat(action.productData) };

    default:
      return state;
  }
}
