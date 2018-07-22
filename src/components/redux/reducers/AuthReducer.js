import { LOGIN_USER, LOGOUT_USER, SET_LOGIN, SET_LOGOUT } from '../actions/types';

const initialState = {
    loggedIn: false,
    user: null
};

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return { 
                ...state,
                user: action.payload
            };
        case LOGOUT_USER:
            return { 
                ...state,
                user: action.payload
            };
        case SET_LOGIN:
            return {
                ...state,
                loggedIn: action.payload
            };
        case SET_LOGOUT:
            return {
                ...state,
                loggedIn: action.payload
            };
        default:
            return state;
    }
};