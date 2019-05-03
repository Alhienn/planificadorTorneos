import { combineReducers } from 'redux';


import auth from './auth';
import errors from './errors';

export default combineReducers({
  authReducer: auth,
  errorReducer: errors,
});