import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import Geolocation from "@react-native-community/geolocation";

function OutboundItems() {
  const [outboundItems, setOutboundItems] = useState([]);

  const [loading, setLoading] = useState(true);

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
                AxiosOutItemsBox(latitude, longitude);
              },
              error => {
                console.log("Error getting location: ", error);
                setLoading(false);
              }
            );
          } else {
            console.log("Location permission denied");
            setLoading(false);
          }
        })
        .catch(err => {
          console.warn(err);
          setLoading(false); 
        });
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          AxiosOutItemsBox(latitude, longitude);
        },
        error => {
          console.log("Error getting location: ", error);
          setLoading(false);
        }
      );
    }
  }, []);

  const AxiosOutItemsBox = (latitude, longitude) => {
    
    const SERVER_URL = `https://todohaemil.com/prepare/need?latitude=${latitude}&longitude=${longitude}`;
    axios.get(SERVER_URL)
      .then((response) => {
        setOutboundItems(response.data.result);
        setLoading(false); 
      })
      .catch(error => {
        console.log("추천 외출 물품 에러  : ", error);
        setOutboundItems([]);
        setLoading(false);
      });
  }

  return (
    <View >
      <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={styles.outboundItemsTitle}>추천 외출 물품</Text>
        {loading ? (
          
          <>
          <View style={styles.textStyle}>
            <Text style={styles.outboundItemsComponents}>옷차림</Text>
            <Text style={styles.outboundItemsComponentsText}>로딩 중...</Text>
          </View>
          <View style={styles.textStyle}>
            <Text style={styles.outboundItemsComponents}>마스크</Text>
            <Text style={styles.outboundItemsComponentsText}>로딩 중...</Text>
          </View>
          <View style={styles.textStyle}>
            <Text style={styles.outboundItemsComponents}>우산</Text>
            <Text style={styles.outboundItemsComponentsText}>로딩 중...</Text>
          </View>
          </>
        ) : (
          <>
          <View style={styles.textStyle}>
            <Text style={styles.outboundItemsComponents}>옷차림</Text>
            <Text style={styles.outboundItemsComponentsText}>{outboundItems[0]?.clothes}</Text>
          </View>
          <View style={styles.textStyle}>
            <Text style={styles.outboundItemsComponents}>마스크</Text>
            <Text style={styles.outboundItemsComponentsText}>{outboundItems[0]?.mask}</Text>
          </View>
          <View style={styles.textStyle}>
            <Text style={styles.outboundItemsComponents}>우산</Text>
            <Text style={styles.outboundItemsComponentsText}>{outboundItems[0]?.umbrella}</Text>
          </View>
          </>
          
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  outboundItemsTitle: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginTop: 25, 
    color: 'black'
  },
  textStyle:{
    height : 100,
    marginTop : 20,
    backgroundColor : 'white', 
    padding : 10,
    borderRadius : 10,
  },
  outboundItemsComponents : {
    fontSize : 15,
    fontWeight : 'bold',
    color : 'black',
    marginLeft : 20,
    marginTop : 10,
  },
  outboundItemsComponentsText : {
    fontSize : 13,
    color : 'black',
    marginLeft : 20,
    marginTop : 10,
  }
})

export default OutboundItems;