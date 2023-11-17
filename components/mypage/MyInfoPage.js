import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button,Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraButton from './CameraButton';
import publicImage from '../../images/publicImage.png';
import MyInfoHeader from './MyInfoHeader';

function MyInfoPage({ navigation }) {
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('nickname');
        const storedImage = await AsyncStorage.getItem('profileImage');

        if (storedData !== null) {
          setName(storedData);
          setProfileImage(storedImage);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleImageSelection = async (imageUri) => {
    await AsyncStorage.setItem('profileImage', imageUri);
    setProfileImage(imageUri);
  };

  const updateAndSaveName = async () => {
    try {
      await AsyncStorage.setItem('nickname', newName);
      setName(newName);
      navigation.navigate('MyPage');
    } catch (error) {
      console.error('이름 수정 및 저장 오류:', error);
    }
  };

  return (
    <>
    <MyInfoHeader onSave={updateAndSaveName} />
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <Image source={publicImage} style={styles.image} />
        )}
        <CameraButton
          onImageSelected={handleImageSelection}
          style={styles.cameraButton}
        />
      </View>

      <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>이름</Text>
      <TextInput
        style={styles.nickName}
        value={newName}
        onChangeText={(text) => setNewName(text)}
        placeholder='변경할 이름을 입력해주세요!'
      />
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    margin : 30,
  },
  image: {
    marginBottom: -30,
    marginLeft : -60,
    width: 100,
    height: 100,
    borderRadius: 65,
  },
  cameraButton: {
    marginLeft : 100,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  nickName: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: 'white',
  },
});

export default MyInfoPage;
