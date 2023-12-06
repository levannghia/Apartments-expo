import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Row from '../Row';

const AmentitiesSection = ({ property }) => {
    const apartmentsAmenities = [];

    return (
        <View>
            <Text>AmentitiesSection</Text>
        </View>
    )
}

export default AmentitiesSection

const styles = StyleSheet.create({
    row: { alignItems: "center", paddingVertical: 10 },
    text: { marginLeft: 10 },
    defaultMarginVertical: { marginVertical: 10 },
});