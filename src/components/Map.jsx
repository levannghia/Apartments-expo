import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { HEADERHEIGHT } from '../../constant'
import { useNavigation } from '@react-navigation/native'
import MapMarker from './MapMarker'
import { default as theme } from '../../theme.json';
import Card from './Card'
import MapView from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@ui-kitten/components'
import { getPropertiesInArea } from '../data/properties'

let mapRegion = undefined;

const Map = ({ properties, mapRef, initialRegion, location, setLocation, setProperties }) => {
    const [activeIndex, setActiveIndex] = useState(-1)
    const [showSearchAreaButton, setShowSearchAreaButton] = useState(false)
    const [boundingBox, setBoundingBox] = useState([])
    const [region, setRegion] = useState(mapRegion ? mapRegion : undefined)
    // const mapRef = useRef()
    const navigation = useNavigation()

    useEffect(() => {
        if (location === "Map Area") return;
        if (initialRegion) {
            setShowSearchAreaButton(false);
            setRegion(initialRegion)
        }
    })

    const unFocusProperty = () => {
        setActiveIndex(-1);
        navigation.setOptions({ tabBarStyle: { display: "flex" } });
    };

    const handleMapPress = () => {
        if (Platform.OS === "android") unFocusProperty();
    };

    const handleMarkerPress = (index) => {

        setTimeout(() => {
            mapRef.current?.animateCamera({
                center: {
                    latitude: properties[index].lat,
                    longitude: properties[index].lng,
                },
            })
        }, 100)

        setTimeout(() => {
            const newRegion = {
                latitude: properties[index].lat,
                latitudeDelta:
                    region?.latitudeDelta && region.latitudeDelta < 4
                        ? region.latitudeDelta
                        : 4,
                longitude: properties[index].lng,
                longitudeDelta:
                    region?.longitudeDelta && region.longitudeDelta < 4
                        ? region.longitudeDelta
                        : 4,
            };

            setRegion(newRegion);
        }, 600);
        setActiveIndex(index);
        navigation.setOptions({ tabBarStyle: { display: "none" } });
    }

    return (
        <View style={styles.container}>
            <MapView style={{ width: "100%", height: "100%" }} userInterfaceStyle={'light'} ref={mapRef} onPress={handleMapPress}
                provider={'google'}
                onRegionChangeComplete={(region, isGesture) => {
                    if (isGesture?.isGesture) {
                        if (!showSearchAreaButton) setShowSearchAreaButton(true);
                        const newBoundingBox = [
                            region.latitude - region.latitudeDelta / 2,
                            region.latitude + region.latitudeDelta / 2,
                            region.longitude - region.longitudeDelta / 2,
                            region.longitude + region.longitudeDelta / 2,
                        ]

                        setRegion(region)
                        setBoundingBox(newBoundingBox)
                    }
                }}
            >
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
                    <Card property={properties[activeIndex]} style={styles.card} onPress={() => {
                        navigation.navigate("PropertyDetail", {proprtyId: properties[activeIndex].ID})
                    }}/>
                </>
            )}
            {showSearchAreaButton && activeIndex === -1 && (
                <Button style={styles.searchAreaButton} appearance={'ghost'}
                    onPress={() => {
                        setProperties(getPropertiesInArea(boundingBox));
                        setLocation("Map Area");
                        mapRegion = region;
                        setShowSearchAreaButton(false)
                    }}
                >Search Area</Button>
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
    searchAreaButton: {

    }
})