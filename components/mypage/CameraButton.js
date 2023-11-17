import React, { useState } from "react";
import { View, Pressable, Platform, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import UploadModeModal from "./UploadModeModal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

const imagePickerOption = {
  mediaType: "photo",
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === "android",
};

function CameraButton({ onImageSelected }) {
  const [imageUri, setImageUri] = useState(null);

  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = (res) => {
    if (res.didCancel || !res) {
      return;
    }

    setImageUri(res.assets[0].uri); // 선택한 사진 URI
    onImageSelected(res.assets[0].uri); // 이미지 선택 시 부모 컴포넌트로 URI 전달
  };

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);

  // 선택 모달 오픈
  const modalOpen = () => {
      setModalVisible(true);
  };

  return (
    <>
      <View style={styles.cameraBtn}>
        <Pressable onPress={modalOpen}>
          <Icon name="camera-alt" color="#757575" size={24} style={styles.icon}/>
        </Pressable>
      </View>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  cameraBtn : {
    backgroundColor: 'white',
    width : 35,
    height : 35,
    borderWidth : 1,
    borderColor : '#CCC9C9',
    borderRadius : 90,
  },
  icon : {
    margin : 4,
  }
})

export default CameraButton;
