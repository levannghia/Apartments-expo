import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '@ui-kitten/components'
import { default as theme } from '../../theme.json';

const GeneralTextCard = ({heading, body, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text category={'c1'} style={styles.heading}>{heading}</Text>
      {body.map((item) => (<Text category={'c1'} key={item}>{item}</Text>))}
    </View>
  )
}

export default GeneralTextCard

const styles = StyleSheet.create({
    container: {
      padding: 10,
      width: 250,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme["color-gray"],
    },
    heading: {
      fontWeight: "bold",
      textTransform: "capitalize",
      paddingVertical: 4,
    },
  });