import { Actions } from 'react-native-router-flux';
import { RESTAURANT_SELECTED } from './types';

export const restaurantSelected = (data) => {
    // return ({ type: RESTAURANT_SELECTED, payload: id });
    return (dispatch) => {
        dispatch({ type: RESTAURANT_SELECTED, payload: data });
        // console.log(id)
        Actions.restaurant_menu({ onBack: () => Actions.pop() });
    };
};
