import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, PermissionsAndroid, Platform, Image } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/Ionicons';
import sun from '../../images/sun.png';
import axios from "axios";

function WeatherBox({ navigation }) {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const [selected, setSelection] = useState(formattedDate);
  const [weatherData, setWeatherData] = useState(null);
  const [nowWeatherData, setNowWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

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
                HeightLowerWeatherData(latitude, longitude);
                AxiosWeatherData(latitude,longitude);
              },
              error => {
                console.log("Error getting location: ", error);
                setLoading(false); // 에러 발생 시 로딩 상태 업데이트
              }
            );
          } else {
            console.log("Location permission denied");
            setLoading(false); // 권한 거부 시 로딩 상태 업데이트
          }
        })
        .catch(err => {
          console.warn(err);
          setLoading(false); // 에러 발생 시 로딩 상태 업데이트
        });
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          HeightLowerWeatherData(latitude, longitude);
          AxiosWeatherData(latitude,longitude);
        },
        error => {
          console.log("Error getting location: ", error);
          setLoading(false); // 에러 발생 시 로딩 상태 업데이트
        }
      );
    }
  }, []);

  const HeightLowerWeatherData = (latitude, longitude) => {
    const API_URL = `https://todohaemil.com/weather/data?latitude=${latitude}&longitude=${longitude}`;
    
    axios.get(API_URL)
      .then((response) => {
        setWeatherData(response.data);
        console.log("weatherData : ", response.data);
        setLoading(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
      })
      .catch(error => {
        console.error("날씨 데이터 가져오기 오류: ", error);
        setLoading(false); // 에러 발생 시 로딩 상태 업데이트
      })
  };

  const AxiosWeatherData = (latitude, longitude) => {
    const API_URL = `https://todohaemil.com/weather/today?latitude=37.570377777&longitude=126.981641666`;
    
    axios.get(API_URL)
      .then((response) => {
        setNowWeatherData(response.data);
        console.log("setNowWeatherData : ", response.data);
      })
      .catch(error => {
        console.error("날씨 데이터 가져오기 오류: ", error);
      })
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log(nowWeatherData);

  const maxTemperature = weatherData.result.max;
  const minTemperature = weatherData.result.min;

  return (
    <ScrollView>
      <LinearGradient
        colors={["#9ABAF2", "#ffffff00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Text style={styles.today}>{selected}</Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: -10 }}>
          <Icon name="location" size={20} color="white" style={{ marginTop: 10 }} />
          <Text style={styles.location}>서울시 강서구</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
          <View>
            <Text style={styles.weatherInfo}>
              28°
              {/* {weatherData.temperature}° */}
            </Text>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{minTemperature}°/{maxTemperature}°</Text>
          </View>

          <Image source={sun} style={{ width: 170, height: 170, margin: -20, }} />
        </View>

      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    padding: 20,
    paddingLeft: 30
  },
  today: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  location: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
    fontWeight: 'bold'
  },
  weatherInfo: {
    fontSize: 90,
    color: "white",
    marginBottom: -20,
    marginRight: 20,
    fontWeight: 'bold'
  },
});

export default WeatherBox;
