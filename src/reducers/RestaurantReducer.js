import { RESTAURANT_SELECTED, ADD_MENU } from '../actions/types';

const INITIAL_STATE = {
    restaurantId: '',
    currentRestaurant: '',
    currentCategory: '',
    menu: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_SELECTED:
            // console.log(action.payload);
            return { 
                ...state,
                currentRestaurant: action.payload.name,
                restaurantId: action.payload.id,
            };
        case ADD_MENU:
            return {
                ...state,
                
            };
        default:
            return { INITIAL_STATE };
    }
};
