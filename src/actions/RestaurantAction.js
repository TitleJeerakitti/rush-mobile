import { Actions } from 'react-native-router-flux';
import { 
    RESTAURANT_SELECTED,
    ADD_MENU,
} from './types';

export const restaurantSelected = (data) => {
    return (dispatch) => {
        dispatch({ type: RESTAURANT_SELECTED, payload: data });
        Actions.restaurant_menu({ onBack: () => Actions.pop() });
    };
};

export const addMenu = (id, qty) => {
    return {
        type: ADD_MENU,
        payload: { id, qty },
    };
};
