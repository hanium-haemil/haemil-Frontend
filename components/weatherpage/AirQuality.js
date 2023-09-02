import React,{useState,useEffect} from "react";
import {Text, PermissionsAndroid, Platform } from 'react-native';

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

  return(
    <>
        <Text>
            미세먼지 농도: {fineDustData && fineDustData[0] ? fineDustData[0].pm10Value : "-"}
        </Text>
        <Text>
            초미세먼지 농도: {fineDustData && fineDustData[0] ? fineDustData[0].pm25Value : "-"}
        </Text>
        <Text>
            미세먼지 지수: {fineDustData && fineDustData[0] ? fineDustData[0].pm10Grade : "-"}
        </Text>
        <Text>
            초미세먼지 지수: {fineDustData && fineDustData[0] ? fineDustData[0].pm25Grade : "-"}
        </Text>
    </>
  )
}

export default AirQuality;