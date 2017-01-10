export const UPDATE_LOGIN_USER = 'UPDATE_LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';

export function logout() {

  return (dispatch, getState) => {

    return dispatch({
      type: LOGOUT_USER
    });

  }
}

export function login(params) {

  delete params.username;

  return (dispatch, getState) => {
    return dispatch({
      type: LOGIN_USER,
      user: params
    });
  }

}


export function updateLoginUser(params) {

  delete params.username;

  return (dispatch, getState) => {
    return dispatch({
      type: UPDATE_LOGIN_USER,
      user: params
    });
  }

}
