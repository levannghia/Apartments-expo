import { StyleSheet, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Row from './Row';
import { Text, Button } from '@ui-kitten/components'
import { default as theme } from '../../theme.json';

const CardInformation = ({property}) => {
    return (
        <View style={{ paddingHorizontal: 5, paddingVertical: 10, borderColor: '#d3d3d3', borderRadius: 5, borderWidth: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
            <Row style={{ justifyContent: 'space-between' }}>
                <Text category='c1'>{property.rentLow.toLocaleString()} - {property.rentHeight.toLocaleString()}</Text>
                <MaterialCommunityIcons name="cards-heart-outline" size={24} color={theme['color-primary-500']} />
            </Row>
            <Text category={'c1'}>
                {property.bedRoomLow} - {property.bedRoomHeight} Beds
            </Text>
            <Text category={'c1'} style={{ marginTop: 5 }}>
                {property.name}
            </Text>
            <Text category={'c1'}>
                {property.street}
            </Text>
            <Text category={'c1'}>
                {property.city}, {property.state} {property.zip}
            </Text>
            <Text category={'c1'} style={{ marginTop: 5 }}>
                {property.tags.map((tag, index) => index === property.tags.length - 1 ? tag : `${tag}, `)}
            </Text>
            <Row style={{ marginTop: 5, justifyContent: "space-between" }}>
                <Button appearance='ghost' size='small' style={{
                    borderColor: theme['color-primary-500'],
                    width: '48%'
                }}>Email</Button>
                <Button appearance='filled' size='small' style={{
                    width: '48%',
                    backgroundColor: theme['color-primary-500']
                }}>Call</Button>
            </Row>
        </View>
    )
}

export default CardInformation

const styles = StyleSheet.create({})