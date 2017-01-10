import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import parse from '../middleware/parse';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import Parse from 'parse';
import ReactGA from 'react-ga';

// FIXME: Config your GA & Parse
// ReactGA.initialize('UA-000000-01');
Parse.initialize('FIXME');
Parse.serverURL = 'http://localhost:1338/parse';

const finalCreateStore = compose(
  applyMiddleware(thunk, parse),
  //applyMiddleware(createLogger()),  // if don't want this logger, comment out this!
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export default function configureStore(initialState) {

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    });
  }

  return store
}
