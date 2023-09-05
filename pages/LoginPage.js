import React, {useState} from 'react';
import { View,Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';

import hamillLogo from '../images/HamillLogoHeader.png';
import KakaoLoginImage from '../images/KakaoLogin.png';
import NaverLoginImage from '../images/NaverLogin.png';

const LoginPage = ({ navigation }) => {

  //카카오 로그인 페이지로 이동
  const handleKakaoLinkPress = () => {
      navigation.navigate('KakaoLogin')
  }
  
  //네이버 로그인 페이지로 이동
  const handleNaverLinkPress = () => {
    navigation.navigate('NaverLogin')
  }
  
  return (
    <View style={styles.container}>
    <Image
      source={hamillLogo}
      style={styles.HamillLogo}
    />
    <Text 
      style={{fontSize :16, fontWeight : 'bold', marginBottom : 30}}>
        해밀을 통해 혜택을 누려보세요!</Text>
    <SafeAreaView>

        {/* 카카오 로그인 버튼 */}
        <TouchableOpacity onPress={()=>navigation.navigate('HomePage')}>
          <Image
            source={KakaoLoginImage}
            style={styles.loginImage}
          />
        </TouchableOpacity>
          
        {/* 네이버 로그인 버튼 */}
        <TouchableOpacity onPress={handleNaverLinkPress}>
          <Image
            source={NaverLoginImage}
            style={styles.loginImage}
          />
        </TouchableOpacity>
    
    </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent : 'center',
    alignItems : 'center',
  },
  HamillLogo : {
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom : 300,
    marginTop : 50,
    resizeMode: "contain",
    width : 120,
    height : 92
  },
  loginImage : {
    resizeMode: "contain",
    width : 350,
  }
});

export default LoginPage;