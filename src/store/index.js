// Create final store using all reducers and applying middleware
import { createBrowserHistory } from 'history';
// Redux utility functions
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
// Import all reducers
import * as reducers from 'reducers';
import ReduxThunk from 'redux-thunk';

// Configure reducer to store state at state.router
// You can store it elsewhere by specifying a custom `routerStateSelector`
// in the store enhancer below
export const history = createBrowserHistory();
const reducer = combineReducers({ ...reducers });

const store = compose(
  applyMiddleware(routerMiddleware(history)),
  applyMiddleware(ReduxThunk),
  // Provides support for DevTools via Chrome extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(connectRouter(history)(reducer));

export default store;
