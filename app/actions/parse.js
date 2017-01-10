/**
 * Redux Actions for ParseSever
 *
 */

import { PARSE, Schemas } from '../middleware/parse'

export const PARSE_FETCH_REQUEST = 'PARSE_FETCH_REQUEST';
export const PARSE_FETCH_SUCCESS = 'PARSE_FETCH_SUCCESS';
export const PARSE_FETCH_FAILURE = 'PARSE_FETCH_FAILURE';

export function fetch(params) {

  const schema = Schemas[`${params.objectName.toUpperCase()}_ARRAY`];

  return (dispatch, getState) => {
    return dispatch(function() {
      return {
        [PARSE]: {
          method: 'fetch',
          types: [ PARSE_FETCH_REQUEST, PARSE_FETCH_SUCCESS, PARSE_FETCH_FAILURE ],
          schema: schema,
          params: params
        }
      }
    }())
  }
}


export const PARSE_ADD_REQUEST = 'PARSE_ADD_REQUEST';
export const PARSE_ADD_SUCCESS = 'PARSE_ADD_SUCCESS';
export const PARSE_ADD_FAILURE = 'PARSE_ADD_FAILURE';

export function add(params) {

  const schema = Schemas[`${params.objectName.toUpperCase()}`];

  return (dispatch, getState) => {
    return dispatch(function() {
      return {
        [PARSE]: {
          method: 'add',
          types: [ PARSE_ADD_REQUEST, PARSE_ADD_SUCCESS, PARSE_ADD_FAILURE ],
          schema: schema,
          params: params
        }
      }
    }())
  }
}


export const PARSE_UPDATE_REQUEST = 'PARSE_UPDATE_REQUEST';
export const PARSE_UPDATE_SUCCESS = 'PARSE_UPDATE_SUCCESS';
export const PARSE_UPDATE_FAILURE = 'PARSE_UPDATE_FAILURE';

export function update(params) {

  const schema = Schemas[`${params.objectName.toUpperCase()}`];

  return (dispatch, getState) => {
    return dispatch(function() {
      return {
        [PARSE]: {
          method: 'update',
          types: [ PARSE_UPDATE_REQUEST, PARSE_UPDATE_SUCCESS, PARSE_UPDATE_FAILURE ],
          schema: schema,
          params: params
        }
      }
    }())
  }
}


export const PARSE_REMOVE_REQUEST = 'PARSE_REMOVE_REQUEST';
export const PARSE_REMOVE_SUCCESS = 'PARSE_REMOVE_SUCCESS';
export const PARSE_REMOVE_FAILURE = 'PARSE_REMOVE_FAILURE';

export function remove(params) {

  const schema = Schemas[`${params.objectName.toUpperCase()}`];

  return (dispatch, getState) => {
    return dispatch(function() {
      return {
        [PARSE]: {
          method: 'remove',
          types: [ PARSE_REMOVE_REQUEST, PARSE_REMOVE_SUCCESS, PARSE_REMOVE_FAILURE ],
          schema: schema,
          params: params
        }
      }
    }())
  }
}



