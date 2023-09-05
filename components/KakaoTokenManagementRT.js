import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


function KakaoTokenManagementRT ({navigation}) {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {
    // AsyncStorage에서 데이터를 가져오는 로직
    const fetchAccessToken = async () => {
        try {
            const storedData = await AsyncStorage.getItem('ACCESS_TOKEN');
            if (storedData !== null) {
              setAccessToken(storedData); // JSON.parse()를 사용하지 않음
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    // AsyncStorage에서 RT를 가져오는 로직
    const fetchRefreshToken = async () => {
        try {
            const storedData = await AsyncStorage.getItem('refreshTokens');
            if (storedData !== null) {
                setRefreshToken(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchRefreshToken();
  }, []);

  console.log('엑세스토큰 : ',accessToken);
  console.log('refreshToken : ',refreshToken);

    // 리프레시 토큰을 사용하여 엑세스 토큰을 재발급 요청
    const refreshTokenPost = async () => {
        try {
            const response = await axios.post('https://todohaemil.com/auth/reissue', null,
            {
                headers : {
                    Cookie : `refresh-token=${refreshToken}`,
                    Authorization: `Bearer ${accessToken}`,
                }
                
            });

            const newAccessToken = response.data.accessToken;
            console.log('새로운 엑세스 토큰:', newAccessToken);

            // 여기서 새로운 엑세스 토큰을 사용하여 보호된 리소스에 접근할 수 있음
        } catch (error) {
            console.error('엑세스 토큰 재발급 오류:', error);
        }
    };

    // 엑세스 토큰 재발급 함수 호출
    refreshTokenPost();
}

export default KakaoTokenManagementRT;