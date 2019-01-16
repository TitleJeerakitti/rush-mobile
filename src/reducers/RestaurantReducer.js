import { RESTAURANT_SELECTED } from '../actions/types';

const INITIAL_STATE = {
    currentRestaurant: '',
    currentCategory: '',
    categories: [],
    menu: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_SELECTED:
            console.log(action.payload);
            return { 
                ...state,
                currentRestaurant: action.payload.name,
            };
        default:
            return { INITIAL_STATE };
    }
};
