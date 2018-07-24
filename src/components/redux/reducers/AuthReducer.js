import { LOGIN_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
    user: null
};

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return { 
                user: action.payload
            };
        case LOGOUT_USER:
            return { 
                user: action.payload
            };
        default:
            return state;
    }
};