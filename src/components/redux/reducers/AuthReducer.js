import { LOGIN_USER, LOGOUT_USER, SET_LOGGED_IN} from '../actions/types';

const initialState = {
    user: null,
    loggedIn: false
};

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return { 
                ...state,
                user: action.payload,
                loggedIn: true
            };
        case LOGOUT_USER:
            return { 
                ...state,
                user: action.payload,
                loggedIn: false
            };
        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload
            };
        default:
            return state;
    }
};