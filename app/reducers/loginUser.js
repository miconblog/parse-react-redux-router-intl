import merge from 'lodash/merge';
import { LOGOUT_USER, LOGIN_USER, UPDATE_LOGIN_USER } from '../actions/user';

const initialState = {};

export default function loginUser(state = initialState, action) {
  switch (action.type) {

    case LOGOUT_USER:

      state = null;
      return merge({}, state);

    case LOGIN_USER:

      return merge({}, state, action.user);


    case UPDATE_LOGIN_USER:
      return merge({}, state, action.user);

    default:
      return state;
  }
}
