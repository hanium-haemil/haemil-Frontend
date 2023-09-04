import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

function NaverLogin ({ navigation }) {

    const renderKakaoWebView = () => {
        return (
        <WebView
            source={{ uri: 'http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=ndSyV68eTw9eshT1spRc&state=hLiDdL2uhPtsftcU&redirect_uri=https://todohaemil.com/login/oauth2/code/naver' }}
            // onNavigationStateChange={(navState) => {
                // setCurrentUrl(navState.url);

                // if (navState.url.includes('todohaemil.com')) {
                //     // 엑세스 코드 추출
                //     const regex = /code=([^&]*)/;
                //     const match = navState.url.match(regex);
                //     if (match) {
                //         const extractedAccessToken = match[1];
                        
                //         // HomePage로 이동하고 엑세스 코드 전달
                //         navigation.navigate('HomePage', { extractedAccessToken });
                //         console.log(extractedAccessToken);

                //         // 엑세스 토큰 상태 업데이트
                //         setAccessToken(extractedAccessToken);
                //     }
                // }
            // }}
        />
        );
    };

    return(
        <View style={styles.NaverLogin}>
            {renderKakaoWebView()}
        </View>
    );
};

const styles = StyleSheet.create({
    NaverLogin : {
        flex : 1,
    }
})

export default NaverLogin;
