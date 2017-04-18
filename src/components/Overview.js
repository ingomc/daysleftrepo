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
    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.driver = new ScrollDriver();
    }

    getRestaurants() {
        return require('./countdown.json');
    }

    renderRow(countdown) {
      var a = moment("2017-4-18");
      var b = moment("2017-8-13");
      const daysUntil = a.diff(b, 'days', true); // 1.5
        return (
            <Image style={{ marginBottom:10 }} source={{
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
    render() {
        return (
            <ScrollView style={{ paddingTop:65 }} {...this.driver.scrollViewProps}>
                {this.getRestaurants().map(this.renderRow)}

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height:200
                }}>
                <Button onPress={this.onButtonPress.bind(this)} buttonStyle={{
                    marginTop: 20,
                    marginBottom: 20,
                    marginLeft: 20,
                    marginRight: 20
                }} raised borderRadius={3} backgroundColor='#397af8' title='Ausloggen'/>
                    <Text>Hello23</Text>
                </View>
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
        textShadowOffset: {width: 0, height: 2}, textShadowRadius: 5, textShadowColor: '#000000'
    },
    nameStyle: {
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowOffset: {width: 0, height: 2}, textShadowRadius: 5, textShadowColor: '#000000'
    }
};

export default Overview;
