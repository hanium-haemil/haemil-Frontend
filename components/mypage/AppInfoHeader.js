import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function AppInfoHeader() {
  const navigation = useNavigation();

  const onGoBack = () => {
    navigation.pop();
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

export default AppInfoHeader;
