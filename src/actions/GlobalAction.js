import { FONT_LOADED, DATA_LOAD } from './types';

export const fontLoader = () => {
    return { type: FONT_LOADED };
};

export const loadData = () => {
    return { type: DATA_LOAD };
};
