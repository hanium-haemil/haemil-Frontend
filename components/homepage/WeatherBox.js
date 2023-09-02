import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import LinearGradient from "react-native-linear-gradient";

function WeatherBox({ navigation }) {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const [selected, setSelection] = useState(formattedDate);
  const [weatherData, setWeatherData] = useState(null);

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
                fetchWeatherData(latitude, longitude);
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
          fetchWeatherData(latitude, longitude);
        },
        error => {
          console.log("Error getting location: ", error);
        }
      );
    }
  }, []);

  const fetchWeatherData = (latitude, longitude) => {
    const API_URL = `https://todohaemil.com/weather/send?latitude=${latitude}&longitude=${longitude}`;
    
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data.result);
      })
      .catch(error => {
        console.error("Error fetching weather data: ", error);
      });
  };

  const tmpValue = weatherData && weatherData.find(item => item.category === "TMP")?.fcstValue;

  return (
    <ScrollView>
      <LinearGradient
        colors={["#9ABAF2", "#ffffff00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Text style={styles.weatherInfo}>{selected}</Text>

        <Text style={styles.weatherInfo}>
          온도: {tmpValue !== undefined ? tmpValue : "-"}
        </Text>

      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 270,
    borderRadius: 20,
    padding: 20,
  },
  weatherInfo: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
  },
});

export default WeatherBox;
