import { View, StyleSheet } from 'react-native'
import React from 'react'
import ImageCarousel from './ImageCarousel';
import CardInformation from './CardInformation';
import { LISTMARGIN } from '../../constant'

const Card = ({property, style}) => {

  return (
    <View style={[styles.container, styles.boxShadow, style]}>
      <ImageCarousel images={property.images}/>
      <CardInformation property={property}/>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 5,
    backgroundColor: "white",
  },

  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
})
