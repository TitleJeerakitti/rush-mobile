import { GET_TOKEN, LOG_OUT, } from '../actions/types';

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
        case LOG_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
