import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteEditor from '../components/dailypage/WriteEditor';
import WriteHeader from '../components/dailypage/WriteHeader';
import LogContext from '../components/dailypage/contexts/LogContext';

function WriteScreen({route}) {
  const log = route.params?.log;
  
  const [title, setTitle] = useState(log?.title ?? '');
  const [destination, setDestination] = useState(log?.destination ?? ''); // 목적지 상태 추가
  const [time, setTime] = useState(log?.time ?? ''); // 시간 상태 추가
  const navigation = useNavigation();
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());
  
  // LogContext에서 onCreate 및 onModify 가져오기
  const { onCreate, onModify, onRemove } = useContext(LogContext);

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            onRemove(log?.id);
            navigation.pop();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        date: date.toISOString(),
        title,
        destination, // 목적지 포함
        time, // 시간 포함
      });
    } else {
      onCreate({
        title,
        date: date.toISOString(),
        destination, // 목적지 포함
        time, // 시간 포함
      });
    }
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
        <WriteEditor
          title={title}
          destination={destination} // 목적지를 WriteEditor로 전달
          time={time} // 시간을 WriteEditor로 전달
          onChangeTitle={setTitle}
          onChangeDestination={setDestination} // onChangeDestination 추가
          onChangeTime={setTime} // onChangeTime 추가
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;

// import { useNavigation } from '@react-navigation/native';
// import React, { useContext, useState } from 'react';
// import { Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import WriteEditor from '../components/WriteEditor';
// import WriteHeader from '../components/WriteHeader';
// import LogContext from '../contexts/LogContext';
// import axios from 'axios';

// function WriteScreen({ route }) {
//   const log = route.params?.log;

//   const [content, setContent] = useState(log?.content ?? '');
//   const [time, setTime] = useState(log?.time ?? '');
//   const [place, setPlace] = useState(log?.place ?? '');
//   const [medicine, setMedicine] = useState(log?.medicine ?? '');
//   const [repeatType, setRepeatType] = useState(log?.repeatType ?? 'NONE');
//   const navigation = useNavigation();
//   const [localDate, setLocalDate] = useState(log ? log.localDate : new Date()); 

//   const { onCreate, onModify, onRemove } = useContext(LogContext);

//   const onAskRemove = () => {
//     Alert.alert(
//       '삭제',
//       '정말로 삭제하시겠어요?',
//       [
//         { text: '취소', style: 'cancel' },
//         {
//           text: '삭제',
//           onPress: () => {
//             onRemove(log?.id);
//             navigation.pop();
//           },
//           style: 'destructive',
//         },
//       ],
//       {
//         cancelable: true,
//       },
//     );
//   };

//   const onSaveToServer = async (logData) => {
//     try {
//       // if (log) {
//       //   // 기존 로그를 수정하는 경우
//       //   await axios.put(`https://todohaemil.com/schedules/schedule/${log.id}`, logData);
//       //   onModify({
//       //     id: log.id,
//       //     ...logData,
//       //   });
//       if (log) {
//         onModify({
//           id: log.id,
//           date: date.toISOString(),
//           title,
//           body,
//           map,
//           destination, // 목적지 포함
//           time, // 시간 포함
//         });
//       } else {
//         // 새로운 로그를 생성하는 경우
//         const response = await axios.post('https://todohaemil.com/schedules/schedule', logData);
//         const newLog = response.data; // 서버에서 반환된 새로운 로그 데이터

//         onCreate(newLog);
//       }

//       navigation.pop(); // 화면을 닫음
//     } catch (error) {
//       console.error('데이터 전송 중 오류 발생:', error);
//     }
//   };

//   const onSave = () => {
//     const logData = {
//       localDate,
//       content,
//       done: false, // done 값을 기본으로 false로 설정
//       time,
//       place,
//       medicine,
//       repeatType,
//     };

//     onSaveToServer(logData);
//   };

//   return (
//     <SafeAreaView style={styles.block}>
//       <KeyboardAvoidingView
//         style={styles.avoidingView}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <WriteHeader
//           onSave={onSave}
//           onAskRemove={onAskRemove}
//           isEditing={!!log}
//           date={localDate}
//           onChangeDate={setLocalDate}
//         />
//         <WriteEditor
//           content={content}
//           time={time}
//           place={place}
//           medicine={medicine}
//           repeatType={repeatType}
//           onChangeContent={setContent}
//           onChangeTime={setTime}
//           onChangePlace={setPlace}
//           onChangeMedicine={setMedicine}
//           onChangeRepeatType={setRepeatType}
//         />
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   block: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   avoidingView: {
//     flex: 1,
//   },
// });

// export default WriteScreen;
