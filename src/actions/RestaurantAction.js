import { Actions } from 'react-native-router-flux';
import { 
    RESTAURANT_SELECTED,
    RESTAURANT_GET_MENU,
    CHANGE_CURRENT_CATEGORY,
    ADD_MENU,
    SUB_MENU,
} from './types';

export const restaurantSelected = (data) => {
    return (dispatch) => {
        dispatch({ type: RESTAURANT_SELECTED, payload: data });
        Actions.restaurant_menu({ onBack: () => Actions.pop() });
    };
};

export const restaurantGetMenu = () => {
    return (dispatch) => { 
        fetch('http://localhost:3000/full_request', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: RESTAURANT_GET_MENU, payload: responseData });
            })
            .catch(() => console.log('error'));
    };
};

export const currentCategoryChange = (index) => {
    return { type: CHANGE_CURRENT_CATEGORY, payload: index };
};

export const addMenu = (id, qty, index, currentCategory) => {
    return {
        type: ADD_MENU,
        payload: { id, qty, index, currentCategory },
    };
};

export const subMenu = (id, qty, index, currentCategory) => {
    return {
        type: SUB_MENU,
        payload: { id, qty, index, currentCategory },
    };
};
