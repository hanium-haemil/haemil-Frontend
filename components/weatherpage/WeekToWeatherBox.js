import axios from 'axios';
import React, {useEffect} from 'react';
import { View,Text , StyleSheet, PermissionsAndroid, Platform, Image  } from 'react-native';

import Geolocation from "@react-native-community/geolocation";
import { useState } from 'react';
import sun from '../../images/sun.png';

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

  // useEffect(() => {
  //   // 위치 권한 요청 및 위치 정보 가져오기
  //   if (Platform.OS === "android") {
  //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  //       .then(granted => {
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           Geolocation.getCurrentPosition(
  //             position => {
  //               const latitude = position.coords.latitude;
  //               const longitude = position.coords.longitude;
  //               AxiosWeekToWeatherBox(latitude, longitude);
  //             },
  //             error => {
  //               console.log("Error getting location: ", error);
  //             }
  //           );
  //         } else {
  //           console.log("Location permission denied");
  //         }
  //       })
  //       .catch(err => console.warn(err));
  //   } else {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         AxiosWeekToWeatherBox(latitude, longitude);
  //       },
  //       error => {
  //         console.log("Error getting location: ", error);
  //       }
  //     );
  //   }
  // }, []);

  // const AxiosWeekToWeatherBox = (latitude, longitude) => {
  //   const SERVER_URL = `https://todohaemil.com/weather/tmps?latitude=${latitude}&longitude=${longitude}`;
  //   axios.get(SERVER_URL)
  //     .then((response) => {
  //       setWeekWeather1(response.data[0]);
  //       setWeekWeather2(response.data[1]);
  //       setWeekWeather3(response.data[2]);
  //     })
  // }
  
  return (
    <View style={{flexDirection : 'row'}}>
        <View style={styles.weekWeather1}>
          <View style={{flexDirection : 'row'}}>
            <Text style={{fontWeight : 'bold', fontSize : 20, marginTop : 10, color : 'white'}}>오늘</Text>
            <Text style={{marginTop : 18,fontWeight : 'bold', color : 'white'}}> {selected}</Text>
          </View>
          <Image source={sun} style={{ width: 25, height: 25,}} />
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>28°</Text>
        </View>

        <View style={styles.weekWeather2}>
          <View style={{flexDirection : 'row'}}>
            <Text style={{fontWeight : 'bold', fontSize : 20, marginTop : 10, color : '#97B6EF'}}>내일</Text>
            <Text style={{marginTop : 18, color : '#97B6EF',fontWeight : 'bold'}}> {formattedTomorrow}</Text>
          </View>
          <Image source={sun} style={{ width: 25, height: 25,}} />
          <Text style={{ fontSize: 20, color: "#97B6EF", fontWeight: "bold" }}>28°</Text>
        </View>

        <View style={styles.weekWeather3}>
          <View style={{flexDirection : 'row'}}>
            <Text style={{fontWeight : 'bold', fontSize : 20, marginTop : 10, color : '#97B6EF'}}>모레</Text>
            <Text style={{marginTop : 18, color : '#97B6EF',fontWeight : 'bold'}}> {formattedAfterTomorrow}</Text>
          </View>
          <Image source={sun} style={{ width: 25, height: 25,}} />
          <Text style={{ fontSize: 20, color: "#97B6EF", fontWeight: "bold" }}>28°</Text>
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
        backgroundColor : 'white',
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
        backgroundColor : 'white',
        borderRadius : 20,
        marginRight : 5,
        marginTop : 10,
        borderColor : '#C8D8F6',
        borderWidth : 1,
        alignItems : 'center',
      },
});

export default WeekToWeatherBox;