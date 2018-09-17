import { handleActions } from 'redux-actions';
import * as Types from '../constants/actionsTypes';

const initialState = {
  data: [],
  page: 1,
}

const handler = {}

handler[Types.RECEIVE_LIST_SUCCESS] = (state, action) => {

  return {
    ...state,
    data: action,
    page: action.page
  }
}

handler[Types.RECEIVE_LIST_ERROR] = (state, action) => {
  return {
    ...state,
    data: action,
  }
}

export default handleActions(handler, initialState)