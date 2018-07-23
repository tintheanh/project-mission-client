import { LOGIN_USER, LOGOUT_USER, SET_LOGGED_IN } from './types';

import firebase from 'firebase';

export const loginUser = (email, password) => {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(user => {
                dispatch({
                    type: LOGIN_USER,
                    payload: user
                });
            })
            .catch (err => {
                console.log(err);
            });
    };
}

export const logoutUser = () => {
    return dispatch => {
        firebase.auth().signOut()
            .then(() => {
                dispatch({
                    type: LOGOUT_USER,
                    payload: null
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export const setLoggedIn = loggedIn => ({
    type: SET_LOGGED_IN,
    payload: loggedIn
});