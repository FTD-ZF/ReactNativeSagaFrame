import { handleActions } from 'redux-actions';
import * as Types from '../constants/actionsTypes';

const initialState = {
  data: {}
}

const handler = {}

handler[Types.FETCH_LOGIN_SUCCESS] = (state, action) => {

  return {
    ...state,
    data: action,
  }
}

handler[Types.FETCH_LOGIN_ERROR] = (state, action) => {
  return {
    ...state,
    data: action,
  }
}

export default handleActions(handler, initialState)