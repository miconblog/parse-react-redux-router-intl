import { schema, normalize } from 'normalizr';
import Parse from 'parse';
import ES6Symbol from 'es6-symbol';

const userSchema      = new schema.Entity('User',     { idAttribute: 'objectId' });
const postSchema      = new schema.Entity('Post',     { idAttribute: 'objectId' });
const activitySchema  = new schema.Entity('Activity', { idAttribute: 'objectId' });

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: new schema.Array(userSchema),
  POST: postSchema,
  POST_ARRAY: new schema.Array(postSchema),
  ACTIVITY: activitySchema,
  ACTIVITY_ARRAY: new schema.Array(activitySchema)
};

const PARSE_CLASS = {
  User    : Parse.User,
  Post    : Parse.Object.extend('Post'),
  Activity: Parse.Object.extend('Activity')
};


const dispatch = {
  success: function (objectName, schema, obj) {

    const data = obj.toJSON();
    return Object.assign({ objectName:objectName }, normalize(data, schema) );

  },
  
  error: function (obj, err) {

    console.log('Error', obj, err);
  }
}

const PARSE_SERVER = {
  fetch: (schema, params)=> {

    let query = new Parse.Query(PARSE_CLASS[params.objectName]);

    if (params.query) {

      params.query.forEach((args, i) => {

        const [key, ...arg] = args;

        if (arg.length === 1) {
          query[key](arg[0])
        }

        if (arg.length === 2) {
          query[key](arg[0], arg[1])
        }

      });
    }

    return query.find()
      .then(function(results){

        const data = [];
        results.forEach( result => {

          data.push( result.toJSON() )

        });

        return Object.assign({}, normalize(data, schema));

      }, function(error) {
        return error.code + ', ' + error.message;
      });
  },

  add: (schema, params) => {

    const parseObject = new PARSE_CLASS[params.objectName];
    const postACL = new Parse.ACL(Parse.User.current());
    postACL.setPublicReadAccess(false);
    postACL.setRoleReadAccess('admin', true);
    parseObject.setACL(postACL);

    if( params.values.author === 'me') {
      params.values.author = Parse.User.current();
    }

    return parseObject
      .save(params.values)
      .then(obj=>{
        const data = obj.toJSON();
        return Object.assign({ objectName:params.objectName }, normalize(data, schema) );

      }, (obj, err) => {

        console.log('Error', obj, err);

      });
  },

  update: (schema, params) => {

    const parseObject = new PARSE_CLASS[params.objectName];
    parseObject.id = params.id;

    return parseObject
      .save(params.values)
      .then(obj=>{

        const data = obj.toJSON();
        return Object.assign({ objectName:params.objectName }, normalize(data, schema) );

      }, (obj, err) => {

        console.log('Error', obj, err);

      });
  },

  remove: (schema, params ) => {
    const parseObject = new PARSE_CLASS[params.objectName];
    parseObject.id = params.id;

    return parseObject
      .destroy()
      .then(obj=>{

        const data = obj.toJSON();
        return Object.assign({ objectName:params.objectName }, normalize(data, schema) );

      }, (obj, err) => {

        console.log('Error', obj, err);

      });

  }
};



export const PARSE = ES6Symbol('ParseServer');
export default store => next => action => {

  if( !action ) { return }

  const parseSymbol = action[PARSE];

  // ParseServer로 호출하는 녀석만 처리한다.
  if (typeof parseSymbol === 'undefined') { return next(action) }

  const { schema, types, method, params=null } = parseSymbol;
  const [ requestType, successType, failureType, finishType ] = types;

  if (!schema) {
    throw new Error('필요한 스카마(Schema)가 없습니다.')
  }
  if (!Array.isArray(types) || types.length < 3) {
    throw new Error('ParseServer로 호출하는 액션은 최소 3개의 메시지 타입이 필요합니다.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('액션 메시지는 반드시 문자열이어야 합니다.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[PARSE];
    return finalAction
  }

  // 요청 액션을 실행하고
  next(actionWith({ type: requestType }));

  // For Debugging
  if( requestType === 'BO_REQUEST') {
    return;
  }

  // 성공과 실패에 대한 응답은 Promise 패턴으로 처리한다.
  return PARSE_SERVER[method](schema, params)
    .then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error || 'Something bad happened'
      }))
    )
    .done(
      done => {
        finishType && next(actionWith({ type: finishType }))
      }
    );
}
