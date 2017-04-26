import React, {Component} from 'react';
import { TouchableWithoutFeedback, Image, View, Text, ScrollView} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import moment from 'moment';

import { connect } from 'react-redux';
import { daysleftFetch } from '../actions';

import {Parallax, ScrollDriver} from '@shoutem/animation';

import { Button } from 'react-native-elements';

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
    getCountdowns() {
      const christmas = this.getChristmas();
      let list = this.props.daysleft;
      list.push.apply(list, christmas);
      return list;
    }
    getDays(date, repeated) {
      let now = moment();
      if (repeated == "true") {
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
    onImagePress() {
      Actions.details();
    }
    renderRow(countdown) {
        console.log(countdown);
        const daysUntil = this.getDays(countdown.date, countdown.repeated);

        const getDays = function() {
          if (daysUntil == 1) {
            return "1 Tag";
          }
          else {
            return daysUntil+" Tage";
          }
        }
        const days = getDays();

        return (
            <Image style={{ marginTop:10 }} source={{
                uri: countdown.image
            }} key={countdown.uid}>
              <TouchableWithoutFeedback onPress={this.onImagePress.bind(this)}>
                <View style={{
                    padding:20,
                    paddingTop: 100,
                    paddingBottom: 100
                }}>
                    <Parallax driver={this.driver} scrollSpeed={1}>
                        <Text style={styles.daysStyle}>{days}</Text>
                        <Text style={styles.nameStyle}>{countdown.name}</Text>
                    </Parallax>
                </View>
              </TouchableWithoutFeedback>
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
        Actions.auth({repeated: "reset"});
    }
    componentWillMount() {
      this.props.daysleftFetch();
    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
      console.log(this.props.daysleft);
        return (
            <ScrollView style={{ backgroundColor:'black', marginTop:50 }} {...this.driver.scrollViewProps}>
                {this.getCountdowns().map(this.renderRow)}
                <Button
                  onPress={this.onButtonPress.bind(this)}
                  buttonStyle={{
                      marginTop: 20,
                      marginBottom: 20,
                      marginLeft: 20,
                      marginRight: 20
                  }}
                  raised
                  borderRadius={3}
                  backgroundColor='#333'
                  title='Ausloggen'
                />
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

const mapStateToProps = state => {
  const daysleft = _.map(state.daysleft, (val, uid) => {
    return { ...val, uid };
  });

  return { daysleft };
};



export default connect(mapStateToProps, { daysleftFetch } )(Overview);
