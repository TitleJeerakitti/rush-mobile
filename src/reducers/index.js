import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GlobalReducer from './GlobalReducer';
import RestaurantReducer from './RestaurantReducer';
import QueueReducer from './QueueReducer';

export default combineReducers({
    auth: AuthReducer,
    global: GlobalReducer,
    restaurant: RestaurantReducer,
    queue: QueueReducer,
});
