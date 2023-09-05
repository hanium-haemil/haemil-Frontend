import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import Geolocation from "@react-native-community/geolocation";


function OutboundItems () {
    const [outboundItems, setOutboundItems] = useState([]);

    // useEffect(() => {
    //     // 위치 권한 요청 및 위치 정보 가져오기
    //     if (Platform.OS === "android") {
    //       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    //         .then(granted => {
    //           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             Geolocation.getCurrentPosition(
    //               position => {
    //                 const latitude = position.coords.latitude;
    //                 const longitude = position.coords.longitude;
    //                 AxioxOutItemsBox(latitude, longitude);
    //               },
    //               error => {
    //                 console.log("Error getting location: ", error);
    //               }
    //             );
    //           } else {
    //             console.log("Location permission denied");
    //           }
    //         })
    //         .catch(err => console.warn(err));
    //     } else {
    //       Geolocation.getCurrentPosition(
    //         position => {
    //           const latitude = position.coords.latitude;
    //           const longitude = position.coords.longitude;
    //           AxioxOutItemsBox(latitude, longitude);
    //         },
    //         error => {
    //           console.log("Error getting location: ", error);
    //         }
    //       );
    //     }
    //   }, []);
    
      // const AxioxOutItemsBox = (latitude, longitude) => {
      //   const SERVER_URL = `https://todohaemil.com/prepare/need?latitude=37.570377777&longitude=126.981641666`;
      //   axios.get(SERVER_URL)
      //     .then((response) => {
      //       setOutboundItems(response.data);
      //       console.log("setOutboundItems : ", response.data);
      //     })
      //     .catch(error => {
      //       console.error("outboundItems  : ", error);
      //       setOutboundItems([]);
      //     })
      // }

    return(
        <View style={styles.container}>
            <View style={{flexDirection:'column', justifyContent:'center'}}>
                <Text style={styles.outboundItemsTitle}>추천 외출 물품</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex : 1,
        borderRadius : 20,
        marginTop : 20,
        marginBottom : 20,
    },
    outboundItemsTitle : {
      fontSize:18, fontWeight:'bold', marginTop:25, marginLeft : 30, color : 'black'
    }
})

export default OutboundItems;