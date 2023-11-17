import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import AppInfoHeader from './AppInfoHeader';

function AppInfoPage() {
    const weatherData = [
        { id:'1', condition: '맑음', icon: require('../../images/sun.png') },
        { id:'2', condition: '비', icon: require('../../images/rain.png') },
        { id:'3', condition: '구름', icon: require('../../images/cloud.png') },
        { id:'4', condition: '눈', icon: require('../../images/snowCloud.png') },
        { id:'5', condition: '흐림', icon: require('../../images/sunCloud.png') },
        { id:'6', condition: '진눈깨비', icon: require('../../images/rainSnow.png') },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.conditionText}>{item.condition}</Text>
        </View>
      );

      return (
        <>
            <AppInfoHeader/>
            <FlatList
                data={weatherData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.container}
                numColumns={2}
            />
        </>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 10,
      padding: 10,
      backgroundColor: '#C8D8F6',
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 3,
    },
    icon: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    conditionText: {
      fontSize: 20,
      marginTop: 10,
    },
  });

export default AppInfoPage;