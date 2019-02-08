import { Actions } from 'react-native-router-flux';
import { 
    // REVIEW_SELECTED,
    RESTAURANT_SELECTED,
    RESTAURANT_GET_MENU,
    CHANGE_CURRENT_CATEGORY,
    EDIT_MENU,
} from './types';

export const restaurantSelected = (data) => {
    return (dispatch) => {
        dispatch({ type: RESTAURANT_SELECTED, payload: data });
        Actions.restaurant_menu();
    };
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

export const currentCategoryChange = (index) => {
    return { type: CHANGE_CURRENT_CATEGORY, payload: index };
};

export const editMenu = (data) => {
    return {
        type: EDIT_MENU,
        payload: data,
    };
};
