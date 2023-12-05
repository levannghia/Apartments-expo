import { StyleSheet, View, Share } from 'react-native'
import React, { useState } from 'react'
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { default as theme } from '../../../theme.json';
import { getStateAbbreviation } from '../../utils/getStateAbbreviation';
import Row from '../Row';

const PropertyHeaderSection = ({ property }) => {

    const shareItem = async () => {
        try {
            await Share.share({
                message: "Check out this sweet apartment I found on JPArtments.com.",
            });
        } catch (error) {
            alert("Sorry, we're unable to share: " + error);
        }
    };

    return (
        <>
            {property.name ? (
                <Text category={"h5"} style={styles.defaultMarginTop}>
                    {property.name}
                </Text>
            ) : null}
            <Row style={[styles.containerRow, styles.defaultMarginTop]}>
                <View>
                    <Text category={"c1"}>{property.street}</Text>
                    <Text category={"c1"}>{`${property.city}, ${getStateAbbreviation(
                        property.state
                    )} ${property.zip}`}</Text>
                </View>
                <Row style={styles.iconRow}>
                    <MaterialIcons
                        onPress={async () => {
                            await shareItem();
                        }}
                        name="ios-share"
                        size={30}
                        color={theme["color-primary-500"]}
                        style={styles.shareIcon}
                    />
                    <MaterialCommunityIcons
                        // onPress={handleHeartPress}
                        name={property?.liked ? "heart" : "heart-outline"}
                        size={30}
                        color={theme["color-primary-500"]}
                    />
                </Row>
            </Row>
        </>
    )
}

export default PropertyHeaderSection

const styles = StyleSheet.create({
    defaultMarginVertical: { marginVertical: 10 },
    containerRow: {
        justifyContent: "space-between",
    },
    iconRow: { paddingRight: 5 },
    shareIcon: {
        marginRight: 20,
        marginTop: -4,
    },
    defaultMarginTop: { marginTop: 10 },
});