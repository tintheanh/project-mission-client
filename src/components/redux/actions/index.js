import { LOGIN_USER, LOGOUT_USER } from './types';

import firebase from 'firebase';

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

export const loginUser = user => {
    return ({
        type: LOGIN_USER,
        payload: user
    });
}