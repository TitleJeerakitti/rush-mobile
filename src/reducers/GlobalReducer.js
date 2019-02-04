import { FONT_LOADED, DATA_LOAD } from '../actions/types';

const INITIAL_STATE = {
    fontLoaded: false,
    dataLoad: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FONT_LOADED:
            return { ...state, fontLoaded: true };
        case DATA_LOAD:
            return { ...state, dataLoad: !state.dataLoad };
        default:
            return state;
    }
};
