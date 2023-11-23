import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { default as theme } from '../../theme.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '@ui-kitten/components';

const RecentSearchButton = ({ style, name, onPress }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <MaterialCommunityIcons name='clock-time-three-outline' size={24} color={theme['color-primary-500']} />
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

export default RecentSearchButton

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderColor: theme["color-gray"],
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    text: { marginLeft: 10 },
})