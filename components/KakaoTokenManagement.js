import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//다른방법 참고 시 https://www.notion.so/64769b0e2a0c4519ab8a3fcf1a0319dc?pvs=4 링크 참고
function KakaoTokenManagement ({navigation}) {
    const [accessToken, setAccessToken] = useState(null);

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

  console.log('엑세스토큰 : ',accessToken);

    axios.get('https://todohaemil.com/users/validate', {
        headers : {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((response)=>{
        console.log(response.data);
    })
    .catch((error)=>{
        // console.error('엑세스코드로 사용자 정보 요청 과정에서 에러가 발생 : ',error);
    })
}

export default KakaoTokenManagement;