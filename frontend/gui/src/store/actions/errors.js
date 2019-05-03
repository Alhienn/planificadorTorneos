import { GET_ERRORS, CLEAR_ERRORS } from '../actionTypes';

export const returnErrors = (err, type) => {
    let msg, status = null;
    try{
        msg = err.response.data;
        status = err.response.status;
    }catch{
        msg = {'server': ['Error inesperado']}
        status = 503
    }
    return {
        type: GET_ERRORS,
        payload: { msg, status, type}
    }
}

export const clearErrors = () =>{
    return{
        type: CLEAR_ERRORS
    }
}