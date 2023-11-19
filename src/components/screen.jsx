import {SafeAreaView, View, StyleSheet, ViewStyle, Platform, StatusBar} from 'react-native'

export const Screen = ({children, style}) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})