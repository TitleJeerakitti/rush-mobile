import { GET_ORDER_ID, CLEAR_QUEUE } from '../actions/types';

const INITIAL_STATE = {
    orderId: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDER_ID:
            return { ...state, orderId: action.payload };
        case CLEAR_QUEUE:
            return INITIAL_STATE;
        default:
            return state;
    }
};
