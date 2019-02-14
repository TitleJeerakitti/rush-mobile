import { 
    RESTAURANT_SELECTED, 
    EDIT_MENU,
    RESTAURANT_GET_MENU, 
    CHANGE_CURRENT_CATEGORY,
    GET_ORDER_AGAIN, 
    RESET_RESTAURANT_REDUCER,
} from '../actions/types';

const INITIAL_STATE = {
    data: {},
    menuData: {},
    restaurantId: '',
    orderId: '',
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
        case GET_ORDER_AGAIN:
            return { 
                ...INITIAL_STATE, 
                data: action.payload.supplierDetail,
                currentRestaurant: action.payload.supplierDetail.name,
                restaurantId: action.payload.supplierDetail.id,
                orderId: action.payload.orderId,
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
        case RESET_RESTAURANT_REDUCER:
            return INITIAL_STATE;
        default:
            return state;
    }
};
