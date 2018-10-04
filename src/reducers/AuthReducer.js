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
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    name: '',
    phone: '',
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
        case CLEAR_STATE:
        case GOTO_REGISTER:
            console.log('reducer');
            return INITIAL_STATE;
        case NAME_CHANGE:
            return { ...state, name: action.payload, error: '' };
        case PHONE_CHANGE:
            return { ...state, phone: action.payload, error: '' };
        case CREATE_USER:
            return { ...state, loading: true, error: '' };
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
        case LOGIN_SUCCESS:
        case CREATE_SUCCESS:
            return {
                ...INITIAL_STATE,
                user: action.payload,
            };
        default:
            return state;
    }
};
