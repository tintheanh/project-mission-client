import { LOGIN_USER, LOGOUT_USER, SET_LOGIN, SET_LOGOUT } from './types';

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

export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: null
})

export const setLogin = () =>  ({
    type: SET_LOGIN,
    payload: true
});

export const setLogout = () => ({
    type: SET_LOGOUT,
    payload: false
})