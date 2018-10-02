import {
    EMAIL_CHANGE,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGE:
            return { ...state, email: action.payload };
        default:
            return state;
    }
};
