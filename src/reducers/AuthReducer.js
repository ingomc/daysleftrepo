import {
  INPUT_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../actions/types';
import moment from 'moment';


const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  name: '',
  repeated: false,
  date: moment().add(1, 'day').format("YYYY-MM-DD"),
  error: '',
  loading: false
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INPUT_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'E-Mail oder Passwort falsch eingegeben!', password: '', loading: false };
    default:
      return state;
  }
};
