import { Animated, StyleSheet, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Screen } from '../components/screen'
import Card from '../components/Card';
import { LISTMARGIN, HEADERHEIGHT } from '../../constant';
import AnimatedListHeader from '../components/AnimatedListHeader';
import Map from '../components/Map';
import { Text } from '@ui-kitten/components';
import { properties, getPropertiesInArea } from '../data/properties'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = ({ route }) => {
  const mapRef = useRef();
  const [location, setLocation] = useState(null)
  const [scrollAnimation] = useState(new Animated.Value(0))
  const [mapShown, setMapShown] = useState(false)
  // const [properties, setProperties] = useState(properties)
  const navigation = useNavigation()

  useEffect(() => {
    if (route.params) {
      const numberBoundingBox = [
        Number(route.params.boundingBox[0]),
        Number(route.params.boundingBox[1]),
        Number(route.params.boundingBox[2]),
        Number(route.params.boundingBox[3]),
      ]

      setLocation(route.params.location)
      setProperties(getPropertiesInArea(numberBoundingBox))
      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon),
        },
      });
    }
  }, [route])




  /*
   This function is here for testing purposes, you wouldn't use this in prod. 
   However, you would use similar logic on the backend to get the areas in your
   db that are within a certain lat and lng range
   */

  return (
    <Screen>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        mapShown={mapShown}
        setMapShown={setMapShown}
        location={location ? location : "Find Location"}
        availableProperties={properties ? properties.length : undefined}
      />
      {mapShown ?
        <Map properties={properties} mapRef={mapRef}
          location={location ? location : "Find a Location"}
          initialRegion={
            route.params
              ? {
                latitude: Number(route.params.lat),
                longitude: Number(route.params.lon),
                latitudeDelta: 0.4,
                longitudeDelta: 0.4,
              }
              : undefined
          }
          setLocation={setLocation}
          setProperties={setProperties}
          /> :
        (
          <>
            {properties.length > 0 ? (
              <Animated.FlatList
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {
                          y: scrollAnimation,
                        },
                      },
                    },
                  ],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                bounces={false}
                contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20 }}
                showsVerticalScrollIndicator={false}
                data={properties}
                keyExtractor={(item) => item.ID}
                renderItem={({ item }) => (
                  <Card property={item} style={{ marginVertical: 5 }} onPress={() =>
                    navigation.navigate("PropertyDetail", { propertyID: item.ID })
                  }/>
                )}
              />
            ) : (
              <View style={styles.lottieContainer}>
                <LottieView
                  autoPlay
                  loop
                  style={styles.lottie}
                  source={require('../assets/lotties/SearchScreen.json')}
                />
                <Text category={'h6'}>Begin Your Search</Text>
                <Text appearance={'hint'}>Find apartments anytime and anywhere</Text>
              </View>
            )}
          </>
        )}
    </Screen>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  lottieContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200
  }
})