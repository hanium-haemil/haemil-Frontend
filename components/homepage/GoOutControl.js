import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
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
    const API_URL = `https://todohaemil.com/prepare/send?latitude=${latitude}&longitude=${longitude}`;
      axios.get(API_URL)
      .then(response => {
        setFineDustData(response.data.result);
      })
      .catch(error => {
        console.log("외출적합도 에러 : ", error);
      })
  };

  const pm10Grade = () => {
    if (fineDustData && fineDustData[0]) {
      if (fineDustData[0].pm10value >= 0 && fineDustData[0].pm10value < 31) {
        return <Icon name="happy-outline" size={40} color="black" />
      } else if (fineDustData[0].pm10value >= 31 && fineDustData[0].pm10value < 81) {
        return <Icon name="thumbs-up-outline" size={40} color="black" ></Icon>
      } else if (fineDustData[0].pm10value >= 81 && fineDustData[0].pm10value < 151) {
        return <Icon name="sad-outline" size={40} color="black" />
      } else {
        return <Icon name="skull-outline" size={40} color="black" />
      }
    }
    return "-";
  }

  const UVGrade = () => {
    if (fineDustData && fineDustData[0]) {
      if (fineDustData[0].uv === '아주 좋음') {
        return <Icon name="happy-outline" size={40} color="black" />
      } else if (fineDustData[0].uv === '좋음') {
        return <Icon name="thumbs-up-outline" size={40} color="black"></Icon>
      } else if (fineDustData[0].uv === '보통') {
        return <Icon name="sad-outline" size={40} color="black" />
      } else {
        return <Icon name="skull-outline" size={40} color="black" />
      }
    }
    return "-";
  }

  const getFirstClothingItem = () => {
    if (fineDustData && fineDustData[0]) {
      const clothesArray = fineDustData[0].clothes.split(','); 
      if (clothesArray.length > 0) {
        return clothesArray[0].trim(); 
      }
    }
    return "-";
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 5, color: 'black' }}>
        {fineDustData && fineDustData[0] ? fineDustData[0].result : "-"}
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={styles.BoxFineDust}>
            <View style={{ marginTop: 30 }}>
              <Text>{pm10Grade()}</Text>
            </View>
            <View style={{ marginLeft: 10, marginTop: 25 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>미세먼지</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                {fineDustData && fineDustData[0] ? fineDustData[0].pm10value : "-"}㎍/㎥
              </Text>
            </View>
          </View>
        

        <View style={styles.BoxFineDust}>
          <View style={{ marginTop: 30, marginLeft: -20 }}>
            <Icon name="thermometer-outline" size={40} color="black"></Icon>
          </View>
          <View style={{ marginLeft: 10, marginTop: 25 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>체감온도</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
              {fineDustData && fineDustData[0] ? fineDustData[0].feel_like : "-"}°
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={styles.BoxFineDust}>
          <View style={{ marginTop: 30 }}>
            <Icon name="shirt-outline" size={40} color="black"></Icon>
          </View>
          <View style={{ marginLeft: 10, marginTop: 25 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>옷차림</Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>
              {getFirstClothingItem()}
            </Text>
          </View>
        </View>

        <View style={styles.BoxFineDust}>
          <View style={{ marginTop: 30 }}>
            <Text>{UVGrade()}</Text>
          </View>
          <View style={{ marginLeft: 10, marginTop: 25 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>자외선</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
            {fineDustData && fineDustData[0] ? fineDustData[0].uv : "-"}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#BFD8B8',
  marginLeft: 20,
  marginRight: 20,
  borderRadius: 20,
  height: 300,
},
BoxFineDust: {
  backgroundColor: 'white',
  width: 150,
  height: 100,
  justifyContent: 'center',
  borderRadius: 20,
  marginRight: 5,
  flexDirection: 'row',
},
windChill: {
  backgroundColor: 'white',
  width: 150,
  height: 100,
  borderRadius: 20,
  marginLeft: 5,
},
dressCode: {
  backgroundColor: 'white',
  width: 150,
  height: 100,
  borderRadius: 20,
  marginRight: 5,
},
UVrays: {
  backgroundColor: 'white',
  width: 150,
  height: 100,
  borderRadius: 20,
  marginLeft: 5,
}
});

export default GoOutControl;
