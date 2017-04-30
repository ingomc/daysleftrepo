import Reactotron from 'reactotron-react-native';
import {
  LOADING
} from './types';

export const loadingList = () => {
  return {
    type: LOADING,
    payload: { }
  };
};
