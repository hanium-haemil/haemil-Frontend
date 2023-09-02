import React, { useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import HamillLogoImage from './images/hamillLogoImage.png';

function Splash ({navigation}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            //스플래시 화면이 띄워지는 시간(2초) 동안 회원 정보가 있는지 확인
            const hasUserInfo = false;
            const screenName = hasUserInfo ? 'Main' : 'SignIn';
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return(
        <View style={styles.container}>
            <Image source={HamillLogoImage} style={{width: 200, height: 200}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#fff'
    }
});

export default Splash;