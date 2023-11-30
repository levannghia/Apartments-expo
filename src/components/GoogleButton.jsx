import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text, Button } from '@ui-kitten/components'
import * as WebBrowser from 'expo-web-browser'
import GoogleLogo from './logos/GoogleLogo'

WebBrowser.maybeCompleteAuthSession();
const GoogleButton = ({text, style, onPress}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <GoogleLogo style={styles.logo}/>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default GoogleButton

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        width: "100%",
        borderRadius: 5,
        backgroundColor: 'white',
        height: 50
    },
    text: {
        color: '#36454f',
        alignSelf: 'center',
        marginLeft: 40,
        fontWeight: 'bold',
        fontSize: 15,
    },
    logo: {
        marginLeft: 10,
        marginTop: 1
    }
})