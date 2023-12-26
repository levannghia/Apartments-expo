import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Screen } from '../components/screen'
import { useAuth } from '../hooks/useAuth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from '@ui-kitten/components'
import ModalHeader from '../components/ModalHeader'
import { LISTMARGIN } from '../../constant'
import SignUpOrSignInScreen from './SignUpOrSignInScreen'
import CreateManagerScreen from './CreateManagerScreen'

const AddPropertyScreen = ({ route, params }) => {
    const { user } = useAuth();
    const manager = false;

    if(!user) return <SignUpOrSignInScreen/>
    if(!manager) return <CreateManagerScreen/>

    return (
        <KeyboardAwareScrollView bounces={false}>
            <Screen>
                <ModalHeader text={"JPApartments"} xShown={true}/>
                <View style={styles.container}>
                    <Text style={styles.header} category={"h5"}>Add a Property</Text>
                </View>
            </Screen>
        </KeyboardAwareScrollView>
    )
}

export default AddPropertyScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LISTMARGIN,
    },
    header: {
        marginVertical: 20,
    }
})