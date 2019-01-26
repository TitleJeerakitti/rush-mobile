import update from 'immutability-helper';
import { RESTAURANT_SELECTED, ADD_MENU } from '../actions/types';

const INITIAL_STATE = {
    restaurantId: '',
    currentRestaurant: '',
    currentCategory: '',
    menus: [],
};

function addMenu(state, data) {
    for (const [index, menu] of state.menus.entries()) {
        if (menu.id === data.id) {
            return update(state,
                { menus: { [index]: { $set: data } } }
                );
        }
    }
    return update(state,
        { menus: { $push: [data] } }
        );
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_SELECTED:
            return { 
                ...state,
                currentRestaurant: action.payload.name,
                restaurantId: action.payload.id,
            };
        case ADD_MENU:
            console.log(state.menus);
            return addMenu(state, action.payload);
        default:
            return state;
    }
};
