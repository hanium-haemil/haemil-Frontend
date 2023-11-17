import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { View,Text , StyleSheet, PermissionsAndroid, Platform, Image  } from 'react-native';
import Geolocation from "@react-native-community/geolocation";

import sun from '../../images/sun.png';
import sunCloud from '../../images/sunCloud.png';
import cloud from '../../images/cloud.png';

function WeekToWeatherBox() {
  const d = new Date();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const tomorrow = new Date(d.setDate(d.getDate() + 1));
  const afterTomorrow = new Date(d.setDate(d.getDate() + 1));

  const formattedDate = `${month}/${day}`;
  const formattedTomorrow = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`;
  const formattedAfterTomorrow = `${afterTomorrow.getMonth() + 1}/${afterTomorrow.getDate()}`;

  const [selected, setSelection] = useState(formattedDate);
  const [weekWeather1, setWeekWeather1] = useState(null);
  const [weekWeather2, setWeekWeather2] = useState(null);
  const [weekWeather3, setWeekWeather3] = useState(null);

  const [weatherSky1, setWeatherSky1] = useState(null);
  const [weatherSky2, setWeatherSky2] = useState(null);
  const [weatherSky3, setWeatherSky3] = useState(null);

  useEffect(() => {
    // 위치 권한 요청 및 위치 정보 가져오기
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                AxiosWeekToWeatherBox(latitude, longitude);
              },
              error => {
                console.log("Error getting location: ", error);
              }
            );
          } else {
            console.log("Location permission denied");
          }
        })
        .catch(err => console.warn(err));
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          AxiosWeekToWeatherBox(latitude, longitude);
        },
        error => {
          console.log("Error getting location: ", error);
        }
      );
    }
  }, []);

  const AxiosWeekToWeatherBox = (latitude, longitude) => {

    const SERVER_URL = `https://todohaemil.com/weather/tmps?latitude=${latitude}&longitude=${longitude}`;
    axios.get(SERVER_URL)
      .then((response) => {
        setWeekWeather1(response.data.result[0].TMP);
        setWeatherSky1(response.data.result[0].SKY);

        setWeekWeather2(response.data.result[1].TMP);
        setWeatherSky2(response.data.result[1].SKY);

        setWeekWeather3(response.data.result[0].TMP);
        setWeatherSky3(response.data.result[0].SKY);
      })
      .catch(error => {
        console.log("주간날씨 에러 : ", error);
      })
  }

  const skyIcon = () => {
    if(weatherSky1 === '1') {
      return <Image source={sun} style={{ width: 25, height: 25,resizeMode:"contain"}} />
    }else if(weatherSky1 === '3') {
      return <Image source={sunCloud} style={{ width: 25, height: 25,resizeMode:"contain"}} />
    } else {
      return <Image source={cloud} style={{ width: 40, height: 25, resizeMode:"contain"}} />
    }
  }

  const skyIconTomorrow = () => {
    if(weatherSky2 === '1') {
      return <Image source={sun} style={{ width: 25, height: 25,resizeMode:"contain"}} />
    }else if(weatherSky2 === '3') {
      return <Image source={sunCloud} style={{ width: 25, height: 25,resizeMode:"contain"}} />
    } else {
      return <Image source={cloud} style={{ width: 40, height: 25, resizeMode:"contain"}} />
    }
  }

  const skyIconAfterTommorrow = () => {
    if(weatherSky1 === '1') {
      return <Image source={sun} style={{ width: 25, height: 25,resizeMode:"contain"}} />
    }else if(weatherSky1 === '3') {
      return <Image source={sunCloud} style={{ width: 25, height: 25,resizeMode:"contain"}} />
    } else {
      return <Image source={cloud} style={{ width: 40, height: 25, resizeMode:"contain"}} />
    }
  }
  

  return (
    <View style={{flexDirection : 'row'}}>
        <View style={styles.weekWeather1}>
          <View style={{flexDirection : 'row'}}>
            <Text style={styles.today}>오늘</Text>
            <Text style={{marginTop : 18,fontWeight : 'bold', color : 'white'}}> {selected}</Text>
          </View>
          {skyIcon()}
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{weekWeather1}°</Text>
        </View>

        <View style={styles.weekWeather2}>
          <View style={{flexDirection : 'row'}}>
            <Text style={styles.formattedTomorrow}>내일</Text>
            <Text style={{marginTop : 18, color : '#97B6EF',fontWeight : 'bold'}}> {formattedTomorrow}</Text>
          </View>
          {skyIconTomorrow()}
          <Text style={{ fontSize: 20, color: "#97B6EF", fontWeight: "bold" }}>{weekWeather2}°</Text>
        </View>

        <View style={styles.weekWeather3}>
          <View style={{flexDirection : 'row'}}>
            <Text style={styles.formattedAfterTomorrow}>모레</Text>
            <Text style={{marginTop : 18, color : '#97B6EF',fontWeight : 'bold'}}> {formattedAfterTomorrow}</Text>
          </View>
          {skyIconAfterTommorrow()}
          <Text style={{ fontSize: 20, color: "#97B6EF", fontWeight: "bold" }}>{weekWeather3}°</Text>
        </View>
    </View>
    
  )
};

const styles = StyleSheet.create({
    weekWeatherText : {
      fontSize : 20, 
      marginTop : 10
    },
    weekWeather1 : {
        width : 100,
        height : 100,
        backgroundColor : '#C8D8F6',
        borderRadius : 20,
        marginLeft : 20,
        marginRight : 5,
        marginTop : 10,
        alignItems : 'center',
      },
      weekWeather2 : {
        width : 100,
        height : 100,
        backgroundColor : '#ECF3FF',
        borderRadius : 20,
        marginRight : 5,
        marginTop : 10,
        borderColor : '#C8D8F6',
        alignItems : 'center',
        borderWidth : 1,
      },
      weekWeather3 : {
        width : 100,
        height : 100,
        backgroundColor : '#ECF3FF',
        borderRadius : 20,
        marginRight : 5,
        marginTop : 10,
        borderColor : '#C8D8F6',
        borderWidth : 1,
        alignItems : 'center',
      },
      today : {
        fontWeight : 'bold', fontSize : 20, marginTop : 10, color : 'white'
      },
      formattedTomorrow : {
        fontWeight : 'bold', fontSize : 20, marginTop : 10, color : '#97B6EF'
      },
      formattedAfterTomorrow : {
        fontWeight : 'bold', fontSize : 20, marginTop : 10, color : '#97B6EF'
      }
});

export default WeekToWeatherBox;