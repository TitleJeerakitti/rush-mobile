import { GET_TOKEN, LOG_OUT, } from './types';

export const authLoginSuccess = (user) => {
    return { type: GET_TOKEN, payload: user };
};

export const authLogOut = () => {
    return { type: LOG_OUT };
};

export const authTokenLogin = (user, token) => {
    return { type: GET_TOKEN, payload: { ...user, token } };
};
