import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { HEADERHEIGHT } from '../../constant'
import { useNavigation } from '@react-navigation/native'
import MapMarker from './MapMarker'
import { default as theme } from '../../theme.json';
import Card  from './Card'
import MapView from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Map = ({ properties }) => {
    const [activeIndex, setActiveIndex] = useState(-1)
    const mapRef = useRef()
    const navigation = useNavigation()

    const unFocusProperty = () => {
        setActiveIndex(-1);
        navigation.setOptions({ tabBarStyle: { display: "flex" } });
    };

    const handleMapPress = () => {
        if (Platform.OS === "android") unFocusProperty();
    };

    const handleMarkerPress = (index) => {
        if (Platform.OS === 'ios') {
            setTimeout(() => {
                mapRef.current?.animateCamera({
                    center: {
                        latitude: properties[index].lat,
                        longitude: properties[index].lng,
                    },
                })
            }, 100)
        }

        setActiveIndex(index);
        navigation.setOptions({ tabBarStyle: { display: "none" } });
    }

    return (
        <View style={styles.container}>
            <MapView style={{ width: "100%", height: "100%" }} userInterfaceStyle={'light'} ref={mapRef} onPress={handleMapPress}>
                {
                    properties &&
                    properties.map((i, index) =>
                    (<MapMarker
                        lat={i.lat}
                        lng={i.lng}
                        color={activeIndex === index ? theme['color-info-400'] : theme['color-danger-100']}
                        key={index}
                        onPress={() => handleMarkerPress(index)} />))
                }
            </MapView>
            {activeIndex > -1 && (
                <>
                    {Platform.OS === 'ios' && (
                        <TouchableOpacity style={styles.exit} onPress={unFocusProperty}>
                            <MaterialCommunityIcons name='close' color={theme['color-primary-500']} size={24} />
                        </TouchableOpacity>
                    )}
                    <Card property={properties[activeIndex]} style={styles.card} />
                </>
            )}
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: HEADERHEIGHT - 20
    },

    card: {
        position: 'absolute',
        bottom: 10,
        height: 360,
    },
    exit: {
        backgroundColor: "#fff",
        padding: 10,
        position: "absolute",
        top: 170,
        left: 15,
        borderRadius: 30,
    },
})