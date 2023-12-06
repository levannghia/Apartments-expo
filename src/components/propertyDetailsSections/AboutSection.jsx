import { StyleSheet } from 'react-native'
import React from 'react'
import Row from '../Row'
import { Text } from '@ui-kitten/components'
import { MaterialIcons } from "@expo/vector-icons";

const AboutSection = ({ property }) => {
    if (property.description)
        return (
            <>
                <Text category={"h5"} style={styles.header}>
                    About
                </Text>
                {property?.name ? (
                    <Row>
                        <MaterialIcons color={"#36454f"} size={24} name="apartment" />

                        <Text category={"h6"} style={styles.apartmentText}>
                            {property?.name}
                        </Text>
                    </Row>
                ) : null}
                <Text category={"c1"}>{property.description}</Text>
            </>
        );

    return null;
}

export default AboutSection

const styles = StyleSheet.create({
    header: { marginBottom: 15, marginTop: 10 },
    apartmentText: { paddingLeft: 10, marginBottom: 10 },
});