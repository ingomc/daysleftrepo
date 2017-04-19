import React, {Component} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import firebase from 'firebase';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import moment from 'moment';

import {Parallax, ScrollDriver} from '@shoutem/animation';

import {Button} from 'react-native-elements';

var LOGIN_EMAIL = '@AsyncStorageLogin:LoginEmail';
var LOGIN_PASSWORD = '@AsyncStorageLogin:LoginPAssword';

class Overview extends Component {
    state: any;

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.driver = new ScrollDriver();
    }

    getChristmas() {
      const list = require('./christmas.json');
      return list;
    }
    getRestaurants() {
      const list = require('./countdown.json');
      return list;
    }
    getDays(date, type) {
      let now = moment();
      if (type == "anniversary") {
        let then = moment(date, "MMM DD");
        if ( then.isBefore(now, 'days') ) {
          then = then.add(1, 'year');
        }
        return then.diff(now, 'days');
      } else {
        let then = moment(date);
        return then.diff(now, 'days');
      }
    }
    renderRow(countdown) {

        const daysUntil = this.getDays(countdown.date, countdown.type);

        return (
            <Image style={{ marginTop:10 }} source={{
                uri: countdown.image
            }} key={countdown.id}>
                <View style={{
                    padding:20,
                    paddingTop: 100,
                    paddingBottom: 100
                }}>
                    <Parallax driver={this.driver} scrollSpeed={1.2}>
                        <Text style={styles.daysStyle}>{daysUntil} Tage</Text>
                        <Text style={styles.nameStyle}>{countdown.name}</Text>
                    </Parallax>
                </View>
            </Image>
        );
    }

    onRemoveUser() {
        let keys = [LOGIN_EMAIL, LOGIN_PASSWORD];
        AsyncStorage.multiRemove(keys, (err) => {
            console.log('success remove');
        });
    }
    onButtonPress() {
        console.log('Press button');
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('success');
            //Actions.auth();
        }).catch(function(error) {
            // An error happened.
            console.log('fail: ' + error);
        });
        this.onRemoveUser();
        Actions.auth();
    }
    componentDidMount() {

    }
    render() {
        return (
            <ScrollView style={{ backgroundColor:'black' }} {...this.driver.scrollViewProps}>
                {this.getRestaurants().map(this.renderRow)}
                {this.getChristmas().map(this.renderRow)}
            </ScrollView>
        );
    }
};
const styles = {
    daysStyle: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
        textShadowOffset: {width: 0, height: 2}, textShadowRadius: 40, textShadowColor: '#000000'
    },
    nameStyle: {
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowOffset: {width: 0, height: 2}, textShadowRadius: 40, textShadowColor: '#000000'
    }
};

export default Overview;
