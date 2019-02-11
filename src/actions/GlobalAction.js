import { Actions } from 'react-native-router-flux';
import { FONT_LOADED, DATA_LOADED, REVIEW_SELECTED, DATA_LOADING } from './types';

export const fontLoader = () => {
    return { type: FONT_LOADED };
};

export const loadData = () => {
    return { type: DATA_LOADING };
};

export const loadDataFinish = () => {
    return { type: DATA_LOADED };
};

export const reviewSelected = (data) => {
    return (dispatch) => {
        dispatch({ type: REVIEW_SELECTED, payload: data });
        Actions.review();
    };
};
