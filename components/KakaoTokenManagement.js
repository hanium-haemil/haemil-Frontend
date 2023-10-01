import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function KakaoTokenManagement ({navigation}) {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const fetchAccessToken = async () => {
        try {
            //저장된 토큰 값 들고오기
            const storedData = await AsyncStorage.getItem('accessToken');

            //만약 토큰 값이 null이 아니라면
            if (storedData !== null) {
            setAccessToken(storedData);
    
            // API 호출
            axios.post('https://todohaemil.com/users/validate', null, {
                headers: {
                    Authorization: `Bearer ${storedData}`,
                },
                })
                .then((response) => {
                console.log('AT 검증 결과', response.data);
                })
                .catch((error) => {
                console.error('AT 검증 에러 : ', error);
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
        fetchAccessToken();
    }, []);
}

export default KakaoTokenManagement;
