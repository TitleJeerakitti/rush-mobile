import { 
    FONT_LOADED, 
    DATA_LOADED,
    REVIEW_SELECTED,
    DATA_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
    fontLoaded: false,
    dataLoaded: false,
    data: {},
    customer_id: 0,
    supplier_id: 0,
    order_id: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FONT_LOADED:
            return { ...state, fontLoaded: true };
        case DATA_LOADING:
            return { ...state, dataLoaded: false };
        case DATA_LOADED:
            return { ...state, dataLoaded: true };
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
