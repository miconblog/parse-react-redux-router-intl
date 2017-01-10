import Parse from 'parse';

let reduxStore = null;

export function logout () {
  Parse.User.logOut();
}

export function initializeParseToRedux(_store) {

  if( !reduxStore ){
    reduxStore = _store;
  }

  const cookieStoredUser = Parse.User.current();

  if( cookieStoredUser ){

    console.log( cookieStoredUser )

    let query = new Parse.Query(Parse.Role);
    query.find().then(data=>{
      console.log('roles ==> ', data.getUsers() );
    })

    const loginUser = cookieStoredUser.toJSON();

    reduxStore.dispatch({
      type: 'UPDATE_LOGIN_USER',
      user: loginUser
    });
  }
}



export function requestPasswordReset(email, cb) {

  if (!reduxStore) {
    throw new Error('Parse-Redux Connector is not initialized!')
  }

  Parse.User.requestPasswordReset(email, {
    success: () => {

      console.log('Success!!')

    },
    error: (err) => {

      console.log('error', err)

    }
  });

}


export function saveUserInfoToParse(email, password, info, cb) {

  if( !reduxStore ) {
    throw new Error('Parse-Redux Connector is not initialized!')
  }

  Parse.User.logIn(email, password, {

    success: user => {

      user.set('nickname', info.nickname);
      user.set('baby', info.baby);
      user.save(null, {

        success: userAgain => {

          reduxStore.dispatch({
            type: 'UPDATE_LOGIN_USER',
            user: userAgain.toJSON()
          });

          cb && cb({
            success: {
              message: '수정되었습니다'
            }
          });

        },
        error: (userAgain, error ) => {

          cb && cb({
            error: error,
            message: '정보 수정에 실패했습니다.'
          });
        }

      })
    },
    error: ( user, error) => {

      cb && cb({
        error: error,
        message: '인증된 사용자가 아닙니다. 잘못된 접근입니다.'
      });
    }

  })
}
