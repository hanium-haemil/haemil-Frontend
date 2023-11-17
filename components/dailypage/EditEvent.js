import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert, TextInput, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import IconModal from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

function EditEvent({ event, updateEvent, isVisible, onClose }) {
  const [editedEvent, setEditedEvent] = useState(event || {});
  const [date, setDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateTime, setDateTime] = useState('08:00:00');

  const [modalY] = useState(new Animated.Value(Dimensions.get('window').height));

  const openModal = () => {
    Animated.spring(modalY, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(modalY, {
      toValue: Dimensions.get('window').height,
      useNativeDriver: false,
    }).start(() => {
      setEditedEvent(event || {}); // 초기화
      onClose();
    });
  };

  const handleEditEvent = async () => {
    try {
      await axios.patch(`https://todohaemil.com/schedules/schedule/${editedEvent.id}`, editedEvent);
      updateEvent(editedEvent);
      closeModal();
    } catch (error) {
      console.error('일정 수정 에러:', error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      openModal();
    } else {
      closeModal();
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modal, { transform: [{ translateY: modalY }] }]}>
          <TextInput
            style={styles.title}
            placeholder="제목"
            value={editedEvent.content}
            onChangeText={(text) => setEditedEvent({ ...editedEvent, content: text })}
          />

          <View style={{ flexDirection: 'row' }}>
            <IconModal name="alarm-outline" style={{ marginTop: 5 }} size={20} color="black" />
            <TouchableOpacity
              style={styles.inputTime}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={{ fontSize: 17 }}>{dateTime}</Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={showTimePicker}
              date={date}
              mode="time"
              onConfirm={(date) => {
                setShowTimePicker(false);
                const selectedTime = date.toISOString().substr(11, 8);
                setDateTime(selectedTime);
                setEditedEvent({ ...editedEvent, time: selectedTime });
              }}
              onCancel={() => {
                setShowTimePicker(false);
                setEditedEvent({ ...editedEvent, time: '08:00:00' });
              }}
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <IconModal name="map-outline" style={{ marginTop: 5 }} size={20} color="black" />
            <TextInput
              style={styles.input}
              placeholder="목적지"
              value={editedEvent.place}
              onChangeText={(text) => setEditedEvent({ ...editedEvent, place: text })}
            />
          </View>

          <TouchableOpacity onPress={handleEditEvent} style={styles.saveButton}>
            <IconModal name="checkmark-outline" size={27} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    height: '90%',
    marginTop: Dimensions.get('window').height * 0.23

  },
  title: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    height: 50,
    color: "#263238",
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 1,
  },
  input: {
    paddingVertical: 0,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 10,
    color: "#263238",
    width: '80%'
  },
  saveButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A8DAEE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  inputTime: {
    paddingVertical: 0,
    fontSize: 16,
    marginTop: 3,
    marginBottom: 16,
    marginLeft: 10,
    width: 84,
    height: 28,
    borderRadius: 90,
    alignItems: 'center',
  },
});

export default EditEvent;
