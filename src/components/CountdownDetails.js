import React, { Component } from 'react';
import {ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { inputChanged, loginUser } from '../actions';
import moment from 'moment';

import {Card, Button, FormLabel, FormInput} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';


class CountdownDetails extends Component {
  renderHeader() {
    const countdown = {
      "id": "01",
      "name": "Rückkehr Indien",
      "date": "2017-08-13",
      "image": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg",
      "type": "standard"
    };
    const daysUntil = 20;
      return (
        <Image style={{ marginTop:10 }} source={{
          uri: countdown.image
      }} key={countdown.id}>
          <View style={{
              padding:20,
              paddingTop: 50,
              paddingBottom: 50
          }}>
              <Text style={styles.daysStyle}>{''+daysUntil} Tage</Text>
              <Text style={styles.nameStyle}>{this.props.name}</Text>
          </View>
      </Image>
      );
  }
  onChangeDate(value){
    console.log(value);

    this.props.inputChanged({ prop: 'date', value });
  }
  renderDate() {

    const now = moment().add(1, 'day').format("YYYY-MM-DD");
    const then = moment().add(5, 'year').format("YYYY-MM-DD");
    console.log(now);
    console.log(then);
    return (
      <View>
        <FormLabel>Datum:</FormLabel>
          <DatePicker
        style={ styles.dateStyle }
        date={this.props.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={now}
        maxDate={then}
        confirmBtnText="Datum übernehmen"
        cancelBtnText="Abbrechen"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={this.onChangeDate.bind(this)}
      />
      </View>
    );
  }

componentDidMount() {
}

  render() {
    return (
      <ScrollView style={{ marginTop:50 }}>
        {this.renderHeader()}

        <View>
          <FormLabel>Bezeichnung:</FormLabel>
            <FormInput
              inputStyle={{ width: null }}
              borderRadius={3}
              placeholder='Urlaub in Thailand'
              ref='forminput1'
              textInputRef='name'
              value={this.props.name}
              onChangeText={value => this.props.inputChanged({ prop: 'name', value })}
            />
        </View>
        {this.renderDate()}


        <View>
          <Text>Hallo wie gehts32</Text>
        </View>
      </ScrollView>
    );
  }
}
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
    },
    dateStyle: {
      width: null,
      padding:20,
      paddingTop:10,
      paddingBottom:10
    }
};
const mapStateToProps = ({ auth }) => {
  const { name, date } = auth;

  return { name, date };
};


export default connect(mapStateToProps, { inputChanged })(CountdownDetails);
