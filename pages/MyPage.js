import React, {useState, useEffect} from "react";
import {ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

function MyPage({navigation}) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // AsyncStorage에서 데이터를 가져오는 로직
    const fetchUserData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('nickname');
            if (storedData !== null) {
                setUserData(storedData); // JSON.parse()를 사용하지 않음
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchUserData();
  }, []);

    // useEffect(() => {
    //     // AsyncStorage에서 데이터를 가져오는 로직
    //     const fetchUserData = async () => {
    //         try {
    //             const storedData = await AsyncStorage.getItem('nickname');
    //             if (storedData !== null) {
    //                 const parsedData = JSON.parse(storedData);
    //                 setUserData(parsedData);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchUserData();
    // }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
    <ScrollView style={styles.header}>
    <View style={styles.container}>
      {/* <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>
        {userData && userData.result && userData.result.nickname}
      </Text> */}
      <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{userData}</Text>
      </View>

        <View style={styles.settingList}>
          <Text style={{fontWeight : 'bold', marginLeft : 10,}}>설정
          </Text>
        </View>
      
      <TouchableOpacity >
        <View style={styles.setting}>
          <Text style={{fontWeight : 'bold', marginLeft : 10}}>알림 설정
            <Icon style={{marginLeft : 10,}}  name="chevron-forward-outline"/> 
          </Text>
        </View>
      </TouchableOpacity>

        <View style={styles.settingList}>
          <Text style={{fontWeight : 'bold', marginLeft : 10}}>내 정보
          </Text>
        </View>

        <TouchableOpacity >
        <View style={styles.setting}>
          <Text style={{fontWeight : 'bold', marginLeft : 10}}>수정하기
            <Icon style={{marginLeft : 10,}}  name="chevron-forward-outline"/> 
          </Text>
        </View>
      </TouchableOpacity>

        <View style={styles.settingList}>
          <Text style={{fontWeight : 'bold', marginLeft : 10}}>앱 정보
          </Text>
        </View>

        <TouchableOpacity >
        <View style={styles.setting2}>
          <Text style={{fontWeight : 'bold', marginLeft : 10}}>공지사항
            <Icon style={{marginLeft : 10,}}  name="chevron-forward-outline"/> 
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity >
        <View style={styles.setting2}>
          <Text style={{fontWeight : 'bold', marginLeft : 10}}>로그아웃
            <Icon style={{marginLeft : 10,}}  name="chevron-forward-outline"/> 
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
      
      
    </>
    
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor : 'white',
  },
  container: {
    justifyContent: "center",
    backgroundColor: '#ECEFF5',
    width : '100%',
    height : 100,
    marginBottom : 10,
  },
  settingList : {
    justifyContent : 'center',
    backgroundColor : '#ECEFF5',
    width : '100%',
    height : 30,
  },
  setting : {
    justifyContent : 'center',
    backgroundColor : 'white',
    width : '100%',
    height : 50,
  },
  setting2 : {
    justifyContent : 'center',
    backgroundColor : 'white',
    width : '100%',
    height : 50,
    borderBottomWidth : 1,
    borderColor : '#CCC9C9',
  
  }
})

export default MyPage;