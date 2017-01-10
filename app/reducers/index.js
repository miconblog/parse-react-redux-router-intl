import { fromJS }           from 'immutable';
import { LOCATION_CHANGE }  from 'react-router-redux';
import { combineReducers }  from 'redux-immutable';
import { routerReducer }    from 'react-router-redux';

import loginUser from './loginUser';
import language  from './language';


const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  routing: routerReducer,
  loginUser,
  language
})

export default rootReducer
