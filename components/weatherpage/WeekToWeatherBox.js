import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function WeekToWeatherBox() {
  
  return (
    <View style={{flexDirection : 'row'}}>
        <View style={styles.weekWeather1}>
        </View>
        <View style={styles.weekWeather2}>
        </View>
        <View style={styles.weekWeather3}>
        </View>
        <View style={styles.weekWeather4}>
        </View>
        <View style={styles.weekWeather5}>
        </View>
    </View>
    
  )
};

const styles = StyleSheet.create({
    weekWeather1 : {
        width : 60,
        height : 100,
        backgroundColor : '#C8D8F6',
        borderRadius : 20,
        marginLeft : 15,
        marginRight : 5,
        marginTop : 10,
      },
      weekWeather2 : {
        width : 60,
        height : 100,
        backgroundColor : 'white',
        borderRadius : 20,
        marginRight : 5,
        marginTop : 10,
        borderColor : '#C8D8F6',
        borderWidth : 1,
      },
      weekWeather3 : {
        width : 60,
        height : 100,
        backgroundColor : 'white',
        borderRadius : 20,
        marginRight : 5,
        marginTop : 10,
        borderColor : '#C8D8F6',
        borderWidth : 1,
      },
      weekWeather4 : {
        width : 60,
        height : 100,
        backgroundColor : 'white',
        borderRadius : 20,
        marginRight : 5,
        marginTop : 10,
        borderColor : '#C8D8F6',
        borderWidth : 1,
      },
      weekWeather5 : {
        width : 60,
        height : 100,
        backgroundColor : 'white',
        borderRadius : 20,
        marginRight : 5,
        marginTop : 10,
        borderColor : '#C8D8F6',
        borderWidth : 1,
      },
});

export default WeekToWeatherBox;