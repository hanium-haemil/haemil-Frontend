import React from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import WeatherBox from '../components/homepage/WeatherBox';
import WeekToWeatherBox from '../components/weatherpage/WeekToWeatherBox';
import AirQuality from "../components/weatherpage/AirQuality";
import TimeToWeatherBox from "../components/weatherpage/TimeToWeatherBox";

function WeatherPage({navigation}) {
    return(
        <>
            <View style={styles.container}>
              <ScrollView >
                  <View style={{marginBottom : 20}}>
                    <WeatherBox/>
                  </View>
                  

                  <View style={styles.weekWeather}>
                    <WeekToWeatherBox/>
                  </View>

                  <View style={styles.timeWeather}>
                    <TimeToWeatherBox/>
                  </View>

                  <View style={styles.airWeather}>
                      <AirQuality/>
                  </View>
              </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container : {
      flex: 1, 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor : '#ECEFF5'
    },
    todayWeather : { 
      flex: 1, 
      height : 250,
      width : 350,
      marginBottom : 20,
      marginTop : 20,
      borderRadius : 20
    },
    weekWeather : {
      flex : 2,
      backgroundColor : 'white',
      height : 120,
      width : 350,
      borderRadius : 20
    },
    timeWeather : {
      flex : 3,
      backgroundColor : 'white',
      height : 170,
      width : 350,
      marginBottom : 20,
      marginTop : 20,
      borderRadius : 20
    },
    airWeather : {
      backgroundColor : 'white',
      width : 350,
      height : 400,
      borderRadius : 20
    }
  });

export default WeatherPage;