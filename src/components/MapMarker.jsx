import { Marker } from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'

const MapMarker = ({lat, lng, onPress, color}) => {
  return (
    <Marker coordinate={{latitude: lat, longitude: lng}} onPress={onPress}>
        <MaterialCommunityIcons name='map-marker' size={32} color={color}/>
    </Marker>
  )
}

export default MapMarker