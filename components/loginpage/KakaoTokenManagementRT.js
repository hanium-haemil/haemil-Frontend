import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function KakaoTokenManagementRT ({navigation}) {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {
        // AsyncStorage에서 데이터를 가져오는 로직
        const fetchAccessToken = async () => {
            try {
                const storedData = await AsyncStorage.getItem('accessToken');
                if (storedData !== null) {
                  setAccessToken(storedData);
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
                const storedData = await AsyncStorage.getItem('cookies');
                
                if (storedData !== null) {
                    setRefreshToken(JSON.parse(storedData));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRefreshToken();
    }, []);

    console.log(accessToken);
    console.log(refreshToken);

    // 엑세스 토큰 재발급 함수
    const refreshTokenPost = async () => {
        try {
            const response = await axios.post('https://todohaemil.com/auth/reissue', null,
            {
                headers : {
                    Cookie : refreshToken,
                    Authorization: `Bearer ${accessToken}`,
                }
                
            });

            console.log(response.data);
        } catch (error) {
            console.error('엑세스 토큰 재발급 오류:', error);
        }
    };

    refreshTokenPost();
}

export default KakaoTokenManagementRT;
