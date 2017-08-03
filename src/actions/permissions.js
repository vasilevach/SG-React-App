import * as types from 'constants/action-types';
import {RestfulAPI} from 'restful-js';

let restfulAPI = new RestfulAPI();


export function finishLoadPermissions(permissions) {
  return {
    type: types.PERMISSIONS_LOAD_FINISH,
    permissions
  };
}

export function startLoadPermissions() {
  return {
    type: types.PERMISSIONS_LOAD
  };
}

export function loadPermissions() {
  return dispatch => {
    dispatch(startLoadPermissions());
    restfulAPI.fetch(`http://localhost:8181/api/permissions`).then(response => {
      console.log('response', response)
      dispatch(finishLoadPermissions(response.permissions));
    }).catch(error => {console.log('error', error);});
  };
}
