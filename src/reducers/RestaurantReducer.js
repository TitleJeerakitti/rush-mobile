import update from 'immutability-helper';
import { RESTAURANT_SELECTED, ADD_MENU, SUB_MENU, RESTAURANT_GET_MENU } from '../actions/types';

const INITIAL_STATE = {
    data: {},
    menuData: {},
    restaurantId: '',
    currentRestaurant: '',
    currentCategory: '',
    menus: [],
    total: 0,
};

function addMenu(state, data) {
    for (const [index, menu] of state.menus.entries()) {
        if (menu.id === data.id) {
            return update(state, { 
                menus: { [index]: { $set: data } }, 
                total: { $set: state.total + 1 } 
            });
        }
    }
    return update(state, { 
        menus: { $push: [data] }, 
        total: { $set: state.total + 1 } 
    });
}

function subMenu(state, data) {
    for (const [index, menu] of state.menus.entries()) {
        if (menu.id === data.id) {
            return update(state, { 
                menus: { [index]: { $set: data } }, 
                total: { $set: state.total - 1 } 
            });
        }
    }
    return update(state, { 
        menus: { $push: [data] }, 
        total: { $set: state.total - 1 } 
    });
}

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
        case ADD_MENU:
            return addMenu(state, action.payload);
        case SUB_MENU:
            return subMenu(state, action.payload);
        default:
            return state;
    }
};
