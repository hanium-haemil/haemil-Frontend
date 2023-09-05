import React, { useState, useEffect } from "react";
import { View,Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import WeatherBox from '../components/homepage/WeatherBox';
import GoOutControl from '../components/homepage/GoOutControl';
import TodoList from '../components/homepage/TodoList';
import axios from "axios";
import KakaoTokenManagement from "../components/KakaoTokenManagement";
import KakaoTokenManagementRT from "../components/KakaoTokenManagementRT";

function HomePage({navigation}){
    
    return(
        <ScrollView style={styles.container}>
            <KakaoTokenManagement/>
            {/* <KakaoTokenManagementRT/> */}
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