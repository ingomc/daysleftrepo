import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DaysleftReducer from './DaysleftReducer';
import loadingReducer from './LoadingReducer';

export default combineReducers({
  auth: AuthReducer,
  daysleft: DaysleftReducer,
  loadingList: loadingReducer
});
