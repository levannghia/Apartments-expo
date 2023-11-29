import { StyleSheet } from 'react-native'
import { Text, Divider } from "@ui-kitten/components";
import React from 'react'
import Row from './Row'
import { default as theme } from '../../theme.json';

const OrDivider = ({ style }) => {
    return (
        <Row style={[styles.container, style]}>
            <Divider style={styles.divider} />
            <Text style={styles.orText} appearance={"hint"}>
                or
            </Text>
            <Divider style={styles.divider} />
        </Row>
    )
}

export default OrDivider

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    orText: { paddingHorizontal: 10, marginTop: -5 },
    divider: {
        borderWidth: 1,
        width: "45%",
        borderColor: theme["color-gray"],
    },
});