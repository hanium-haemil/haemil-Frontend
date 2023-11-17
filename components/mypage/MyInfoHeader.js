import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function MyInfoHeader({ onSave }) {
  const navigation = useNavigation();

  //뒤로가기 버튼 작동
  const onGoBack = () => {
    navigation.pop();
  }

  //저장 버튼 작동
  const onSaveInfo = () => {
    onSave();
    Alert.alert('알람', '앱을 다시 시작하면 적용됩니다!');
    navigation.navigate('MyPage');
  }

  return (
    <View style={styles.block}>
      <View style={styles.left}>
        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            pressed && { opacity: 0.3 },
          ]}
          onPress={onGoBack}
        >
          <Icon name="arrow-back-outline" size={24} color="black"></Icon>
        </Pressable>
      </View>

      <View style={styles.right}>
        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            pressed && { opacity: 0.3 },
          ]}
          onPress={onSaveInfo}
        >
          <Text>저장</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {},
  circleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  circleButtonLabel: {},
});

export default MyInfoHeader;
