import { Actions } from 'react-native-router-flux';
import { CLEAR_QUEUE, GET_ORDER_ID } from './types';

export const getOrderId = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_ORDER_ID, payload: id });
        clearQueue();
        Actions.receipt();
    };
};

export const clearQueue = () => {
    return { type: CLEAR_QUEUE };
};
