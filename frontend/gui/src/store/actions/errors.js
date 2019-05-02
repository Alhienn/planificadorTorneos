import { GET_ERRORS } from '../actionTypes';

export const returnErrors = (err) => {
    let msg, status = null;
    try{
        msg = err.response.data;
        status = err.response.status;
    }catch{
        msg = ['Error inesperado']
    }
    return {
        type: GET_ERRORS,
        payload: { msg, status}
    }
}