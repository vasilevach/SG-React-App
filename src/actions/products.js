import * as types from 'constants/action-types';
import {RestfulAPI} from 'restful-js';

let restfulAPI = new RestfulAPI();

export function finishLoadProducts(products) {
  return {
    type: types.LIST_LOAD_FINISH,
    products
  };
}

export function startLoadProducts() {
  return {
    type: types.LIST_LOAD
  };
}

export function loadProducts() {
  return dispatch => {
    dispatch(startLoadProducts());
    restfulAPI.fetch(`http://localhost:8181/api/products`).then(response => {
      console.log('response', response)
        dispatch(finishLoadProducts(response.products));
    }).catch(error => {console.log('error', error);});
  };
}

export function finishCreateProduct(productData) {
  return {
    type: types.ITEM_CREATE,
    productData
  };
}

export function createProduct(productData) {

  return dispatch => {
    restfulAPI.post(`http://localhost:8181/api/product/${productData.name}`, productData).then(response => {
        dispatch(finishCreateProduct(response));
    }).catch(error => {console.log('error', error);});
  };
}

export function finishDeleteProduct(productName) {
  return {
    type: types.ITEM_DELETE,
    productName
  };
}


export function deleteProduct(productName) {
  return dispatch => {
    restfulAPI.destroy(`http://localhost:8181/api/product/${productName}`).then(response => {
        dispatch(finishDeleteProduct(productName));
    }).catch(error => {console.log('error', error);});
  };
}


export function finishEditProduct(productData) {
    return {
      type: types.ITEM_EDIT,
      productData
    };
  }

  export function editProduct(productData) {
    return dispatch => {
      restfulAPI.put(`http://localhost:8181/api/product/${productData.name}`, productData).then(response => {
          dispatch(finishEditProduct(response));
      }).catch(error => {console.log('error', error);});
    };
  }
