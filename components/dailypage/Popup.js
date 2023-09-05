import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Animated } from 'react-native';

const Popup = ({ onClose }) => {
  const [animation] = useState(new Animated.Value(0));
  const [title, setTitle] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [destination, setDestination] = useState('');

  const handleAddEvent = () => {
    // 서버로 일정 데이터 전송
    const eventData = {
      title,
      alarmTime,
      destination,
    };
    // sendEventDataToServer(eventData);

    // 팝업 창 닫기
    onClose();
  };

  return (
    <View>
      <Text>일정 추가</Text>
      <TextInput
        placeholder="일정 제목"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="알람 시간"
        value={alarmTime}
        onChangeText={(text) => setAlarmTime(text)}
      />
      <TextInput
        placeholder="목적지"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />
      <Button title="추가" onPress={handleAddEvent} />
      <Button title="닫기" onPress={onClose} />
    </View>
  );
};

export default Popup;
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Modal, Animated, TouchableOpacity, TextInput } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Popup = ({ visible, onClose, onSubmit }) => {
//   const [animation] = useState(new Animated.Value(0));
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     if (visible) {
//       Animated.spring(animation, {
//         toValue: 1,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [visible]);

//   const translateY = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [300, 0],
//   });

//   const goalInputHandler = (text) => {
//     setInputValue(text);
//   }

//   const handleSubmit = () => {
//     // 팝업 내용을 DailyPage로 전달
//     onSubmit({
//       title: inputValue,
//       // alarm: alarmValue,
//       // repeat: repeatValue,
//       // destination: destinationValue,
//     });
//     // 팝업 닫기
//     onClose();
//   };

//   return (
//     <Modal transparent visible={visible}>
//       <View style={styles.overlay}>
//         <TouchableOpacity style={styles.overlay} onPress={onClose}>
//           <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
//             <Icon name="trash-outline" style={{ fontSize: 30, marginLeft : 300 }}></Icon>
            
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//               <TextInput
//                 style={styles.submitTextInput}
//                 value={inputValue}
//                 onChangeText={goalInputHandler}
//                 placeholder="제목"
//               />
//             </View>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, width : '90%' }}>
//               <Text>알람</Text>
//               <Icon name="alarm-outline" style={{ fontSize: 20 }}></Icon>
//               <View style={{ width: '88%', height: 40 }} />
//             </View>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, width : '90%' }}>
//               <Text>반복</Text>
//               <Icon name="reload-outline" style={{ fontSize: 20 }}></Icon>
//               <View style={{ width: '88%', height: 40 }} />
//             </View>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, width : '90%' }}>
//               <Text>위치</Text>
//               <Icon name='map-outline' style={{ fontSize: 20 }}></Icon>
//               <View style={{ width: '88%', height: 40 }} />
//             </View>

//             <TouchableOpacity style={styles.button} onPress={onClose}>
//               <Icon name="checkmark-outline" size={20} />
//             </TouchableOpacity>

//           </Animated.View>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     width: '100%',
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: 'white',
//     width: '100%',
//     height: '80%',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   button: {
//     width : 50,
//     height : 50,
//     marginLeft : 280,
//     marginTop : 250,
//     bottom: 16,
//     backgroundColor: '#A8DAEE',
//     padding: 8,
//     borderRadius: 90,
//     elevation : 3
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   submitTextInput  :{
//     width: '90%',
//     height: 40,
//     borderColor: '#CCCCCC',
//     borderBottomWidth: 1,
//   }
// });

// export default Popup;