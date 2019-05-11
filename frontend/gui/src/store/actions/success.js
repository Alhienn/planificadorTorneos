import { GET_SUCCESS, CLEAR_SUCCESS } from '../actionTypes';

export const returnSuccess = (msg, type) => (dispatch) => {
  dispatch({
      type: GET_SUCCESS,
      payload: { msg, type }
  })
}

export const clearSuccess = () => (dispatch) =>{
    dispatch({
        type: CLEAR_SUCCESS
    })
}