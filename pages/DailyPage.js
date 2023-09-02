import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, ScrollView,TouchableOpacity} from "react-native";

import { Calendar } from "react-native-calendars";
import Icon from 'react-native-vector-icons/Ionicons';

import Popup from '../components/dailypage/Popup';

function DailyPage({navigation}){
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const date = `${year}-${month}-${day}`;

    const [selected, setSelected] = useState(date);
    const [markedDates, setMarkedDates] = useState({});
    const [popupEventData, setPopupEventData] = useState({});
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedEventData, setSelectedEventData] = useState([]);

 

    //일정 데이터, 지금은 임의의 일정 데이터를 입력해놓았다.
    useEffect(() => {
        setMarkedDates({
            '2023-08-24': { marked: true, selectedColor: '#f00', event: 'Event1'},
            '2023-08-31': { marked: true, selectedColor: '#f00', event: 'Event2'},
        });

        setSelectedEventData(markedDates[selected] || []);

    },[selected]);

    const dayNow = (day) =>{
        setSelected(day.dateString);
        setSelectedEventData(markedDates[day.dateString] || {});
        console.log(selected);
    };

    const handleOpenPopup = () => {
        setPopupVisible(true);
      }

    // 버튼 클릭 시 팝업창 닫히면서 일정 데이터베이스에 추가하도록 만들기
    const handleClosePopup = () => {
        setPopupVisible(false);
    };

      if(selectedEventData.event == undefined){
        return(
            <>
                <View style={styles.CalendarContainer}>
                    <Calendar
                        style={{width: 410}}
                        onDayPress={dayNow}
                        markedDates={{
                        ...markedDates,
                        [selected]: { selected: true, selectedColor: 'skyblue' },
                        }}
                        theme={{
                        selectedDayBackgroundColor: '#009688',
                        arrowColor: '#009688',
                        dotColor: '#009688',
                        todayTextColor: '#009688',
                        }}
                    />

                    <View style={styles.container}>
                        <Text style={styles.selectedContainer}>{selected}</Text>
                    </View>
                </View>

                <View style={{backgroundColor : 'white'}}>
                    <Text style={{fontSize: 20, marginLeft:120, marginBottom:5, marginTop:90}}>아직 일정이 없어요!</Text>
                    <View style={styles.btnStyle}>
                        <Button title="일정 추가하기" color='skyblue' onPress={handleOpenPopup} />
                        <Popup visible={popupVisible} onClose={handleClosePopup} />
                    </View>
                </View>
            </>
        )
    } else {
        return(
            <>
                <View style={styles.CalendarContainer}>
                    <Calendar
                        style={{width: 410}}
                        onDayPress={dayNow}
                        markedDates={{
                        ...markedDates,
                        [selected]: { selected: true, selectedColor: 'skyblue' },
                        }}
                        theme={{
                        selectedDayBackgroundColor: '#009688',
                        arrowColor: '#009688',
                        dotColor: '#009688',
                        todayTextColor: '#009688',
                        }}
                    />

                    <View style={styles.container}>
                        <Text style={styles.selectedContainer}>{selected}</Text>
                    </View>
                </View>

                <View style={{backgroundColor : 'white'}}>
                    <ScrollView style={{backgroundColor : 'white'}}>
                        <Text style={styles.eventContainer}>{selectedEventData.event}</Text>
                        <View style={styles.btnStyle_1}>
                            <TouchableOpacity onPress={handleOpenPopup} style={styles.btnIcon}>
                                <Icon name="checkmark-outline" size={30} color='white' />
                            </TouchableOpacity>
                            <Popup visible={popupVisible} onClose={handleClosePopup} />
                        </View>
                        
                    </ScrollView>
                </View>
            </>
        )
    }
    
}

const styles = StyleSheet.create({
    btnStyle:{
        marginLeft: 100,
        marginBottom: 150,
        width:200,
    },
    btnStyle_1:{
        marginLeft: 310,
        marginBottom: 90,
        marginTop: 180,
        width : 50,
        height : 50,
        backgroundColor: '#A8DAEE',
        borderRadius: 90,
        elevation : 3,
        bottom: 16,
    },
    container: {
        height : 50,
        alignItems : 'center',
    },
    selectedContainer: {
        marginTop: 10,
        marginRight: 230,
        fontSize: 20,
        fontWeight: 'bold',
    },
    eventContainer: {
        fontSize : 16
    },
    CalendarContainer: {
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#fff'
    },
    btnIcon : {
        marginLeft : 10,
        marginTop : 10,
    }
})


export default DailyPage;