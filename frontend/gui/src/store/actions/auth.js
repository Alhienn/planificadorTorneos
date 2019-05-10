import axios from 'axios';

import {
  USER_LOADING,
  USER_LOADED,
  USER_UPDATE,
  PASSWORD_UPDATE,
  UPDATE_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actionTypes';
import { returnErrors, clearErrors } from './errors';

export const loadUser = () => (dispatch, getState) => {
  dispatch({type: USER_LOADING});

  const config = tokenConfig(getState);

  axios.get('http://127.0.0.1:8000/api/auth/user', config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    }).catch(err => {
      dispatch({
        type: AUTH_ERROR
      })
      dispatch(returnErrors(err, "auth"));
    })
}

export const login = (username, password, remember) => (dispatch) => {
  dispatch({type: USER_LOADING});

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, password });

  axios.post('http://127.0.0.1:8000/api/auth/login', body, config)
    .then(res => {
      dispatch(clearErrors());
      let payload = {
        ...res.data,
        remember: remember
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: payload
      })
    }).catch(err => {
      dispatch({
        type: LOGIN_FAIL
      })
      dispatch(returnErrors(err, "auth"));
    })
}

export const register = (username, email,  password, remember) => (dispatch) => {
  dispatch({type: USER_LOADING});

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, email, password})

  axios.post('http://127.0.0.1:8000/api/auth/register', body, config)
    .then(res => {
      dispatch(clearErrors());
      let payload = {
        ...res.data,
        remember: remember
      }
      dispatch({
        type: REGISTER_SUCCESS,
        remember: remember,
        payload: payload
      })
    }).catch(err => {
      dispatch({
        type: REGISTER_FAIL
      })
      dispatch(returnErrors(err));
    })
}

export const updateUser = (username, email) => (dispatch, getState) => {
  dispatch({type: USER_LOADING});

  const config = tokenConfig(getState);

  const body = JSON.stringify({ username, email });

  axios.put('http://127.0.0.1:8000/api/auth/user', body, config)
    .then(res => {
      dispatch(clearErrors());
      let payload = {
        ...res.data,
      }
      dispatch({
        type: USER_UPDATE,
        payload: payload
      })
    }).catch(err => {
      dispatch({
        type: UPDATE_FAIL
      })
      dispatch(returnErrors(err, "auth"));
    })
}

export const updatePassword = (old_password, new_password) => (dispatch, getState) => {
  dispatch({type: USER_LOADING});

  const config = tokenConfig(getState);

  const body = JSON.stringify({ old_password, new_password });

  axios.put('http://127.0.0.1:8000/api/auth/changePassword', body, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: PASSWORD_UPDATE
      })
    }).catch(err => {
      dispatch({
        type: UPDATE_FAIL
      })
      dispatch(returnErrors(err, "auth"));
    })
}

export const logout = () => (dispatch, getState) => {
  dispatch({type: USER_LOADING});

  const config = tokenConfig(getState);

  axios.post('http://127.0.0.1:8000/api/auth/logout',null, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: LOGOUT_SUCCESS
      })
    }).catch(err => {
      dispatch(returnErrors(err, "auth"));
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
