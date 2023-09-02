import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const events = [
  {
    id: 1,
    title: 'Meeting 1',
  },
  {
    id: 2,
    title: 'Meeting 2',
  },
  {
    id: 3,
    title: 'Meeting 3',
  },
];

function TodoList() {
  const [completedEvents, setCompletedEvents] = useState([]);

  const toggleCompletion = eventId => {
    if (completedEvents.includes(eventId)) {
      setCompletedEvents(completedEvents.filter(id => id !== eventId));
    } else {
      setCompletedEvents([...completedEvents, eventId]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>오늘의 할 일</Text>

      <View style={styles.checklistContainer}>
        {events.map(event => (
          <TouchableOpacity
            key={event.id}
            style={styles.checklistItem}
            onPress={() => toggleCompletion(event.id)}
          >
            <Icon name="checkbox-outline" size={20} />
            <Text style={completedEvents.includes(event.id) ? styles.completedTaskText : styles.taskText}>
              {event.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 스타일 정의
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
    marginLeft : 10,
    marginTop : 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TodoList;
