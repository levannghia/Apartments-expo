import { StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Text } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import Row from '../Row';
import { properties } from '../../data/properties';
import PetCard from '../PetCard';
import GeneralTextCard from '../GeneralTextCard';

const LeaseAndFeesSection = ({ property }) => {
    const leaseLengths = [];
    const downDepositBody = [];
    return (
        <>
            <Text category={"h5"} style={styles.defaultMarginVertical}>
                Lease Detail & Fees
            </Text>
            {property?.pets ? (
                <>
                    <Row style={styles.row}>
                        <MaterialIcons name='pets' color={'black'} size={24} />
                        <Text category={'h6'} style={styles.rowText}>Pet Policies</Text>
                    </Row>
                    <FlatList
                        style={styles.defaultMarginVertical}
                        horizontal
                        data={property.pets}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.type}
                        renderItem={({ item }) => (<PetCard pet={item} style={styles.petCard} />)}
                    />
                    <Row style={styles.row}>
                        <MaterialIcons name="attach-money" color="black" size={24} />
                        <Text category={"h6"} style={styles.rowText}>
                            Fees
                        </Text>
                    </Row>
                    <GeneralTextCard heading="parking" body={["Other"]} />
                    <Row style={[styles.row, { paddingTop: 10 }]}>
                        <MaterialIcons name='list-alt' color={'black'} size={24} />
                        <Text category={'h6'} style={styles.rowText}>Detail</Text>
                    </Row>
                    <FlatList
                        style={styles.defaultMarginVertical}
                        data={[
                            {
                                heading: "lease options",
                                body: leaseLengths,
                            },
                            {
                                heading: "Down Deposit",
                                body: downDepositBody,
                            },
                        ]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.heading}
                        renderItem={({ item, index }) => (
                            <GeneralTextCard
                                heading={item.heading}
                                body={item.body}
                                style={styles.textCard}
                            />
                        )}
                    />
                </>
            ) : null}
        </>
    )
}

export default LeaseAndFeesSection

const styles = StyleSheet.create({
    defaultMarginVertical: { marginVertical: 10 },
    row: { alignItems: "center", marginVertical: 15 },
    rowText: { marginLeft: 10 },
    petCard: { marginRight: 15 },
    textCard: { marginRight: 10 },
});