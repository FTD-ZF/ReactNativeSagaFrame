import { combineReducers } from 'redux';
import nav from './nav';
import list from './list';
import login from './login';
const rootReducer = combineReducers({
  nav,
  list,
  login,
});

export default rootReducer;
