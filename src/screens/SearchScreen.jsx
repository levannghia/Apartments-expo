import { Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Screen } from '../components/screen'
import Card from '../components/Card';
import { LISTMARGIN, HEADERHEIGHT } from '../../constant';
import AnimatedListHeader from '../components/AnimatedListHeader';
import Map from '../components/Map';

const SearchScreen = ({ route }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (route.params) {
      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon),
        },
      });
    }
  }, [route])

  const properties = [
    {
      id: 1,
      images: [
        "https://www.hoteljob.vn/files/Pic/Th%C3%A1ng%204/Khach-san-la-gi-01.jpg",
        "https://media.vneconomy.vn/w800/images/upload/2022/11/21/crowne.png"
      ],
      rentLow: 3750,
      rentHeight: 31098,
      bedRoomLow: 1,
      bedRoomHeight: 5,
      name: "The Hamiconl",
      street: "123 adc accc",
      city: "Ha Noi",
      state: "Forola",
      zip: 319009,
      tags: ["Parking", "Value0"],
      lat: 25.761681,
      lng: -80.191788
    },
    {
      id: 2,
      images: [
        "https://www.hoteljob.vn/files/Pic/Th%C3%A1ng%204/Khach-san-la-gi-01.jpg",
        "https://media.vneconomy.vn/w800/images/upload/2022/11/21/crowne.png"
      ],
      rentLow: 3750,
      rentHeight: 31098,
      bedRoomLow: 1,
      bedRoomHeight: 5,
      name: "The Hamiconl",
      street: "123 adc accc",
      city: "Ha Noi",
      state: "Forola",
      zip: 319009,
      tags: ["Parking", "Value0"],
      lat: 25.77427,
      lng: -80.1323
    },
    {
      id: 3,
      images: [
        "https://www.hoteljob.vn/files/Pic/Th%C3%A1ng%204/Khach-san-la-gi-01.jpg",
        "https://media.vneconomy.vn/w800/images/upload/2022/11/21/crowne.png"
      ],
      rentLow: 3750,
      rentHeight: 31098,
      bedRoomLow: 1,
      bedRoomHeight: 5,
      name: "The Hamiconl",
      street: "123 adc accc",
      city: "Ha Noi",
      state: "Forola",
      zip: 319009,
      tags: ["Parking", "Value0"],
      lat: 25.77427,
      lng: -80.1323
    }
  ];

  const [scrollAnimation] = useState(new Animated.Value(0))
  const [mapShown, setMapShown] = useState(false)

  return (
    <Screen>
      <AnimatedListHeader scrollAnimation={scrollAnimation} mapShown={mapShown} setMapShown={setMapShown} />
      {mapShown ?
        <Map properties={properties} mapRef={mapRef} initialRegion={
          route.params
            ? {
              latitude: Number(route.params.lat),
              longitude: Number(route.params.lon),
              latitudeDelta: 0.4,
              longitudeDelta: 0.4,
            }
            : undefined
        } /> :
        (<Animated.FlatList
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
          contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20, marginHorizontal: LISTMARGIN }}
          showsVerticalScrollIndicator={false}
          data={properties}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card property={item} style={{ marginVertical: 5 }} />
          )}
        />)}
    </Screen>
  )
}

export default SearchScreen