import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

function TodoList() {
  const [events, setEvents] = useState([]);   //오늘 일정 저장
  const [completedEvents, setCompletedEvents] = useState([]);

  const toggleCompletion = eventId => {
    if (completedEvents.includes(eventId)) {
      setCompletedEvents(completedEvents.filter(id => id !== eventId));
    } else {
      setCompletedEvents([...completedEvents, eventId]);
    }
  };

  useEffect(() => {
    axios.get('https://todohaemil.com/schedules/today')
      .then(res => {
        setEvents(res.data.result);
      })
      .catch(err => {
        console.log('일정 불러오기 실패 : ', err);
      })
  });

  if (events.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>오늘의 할 일</Text>
        <View style={styles.checklistContainer}>

        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>오늘의 할 일</Text>

      <View style={styles.checklistContainer}>
        {events.map(log => (
          <TouchableOpacity
            key={log.id}
            onPress={() => toggleCompletion(log.id)}
          >
            <View style={styles.checklistItem}>
              <Icon
                name={completedEvents.includes(log.id) ? 'checkbox' : 'checkbox-outline'}
                size={20}
                color={completedEvents.includes(log.id) ? 'gray' : 'black'}
              />
              <Text style={completedEvents.includes(log.id) ? styles.completedTaskText : styles.taskText}>
                {log.content}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskText: {
    color: 'black',
  },
  container: {
    margin: 20,
  },
  textStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checklistContainer: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
    width: '100%',
    height: 300,
    padding: 10,
  },
  checklistItem: {
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TodoList;
