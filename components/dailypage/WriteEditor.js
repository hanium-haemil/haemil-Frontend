import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function WriteEditor({ title, destination, time, onChangeTitle, onChangeDestination, onChangeTime }) {
  const bodyRef = useRef();

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        onSubmitEditing={() => {
          bodyRef.current.focus();
        }}
      />
      <View style={styles.placeholder}>
        <Icon name="map-outline" style={{marginTop : 5}} size={20} color="black" />
        <TextInput
          placeholder="목적지"
          style={styles.input}
          onChangeText={onChangeDestination}
          value={destination}
        />
        <TouchableOpacity style={styles.mapbtn}>
          <Text style={styles.mapbtnText}>지도</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timeView}>
        <Icon name="alarm-outline" style={{marginTop : 5}} size={20} color="black" />
        <TextInput
          placeholder="일정 시간"
          style={styles.input}
          onChangeText={onChangeTime}
          value={time}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { flex: 1, padding: 16 },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    height : 50,
    color: "#263238",
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 1,
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: "#263238",
  },
  input : {
    paddingVertical: 0,
    fontSize: 16,
    marginBottom: 16,
    marginLeft : 10,
    color: "#263238",
    width : '80%'
  },
  timeView:{
    flexDirection : 'row',
  },
  placeholder :{
    flexDirection : 'row'
  },
  mapbtn : {
    marginTop : 7,
  },
  mapbtnText : {
    color : '#3880EC',
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteEditor;
