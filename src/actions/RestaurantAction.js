import { Actions } from 'react-native-router-flux';
import { 
    // REVIEW_SELECTED,
    RESTAURANT_SELECTED,
    RESTAURANT_GET_MENU,
    CHANGE_CURRENT_CATEGORY,
    EDIT_MENU,
    GET_ORDER_AGAIN,
    RESET_RESTAURANT_REDUCER,
    RESTAURANT_SELECT_CATEGORY,
} from './types';

export const restaurantSelected = (data) => {
    return { type: RESTAURANT_SELECTED, payload: data };
};

// export const reviewSelected = (data) => {
//     return (dispatch) => {
//         dispatch({ type: REVIEW_SELECTED, payload: data });
//         Actions.review();
//     };
// };

export const restaurantGetMenu = (data) => {
    return { type: RESTAURANT_GET_MENU, payload: data };
};

export const getOrderAgain = (supplierDetail, orderId) => {
    return { type: GET_ORDER_AGAIN, payload: { supplierDetail, orderId } };
};

export const currentCategoryChange = (index) => {
    return { type: CHANGE_CURRENT_CATEGORY, payload: index };
};

export const editMenu = (data) => {
    return {
        type: EDIT_MENU,
        payload: data,
    };
};

export const resetRestaurant = () => {
    return (dispatch) => { 
        dispatch({ type: RESET_RESTAURANT_REDUCER });
        Actions.pop();
    };
};

export const restaurantSelectCategory = (data) => {
    return { type: RESTAURANT_SELECT_CATEGORY, payload: data, };
};
