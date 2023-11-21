import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Row from './Row';
import { Text, Button } from '@ui-kitten/components'
import { default as theme } from '../../theme.json';
import { useNavigation } from '@react-navigation/native';

const ModalHeader = ({ xShown, text, style }) => {
    const navigation = useNavigation();
    if(text){
        return (
            <Row style={[styles.container, style]}>
                {xShown && <MaterialCommunityIcons name='close' color='black' size={24} onPress={navigation.goBack} style={styles.x}/>}
                <Text category={"h5"}>{text}</Text>
            </Row>
        )
    }
    return (
        <View style={[styles.container, style]}>
            <View style={styles.bar}></View>
        </View>
    )
}

export default ModalHeader

const styles = StyleSheet.create({
    x: {
        position: 'absolute', 
        left: 10,
        alignSelf: 'center'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a4a4a4'
    },
    bar: {
        width: 50,
        backgroundColor: '#a4a4a4',
        height: 4,
        borderRadius: 30,
    }
})