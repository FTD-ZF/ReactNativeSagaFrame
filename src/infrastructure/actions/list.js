import * as Types from '../constants/actionsTypes';

export let fetchList = (page) => {
  return {
    type: Types.FETCH_LIST,
    page
  }


}




