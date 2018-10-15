import { FONT_LOADED } from '../actions/types';

const INITIAL_STATE = {
    fontLoaded: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FONT_LOADED:
            return { ...state, fontLoaded: true };
        default:
            return state;
    }
};
