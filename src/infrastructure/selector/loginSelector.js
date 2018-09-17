import { createSelector } from 'reselect';

const getLoginData = state => {
  const login = state.login
  return login
}

export default createSelector(getLoginData, (login) => {
  return {
    login,
  }
})




