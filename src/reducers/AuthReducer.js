import {
    EMAIL_CHANGE,
    PASSWORD_CHANGE,
    LOGIN_USER,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    email: 'test@test.com',
    password: '12345678',
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGE:
            return { ...state, email: action.payload, error: '' };
        case PASSWORD_CHANGE:
            return { ...state, password: action.payload, error: '' };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_FAILED:
            return { 
                ...state,
                loading: false,
                error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
                password: '',
            };
        case LOGIN_SUCCESS:
            return {
                ...INITIAL_STATE,
                user: action.payload,
            };
        default:
            return state;
    }
};
