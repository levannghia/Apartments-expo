import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Row from './Row'
import { default as theme } from '../../theme.json';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, Button } from '@ui-kitten/components';
import * as Location from 'expo-location';

const CurrentLocationButton = ({ style }) => {
    const navigation = useNavigation();
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        handleNavigate(location)
    }

    const handleNavigate = (location) => {
        let lat = location.coords,latitude;
        let lon = location.coords,longitude;

        let boundingBox = [
            (lat - 0.048).toString(),
            (lat + 0.048).toString(),
            (lon - 0.041).toString(),
            (lon + 0.041).toString(),
        ]

        navigation.navigate("Root", {
            screen: "Search",
            params: {
                location: "Your Current Location",
                boundingBox,
                lat: lat.toString(),
                lon: lon.toString()
            }
        })
    }

    return (
        <Row style={[styles.container, style]}>
            <FontAwesome name='location-arrow'
                size={30}
                style={styles.icon}
                color={theme['color-primary-500']}
            />
            <TouchableOpacity onPress={async () => await getLocation()}>
                <Text style={styles.text}>Use my current location</Text>
            </TouchableOpacity>
        </Row>
    )
}

export default CurrentLocationButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    icon: {
        marginLeft: 5
    },
    text: {
        marginLeft: 10,
        fontWeight: '600'
    }
})