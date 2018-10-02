import {
    EMAIL_CHANGE,
} from './types';

export const authUserChange = (text) => {
    return {
        type: EMAIL_CHANGE,
        payload: text,
    };
};
