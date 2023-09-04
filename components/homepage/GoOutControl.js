//메인 화면의 외출 적합도
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet,PermissionsAndroid, Platform } from 'react-native';
import Geolocation from "@react-native-community/geolocation";

import Icon from 'react-native-vector-icons/Ionicons';

function GoOutControl() {
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

  const pm10Grade = () => {
    if (fineDustData && fineDustData[0]) {
      if(fineDustData[0].pm10Value >= 0 && fineDustData[0].pm10Value < 31) {
        return <Icon name="happy-outline" size={40} color="black" />
      } else if(fineDustData[0].pm10Value >= 31 && fineDustData[0].pm10Value < 81) {
        // return "보통";
        return <Icon name="thumbs-up-outline"></Icon>
      } else if(fineDustData[0].pm10Value >= 81 && fineDustData[0].pm10Value < 151) {
        return <Icon name="sad-outline" size={40} color="black" />
      } else {
        return <Icon name="skull-outline" size={40} color="black" />
      }
    }
    return "-";
  }

  const UVGrade = () => {
    if (fineDustData && fineDustData[0]) {
      if(fineDustData[0].pm10Value >= 0 && fineDustData[0].pm10Value < 31) {
        return <Icon name="happy-outline" size={40} color="black" />
      } else if(fineDustData[0].pm10Value >= 31 && fineDustData[0].pm10Value < 81) {
        // return "보통";
        return <Icon name="thumbs-up-outline"></Icon>
      } else if(fineDustData[0].pm10Value >= 81 && fineDustData[0].pm10Value < 151) {
        return <Icon name="sad-outline" size={40} color="black" />
      } else {
        return <Icon name="skull-outline" size={40} color="black" />
      }
    }
    return "-";
  }
  

  return (
    <View style={styles.container}>
        <Text style={{
            fontSize : 20, fontWeight : 'bold', marginBottom : 10, marginTop : 5, color : 'black'}}>
            외출하기 좋은 날이에요!
        </Text>
        <View style={{flexDirection : 'row', marginBottom : 10}}>
            <View style={styles.BoxFineDust}>
              <View style={{ marginTop : 30}}>
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
              <View style={{marginTop : 30}}>
                <Icon name="thermometer-outline" size={40} color="black"></Icon>
              </View>
              <View style={{marginLeft : 10, marginTop : 25}}>
                <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>체감온도</Text>
                <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black', marginLeft : 12}}>
                  28°
                </Text>
              </View>
            </View>
        </View>

        <View style={{flexDirection : 'row', marginBottom : 10}}>
            <View style={styles.BoxFineDust}>
              <View style={{ marginTop : 30}}>
              <Icon name="shirt-outline" size={40} color="black"></Icon>
              </View>
              <View style={{marginLeft : 10, marginTop : 25}}>
                <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>옷차림</Text>
                <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>
                  반팔
                </Text>
              </View>
            </View>

            <View style={styles.BoxFineDust}>
              <View style={{marginTop : 30}}>
                <Icon name="happy-outline" size={40} color="black" />
              </View>
              <View style={{marginLeft : 10, marginTop : 25}}>
                <Text style={{fontSize : 15, fontWeight : 'bold', color : 'black'}}>자외선</Text>
                <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>
                  보통
                </Text>
              </View>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BFD8B8',
        marginLeft : 20,
        marginRight : 20,
        borderRadius : 20,
        height : 300,
    },
    BoxFineDust : {
        backgroundColor : 'white',
        width : 150,
        height : 100,
        justifyContent : 'center',
        borderRadius : 20,
        marginRight : 5,
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

export default GoOutControl;