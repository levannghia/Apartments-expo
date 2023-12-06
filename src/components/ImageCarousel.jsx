import { StyleSheet, Image, FlatList, TouchableOpacity, Pressable, View, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WIDTH } from '../../constant';
import { Text } from '@ui-kitten/components';

const ImageCarousel = ({
    images,
    onImagePress,
    chevronsShown,
    indexShown,
    xShown,
    field,
    setImages,
    style,
    imageStyle, }) => {
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
        <View style={style}>
            {images && images.length > 0 ?
                (<FlatList
                    ref={(ref) => (flatListRef.current = ref)}
                    data={images}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment='center'
                    pagingEnabled
                    viewabilityConfig={viewConfig}
                    onViewableItemsChanged={onViewRef.current}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={onImagePress}>
                            <Image
                                source={{ uri: item }}
                                style={styles.image}
                            />
                        </Pressable>
                    )}
                    keyExtractor={(item) => item}
                />) : (
                    <Pressable onPress={onImagePress}>
                        <Image
                            source={require("../assets/images/NoImage.jpeg")}
                            style={[styles.image, imageStyle]}
                        />
                    </Pressable>
                )}
            {chevronsShown && <>
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
            </>}
            {indexShown && (
                <View style={styles.index}>
                    <Text category={"c2"} style={styles.indexText}>
                        {activeIndex + 1} of {images.length} photos
                    </Text>
                </View>
            )}
        </View>
    )
}

export default ImageCarousel

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: Dimensions.get('window').width,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
      },
      index: {
        position: "absolute",
        top: 20,
        left: 15,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // use this to give the black background opacity but not the text
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 30,
      },
      indexText: { color: "#fff" },
      x: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "#fff",
        borderRadius: 30,
        padding: 10,
        zIndex: 10,
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