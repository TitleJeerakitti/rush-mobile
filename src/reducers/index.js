import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GlobalReducer from './GlobalReducer';
import RestaurantReducer from './RestaurantReducer';

export default combineReducers({
    auth: AuthReducer,
    global: GlobalReducer,
    restaurant: RestaurantReducer,
});
