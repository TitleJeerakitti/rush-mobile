import { Actions } from 'react-native-router-flux';
import { FONT_LOADED, DATA_LOAD, REVIEW_SELECTED } from './types';

export const fontLoader = () => {
    return { type: FONT_LOADED };
};

export const loadData = () => {
    return { type: DATA_LOAD };
};

export const reviewSelected = (data) => {
    return (dispatch) => {
        dispatch({ type: REVIEW_SELECTED, payload: data });
        Actions.review();
    };
};
