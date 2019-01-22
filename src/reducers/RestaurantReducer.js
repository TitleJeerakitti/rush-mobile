import { RESTAURANT_SELECTED } from '../actions/types';

const INITIAL_STATE = {
    restaurantId: '',
    currentRestaurant: '',
    currentCategory: '',
    categories: [],
    menu: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_SELECTED:
            return { 
                ...state,
                currentRestaurant: action.payload.name,
                restaurantId: action.payload.id,
            };
        default:
            return { INITIAL_STATE };
    }
};
