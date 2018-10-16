import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GlobalReducer from './GlobalReducer';

export default combineReducers({
    auth: AuthReducer,
    global: GlobalReducer,
});
