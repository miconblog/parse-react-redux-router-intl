import { PARSE, Schemas } from '../middleware/parse'

export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const ADD_NOTE_FAILURE = 'ADD_NOTE_FAILURE';

export function verbNoun (params) {
  return (dispatch, getState) => {
    return dispatch(function(){
      return {
        [PARSE]: {
          method: 'verbNoun',
          params: params,
          types: [ ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE ],
          schema: Schemas.DIARY_NOTE
        }
      }
    }());
  }
}


