import { StyleSheet, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { Screen } from '../components/screen'
import ImageCarousel from '../components/ImageCarousel'
import { Text, Divider } from '@ui-kitten/components'
import { properties } from '../data/properties'
import { default as theme } from '../../theme.json';
import { LISTMARGIN } from '../../constant'
import PropertyHeaderSection from '../components/propertyDetailsSections/PropertyHeaderSection'
import PricingAndFloorPlanSection from '../components/propertyDetailsSections/PricingAndFloorPlanSection'
import AboutSection from '../components/propertyDetailsSections/AboutSection'
import ContactSection from '../components/propertyDetailsSections/ContactSection'
import AmentitiesSection from '../components/propertyDetailsSections/AmentitiesSection'
import LeaseAndFeesSection from '../components/propertyDetailsSections/LeaseAndFeesSection'
import LocationSection from '../components/propertyDetailsSections/LocationSection'
// import { findIndex } from 'lodash'

const PropertyDetailsScreen = ({ route, style }) => {
  const { propertyID } = route.params
  const index = properties.findIndex(i => i.ID === propertyID);
  const property = properties[index]

  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[property]}
        keyExtractor={(item) => item.ID}
        renderItem={({ item }) => (
          <>
          {item?.images ? <ImageCarousel images={item.images} indexShown={true}/> : null}
          <View style={styles.contentContainer}>
            <PropertyHeaderSection property={property}/>
            <Divider style={styles.divider}/>
            <PricingAndFloorPlanSection property={property}/>
            <Divider style={styles.divider}/>
            <AboutSection property={property}/>
            <Divider style={styles.divider}/>
            <ContactSection property={property}/>
            <Divider style={styles.divider}/>
            <AmentitiesSection property={property}/>
            <Divider style={styles.divider}/>
            <LeaseAndFeesSection property={property}/>
            <Divider style={styles.divider}/>
            <LocationSection property={property}/>
            <Divider style={styles.divider}/>
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