import { GET_TOKEN, LOG_OUT, UPDATE_USER_INFO, } from '../actions/types';

const INITIAL_STATE = {
    token: '',
    userInfo: undefined,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
                userInfo: action.payload.user_info,
            };
        case UPDATE_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            };
        case LOG_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
