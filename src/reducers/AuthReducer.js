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
} from '../actions/types';

const INITIAL_STATE = {
    email: 'customer',
    password: 'eiei1234',
    user: null,
    error: '',
    loading: false,
    name: '',
    phone: '',
    token: '',
    userInfo: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGE:
            return { ...state, email: action.payload, error: '' };
        case PASSWORD_CHANGE:
            return { ...state, password: action.payload, error: '' };
        case NAME_CHANGE:
            return { ...state, name: action.payload, error: '' };
        case PHONE_CHANGE:
            return { ...state, phone: action.payload, error: '' };
        case LOGIN_USER:
        case CREATE_USER:
            return { ...state, loading: true, error: '' };
        case CLEAR_STATE:
        case FORGET_PASSWORD:
        case GOTO_REGISTER:
        case LOGOUT_USER:
            return INITIAL_STATE;
        case FORGET_REQUEST: // this state isn't done yet
        case CREATE_SUCCESS:
            return {
                ...INITIAL_STATE,
                user: action.payload,
            };
        case LOGIN_FAILED:
            return { 
                ...state,
                loading: false,
                error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
                password: '',
            };
        case CREATE_FAIL:
            if (action.payload === 'The email address is already in use by another account.') {
                return { 
                    ...state,
                    loading: false,
                    error: 'อีเมลสมัครใช้งานแล้ว',
                };
            } else if (action.payload === 'The email address is badly formatted.') {
                return { 
                    ...state,
                    loading: false,
                    error: 'กรอกอีเมลไม่ถูกต้อง',
                };
            }
            return {
                ...state,
                loading: false,
                error: 'รหัสผ่านต้องยาวกว่า 6 ตัวอักษร',
            };
        case FACEBOOK_LOGIN:
            return {
                ...state,
                token: action.payload.token,
                userInfo: action.payload.userInfo,
            };
        case GET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
                userInfo: action.payload.user_info,
                loading: false,
            };
        default:
            return state;
    }
};
