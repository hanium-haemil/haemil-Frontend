import React,{useState,useEffect} from "react";
import {Text,View,StyleSheet, PermissionsAndroid, Platform, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import wind from '../../images/wind.png';
import faceNeutral from '../../images/face-neutral.png';

import Geolocation from "@react-native-community/geolocation";

function AirQuality() {
    const [fineDustData, setFineDustData] = useState(null);

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
                fetchFineDustData(latitude, longitude);
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
          fetchFineDustData(latitude, longitude);
        },
        error => {
          console.log("Error getting location: ", error);
        }
      );
    }
  }, []);

  const fetchFineDustData = (latitude, longitude) => {
    const API_URL = `https://todohaemil.com/air/send?latitude=${latitude}&longitude=${longitude}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setFineDustData(data.result);
      })
      .catch(error => {
        console.error("Error fetching fine dust data: ", error);
      });
  };

  //미세먼지
  const pm10Grade = () => {
    if (fineDustData && fineDustData[0]) {
      
      if(fineDustData[0].pm10Value >= 0 && fineDustData[0].pm10Value < 31) {
        return <Icon name="happy-outline" size={40} color="black" />  //좋음
      } else if(fineDustData[0].pm10Value >= 31 && fineDustData[0].pm10Value < 81) {
        return <Icon name="thumbs-up-outline"></Icon> //보통
      } else if(fineDustData[0].pm10Value >= 81 && fineDustData[0].pm10Value < 151) {
        return <Icon name="sad-outline" size={40} color="black" />  //나쁨
      } else {
        return <Icon name="skull-outline" size={40} color="black" />  //매우 나쁨
      }
    }
    return "-";
  }

  //초미세먼지
  const pm25Grade = () => {
    if (fineDustData && fineDustData[0]) {
      if(fineDustData[0].pm10Value >= 0 && fineDustData[0].pm10Value < 16) {
        return <Icon name="happy-outline" size={40} color="black" />  //좋음
      } else if(fineDustData[0].pm10Value >= 16 && fineDustData[0].pm10Value < 36) {
        return <Icon name="thumbs-up-outline" size={40} color="black"/> //보통
      } else if(fineDustData[0].pm10Value >= 36 && fineDustData[0].pm10Value < 76) {
        return <Icon name="sad-outline" size={40} color="black" />  //나쁨
      } else {
        return <Icon name="skull-outline" size={40} color="black" />  //매우나쁨
      }
    }
    return "-";
  }

  //강수 확률

  return(
    <>
    <View style={styles.container}>
      {/* 미세먼지,초미세먼지 */}
        <View style={{flexDirection : 'row', marginBottom : 10}}>
            <View style={styles.BoxFineDust}>

              <View style={{marginLeft : 10, marginTop : 30}}>
                <Text>{pm10Grade()}</Text>
              </View>

              <View style={{marginLeft : 10, marginTop : 25}}>
                <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>미세먼지</Text>
                <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>
                  {fineDustData && fineDustData[0] ? fineDustData[0].pm10Value : "-"}㎍/㎥
                </Text>
              </View>
            </View>

            <View style={styles.BoxFineDust}>
              <View style={{marginLeft : 10, marginTop : 30}}>
                <Text>{pm25Grade()}</Text>
              </View>

              <View style={{marginLeft : 10, marginTop : 25}}>
                <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>초미세먼지</Text>
                <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>
                  {fineDustData && fineDustData[0] ? fineDustData[0].pm25Value : "-"}㎍/㎥
                </Text>
              </View>
            </View>
        </View>

{/* 강수확률, 강수량 */}
        <View style={{flexDirection : 'row', marginBottom : 10}}>
          <View style={styles.BoxRain}>

          <View style={{marginLeft : 10, marginTop : 30}}>
            <Icon name="umbrella-outline" size={40} color="black" style={{marginLeft : 5}}></Icon>
          </View>

          <View style={{marginLeft : 10, marginTop : 25}}>
            <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>강수확률</Text>
            <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>
              {fineDustData && fineDustData[0] ? fineDustData[0].pm10Value : "-"}㎍/㎥
            </Text>
          </View>
          </View>

          <View style={styles.BoxRain}>

          <View style={{marginLeft : 10, marginTop : 30}}>
            <Icon name="rainy-outline" size={40} color="black" style={{marginLeft : 5}}></Icon>
          </View>

          <View style={{marginLeft : 10, marginTop : 25}}>
            <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>강수량</Text>
            <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>
              {fineDustData && fineDustData[0] ? fineDustData[0].pm25Value : "-"}㎍/㎥
            </Text>
          </View>
          </View>
        </View>

{/* 바람, 자외선지수 */}
        <View style={{flexDirection : 'row', marginBottom : 10}}>
        <View style={styles.BoxAir}>

          <View style={{marginLeft : 10, marginTop : 30}}>
            <Image source={wind} style={{width : 30, height : 30, margin : 5}}/>
          </View>

          <View style={{marginLeft : 10, marginTop : 25}}>
            <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>풍속</Text>
            <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>
              {fineDustData && fineDustData[0] ? fineDustData[0].pm10Value : "-"}㎍/㎥
            </Text>
          </View>
          </View>

          <View style={styles.BoxAir}>

          <View style={{marginLeft : 10, marginTop : 30}}>
            {/* <Text>{pm25Grade()}</Text> */}
            <Icon name="sunny-outline" size={40} color="black"></Icon>
          </View>

          <View style={{marginLeft : 10, marginTop : 25}}>
            <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>자외선</Text>
            <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>
              {fineDustData && fineDustData[0] ? fineDustData[0].pm25Value : "-"}㎍/㎥
            </Text>
          </View>
          </View>
        </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#C8D8F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 20,
    },
    BoxFineDust : {
        backgroundColor : 'white',
        width : 150,
        height : 100,
        borderRadius : 20,
        marginRight : 7,
        marginLeft : 7,
        marginTop : -20,
        marginBottom : 14,
        flexDirection : 'row',
    },
    BoxRain : {
      backgroundColor : 'white',
      width : 150,
      height : 100,
      borderRadius : 20,
      marginRight : 7,
      marginLeft : 7,
      marginBottom : 14,
      flexDirection : 'row',
    },
    BoxAir : {
      backgroundColor : 'white',
      width : 150,
      height : 100,
      borderRadius : 20,
      marginRight : 7,
      marginLeft : 7,
      marginBottom : -20,
      flexDirection : 'row',
    },
    windChill : {
        backgroundColor : 'white',
        width : 150,
        height : 100,
        borderRadius : 20,
        marginLeft : 5,
    },
    dressCode : {
        backgroundColor : 'white',
        width : 150,
        height : 100,
        borderRadius : 20,
        marginRight : 5,
    },
    UVrays : {
        backgroundColor : 'white',
        width : 150,
        height : 100,
        borderRadius : 20,
        marginLeft : 5,
    }
});

export default AirQuality;