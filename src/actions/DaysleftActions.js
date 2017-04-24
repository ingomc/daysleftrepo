import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_USER,
  DAYSLEFT_CREATE
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
