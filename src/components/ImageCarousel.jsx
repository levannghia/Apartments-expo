import { StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WIDTH } from '../../constant';

const ImageCarousel = ({ images }) => {
    const flatListRef = useRef()
    const viewConfig = { viewAreaCoveragePercentThreshold: 95 }
    const [activeIndex, setActiveIndex] = useState(0)
    const onViewRef = useRef(({ changed }) => {
        if (changed[0].isViewable) {
            setActiveIndex(changed[0].index)
        }
    })
    const handlePressLeft = () => {
        if (activeIndex === 0) {
            return flatListRef.current?.scrollToIndex({
                animated: false,
                index: images.length - 1
            })
        }

        flatListRef.current?.scrollToIndex({
            index: activeIndex - 1
        })
    }

    const handlePressRight = () => {
        if (activeIndex === images.length - 1) {
            return flatListRef.current?.scrollToIndex({
                animated: false,
                index: 0
            })
        }

        flatListRef.current?.scrollToIndex({
            index: activeIndex + 1
        })
    }
    return (
        <>
            <FlatList
                ref={(ref) => (flatListRef.current = ref)}
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment='center'
                pagingEnabled
                viewabilityConfig={viewConfig}
                onViewableItemsChanged={onViewRef.current}
                renderItem={({ item, index }) => (
                    <Image
                        source={{ uri: item }}
                        style={{
                            height: 220,
                            width: WIDTH,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5
                        }}
                    />
                )}
                keyExtractor={(item) => item}
            />
            <TouchableOpacity style={{
                position: 'absolute',
                top: 90,
                left: 5
            }}
                onPress={handlePressLeft}
            >
                <MaterialCommunityIcons name="chevron-left" size={45} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{
                position: 'absolute',
                top: 90,
                right: 5
            }}
                onPress={handlePressRight}>
                <MaterialCommunityIcons name="chevron-right" size={45} color="white" />
            </TouchableOpacity>
        </>
    )
}

export default ImageCarousel

const styles = StyleSheet.create({})