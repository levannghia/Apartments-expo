import { StyleSheet, Dimensions } from 'react-native'
import React, { useRef, useEffect } from 'react'
import LottieView from "lottie-react-native";
import { Screen } from 'react-native-screens';

const Loading = () => {
    const animation = useRef(null)

    setTimeout(() => {
        animation.current?.play();
    }, 100);

    return (
        <Screen style={styles.container}>
            <LottieView
                ref={animation}
                source={require('../assets/lotties/Loading.json')}
                style={styles.lottie}
            />
        </Screen>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        justifyContent: "center",
        alignItems: "center",
    },
    lottie: {
        height: 250,
        width: 250,
    },
})