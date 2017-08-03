import * as types from 'constants/action-types';

const initialState = {
  permissions: [],
  loading: false
};

export default function permissions(state = initialState, action) {
  switch (action.type) {
    case types.PERMISSIONS_LOAD:
      return { ...state, loading: true };
    case types.PERMISSIONS_LOAD_FINISH:
      return { ...state, loading: false, permissions: action.permissions };
    default:
      return state;
  }
}
