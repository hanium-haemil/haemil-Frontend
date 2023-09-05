import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const CalendarComponent = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // 현재 날짜와 월을 가져오기
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 현재 월의 첫 날과 마지막 날 계산
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  // 날짜 그리드 데이터 생성
  const generateCalendarData = () => {
    const data = [];
    const startDate = new Date(firstDayOfMonth);

    while (startDate <= lastDayOfMonth) {
      data.push({
        date: new Date(startDate),
        isCurrentMonth: startDate.getMonth() === currentMonth,
      });

      startDate.setDate(startDate.getDate() + 1);
    }

    return data;
  };

  const calendarData = generateCalendarData();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onSelect(date.toISOString()); // 날짜 객체를 문자열로 변환해서 전달
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleDateClick(item.date)}
      style={[
        styles.dateCell,
        {
          backgroundColor: item.isCurrentMonth ? 'white' : 'lightgray',
          borderColor: selectedDate === item.date ? 'blue' : 'transparent',
        },
      ]}
    >
      <Text>{item.date.getDate()}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>{currentMonth+1}</Text>
      <FlatList
        data={calendarData}
        renderItem={renderItem}
        keyExtractor={(item) => item.date.toISOString()}
        numColumns={7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
  },
});

export default CalendarComponent;
