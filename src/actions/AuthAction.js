import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGE,
    PASSWORD_CHANGE,
    LOGIN_USER,
    LOGIN_FAILED,
    LOGIN_SUCCESS
} from './types';

export const authEmailChange = (text) => {
    return {
        type: EMAIL_CHANGE,
        payload: text,
    };
};

export const authPasswordChange = (text) => {
    return {
        type: PASSWORD_CHANGE,
        payload: text,
    };
};

export const authLogin = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => authLoginSuccess(dispatch, user))
            .catch(
                (error) => authLoginFailed(dispatch, error.message)
            );
    };
};

export const authLoginFailed = (dispatch, error) => {
    dispatch({ type: LOGIN_FAILED, payload: error });
};

export const authLoginSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    Actions.app();
};
