import { StyleSheet, View } from 'react-native'
import React from 'react'
import Row from './Row'
import { default as theme } from '../../theme.json';
import { Text, Divider } from '@ui-kitten/components'

const cardRow = (label, value, showDivider) => {
    return (
        <>
            <Row style={styles.cardRow}>
                <Text category={'c1'} style={styles.cardRowText}>{label}</Text>
                <Text category={'c1'} style={styles.cardRowText}>{value}</Text>
            </Row>
            {showDivider ? <Divider style={styles.divider}/> : null}
        </>
    )
}

const PetCard = ({pet, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text category={'c1'} style={styles.allowedText}>{`${pet.type}s`} {pet.allowed ? 'Allowed' : 'Not Allowed'}</Text>
      <Text category={'c1'}>{pet.details}</Text>
      {cardRow("Pet Limit", pet.limit.toString())}
      {pet.deposit ? cardRow("Pet Deposit", `$${pet.deposit}`) : null}
      {pet.rent ? cardRow("Monthly Pet Rent", `$${pet.rent}`) : null}
      {pet.fee ? cardRow("One Time Fee", `$${pet.fee}`) : null}
      {pet.neutered ? cardRow("Declawed", 'Required', false) : cardRow("Declawed", 'Not Required', false)}
    </View>
  )
}

export default PetCard

const styles = StyleSheet.create({
    container: {
      borderRadius: 5,
      borderColor: theme["color-gray"],
      borderWidth: 1,
      padding: 7,
      width: 250,
    },
    allowedText: {
      textTransform: "capitalize",
      fontWeight: "bold",
      marginBottom: 5,
    },
    cardRow: { justifyContent: "space-between", paddingVertical: 5 },
    cardRowText: { fontWeight: "bold" },
    divider: { backgroundColor: theme["color-gray"] },
  });
  