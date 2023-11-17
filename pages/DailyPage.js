import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, TouchableOpacity, Dimensions, Animated, Modal, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import CalendarView from '../components/dailypage/CalendarView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconModal from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

import EditEvent from '../components/dailypage/EditEvent';

function DailyPage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ content: '', place: '', time: '08:00:00' });
  const [selectedDate, setSelectedDate] = useState('');
  const [modalY] = useState(new Animated.Value(Dimensions.get('window').height));
  const [eventId, setEventId] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const [date, setDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateTime, setDateTime] = useState('08:00:00');

  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedDate === '') {
      axios.get('https://todohaemil.com/schedules/today')
        .then((res) => {
          setSelectedDate(getTodayDateString());
          setEvents(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.get(`https://todohaemil.com/schedules/getSchedule?localDate=${selectedDate}`)
        .then((res) => {
          setEvents(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setEvents([]);
          } else {
            console.log('일정 불러오기 실패 : ', err);
          }
        });
    }
  }, [selectedDate]);

  const addEvent = async () => {
    try {
      const requestData = {
        localDate: selectedDate,
        content: newEvent.content,
        done: false,
        time: newEvent.time,
        place: newEvent.place,
        repeatType: "NONE",
      };

      await axios.post('https://todohaemil.com/schedules/schedule', requestData);
      setNewEvent({ content: '', place: '', time: '08:00:00' }); // 초기화
      setShowModal(false);
    } catch (error) {
      console.error('일정 추가 실패:', error);
    }
  };

  const deleteEventConfirmation = () => {
    if (deleteEvent) {
      Alert.alert(
        '일정 삭제',
        '정말로 일정을 삭제하시겠습니까?',
        [
          { text: '취소', onPress: () => setDeleteEvent(null) },
          { text: '삭제', onPress: () => deleteEventApi(deleteEvent) },
        ],
        { cancelable: false }
      );
      }
    }

  const deleteEventApi = async (event) => {
    try {
      await axios.delete(`https://todohaemil.com/schedules/schedule/${event.id}`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        result: prevEvents.result.filter((item) => item.id !== event.id),
      }));
    } catch (error) {
      console.error('일정 삭제 실패:', error);
    }
    setDeleteEvent(null);
    setEventId(null);
  };
  

  const openModal = () => {
    Animated.spring(modalY, {
      toValue: Dimensions.get('window').height * 0.15,
      useNativeDriver: false,
    }).start();
    setShowModal(true);
  };

  const closeModal = () => {
    Animated.spring(modalY, {
      toValue: Dimensions.get('window').height,
      useNativeDriver: false,
    }).start(() => {
      setShowModal(false);
      setNewEvent({ content: '', place: '', time: '08:00:00' }); // 초기화
    });
  };

  const openEditEventModal = (event) => {
    setEditingEvent(event);
    setShowEditEventModal(true);
  };

  const closeEditEventModal = () => {
    setEditingEvent(null);
    setShowEditEventModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <CalendarView
        markedDates={markedDates}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
      />
      <Text style={style.selectedDateText}>{selectedDate || getTodayDateString()}</Text>
      <FlatList
        data={events.result}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={style.eventItem}>
            <TouchableOpacity onPress={() => openEditEventModal(item)}>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={style.eventContent}>{item.content}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <IconModal name="location-sharp" size={20} color="black" style={{ marginTop: 5, color: '#3880EC' }} />
                  <Text style={style.eventPlace}>{item.place} | </Text>
                  <Text style={style.eventInfo}>{item.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDeleteEvent(item);
                setEventId(item.id);
                deleteEventConfirmation();
              }}
            >
              <IconModal name="trash-outline" size={25} color="red" style={style.trashOutline} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={openModal}
        style={style.addButton}
      >
        <Icon size={45} color="#fff" name="add"></Icon>
      </TouchableOpacity>

      <Modal transparent visible={showModal}>
        <TouchableOpacity activeOpacity={1} onPress={closeModal}>
          <View style={style.modalContainer}>
            <Animated.View style={[style.modal, { transform: [{ translateY: modalY }] }]}>
              <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
                <Text>{selectedDate}</Text>
              </View>
              <TextInput
                style={style.title}
                placeholder="제목"
                onChangeText={(text) => setNewEvent({ ...newEvent, content: text })}
              />
              <View style={{ flexDirection: 'row' }}>
                <IconModal name="alarm-outline" style={{ marginTop: 5 }} size={20} color="black" />
                <TouchableOpacity
                  style={style.inputTime}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={{ fontSize: 17 }}>{newEvent.time}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={showTimePicker}
                  date={date}
                  mode="time"
                  onConfirm={(date) => {
                    setShowTimePicker(false);
                    const selectedTime = date.toISOString().substr(11, 8);
                    setNewEvent({ ...newEvent, time: selectedTime });
                  }}
                  onCancel={() => {
                    setShowTimePicker(false);
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <IconModal name="map-outline" style={{ marginTop: 5 }} size={20} color="black" />
                <TextInput
                  style={style.input}
                  placeholder="목적지"
                  onChangeText={(text) => setNewEvent({ ...newEvent, place: text })}
                />
              </View>
              <TouchableOpacity
                onPress={addEvent}
                style={style.addButtonModal}
              >
                <IconModal name="checkmark-outline" size={27} color="#fff" style={{ marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10, alignSelf: 'center' }} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Modal>

      {showEditEventModal && (
        <EditEvent
          event={editingEvent}
          isVisible={showEditEventModal}
          onClose={closeEditEventModal}
          updateEvent={(updatedEvent) => {
            const updatedEvents = events.result.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
            );
            setEvents({ ...events, result: updatedEvents });
          }}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#A8DAEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    height: 600,
  },
  addButtonModal: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    right: 30,
    bottom: 50,
    backgroundColor: '#A8DAEE',
    marginTop: 100,
    marginBottom: 10,
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
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderLeftWidth: 8,
    borderLeftColor: '#3880EC',
    margin: 8,
    padding: 12,
  },
  eventContent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  eventInfo: {
    fontSize: 16,
    marginTop: 3,
    color: 'black',
  },
  eventPlace: {
    fontSize: 16,
    color: 'black',
    marginTop: 3,
  },
  selectedDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
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
  trashOutline: {
    marginTop: 10,
    marginRight: 10,
  },
});

export default DailyPage;
