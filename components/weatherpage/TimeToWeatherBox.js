import React, { useState, useEffect }  from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function TimeToWeatherBox() {
    return(
        <View>
            <Text style={styles.textArea}>
                오늘은 더운 날이에요. 얇은 옷과 양산을 추천해요!
            </Text>
            <View style={{width : '90%', height : 1, backgroundColor : '#B3B3B3', marginTop : 10, marginBottom : 10, marginLeft : '5%'}}/>
            <View style={{flexDirection : 'row'}}>
                <Icon name="chevron-back" size={25} style={{marginLeft : 20, marginTop : 20}} ></Icon>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator = {false}
                    style={styles.timeTable}>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>6:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                        <Icon name="cloudy-outline" size={20} style={{marginTop : 10, color : 'black'}}></Icon>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>7:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                        <Icon name="rainy-outline" size={20} style={{marginTop : 10, color : 'black'}}></Icon>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>8:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                        <Icon name="sunny-outline" size={20} style={{marginTop : 10, color : 'black'}}></Icon>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>9:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>10:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>11:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>12:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>13:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>14:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>15:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>16:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>17:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>18:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>19:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>20:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>21:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>22:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>23:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>
                    <View style={styles.timeTableRow}>
                        <Text style={styles.timeTableRowText}>24:00</Text>
                        <Text style={styles.timeTableRowText}>20°</Text>
                    </View>

                </ScrollView>
                <Icon name="chevron-forward" size={25} style={{marginRight : 20, marginTop : 20}} ></Icon>
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
        flexDirection : 'row',
        width : 240,
        height : 75,
    },
    timeTableRow : {
        width : 50,
        alignItems : 'center',
    },
    timeTableRowText : {
        color : 'black',
        fontSize : 13,
        fontWeight : 'bold',
    }
})

export default TimeToWeatherBox;