import update from 'immutability-helper';
import { 
    RESTAURANT_SELECTED, 
    ADD_MENU, SUB_MENU, 
    RESTAURANT_GET_MENU, 
    CHANGE_CURRENT_CATEGORY 
} from '../actions/types';

const INITIAL_STATE = {
    data: {},
    menuData: {},
    restaurantId: '',
    currentRestaurant: '',
    currentCategory: 0,
    total: 0,
    subTotal: 0,
};

function addMenu(state, data) {
    const menu = state.menuData.main_categories[data.currentCategory]
                    .sub_categories[data.id].menus[data.index];
    const quantity = menu.quantity;
    const price = menu.price;
    // const quantity = menus.quantity;
    return update(state, {
        menuData: {
            main_categories: {
                [data.currentCategory]: {
                    sub_categories: {
                        [data.id]: {
                            menus: {
                                [data.index]: {
                                    quantity: { $set: quantity + 1 }
                                }
                            }
                        }
                    }
                }
            }
        },
        total: { $set: state.total + 1 },
        subTotal: { $set: state.subTotal + price }
    });
    // console.log(state.menuData.main_categories[state.currentCategory]
    // .sub_categories[data.id].menus.filter(menu => menu.id === data.qty));
    // for (const [index, menu] of state.menus.entries()) {
    //     if (menu.id === data.id) {
    //         return update(state, { 
    //             menus: { [index]: { $set: data } }, 
    //             total: { $set: state.total + 1 } 
    //         });
    //     }
    // }
    // return update(state, { 
    //     menus: { $push: [data] }, 
    //     total: { $set: state.total + 1 } 
    // });
}

function subMenu(state, data) {
    const menu = state.menuData.main_categories[data.currentCategory]
                    .sub_categories[data.id].menus[data.index];
    const quantity = menu.quantity;
    const price = menu.price;
    return update(state, {
        menuData: {
            main_categories: {
                [data.currentCategory]: {
                    sub_categories: {
                        [data.id]: {
                            menus: {
                                [data.index]: {
                                    quantity: { $set: quantity - 1 }
                                }
                            }
                        }
                    }
                }
            }
        },
        total: { $set: state.total - 1 },
        subTotal: { $set: state.subTotal - price }
    });
    // for (const [index, menu] of state.menus.entries()) {
    //     if (menu.id === data.id) {
    //         return update(state, { 
    //             menus: { [index]: { $set: data } }, 
    //             total: { $set: state.total - 1 } 
    //         });
    //     }
    // }
    // return update(state, { 
    //     menus: { $push: [data] }, 
    //     total: { $set: state.total - 1 } 
    // });
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
        case CHANGE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload
            };
        case ADD_MENU:
            return addMenu(state, action.payload);
        case SUB_MENU:
            return subMenu(state, action.payload);
        default:
            return state;
    }
};
