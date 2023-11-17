import React, {useEffect, useState} from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WeatherBox from '../components/homepage/WeatherBox';
import GoOutControl from '../components/homepage/GoOutControl';
import TodoList from '../components/homepage/TodoList';

import { checkTokenValidity } from '../components/loginpage/TokenManagement';

function HomePage({navigation}){
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