import { GET_TOKEN, LOG_OUT, UPDATE_USER_INFO, } from './types';

export const authLoginSuccess = (user) => {
    return { type: GET_TOKEN, payload: user };
};

export const authLogOut = () => {
    return { type: LOG_OUT };
};

export const authTokenLogin = (user, token) => {
    return { type: GET_TOKEN, payload: { ...user, token } };
};

export const authUpdateUserInfo = (user) => {
    return { type: UPDATE_USER_INFO, payload: user };
};
