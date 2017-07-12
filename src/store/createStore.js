import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import makeRootReducer from './rootReducers';
import logger from 'redux-logger';

const myLogger = store => next => action => {
  console.log('MyLOG', 'store', store.getState(), 'next', next, 'action', action);
  next(action);
};

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [myLogger, thunk, routerMiddleware(browserHistory), logger];
  // const middleware = process.env.NODE_ENV !== 'production' ?
  //   [require('redux-immutable-state-invariant')(), thunk] :
  //   [thunk];
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./rootReducers', () => {
      const reducers = require('./rootReducers').default;
      // FIXME: What is this async reducers stuff here?
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
