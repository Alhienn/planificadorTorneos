import axios from 'axios';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actionTypes';
import { returnErrors } from './errors';

export const loadUser = () => (dispatch, getState) => {
  const config = tokenConfig(getState);

  axios.get('http://127.0.0.1:8000/api/auth/user', config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    }).catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    })
}

export const login = (username, password) => (dispatch) => {
  dispatch({ type: USER_LOADING })

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, password })

  axios.post('http://127.0.0.1:8000/api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    }).catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

export const register = ({username, password, email}) => (dispatch) => {
  dispatch({ type: USER_LOADING })

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, email,password })

  axios.post('http://127.0.0.1:8000/api/auth/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    }).catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      })
    })
}

export const logout = () => (dispatch, getState) => {

  const config = tokenConfig(getState);

  axios.post('http://127.0.0.1:8000/api/auth/logout',null, config)
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      })
    }).catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    })
}

export function tokenConfig(getState) {
  const token = getState().authReducer.token;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token)
    config.headers['Authorization'] = `Token ${token}`;
  return config;
}