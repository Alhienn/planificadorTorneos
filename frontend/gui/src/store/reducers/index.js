import { combineReducers } from 'redux';


import auth from './auth';
import errors from './errors';
import success from './success';

export default combineReducers({
  auth,
  errors,
  success
});