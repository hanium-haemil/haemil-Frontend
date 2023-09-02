import React, { useState, useEffect }  from "react";
import {View, Text, StyleSheet} from 'react-native';

function TimeToWeatherBox() {
    return(
        <View>
            <Text style={styles.textArea}>
                오늘은 더운 날이에요. 얇은 옷과 양산을 추천해요!
            </Text>
            <View style={{width : '90%', height : 1, backgroundColor : '#B3B3B3', marginTop : 10, marginBottom : 10, marginLeft : '5%'}}/>

            <View style={styles.timeTable}>
                
            </View>

            <View style={{width : '90%', height : 1, backgroundColor : '#B3B3B3', marginTop : 10, marginBottom : 10, marginLeft : '5%'}}/>

        </View>
    )
}

const styles = StyleSheet.create({
    textArea : {
        color : 'black',
        fontWeight : 'bold',
        fontSize : 16,
        textAlign : 'center',
        marginTop : 20,},
    timeTable : {
        width : '90%',
        height : 75,
        backgroundColor : 'bule',
    }
})

export default TimeToWeatherBox;