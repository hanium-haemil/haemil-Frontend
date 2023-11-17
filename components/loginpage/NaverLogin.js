import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NaverLogin = ({ navigation }) => {
  const [authorizationCode, setAuthorizationCode] = useState('');

  // 3초 후에 sendAuthorizationCode 함수를 호출하는 useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (authorizationCode) {
        sendAuthorizationCode();
      }
    }, 3000); // 3초 (3000 밀리초) 후에 실행

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 클리어
  }, [authorizationCode]);

  const sendAuthorizationCode = async () => {
    try {
      // 인가 코드를 서버에 보냅니다.
      const response = await axios.post('https://todohaemil.com/auth/naver', { "authorizationCode" : `${authorizationCode}` });
      const resultToken = response.data;

      // 쿠키에서 리프레시 토큰과 액세스 토큰 추출 및 저장
      const cookies = response.headers['set-cookie'];

      //쿠키에서 RT 값만 추출하는 코드
      const refreshTokens = cookies
        .map((cookie) => {
          const match = cookie.match(/refresh-token=([^;]+)/);
          return match ? match[1] : null;
        })
        .filter((token) => token !== null);

      if (refreshTokens.length > 0) {
        await AsyncStorage.setItem('cookies', JSON.stringify(cookies[0]));
        // await AsyncStorage.setItem('refreshTokens', JSON.stringify(refreshTokens[0])); //rt값 저장
        await AsyncStorage.setItem('accessToken', resultToken.result.accessToken);
        await AsyncStorage.setItem('nickname', resultToken.result.nickname);
        await AsyncStorage.setItem('userId', JSON.stringify(resultToken.result.userId));
      }

      navigation.navigate('HomePage');
    } catch (error) {
      console.error('네이버 로그인 에러:', error);
    }
  };

  return (
    <View style={styles.NaverLogin}>
      <WebView
        source={{
          uri: 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=ndSyV68eTw9eshT1spRc&state=hLiDdL2uhPtsftcU&redirect_uri=https://todohaemil.com/login/oauth2/code/naver'
        }}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes('https://todohaemil.com/login/oauth2/code/naver')) {
            const regex = /code=([^&]*)/;
            
            const match = navState.url.match(regex);
            if (match) {
              const extractedAuthorizationCode = match[1];
              setAuthorizationCode(extractedAuthorizationCode);
            }
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    NaverLogin: {
    flex: 1,
  },
});

export default NaverLogin;

