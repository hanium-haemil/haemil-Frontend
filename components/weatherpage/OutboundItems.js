import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';

function OutboundItems () {
    return(
        <View style={styles.container}>
            <View style={{flexDirection:'column', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontWeight:'bold', marginTop:25, marginLeft : 30, color : 'black'}}>추천 외출 물품</Text>
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
    }
})

export default OutboundItems;