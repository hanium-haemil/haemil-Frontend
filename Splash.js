import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FastImage from 'react-native-fast-image';
import splach from './images/logo_branding_2_1_1.gif';

function Splash({navigation}) {

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // const refreshTokens = await AsyncStorage.getItem('refreshTokens');
        const refreshTokens = await AsyncStorage.getItem('cookies');
        
        if (refreshTokens !== null) {
          navigation.navigate('HomePage');
        } else {
          navigation.navigate('LoginPage');
        }
      } catch (error) {
        console.error('로그인 상태 확인 에러:', error);
      }
    };

    setTimeout(() => {
      checkLoginStatus();
    }, 50000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FastImage
        source={splach}
        style={{ width: 350, height: 350 }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default Splash;
