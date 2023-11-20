import { StyleSheet, Animated, View } from 'react-native'
import React, { useState } from 'react'
import { Screen } from '../components/screen'
import Card from '../components/Card';
import { LISTMARGIN, HEADERHEIGHT } from '../../constant';
import AnimatedListHeader from '../components/AnimatedListHeader';
import MapView from 'react-native-maps';

const SearchScreen = () => {

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
      tags: ["Parking", "Value0"]
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
      tags: ["Parking", "Value0"]
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
      tags: ["Parking", "Value0"]
    }
  ];

  const [scrollAnimation] = useState(new Animated.Value(0))


  return (
    <Screen>
      <AnimatedListHeader scrollAnimation={scrollAnimation}/>
      <View style={{flex: 1, paddingTop: HEADERHEIGHT - 20}}>
        <MapView style={{width: "100%", height: "100%"}}/>
      </View>
      {/* <Animated.FlatList
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
        contentContainerStyle={{paddingTop: HEADERHEIGHT - 20, marginHorizontal: LISTMARGIN }}
        showsVerticalScrollIndicator={false}
        data={properties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card property={item} style={{ marginVertical: 5 }} />
        )}
      /> */}
    </Screen>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})