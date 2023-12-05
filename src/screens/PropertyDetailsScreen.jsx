import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Screen } from '../components/screen'
import ImageCarousel from '../components/ImageCarousel'
import { Text } from '@ui-kitten/components'
import { properties } from '../data/properties'
import { default as theme } from '../../theme.json';
import { LISTMARGIN } from '../../constant'
// import { findIndex } from 'lodash'

const PropertyDetailsScreen = ({ route, style }) => {
  const { propertyID } = route.params
  const index = properties.findIndex(i => i.ID === propertyID);
  const property = properties[index]

  return (
    <Screen>
      <Text>{property.name}</Text>
      <FlatList
        data={[property]}
        keyExtractor={(item) => item.ID}
        renderItem={({ item }) => (
          <>
          {item?.images ? <ImageCarousel images={item.images} /> : null}
          <View style={styles.contentContainer}>
            
          </View>
          </>
        )}
      />
    </Screen>
  )
}

export default PropertyDetailsScreen

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  contentContainer: {
    marginHorizontal: LISTMARGIN,
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginTop: 10,
  },
})