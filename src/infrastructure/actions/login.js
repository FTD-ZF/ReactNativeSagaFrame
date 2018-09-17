import * as Types from '../constants/actionsTypes';

export let fetchLogin = (params) => {
  return {
    type: Types.FETCH_LOGIN,
    params
  }
}




