import { GET_ERRORS, CLEAR_ERRORS } from '../actionTypes';


const initialState = {
    msg: null,
    status: null,
    type: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS: 
            return{
                msg: action.payload.msg,
                status: action.payload.status,
                type: action.payload.type
            }
        case CLEAR_ERRORS: 
            return{
                msg: null,
                status: null,
                type: null,
            }
        default:
            return state;
    }
}