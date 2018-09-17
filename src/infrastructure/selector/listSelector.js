import { createSelector } from 'reselect';

const getListData = state => {
  const list = state.list
  return list
}

export default createSelector(getListData, (list) => {
  return {
    list,
  }
})




