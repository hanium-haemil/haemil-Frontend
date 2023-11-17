import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import publicImage from '../images/publicImage.png';
import axios from 'axios';

function MyPage({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // AsyncStorage에서 데이터를 가져오는 로직
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('nickname');
        const accessToken = await AsyncStorage.getItem('accessToken');
        const storedId = await AsyncStorage.getItem('userId'); 
        
        if (storedData !== null) {
          setUserData(storedData);
          setUserAccessToken(accessToken);
          setUserId(storedId);
        }

        // 프로필 이미지를 AsyncStorage에서 가져옵니다.
        const profileImageUri = await AsyncStorage.getItem('profileImage');
        if (profileImageUri) {
          setProfileImage(profileImageUri);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const logoutAlert = () => {
    Alert.alert('로그아웃', '로그아웃하시겠습니까?', [
      { text: '취소', onPress: () => null },
      { text: '확인', onPress: () => logoutNavigation()},
    ]);
    return true;
  };

  const logoutNavigation = async () => {
    try {
      // AsyncStorage 데이터 및 프로필 이미지 삭제
      await AsyncStorage.clear();
  
      // 로그아웃 요청 보내기
      await axios.post('https://todohaemil.com/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });
  
      // 화면 재설정
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      });
    } catch (error) {
      console.error('로그아웃 에러:', error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      });
    }
  };
  

  const logout = async () => {
    try {
      logoutAlert();
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  return (
    <>
      <ScrollView style={styles.header}>
        <View style={styles.container}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: 60, height: 60, borderRadius: 25, marginLeft: 20 }}
            />
          ) : (
            <Image
              source={publicImage}
              style={{ width: 60, height: 60, borderRadius: 25, marginLeft: 20 }}
            />
          )}

          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>{userData}</Text>
            <Text style={{ fontSize: 12, marginLeft: 10 }}>#{userId}</Text>
          </View>
        </View>

        <View style={styles.settingList}>
          <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>설정</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('MyInfoPage')}>
          <View style={styles.setting}>
            <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>내 정보 수정하기
              <Icon style={{ marginLeft: 10 }} name="chevron-forward-outline" />
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.settingList}>
          <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>앱 정보</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('AppInfoPage')}>
          <View style={styles.setting2}>
            <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>아이콘 정보
              <Icon style={{ marginLeft: 10 }} name="chevron-forward-outline" />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <View style={styles.setting2}>
            <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>로그아웃
              <Icon style={{ marginLeft: 10 }} name="chevron-forward-outline" />
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEFF5',
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#CCC9C9',
  },
  settingList: {
    justifyContent: 'center',
    backgroundColor: '#ECEFF5',
    width: '100%',
    height: 30,
  },
  setting: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 50,
  },
  setting2: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#CCC9C9',
  }
});

export default MyPage;
