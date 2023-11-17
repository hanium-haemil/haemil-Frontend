import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import KakaoTokenManagementRT from './KakaoTokenManagementRT';

function KakaoTokenManagement({ navigation }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const storedData = await AsyncStorage.getItem('accessToken');

        if (storedData !== null) {
          setAccessToken(storedData);

          const response = await axios.get('https://todohaemil.com/users/validate', {
            headers: {
              Authorization: `Bearer ${storedData}`,
            },
          });

          // 서버 응답에 따라 토큰이 유효하다고 판단
          if (response.status === 200) {
            console.log('200 성공');
            setIsTokenValid(true);
          } else {
            console.error('토큰 검증 에러:', response.data);
            setIsTokenValid(false);
          }
        }
      } catch (error) {
        console.error(error);
        // 401 에러 발생 > 재발급 과정 진행하지 않음
        setIsTokenValid(false);
      }
    };

    fetchAccessToken();
  }, []);

  // 토큰이 유효하지 않은 경우 KakaoTokenManagementRT 컴포넌트를 렌더링
  if (!isTokenValid) {
    return <KakaoTokenManagementRT />
  }
}

export default KakaoTokenManagement;
