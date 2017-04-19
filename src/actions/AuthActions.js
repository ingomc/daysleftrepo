import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import {
  INPUT_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';


var LOGIN_EMAIL = '@AsyncStorageLogin:LoginEmail';
var LOGIN_PASSWORD = '@AsyncStorageLogin:LoginPAssword';

export const inputChanged = ({ prop, value }) => {
  return {
    type: INPUT_CHANGED,
    payload: { prop, value }
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};


const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
  this._onRemoveUser(LOGIN_EMAIL, LOGIN_PASSWORD);
};



const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  this._onSaveUser(user);

  Actions.main({type: "reset"});

};

_onSaveUser = async (userData) => {
  const email = userData.providerData[0].uid;
  const password = userData.providerData[0].providerId;
  try {
    await AsyncStorage.setItem(LOGIN_EMAIL, email);
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
  try {
    await AsyncStorage.setItem(LOGIN_PASSWORD, password);
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
};

_onRemoveUser = async (userData) => {
  try {
    await AsyncStorage.removeItem(email);
    await AsyncStorage.removeItem(password);
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
};
