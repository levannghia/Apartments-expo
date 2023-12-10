import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Row from '../Row';
import { LISTMARGIN } from '../../../constant';
import { BulletedList } from '../BulletedList';

const AmentitiesSection = ({ property }) => {
    const apartmentsAmenities = [];

    return (
        <>
            <Text category={"h5"} style={styles.defaultMarginVertical}>
                Amenities
            </Text>
            <Row style={styles.row}>
                <MaterialCommunityIcons
                    name="google-circles-communities"
                    color={"black"}
                    size={24}
                />
                <Text style={styles.text} category={"h6"}>
                    Community Amenities
                </Text>
            </Row>
            <BulletedList data={['Controlled Access']} heading="Services"/>
            <BulletedList data={['Clubhouse', 'Lounge']} heading="Interior"/>
            <BulletedList data={['Fitness Center', 'Pool', 'Spa', 'Walking/Biking']} heading="Fitness & Recreation"/>
        </>
    )
}

export default AmentitiesSection

const styles = StyleSheet.create({
    row: { alignItems: "center", paddingVertical: 10 },
    text: { marginLeft: 10 },
    defaultMarginVertical: { marginVertical: LISTMARGIN },
});