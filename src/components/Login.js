import React, {Component} from 'react';
import {StatusBar, Text, Image, ActivityIndicator, LayoutAnimation, AsyncStorage } from 'react-native';
import LoginForm from './LoginForm';
import Reactotron from 'reactotron-react-native';
import { loginUser } from '../actions';
import { connect } from 'react-redux';

var LOGIN_EMAIL = '@AsyncStorageLogin:LoginEmail';
var LOGIN_PASSWORD = '@AsyncStorageLogin:LoginPAssword';


class Login extends Component {

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    renderForm() {
        if (this.props.loading) {
            return (<ActivityIndicator style={{
                flex: 1,
                backgroundColor: 'transparent'
            }} size="large" color="#ffffff"/>);
        }
        return (<LoginForm />);
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
      try {
        var email = await AsyncStorage.getItem(LOGIN_EMAIL);
        var password = await AsyncStorage.getItem(LOGIN_PASSWORD);
        if (email !== null && password !== null ){
            console.log(email);
            console.log(password);
            this.props.loginUser({ email, password });
        } else {
            console.log('Keine Value im store');
            this.props.loading = false;
        }
      } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
          this.props.loading = false;
          await AsyncStorage.removeItem(LOGIN_EMAIL);
          await AsyncStorage.removeItem(LOGIN_PASSWORD);
      }
    };

    render() {
        return (
            <Image source={require('../images/bg-login.jpg')} style={styles.backgroundImage}>
                <StatusBar hidden={true}/>
                {this.renderForm()}
            </Image>
        );
    }
}

var styles = {
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
};

const mapStateToProps = ({ auth }) => {
  const { loading } = auth;

  return { loading };
};

export default connect(mapStateToProps, { loginUser })(Login);
