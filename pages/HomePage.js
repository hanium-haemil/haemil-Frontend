import React, { useState, useEffect } from "react";
import { View,Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import WeatherBox from '../components/homepage/WeatherBox';
import GoOutControl from '../components/homepage/GoOutControl';
import TodoList from '../components/homepage/TodoList';

function HomePage({navigation}){
    const [userData, setUserData] = useState(null);

    // useEffect(() => {
        // AsyncStorage에서 데이터를 가져오는 로직
    //     const fetchUserData = async () => {
    //         try {
    //             const storedData = await AsyncStorage.getItem('userDate');
    //             if (storedData !== null) {
    //                 const parsedData = JSON.parse(storedData);
    //                 setUserData(parsedData);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchUserData();
    // }, []); // 컴포넌트가 마운트될 때 한 번만 실행


    return(
        <ScrollView style={styles.container}>
            <View style={styles.WeatherBox}>
                <WeatherBox/>
            </View>

            <GoOutControl/>

            <TodoList />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECEFF5',
    },
    WeatherBox: {
        margin: 20
    }
})

export default HomePage;