import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGE,
    PASSWORD_CHANGE,
    LOGIN_USER,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    GOTO_REGISTER,
    NAME_CHANGE,
    PHONE_CHANGE,
    CREATE_USER,
    CREATE_FAIL,
    CREATE_SUCCESS,
    CLEAR_STATE,
    FORGET_PASSWORD,
    FORGET_REQUEST,
    LOGOUT_USER,
    FACEBOOK_LOGIN,
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

        fetch('http://10.66.10.222:8000/api/auth/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'sivakornterk',
                password: 'Terk1234',
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            }).catch(() => console.log('error'));
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then((user) => authLoginSuccess(dispatch, user))
        //     .catch(
        //         (error) => authLoginFailed(dispatch, error.message)
        //     );
    };
};

export const authLoginFailed = (dispatch, error) => {
    dispatch({ type: LOGIN_FAILED, payload: error });
};

export const authLoginSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    Actions.app();
};

export const authToRegister = () => {
    return (dispatch) => {
        dispatch({ type: GOTO_REGISTER });
        Actions.register({ onBack: () => authClearState(dispatch) });
    };
};

export const authNameChange = (text) => {
    return {
        type: NAME_CHANGE,
        payload: text,
    };
};

export const authPhoneChange = (text) => {
    return {
        type: PHONE_CHANGE,
        payload: text,
    };
};

export const authCreateUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: CREATE_USER });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => authCreateSuccess(dispatch, user))
            .catch((error) => authCreateFail(dispatch, error.message));
    };
};

export const authCreateFail = (dispatch, error) => {
    dispatch({ type: CREATE_FAIL, payload: error });
};

export const authCreateSuccess = (dispatch, user) => {
    dispatch({ type: CREATE_SUCCESS, payload: user });
    Actions.pop();
};

export const authClearState = (dispatch) => {
    dispatch({ type: CLEAR_STATE });
    Actions.pop();
};

export const authForgetPassword = () => {
    return (dispatch) => {
        dispatch({ type: FORGET_PASSWORD });
        Actions.forget({ onBack: () => authClearState(dispatch) });
    };
};

export const authForgetRequest = (email) => {
    return (dispatch) => {
        dispatch({ type: FORGET_REQUEST, payload: email });
        Actions.pop();
    };
};

export const authLogout = () => {
    return (dispatch) => {
        firebase.auth().signOut()
        .then(() => {
            dispatch({ type: LOGOUT_USER });
            Actions.auth();
        });
    };
};

export const authFacebookLogin = (token, userInfo) => {
    return (dispatch) => {
        dispatch({ type: FACEBOOK_LOGIN, payload: { token, userInfo } });
        Actions.app();
    };
};
