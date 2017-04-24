import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DaysleftReducer from './DaysleftReducer';

export default combineReducers({
  auth: AuthReducer,
  daysleft: DaysleftReducer
});
