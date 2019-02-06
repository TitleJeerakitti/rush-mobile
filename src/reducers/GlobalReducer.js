import { 
    FONT_LOADED, 
    DATA_LOAD,
    REVIEW_SELECTED,
} from '../actions/types';

const INITIAL_STATE = {
    fontLoaded: false,
    dataLoad: false,
    data: {},
    customer_id: 0,
    supplier_id: 0,
    order_id: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FONT_LOADED:
            return { ...state, fontLoaded: true };
        case DATA_LOAD:
            return { ...state, dataLoad: !state.dataLoad };
        case REVIEW_SELECTED:
            return { 
                ...state,
                data: action.payload,
                supplier_id: action.payload.id,
            };
        default:
            return state;
    }
};
