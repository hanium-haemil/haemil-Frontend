import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, PermissionsAndroid, Platform, Image } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";

import sun from '../../images/sun.png';
import rain from '../../images/rain.png';
import rainSnow from '../../images/rainSnow.png';
import snowCloud from '../../images/snowCloud.png';
import sunCloud from '../../images/sunCloud.png';
import cloud from '../../images/cloud.png';

function WeatherBox({ navigation }) {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const [selected, setSelection] = useState(formattedDate);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [weatherIcon, setWeatherIcon] = useState(null);

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
                weatherIconToday(latitude, longitude);
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
          weatherIconToday(latitude, longitude);
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
        setWeatherData(response.data.result);
        setLoading(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
      })
      .catch(error => {
        console.log("날씨 메인 오류: ", error);
        setLoading(false); // 에러 발생 시 로딩 상태 업데이트
      })
  };

  const weatherIconToday = (latitude, longitude) => {
    axios.get(`https://todohaemil.com/weather/today?latitude=${latitude}&longitude=${longitude}`)
    .then((response) => {
      setWeatherIcon(response.data.result);
    })
    .catch(error => {
      console.log("today 에러: ", error);
    })
  }

  // 하늘상태 텍스트
  const skyText = () => {
    if(weatherIcon[5].fcstValue === '1') {
      return <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", marginLeft : 5 }}>맑음</Text>;
    } else if(weatherIcon[5].fcstValue === '3') {
      return <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", marginLeft : 5 }}>구름 많음</Text>;
    } else if(weatherIcon[5].fcstValue === '4') {
      return <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", marginLeft : 5 }}>흐림</Text>;
    }
  }

  const rainText = () => {
    if (!weatherIcon) {
      return '';
    } else if (weatherIcon[6].fcstValue === '0') {
      return skyText();
    } else if (weatherIcon[6].fcstValue === '1') {
      return <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", marginLeft: 5 }}>비</Text>;
    } else if (weatherIcon[6].fcstValue === '2') {
      return <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", marginLeft: 5 }}>진눈깨비</Text>;
    } else if (weatherIcon[6].fcstValue === '3') {
      return <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", marginLeft: 5 }}>눈</Text>;
    } else if (weatherIcon[6].fcstValue === '4') {
      return <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", marginLeft: 5 }}>소나기</Text>;
    }
  }
  
  // 하늘 상태 아이콘
  const skyIcon = () => {
    if(weatherIcon[5].fcstValue === '1') {
      return  <Image source={sun} style={{ width: 120, height: 120,resizeMode:"contain"}} />
    } else if(weatherIcon[5].fcstValue === '3') {
      return <Image source={sunCloud} style={{ width: 130, height: 130,resizeMode:"contain"}} />
    } else if(weatherIcon[5].fcstValue === '4') {
      return <Image source={cloud} style={{ width: 120, height: 120,resizeMode:"contain"}} />
    }
  }

  const rainIcon = () => {
    if (!weatherIcon) {
      return '';
    } else if (weatherIcon[6].fcstValue === '0') {
      return skyIcon();
    } else if (weatherIcon[6].fcstValue === '1') {
      return <Image source={rain} style={{ width: 120, height: 120,resizeMode:"contain"}} />
    } else if (weatherIcon[6].fcstValue === '2') {
      return <Image source={rainSnow} style={{ width: 120, height: 120,resizeMode:"contain"}} />
    } else if (weatherIcon[6].fcstValue === '3') {
      return <Image source={snowCloud} style={{ width: 120, height: 120,resizeMode:"contain"}} />
    } else if (weatherIcon[6].fcstValue === '4') {
      return <Image source={rain} style={{ width: 120, height: 120,resizeMode:"contain"}} />
    }
  }

if (loading) {
  return <Text>Loading...</Text>;
}

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
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
        <View>
          {weatherData ? ( // weatherData가 null이 아닌 경우
            <>
              <Text style={styles.weatherInfo}>
                {weatherData.current}°
              </Text>
              {rainText()}
              <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{weatherData.min}°/{weatherData.max}°</Text>
            </>
          ) : (
            <Text style={styles.weatherInfo}>-</Text> // weatherData가 null인 경우
          )}
        </View>
        {rainIcon()}
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
    fontSize: 25,
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
