import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGE,
    PASSWORD_CHANGE,
    LOGIN_USER,
    LOGIN_FAILED,
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
    GET_TOKEN,
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

export const authLogin = () => {
        return { type: LOGIN_USER };
};

export const authLoginFailed = (error) => {
    return { type: LOGIN_FAILED, payload: error };
};

export const authLoginSuccess = (user) => {
    return { type: GET_TOKEN, payload: user };
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

export const authLogout = (token) => {
    return (dispatch) => {
        fetch('http://10.66.10.222:8000/auth/logout/', {
            headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            }
        })
        .then(() => {
            dispatch({ type: LOGOUT_USER });
            Actions.auth();
        })
        .catch(() => console.log('error'));
    };
};

export const authFacebookLogin = (token, userInfo) => {
    return (dispatch) => {
        dispatch({ type: FACEBOOK_LOGIN, payload: { token, userInfo } });
        Actions.app();
    };
};
