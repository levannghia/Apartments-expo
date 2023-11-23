import { StyleSheet, Animated, View, TouchableOpacity, Platform, FlatList } from 'react-native'
import React, { useState } from 'react'
import { HEADERHEIGHT, LISTMARGIN } from '../../constant';
import { default as theme } from '../../theme.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Button, Divider } from '@ui-kitten/components'
import Row from './Row';
import { useNavigation } from '@react-navigation/native';

const AnimatedListHeader = ({ scrollAnimation, mapShown, setMapShown, location }) => {
    const navigation = useNavigation();
    const [offsetAnimation] = useState(new Animated.Value(0))
    const [clampedScroll, setClampedScroll] = useState(
        Animated.diffClamp(
            Animated.add(
                scrollAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp",
                }),
                offsetAnimation
            ),
            0,
            1
        )
    )

    const onLayout = (event) => {
        let { height } = event.nativeEvent.layout;
        setClampedScroll(
            Animated.diffClamp(
                Animated.add(
                    scrollAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp",
                    }),
                    offsetAnimation
                ),
                0,
                height
            )
        );
    }
    const navbarTranslate = clampedScroll.interpolate({
        inputRange: [0, HEADERHEIGHT],
        outputRange: [0, -HEADERHEIGHT],
        extrapolateLeft: "clamp"
    })

    const filterButton = [
        {
            iconName: "filter-variant",
            onPress: () => console.log("filter all"),
        },
        {
            lable: "Price",
            onPress: () => console.log("Price"),
        },
        {
            lable: "Move In Date",
            onPress: () => console.log("move in date"),
        },
        {
            lable: "Pets",
            onPress: () => console.log("pets"),
        },
    ]

    const handleMapPress = () => {
        if (mapShown) return setMapShown(false);
        setMapShown(true);
    }


    return (
        <Animated.View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            zIndex: 1000,
            height: HEADERHEIGHT,
            backgroundColor: '#ffffff',
            transform: [{ translateY: navbarTranslate }]
        }}
            onLayout={onLayout}
        >
            <View style={{ marginHorizontal: LISTMARGIN }}>
                <TouchableOpacity style={{
                    marginTop: Platform.OS === 'ios' ? 50 : 30,
                    borderWidth: 1,
                    borderColor: '#d3d3d3',
                    borderRadius: 30,
                    padding: 10,
                }}
                onPress={() => navigation.navigate("FindLocation")}
                >
                    <Row style={{ alignItems: 'center' }}>
                        <MaterialCommunityIcons name='magnify' color={theme['color-primary-500']} size={28} />
                        <Text style={{ marginLeft: 10 }}>{location}</Text>
                    </Row>
                </TouchableOpacity>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginVertical: 10 }}
                    data={filterButton}
                    keyExtractor={(_, index) => index}
                    renderItem={({ item, index }) => {
                        if (item.iconName) {
                            return <Button appearance={'ghost'} style={{
                                borderRadius: 30,
                                borderColor: '#d3d3d3',
                                width: 48,
                                marginHorizontal: 3,
                            }}
                                onPress={item.onPress}
                            ><MaterialCommunityIcons name={item.iconName} size={30} color={theme['color-primary-500']} /></Button>
                        }

                        return <Button appearance={'ghost'}
                            style={{
                                borderRadius: 30,
                                borderColor: '#d3d3d3',
                                marginHorizontal: 3,
                            }}
                            onPress={item.onPress}
                        >
                            {item.lable}
                        </Button>
                    }}
                />
            </View>
            <Divider style={{ backgroundColor: '#d3d3d3', }} />
            <Row style={{ alignItems: 'center', justifyContent: 'space-between', marginHorizontal: LISTMARGIN, marginVertical: 5 }}>
                <Row>
                    <MaterialCommunityIcons name='map-marker' size={18} color={theme['color-primary-500']} />
                    <Text category='c1' appearance='hint'>12,510 Available</Text>
                    <TouchableOpacity>
                        <Text category='c1' style={{ color: theme['color-info-500'], fontWeight: 'bold', marginLeft: 5 }}>Save</Text>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TouchableOpacity>
                        <Row style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name='sort' size={18} color={theme['color-info-500']} />
                            <Text category='c1' style={{ color: theme['color-info-500'], fontWeight: 'bold', marginLeft: 5 }}>Sort</Text>
                        </Row>
                    </TouchableOpacity>
                    {mapShown ?
                        (<TouchableOpacity onPress={handleMapPress}>
                            <Row style={{ alignItems: 'center', marginLeft: 20 }}>
                                <MaterialCommunityIcons name='format-list-bulleted' size={18} color={theme['color-info-500']} />
                                <Text category='c1' style={{ color: theme['color-info-500'], fontWeight: 'bold', marginLeft: 5 }}>List</Text>
                            </Row>
                        </TouchableOpacity>) :
                        (<TouchableOpacity onPress={handleMapPress}>
                            <Row style={{ alignItems: 'center', marginLeft: 20 }}>
                                <MaterialCommunityIcons name='map-outline' size={18} color={theme['color-info-500']} />
                                <Text category='c1' style={{ color: theme['color-info-500'], fontWeight: 'bold', marginLeft: 5 }}>Map</Text>
                            </Row>
                        </TouchableOpacity>)
                    }
                </Row>
            </Row>
        </Animated.View>
    )
}

export default AnimatedListHeader

const styles = StyleSheet.create({})