import { GET_ERRORS, CLEAR_ERRORS } from '../actionTypes';
import { clearSuccess } from './success';

export const returnErrors = (err, type) => (dispatch) => {
    dispatch(clearSuccess());
    let msg, status = null;
    try{
        msg = err.response.data;
        status = err.response.status;
    }catch{
        msg = {'server': ['¡Vaya! Ha ocurrido un error inesperado.']}
        status = 503
    }
    dispatch({
        type: GET_ERRORS,
        payload: { msg, status, type}
    })
}

export const clearErrors = () => (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}