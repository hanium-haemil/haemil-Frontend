import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://todohaemil.com/auth/kakao', // 서버 엔드포인트 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // true로 설정해서 header에서 쿠키 값 가져올 수 있도록 설정.
});

function KakaoLogin ({ navigation }) {
    const [currentUrl, setCurrentUrl] = useState('');
    const [authorizationCode, setAuthorizationCode] = useState('');

    //카카오 로그인 화면으로 이동
    const renderKakaoWebView = () => {
        return (
        <WebView
            source={{ uri: 'https://kauth.kakao.com/oauth/authorize?client_id=88102d82e2851449e4fc7757d6d0f9b6&redirect_uri=https://todohaemil.com/login/oauth2/code/kakao&response_type=code' }}
            
            onNavigationStateChange={(navState) => {
                setCurrentUrl(navState.url);

                if (navState.url.includes('todohaemil.com')) {
                    // 인가 코드 추출
                    const regex = /code=([^&]*)/;
                    const match = navState.url.match(regex);
                    if (match) {
                        const extractedAuthorizationCode = match[1];
                        console.log(extractedAuthorizationCode);
                        
                        // 인가 코드 상태 업데이트
                        setAuthorizationCode(extractedAuthorizationCode);
                    }
                }
            }}
        />
        );
    };

    const sendAuthorizationCode = () => {
        // 추출된 인가 코드를 서버로 POST 요청 보내기
        axiosInstance.post('https://todohaemil.com/auth/kakao', { authorizationCode })
        .then((response) => {
            const result = response.data.result; // result로 객체 추출

            const ACCESS_TOKEN = result.accessToken;
            console.log('ACCESS TOKEN : ',ACCESS_TOKEN);

            const nickname = result.nickname;
            console.log('이름 : ',nickname);

            const userId = result.userId.toString();
            console.log('userId : ',userId);

            const profileImageUrl = result.profileImageUrl || '';
            console.log('프로필 : ',profileImageUrl);

            // 응답 헤더에서 쿠키 정보 가져오기
            const cookies = response.headers['set-cookie'];

            //쿠키에서 RT만 추출하기
            const refreshTokens = [];

            cookies.forEach((cookie) => {
                const regex = /refresh-token=([^;]+)/;
                const match = cookie.match(regex);

                if (match) {
                    const refreshToken = match[1];
                    refreshTokens.push(refreshToken);
                }
            });

            AsyncStorage.setItem('refreshTokens', JSON.stringify(refreshTokens[0]));
            AsyncStorage.setItem('ACCESS_TOKEN', ACCESS_TOKEN);
            AsyncStorage.setItem('nickname', nickname);
            AsyncStorage.setItem('userId', userId);
            AsyncStorage.setItem('profileImageUrl', profileImageUrl);
            
            console.log('refreshTokens:', refreshTokens[0]);

            navigation.navigate('HomePage');

        })
        .catch((error) => {
            // 오류 처리
            console.error('Error:', error);
        });

    };

    return(
        <View style={styles.KakaoLogin}>
            {renderKakaoWebView()}
            <Button title="Send Authorization Code" onPress={sendAuthorizationCode} />

        </View>
    );
};

const styles = StyleSheet.create({
    KakaoLogin : {
        flex : 1,
    }
})

export default KakaoLogin;
