import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_USER,
  DAYSLEFT_CREATE,
  DAYSLEFT_FETCH_SUCCESS,
  LOADING
} from './types';





export const daysleftCreate = ({ name, date, repeated }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.database().ref(`/users/${currentUser.uid}/daysleft`)
    .push({ name, date, repeated })
    .then(() => {
      dispatch({ type: DAYSLEFT_CREATE })
      Actions.overview( { type: 'reset' })
    });
  }

}


export const daysleftFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/daysleft`)
      .on('value', snapshot => {
        dispatch({ type: DAYSLEFT_FETCH_SUCCESS, payload: snapshot.val() });
        dispatch({ type: LOADING });
      });
  };
};
