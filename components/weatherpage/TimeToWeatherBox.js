import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from "@react-native-community/geolocation";

function TimeToWeatherBox() {
    const [timeWeather, setTimeWeather] = useState(null);

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
        const SERVER_URL = `https://todohaemil.com/weather/times?latitude=${latitude}&longitude=${longitude}`;
        axios.get(SERVER_URL)
            .then((response) => {
                setTimeWeather(response.data.result);
            })
            .catch(error => {
                console.log("시간날씨 에러 : ", error);
            })
    }

    const formatTime = (time) => {
        const hour = time.slice(0, 2);
        const minute = time.slice(2);
        return `${hour}:${minute}`;
    }

    const getWeatherIcon = (skyValue) => {
        switch (skyValue) {
            case '1':
                return "sunny-outline";
            case '3':
                return "partly-sunny-outline";
            case '4':
                return "cloudy-outline";
            default:
                return "sunny-outline";
        }
    }

    return (
        <View>
            <View style={{ width: '90%', height: 1, backgroundColor: '#B3B3B3', marginTop: 10, marginBottom: 10, marginLeft: '5%' }} />
            <View style={{ flexDirection: 'row' }}>
                <Icon name="chevron-back" size={25} style={{ marginLeft: 20, marginTop: 20 }} ></Icon>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.timeTable}>
                    {timeWeather && timeWeather.map((data, index) => (
                        <View style={styles.timeTableRow} key={index}>
                            <Text style={styles.timeTableRowText}>{formatTime(data.FCST_TIME)}</Text>
                            <Text style={styles.timeTableRowText}>{data.TMP}°</Text>
                            <Icon name={getWeatherIcon(data.SKY)} size={20} style={{ marginTop: 10, color: 'black' }}></Icon>
                        </View>
                    ))}
                </ScrollView>
                <Icon name="chevron-forward" size={25} style={{ marginRight: 20, marginTop: 20 }} ></Icon>
            </View>

            <View style={{ width: '90%', height: 1, backgroundColor: '#B3B3B3', marginTop: 10, marginBottom: 10, marginLeft: '5%' }} />

        </View>
    )
}

const styles = StyleSheet.create({
    textArea: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    timeTable: {
        flexDirection: 'row',
        width: 240,
        height: 75,
    },
    timeTableRow: {
        width: 50,
        alignItems: 'center',
    },
    timeTableRowText: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
    }
})

export default TimeToWeatherBox;
