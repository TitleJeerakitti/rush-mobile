import { 
    RESTAURANT_SELECTED, 
    EDIT_MENU,
    RESTAURANT_GET_MENU, 
    CHANGE_CURRENT_CATEGORY, 
} from '../actions/types';

const INITIAL_STATE = {
    data: {},
    menuData: {},
    restaurantId: '',
    currentRestaurant: '',
    currentCategory: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_SELECTED:
            return { 
                ...INITIAL_STATE,
                data: action.payload,
                currentRestaurant: action.payload.name,
                restaurantId: action.payload.id,
            };
        case RESTAURANT_GET_MENU:
            return {
                ...state,
                menuData: action.payload
            };
        case CHANGE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload
            };
        case EDIT_MENU:
            return {
                ...state,
                menuData: action.payload,
            };
        default:
            return state;
    }
};
