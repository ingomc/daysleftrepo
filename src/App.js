import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import reducers from './reducers';
import Router from './Router';
import './assets/ReactotronConfig';

class App extends Component {
  componentDidMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDW5YBJ3SeumGThQ7wob3_IdvCY4OTrhQg",
      authDomain: "daysleft-163b9.firebaseapp.com",
      databaseURL: "https://daysleft-163b9.firebaseio.com",
      projectId: "daysleft-163b9",
      storageBucket: "daysleft-163b9.appspot.com",
      messagingSenderId: "23777313479"
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}


export default App;
