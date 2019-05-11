import { GET_SUCCESS, CLEAR_SUCCESS } from '../actionTypes';


const initialState = {
    msg: null,
    type: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SUCCESS: 
            return{
                msg: action.payload.msg,
                type: action.payload.type
            }
        case CLEAR_SUCCESS: 
            return{
                msg: null,
                type: null,
            }
        default:
            return state;
    }
}