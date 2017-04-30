import {
  LOADING
} from '../actions/types';


const INITIAL_STATE = {
  loading: true
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
